import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import GlobalState from "../../GlobalState";
import HeaderSearch from "../search/HeaderSearch";
import authApi from "../../api/authApi";

function Headers() {
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart;
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutUser = async () => {
    await authApi.get(`/user/logout`);
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    setCart([]);
    navigate("/login");
  };

  const activeClass = "text-indigo-600 border-b-2 border-indigo-600 pb-1";
  const normalClass =
    "text-slate-600 hover:text-indigo-600 transition duration-300";

  const mobileActive = "block text-indigo-600 font-semibold";

  const mobileNormal = "block text-slate-700 hover:text-indigo-600 transition";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full backdrop-blur-xl bg-white/80 border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <NavLink
            to={isAdmin ? "/admin/dashboard" : "/"}
            className="text-2xl font-semibold text-slate-900"
            onClick={closeMenu}
          >
            {isAdmin ? "Admin Panel" : "Fcom"}
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {isAdmin ? (
              <>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/admin/create-product"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Create Product
                </NavLink>

                <NavLink
                  to="/admin/category"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Categories
                </NavLink>

                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Orders
                </NavLink>

                <button
                  onClick={logoutUser}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Shop
                </NavLink>

                {isLogged && (
                  <NavLink
                    to="/history"
                    className={({ isActive }) =>
                      isActive ? activeClass : normalClass
                    }
                  >
                    History
                  </NavLink>
                )}

                {isLogged && (
                  <div className="w-64">
                    <HeaderSearch />
                  </div>
                )}

                {!isLogged && (
                  <NavLink
                    to="/login"
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition"
                  >
                    Login
                  </NavLink>
                )}
              </>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <NavLink to="/cart" className="relative" onClick={closeMenu}>
                <MdOutlineAddShoppingCart size={26} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            )}

            {isLogged && !isAdmin && (
              <NavLink to="/profile" onClick={closeMenu}>
                <FaUserCircle size={28} />
              </NavLink>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {isAdmin ? (
            <>
              <NavLink
                to="/admin/dashboard"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? mobileActive : mobileNormal
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/products"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? mobileActive : mobileNormal
                }
              >
                Products
              </NavLink>

              <NavLink
                to="/admin/create-product"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? mobileActive : mobileNormal
                }
              >
                Create Product
              </NavLink>

              <NavLink
                to="/admin/category"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? mobileActive : mobileNormal
                }
              >
                Categories
              </NavLink>

              <NavLink
                to="/admin/orders"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? mobileActive : mobileNormal
                }
              >
                Orders
              </NavLink>
              <button
                onClick={() => {
                  logoutUser();
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-2 bg-slate-900 text-white rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? mobileActive : mobileNormal
                }
              >
                Shop
              </NavLink>

              {isLogged && (
                <NavLink
                  to="/history"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? mobileActive : mobileNormal
                  }
                >
                  History
                </NavLink>
              )}
              {isLogged && (
                <div className="w-64">
                  <HeaderSearch />
                </div>
              )}

              {!isLogged && (
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  // className={({ isActive }) =>
                  //   isActive ? mobileActive : mobileNormal
                  // }
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition"
                >
                  Login
                </NavLink>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Headers;
