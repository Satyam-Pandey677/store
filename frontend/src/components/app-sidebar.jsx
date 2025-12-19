
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Home,
  ShoppingBasketIcon,
  ShoppingCart
} from "lucide-react"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../redux/Api/apiUserSlice"
import { useState } from "react"

// This is sample data.
const data = {
  
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Shop",
      url: "/shop",
      icon: ShoppingBasketIcon,
    },
    {
      name: "Cart",
      url: "/cart",
      icon: ShoppingCart,
    },
  ],
}



export function AppSidebar({
  ...props
}) {


  
  const { userInfo } = useSelector((state) => state.auth);
    const {cartItems }= useSelector((state) => state.cart) 

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
    const toggleSidebar = () => {
      setShowSideBar(!showSideBar);
    };

    const closeSidebar = () => {
      setShowSideBar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo?.data} logoutFn={logoutHandler}  />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
