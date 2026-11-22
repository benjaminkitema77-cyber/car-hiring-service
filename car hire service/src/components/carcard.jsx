import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="
      bg-white
      rounded-xl
      shadow-md
      overflow-hidden
    ">

      <img
        src={car.image}
        alt={car.name}
        className="
          w-full
          h-48
          object-cover
        "
      />

      <div className="p-5">

        <h2 className="text-xl font-bold mb-2">
          {car.name}
        </h2>

        <p className="text-gray-500 mb-3">
          {car.description}
        </p>

        <p className="text-orange-500 font-bold text-lg mb-4">
          KSh {car.price.toLocaleString()} / day
        </p>

        <Link
          to={`/cars/${car.id}`}
          className="
            block
            bg-slate-900
            text-white
            text-center
            py-2
            rounded-lg
          "
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default CarCard;