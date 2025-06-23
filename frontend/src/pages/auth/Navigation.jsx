import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/Api/apiUserSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

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

  console.log(userInfo);

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSideBar ? "hidden" : "flex"
      } xl:flex lg:flex md: hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/home"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white">
            HOME
          </span>{" "}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white">
            SHOPPING
          </span>{" "}
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white">
            CART
          </span>{" "}
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem] text-white ">
            Favorites
          </span>{" "}
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex item-center text-gray-8000 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.data.username}</span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="rounded"
                strokeLinejoin="rounded"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 text-white ${
              !userInfo.data.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.data.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-4 hover:bg-gray-500 "
                  >Dashboard</Link>
                </li>
                <li>
                  <Link
                    to="/admin/products"
                    className="block px-4 py-4 hover:bg-gray-500 "
                  >Product</Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-4 hover:bg-gray-500 "
                  >Category</Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-4 hover:bg-gray-500 "
                  >Order List</Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-4 hover:bg-gray-100 "
                  >User List</Link>
                </li>
              </>
            )}
            <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-4 hover:bg-gray-100 "
                  >Profile</Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block px-4 py-4 hover:bg-gray-100 "
                  >Logout</button>
                </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem] text-white">
                Login
              </span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem] text-white">
                Register
              </span>{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
