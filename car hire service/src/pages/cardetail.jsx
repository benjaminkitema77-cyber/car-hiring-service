import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/authorisation";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import charger from "../assets/cars/charger.jpg";
import e53 from "../assets/cars/e53.jpg";
import escalade from "../assets/cars/Escalade.jpg";
import gle from "../assets/cars/GLE.jpg";
import ram from "../assets/cars/RAM.jpg";
import shelby from "../assets/cars/shelby.jpg";

function CarDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const cars = [
    {
      id: 1,
      name: "Dodge Charger",
      price: 18000,
      image: charger,
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
    },
    {
      id: 2,
      name: "Mercedes AMG E53",
      price: 22000,
      image: e53,
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
    },
    {
      id: 3,
      name: "Cadillac Escalade",
      price: 28000,
      image: escalade,
      seats: 7,
      transmission: "Automatic",
      fuel: "Petrol",
    },
    {
      id: 4,
      name: "Mercedes GLE",
      price: 25000,
      image: gle,
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
    },
    {
      id: 5,
      name: "RAM TRX",
      price: 30000,
      image: ram,
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
    },
    {
      id: 6,
      name: "Shelby Cobra",
      price: 25000,
      image: shelby,
      seats: 2,
      transmission: "Manual",
      fuel: "Petrol",
    },
  ];

  const car = cars.find((item) => item.id === Number(id));

  // Today's date and current time
  const now = new Date();

  const minimumDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const minimumTime = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join(":");

  // Calculate rental duration
  const calculateDays = () => {
    if (!startDate || !startTime || !endDate || !endTime) {
      return 0;
    }

    const pickup = new Date(`${startDate}T${startTime}`);
    const dropoff = new Date(`${endDate}T${endTime}`);

    const difference = dropoff - pickup;

    if (difference <= 0) {
      return 0;
    }

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();

  const totalPrice = car ? days * car.price : 0;

  // Handle booking
  const handleBooking = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!startDate || !startTime || !endDate || !endTime) {
      setMessage(
        "Please select your pick-up and drop-off dates and times."
      );
      return;
    }

    const pickupDateTime = new Date(`${startDate}T${startTime}`);
    const dropoffDateTime = new Date(`${endDate}T${endTime}`);

    if (pickupDateTime < new Date()) {
      setMessage("Pick-up date and time cannot be in the past.");
      return;
    }

    if (dropoffDateTime <= pickupDateTime) {
      setMessage("Drop-off must be after pick-up.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: user.email,

        carId: car.id,
        carName: car.name,
        carImage: car.image,

        startDate,
        startTime,

        endDate,
        endTime,

        days,
        pricePerDay: car.price,
        totalPrice,

        status: "Pending",

        createdAt: serverTimestamp(),
      });

      navigate("/bookings");

    } catch (error) {
      console.error("Booking error:", error);

      setMessage(
        "Unable to complete your booking. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // Car not found
  if (!car) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">
            Car Not Found
          </h1>

          <Link
            to="/cars"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg"
          >
            Back to Cars
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-slate-100 min-h-screen px-6 py-12">

        <div className="max-w-6xl mx-auto">

          <Link
            to="/cars"
            className="text-orange-500 font-semibold mb-8 inline-block"
          >
            ← Back to Cars
          </Link>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <img
              src={car.image}
              alt={car.name}
              className="w-full h-80 object-cover"
            />

            <div className="p-8">

              {/* CAR INFORMATION */}

              <div className="flex flex-col md:flex-row justify-between gap-6">

                <div>
                  <h1 className="text-3xl font-bold mb-4">
                    {car.name}
                  </h1>

                  <p className="text-slate-600 mb-2">
                    Seats: {car.seats}
                  </p>

                  <p className="text-slate-600 mb-2">
                    Transmission: {car.transmission}
                  </p>

                  <p className="text-slate-600 mb-2">
                    Fuel: {car.fuel}
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-orange-500">
                    KSh {car.price.toLocaleString()}
                  </p>

                  <p className="text-slate-500">
                    Per day
                  </p>
                </div>

              </div>

              <hr className="my-8" />

              {/* BOOKING SECTION */}

              <h2 className="text-2xl font-bold mb-6">
                Book This Car
              </h2>

              {/* DRIVER'S LICENCE NOTICE */}

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">

                <h3 className="text-lg font-bold text-orange-700 mb-2">
                  ⚠️ Driver's Licence Required
                </h3>

                <p className="text-slate-700 leading-relaxed">
                  A valid driver's licence must be presented
                  during payment and vehicle collection.
                  Failure to provide a valid licence may
                  result in your rental being declined.
                </p>

              </div>

              {/* BOOKING FORM */}

              <form
                onSubmit={handleBooking}
                className="space-y-6"
              >

                {/* PICK-UP DETAILS */}

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Pick-up Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block font-medium mb-2">
                        Pick-up Date
                      </label>

                      <input
                        type="date"
                        value={startDate}
                        min={minimumDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setMessage("");
                        }}
                        required
                        className="w-full border border-slate-300 rounded-lg p-3"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">
                        Pick-up Time
                      </label>

                      <input
                        type="time"
                        value={startTime}
                        min={
                          startDate === minimumDate
                            ? minimumTime
                            : undefined
                        }
                        onChange={(e) => {
                          setStartTime(e.target.value);
                          setMessage("");
                        }}
                        required
                        className="w-full border border-slate-300 rounded-lg p-3"
                      />
                    </div>

                  </div>
                </div>

                {/* DROP-OFF DETAILS */}

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Drop-off Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block font-medium mb-2">
                        Drop-off Date
                      </label>

                      <input
                        type="date"
                        value={endDate}
                        min={startDate || minimumDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setMessage("");
                        }}
                        required
                        className="w-full border border-slate-300 rounded-lg p-3"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">
                        Drop-off Time
                      </label>

                      <input
                        type="time"
                        value={endTime}
                        min={
                          endDate === startDate
                            ? startTime
                            : undefined
                        }
                        onChange={(e) => {
                          setEndTime(e.target.value);
                          setMessage("");
                        }}
                        required
                        className="w-full border border-slate-300 rounded-lg p-3"
                      />
                    </div>

                  </div>
                </div>

                {/* BOOKING SUMMARY */}

                {days > 0 && (
                  <div className="bg-slate-100 rounded-xl p-6">

                    <h3 className="text-xl font-bold mb-4">
                      Booking Summary
                    </h3>

                    <div className="flex justify-between mb-3">
                      <span>Car:</span>

                      <span className="font-semibold">
                        {car.name}
                      </span>
                    </div>

                    <div className="flex justify-between mb-3">
                      <span>Rental duration:</span>

                      <span className="font-semibold">
                        {days} day(s)
                      </span>
                    </div>

                    <div className="flex justify-between mb-3">
                      <span>Price per day:</span>

                      <span className="font-semibold">
                        KSh {car.price.toLocaleString()}
                      </span>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>

                      <span className="text-orange-500">
                        KSh {totalPrice.toLocaleString()}
                      </span>
                    </div>

                  </div>
                )}

                {/* ERROR MESSAGE */}

                {message && (
                  <p className="text-red-500 font-medium">
                    {message}
                  </p>
                )}

                {/* CONFIRM BOOKING */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition disabled:opacity-50"
                >
                  {loading
                    ? "Processing Booking..."
                    : "Confirm Booking"}
                </button>

              </form>

            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export default CarDetail;