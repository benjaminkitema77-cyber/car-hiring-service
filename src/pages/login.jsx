import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

import { useAuth } from "../context/authorisation";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/cars");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/cars");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="
        bg-slate-100
        min-h-screen
        flex
        justify-center
        items-center
        px-6
        py-12
      ">
        <div className="
          bg-white
          w-full
          max-w-md
          p-8
          rounded-xl
          shadow-md
        ">
          <h1 className="
            text-3xl
            font-bold
            text-center
            mb-2
          ">
            Welcome Back
          </h1>

          <p className="
            text-gray-500
            text-center
            mb-8
          ">
            Login to your DriveEasy account
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                "
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                "
              />
            </div>

            {message && (
              <p className="text-red-500 text-sm mb-4">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-orange-500
                hover:bg-orange-600
                text-white
                py-3
                rounded-lg
                font-semibold
                disabled:opacity-50
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>

            <span className="px-3 text-gray-500 text-sm">
              OR
            </span>

            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="
              w-full
              border
              border-gray-300
              hover:bg-gray-100
              py-3
              rounded-lg
              font-semibold
              disabled:opacity-50
            "
          >
            Continue with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;