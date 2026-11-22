import { Link } from "react-router-dom";
import { useAuth } from "../context/authorisation";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center">

      <Link
       to="/" className="text-2xl font-bold">
        Drive<span className="text-orange-500">Easy</span>
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        <Link to="/cars">Cars</Link>

        {user && (
          <Link to="/bookings">My Bookings</Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-orange-500 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="bg-orange-500 px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
