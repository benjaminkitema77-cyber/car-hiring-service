import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import CarCard from "../components/carcard";

import charger from "../assets/cars/charger.jpg";
import e53 from "../assets/cars/e53.jpg";
import escalade from "../assets/cars/Escalade.jpg";
import gle from "../assets/cars/GLE.jpg";
import ram from "../assets/cars/RAM.jpg";
import shelby from "../assets/cars/shelby.jpg";

function Cars() {
  const cars = [
    {
      id: 1,
      name: "Dodge Charger",
      price: 18000,
      image: charger,
      description: "A stylish and powerful sports sedan.",
    },
    {
      id: 2,
      name: "Mercedes AMG E53",
      price: 22000,
      image: e53,
      description: "Luxury, comfort and performance combined.",
    },
    {
      id: 3,
      name: "Cadillac Escalade",
      price: 28000,
      image: escalade,
      description: "A spacious luxury SUV for comfortable trips.",
    },
    {
      id: 4,
      name: "Mercedes GLE",
      price: 25000,
      image: gle,
      description: "A modern SUV with a premium driving experience.",
    },
    {
      id: 5,
      name: "RAM TRX",
      price: 30000,
      image: ram,
      description: "A powerful pickup built for adventure.",
    },
    {
      id: 6,
      name: "Shelby Cobra",
      price: 25000,
      image: shelby,
      description: "A classic sports car with a bold design.",
    },
  ];

  return (
    <>
      <Navbar />

      <main
       className="bg-slate-100 min-h-screen px-6 py-12">

        <h1 
        className="text-4xl font-bold text-center mb-4">
          Our Available Cars
        </h1>

        <p 
        className="text-center text-slate-600 mb-10">
          Find the perfect car for your next journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Cars;