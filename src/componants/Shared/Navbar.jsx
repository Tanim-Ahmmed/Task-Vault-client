import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user?.email && (
        <li>
          <NavLink to="/todos">Manage ToDo</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed text-base-900 top-0 left-0 right-0  bg-base-100 z-50 py-2 backdrop-blur-xl h-20 opacity-90">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className=" hover:cursor-pointer text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pl-4"
          >
            TaskVault
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="navbar-end">
            {user?.email ? (
              <button
                onClick={logOut}
                className="px-6 py-2 text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
