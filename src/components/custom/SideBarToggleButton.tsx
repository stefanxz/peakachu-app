"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";

export function SidebarToggleButton() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      className="rounded-md p-2 hover:bg-gray-100 focus:ring focus:outline-none dark:hover:bg-gray-700"
    >
      {state === "expanded" ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </button>
  );
}
