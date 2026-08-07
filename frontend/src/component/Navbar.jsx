import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { ChevronDown, LogIn, LogOut, Menu, ShoppingBag, ShoppingCart, UserRound, X } from "lucide-react"
import { useLogoutMutation } from "../redux/Api/apiUserSlice"
import { logout } from "../redux/features/auth/authSlice"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/favorite", label: "Favorites" },
  { to: "/cart", label: "Cart" },
]

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/productlist", label: "Products" },
  { to: "/admin/categorylist", label: "Categories" },
  { to: "/admin/orderlist", label: "Orders" },
  { to: "/admin/userlist", label: "Users" },
]

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const isAdmin = Boolean(userInfo?.data?.isAdmin || userInfo?.isAdmin)
  const profileName = userInfo?.data?.username || userInfo?.username || "Profile"

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
    } catch (error) {
      console.error(error)
    }

    dispatch(logout())
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-linear-to-br from-pink-500 to-violet-500 text-white shadow-lg shadow-pink-200">
            <ShoppingBag size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">StoreMate</p>
            <p className="text-xs text-slate-500">Modern shopping</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-pink-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
          >
            <ShoppingCart size={16} />
            Cart
            <span className="rounded-full bg-pink-600 px-2 py-0.5 text-xs font-semibold text-white">
              {itemCount}
            </span>
          </Link>

          {isAdmin && (
            <div className="relative">
              <button
                onClick={() => {
                  setAdminOpen((prev) => !prev)
                  setProfileOpen(false)
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
              >
                Admin
                <ChevronDown size={16} className={`${adminOpen ? "rotate-180" : ""} transition`} />
              </button>

              {adminOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {adminLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setAdminOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-2 text-sm font-medium ${
                          isActive ? "bg-pink-600 text-white" : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen((prev) => !prev)
                setAdminOpen(false)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <UserRound size={16} />
              {userInfo ? profileName : "Profile"}
              <ChevronDown size={16} className={`${profileOpen ? "rotate-180" : ""} transition`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {userInfo ? (
                  <>
                    <NavLink
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-2 text-sm font-medium ${
                          isActive ? "bg-pink-600 text-white" : "text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      Profile
                    </NavLink>
                    {isAdmin && (
                      <NavLink
                        to="/admin/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className={({ isActive }) =>
                          `mt-1 block rounded-xl px-3 py-2 text-sm font-medium ${
                            isActive ? "bg-pink-600 text-white" : "text-slate-700 hover:bg-slate-100"
                          }`
                        }
                      >
                        Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={() => {
                        setProfileOpen(false)
                        logoutHandler()
                      }}
                      className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <LogIn size={16} />
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setProfileOpen(false)}
                      className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <UserRound size={16} />
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-pink-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isAdmin && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin</p>
                {adminLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `mb-1 block rounded-xl px-3 py-2 text-sm font-medium ${
                        isActive ? "bg-pink-600 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ShoppingCart size={16} />
                Cart ({itemCount})
              </Link>

              {userInfo ? (
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <UserRound size={16} />
                  Profile
                </Link>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-pink-600">
                  <UserRound size={16} />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar