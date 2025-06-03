import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Zap, Bolt, BrainCircuit, Brain, BarChart3 } from "lucide-react";
import Logo from "@/app/pics/logo.svg"; // Adjust the path as necessary
import Image from "next/image";
import { SidebarToggleButton } from "./SideBarToggleButton";
import Link from "next/link";

type AppSidebarProps = {
  children?: React.ReactNode;
};
export function AppSidebar({ children }: AppSidebarProps) {
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Pichu", url: "/pichu", icon: Bolt },
    { title: "Pikachu", url: "/pikachu", icon: Zap },
    { title: "Raichu", url: "/raichu", icon: BrainCircuit },
    { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  ];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel>
          <Image src={Logo} alt="Logo" width={70} height={45} />
          <div> Peakachu - A prediction tool</div>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarToggleButton></SidebarToggleButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
        <SidebarFooter className="fixed bottom-0 px-4 py-2 text-center text-xs">
          © 2025 Peakachu
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
