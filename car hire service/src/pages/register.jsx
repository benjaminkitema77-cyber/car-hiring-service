import { useState } from "react";
import { Link } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  auth,
  db,
  googleProvider
} from "../services/firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Email and password registration
  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        phone: phone,
        role: "customer",
        createdAt: serverTimestamp(),
      });

      setMessage("Your account has been created successfully!");

      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google registration
  const handleGoogleRegister = async () => {
    setMessage("");
    setLoading(true);

    try {
      const userCredential = await signInWithPopup(
        auth,
        googleProvider
      );

      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: user.displayName || "",
          email: user.email,
          phone: "",
          role: "customer",
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      setMessage("Successfully registered with Google!");

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
            Create Account
          </h1>

          <p className="
            text-gray-500
            text-center
            mb-8
          ">
            Join DriveEasy and book your next ride.
          </p>

          <form onSubmit={handleRegister}>

            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
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

            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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

            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
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
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={6}
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
              <p className="
                text-center
                text-sm
                mb-4
                text-orange-600
              ">
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
              {loading ? "Creating Account..." : "Create Account"}
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
            onClick={handleGoogleRegister}
            disabled={loading}
            className="
              w-full
              border
              border-gray-300
              hover:bg-gray-100
              py-3
              rounded-lg
              font-semibold
              flex
              justify-center
              items-center
              gap-3
              disabled:opacity-50
            "
          >
            <span className="text-lg font-bold">
              G
            </span>

            Continue with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-orange-500 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Register;