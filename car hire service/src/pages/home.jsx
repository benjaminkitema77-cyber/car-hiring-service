import Navbar from "../components/Navbar";
import Footer from "../components/footer";



function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="
          bg-slate-900
          text-white
          min-h-screen
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-6
        ">

          <h1 className="text-5xl font-bold mb-6">
            Find Your Perfect Ride
          </h1>

          <p className="text-slate-300 text-lg mb-8">
            Explore our cars and find the perfect ride for your next trip.
          </p>

          <button className="
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-8
            py-3
            rounded-lg
          ">
            Explore Cars
          </button>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;