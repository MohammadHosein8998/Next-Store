import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";
import SideBar from "./Sidebar";
import { auth } from "@clerk/nextjs/server";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const isAdminUser = auth().userId === process.env.
  return (
    <>
      <h2 className="text-2xl pl-4">Dashboard</h2>
      <Separator className="mt-2 border-1" />
      <section className="grid lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:col-span-2">
          < SideBar />
        </div>
        <div className="lg:col-span-10   px-4">{children}</div>
      </section>
    </>
  );
}

export default DashboardLayout;
