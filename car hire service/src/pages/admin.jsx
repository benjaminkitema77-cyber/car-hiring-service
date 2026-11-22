import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function Admin() {
  const stats = [
    {
      title: "Total Cars",
      value: 6,
    },
    {
      title: "Total Bookings",
      value: 12,
    },
    {
      title: "Available Cars",
      value: 4,
    },
    {
      title: "Total Revenue",
      value: "KSh 250,000",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-slate-100 min-h-screen px-6 py-12">

        <h1 className="text-4xl font-bold mb-2">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Manage your DriveEasy car rental business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-gray-500 mb-3">
                {stat.title}
              </h2>

              <p className="text-2xl font-bold text-orange-500">
                {stat.value}
              </p>
            </div>
          ))}

        </div>

        <section className="bg-white p-6 rounded-xl shadow-md mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Recent Bookings
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Car</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="p-3">John</td>
                  <td className="p-3">Mercedes AMG E53</td>
                  <td className="p-3">KSh 66,000</td>
                  <td className="p-3 text-green-600">Confirmed</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3">Mary</td>
                  <td className="p-3">RAM TRX</td>
                  <td className="p-3">KSh 60,000</td>
                  <td className="p-3 text-yellow-600">Pending</td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Admin;