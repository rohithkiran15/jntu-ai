"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generatedAIInsights } from "./dashboard";
import { redirect } from "next/navigation";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }
  try {
    const result = await db.$transaction(
      async (tx) => {
        const industryChanged =
          data.industry && data.industry !== user.industry;
        //1.
        let industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        //2.
        if (!industryInsight) {
          const insights = await generatedAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            },
          });
        }

        if (industryChanged) {
          await tx.assessment.deleteMany({
            where: { userId: user.id },
          });
        }
        //3.
        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },

      { timeout: 60000 }
    );
    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  /*if (!user.industry) {
    return {
      isOnboarded: false,
    };
  }*/

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
      },
    });
    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}
