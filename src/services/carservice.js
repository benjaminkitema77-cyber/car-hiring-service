import charger from "../assets/cars/charger.jpg";
import e53 from "../assets/cars/e53.jpg";
import escalade from "../assets/cars/Escalade.jpg";
import gle from "../assets/cars/GLE.jpg";
import ram from "../assets/cars/RAM.jpg";
import shelby from "../assets/cars/shelby.jpg"


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

export function getCars() {
  return cars;
}

export function getCarById(id) {
  return cars.find((car) => car.id === Number(id));
}

export default cars;