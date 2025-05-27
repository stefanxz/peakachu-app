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
import { Home, Zap, Bolt, BrainCircuit, Brain } from "lucide-react";
import Logo from "@/app/pics/logo.svg"; // Adjust the path as necessary
import Image from "next/image";
import { SidebarToggleButton } from "./SideBarToggleButton";

type AppSidebarProps = {
  children?: React.ReactNode;
};
export function AppSidebar({ children }: AppSidebarProps) {
  const items = [
    { title: "Home", url: "#", icon: Home },
    { title: "Pichu", url: "#", icon: Bolt },
    { title: "Pikachu", url: "#", icon: Zap },
    { title: "Raichu", url: "#", icon: BrainCircuit },
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
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarToggleButton></SidebarToggleButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
