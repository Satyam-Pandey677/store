import {Outlet} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Navigation from "./pages/auth/Navigation"
import 'react-toastify/dist/ReactToastify.css'
import{AppSidebar} from "./components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const App = () => {
  return (
    <>
    <ToastContainer/>
    <SidebarProvider>
      <AppSidebar/>
    
    <main className="py-3">
      <Outlet/>
    </main>
    </SidebarProvider>
    </>
  )
}

export default App