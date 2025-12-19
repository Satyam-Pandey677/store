import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  ListOrdered,
  LogIn,
  LogOut,
  Sparkles,
  User,
  User2Icon,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { FaCashRegister, FaUserSlash } from "react-icons/fa";
import { AiFillDashboard, AiOutlineProduct } from "react-icons/ai";

export function NavUser({ user, logoutFn }) {
  const { isMobile } = useSidebar();

  console.log(user);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={""} //user.avatar
                  alt={""} //user.name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={""} //user.avatar
                    alt={""} //user.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.username}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user && (
              <>
                <DropdownMenuGroup>
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User />
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  {user.isAdmin && (
                    <>
                      <Link to="/admin/dashboard">
                        <DropdownMenuItem>
                          <AiFillDashboard />
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/admin/productlist">
                        <DropdownMenuItem>
                          <AiOutlineProduct />
                          Products
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/admin/categorylist">
                        <DropdownMenuItem>
                          <Sparkles />
                          Categories
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/admin/orderlist">
                        <DropdownMenuItem>
                          <ListOrdered />
                          Order List
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/admin/userlist">
                        <DropdownMenuItem>
                          <UserRound />
                          Users List
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut onClick={logoutFn} />
                  Log out
                </DropdownMenuItem>
              </>
            )}

            {!user && (
              <>
                <DropdownMenuGroup>
                  <Link to="/login">
                    <DropdownMenuItem>
                      <FaCashRegister />
                      Login
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link to="/register">
                  <DropdownMenuItem>
                    <LogIn />
                    Register
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
