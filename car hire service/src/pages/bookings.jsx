import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/authorisation";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function Bookings() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  // Retrieve bookings belonging to the logged-in user
  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const bookingsQuery = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        const userBookings = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setBookings(userBookings);
        setLoading(false);
        setError("");
      },
      (error) => {
        console.error("Bookings error:", error);
        setError("Unable to load your bookings.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    setCancellingId(bookingId);
    setError("");

    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "Cancelled",
      });
    } catch (error) {
      console.error("Cancellation error:", error);
      setError("Unable to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-slate-100 min-h-screen px-6 py-12">

        <h1 className="text-4xl font-bold text-center mb-4">
          My Bookings
        </h1>

        <p className="text-center text-slate-600 mb-10">
          View and manage your car rental bookings.
        </p>

        <div className="max-w-4xl mx-auto space-y-6">

          {loading && (
            <p className="text-center text-gray-600">
              Loading your bookings...
            </p>
          )}

          {error && (
            <p className="text-center text-red-500">
              {error}
            </p>
          )}

          {!loading && bookings.length === 0 && !error && (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">

              <h2 className="text-2xl font-bold mb-3">
                No Bookings Yet
              </h2>

              <p className="text-gray-600 mb-6">
                You haven't booked any cars yet.
              </p>

              <a
                href="/cars"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
              >
                Browse Cars
              </a>

            </div>
          )}

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >

              <div className="flex flex-col md:flex-row justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-bold mb-3">
                    {booking.carName}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    Pick-up: {booking.startDate}
                  </p>

                  <p className="text-gray-600 mb-2">
                    Return: {booking.endDate}
                  </p>

                  <p className="text-gray-600 mb-2">
                    Duration: {booking.days} day(s)
                  </p>

                  <p className="text-orange-500 font-bold text-lg mt-3">
                    KSh {booking.totalPrice?.toLocaleString()}
                  </p>

                </div>

                <div className="flex flex-col justify-between items-start md:items-end">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                  {booking.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg mt-4 disabled:opacity-50"
                    >
                      {cancellingId === booking.id
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </button>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Bookings;