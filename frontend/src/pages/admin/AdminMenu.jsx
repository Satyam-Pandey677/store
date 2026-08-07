import { NavLink } from "react-router-dom"

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/categorylist", label: "Create Category" },
  { to: "/admin/productlist", label: "Create Product" },
  { to: "/admin/allproductlist", label: "Product List" },
  { to: "/admin/userlist", label: "Manage Users" },
  { to: "/admin/orderlist", label: "Manage Orders" },
]

const AdminMenu = () => {
  return (
    <nav className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {adminLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `rounded-full px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-pink-600 text-white"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default AdminMenu