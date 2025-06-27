import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full pt-36 md:pt-48 pb-20">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <Image
            src="/jntuhceh.png"
            width={200}
            height={60}
            alt="JNTU Logo"
            //class="centered-image"
            className="h-75 w-75 object-contain mx-auto"
          />
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
            JNTU-AI
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            AI Career Coach for Professional Success
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/onboarding">
            <Button
              size="lg"
              className="px-8 bg-red-500 hover:bg-white hover:text-blue-600 text-white hover:cursor-pointer"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="https://jntuhceh.ac.in/">
            <Button size="lg" className="px-8">
              About Our College
            </Button>
          </Link>
        </div>
        <div>
          <div>
            <Image
              src={"/jntu-campus.jpeg"}
              width={1280}
              height={720}
              alt="Banner JNTU-AI"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
