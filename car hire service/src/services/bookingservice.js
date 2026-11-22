let bookings = [];

export function getBookings() {
  return bookings;
}

export function addBooking(booking) {
  const newBooking = {
    id: Date.now(),
    ...booking,
    status: "Pending",
  };

  bookings.push(newBooking);

  return newBooking;
}

export function cancelBooking(id) {
  bookings = bookings.filter(
    (booking) => booking.id !== id
  );
}