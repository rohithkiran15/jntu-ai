//import { usePathname } from "next/navigation";
import Header from "@/components/header";
/* 
// Routes where header should be hidden
const hideHeaderRoutes = [
  "/dashboard",
  "/resume",
  "/interview/mock",
  "/ai-cover-letter",
  "/onboarding",
];


  const pathname = usePathname();
  const shouldShowHeader = !hideHeaderRoutes.includes(pathname);
 */
export default function HeaderWrapper() {
  return <Header />;
}
