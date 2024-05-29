import { Toaster } from "@/components/ui/sonner";
import DashboardRootLayout from "@/components/custom/Dashboard/RootLayout"


export default async function DashboardProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <DashboardRootLayout />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <div>{children}</div>
          <Toaster />
        </div>
      </div>
    </>
  );
}
