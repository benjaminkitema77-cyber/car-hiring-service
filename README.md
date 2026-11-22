# DriveEasy Car Hire Service

## About the project

DriveEasy is a car hire website that makes it easier for people to find and book cars online.

Users can create an account, log in, view available cars, check their details and make bookings. They can also view and cancel their bookings.

The website uses React and Firebase.

## What the website can do

- Create an account using email and password.
- Sign in using Google.
- Browse available cars.
- View car details and prices.
- Choose pickup and return dates.
- Calculate the total booking cost.
- Make car bookings.
- View and cancel bookings.
- Access protected pages after logging in.
- View booking information on the admin dashboard.

Customers are also reminded that they must have a valid driver's licence when paying and collecting the car.

## Technologies used

- React
- JavaScript
- Tailwind CSS
- Vite
- React Router
- Firebase Authentication
- Cloud Firestore
- Vitest
- React Testing Library
- Git and GitHub

## Project Structure

- **public** – Contains public files.
- **src** – Contains the main application code.
  - assets – Car images.
  - components – Navbar, footer, car cards and protected routes.
  - context – Authentication context.
  - pages – Home, cars, car details, login, register, bookings and admin pages.
  - services – Firebase configuration.
  - test – Application tests and test setup.
  - App.jsx – Main application.
  - index.css – Website styling.
  - main.jsx – Application entry point.
- **index.html** – Main HTML file.
- **package.json** – Project dependencies and scripts.
- **vite.config.js** – Vite and testing configuration.
- **README.md** – Project information.

## How to run the project

First, make sure you have Node.js and Git installed.

Clone the repository:

bash
git clone your-github-repository-url


Go into the project folder:
bash
cd car-hire-service


Install the packages:

bash
npm install


Start the website:

bash
npm run dev


Open the local link provided in your terminal.

## Firebase setup

DriveEasy uses Firebase to manage user accounts and store booking information.

To set it up:

1. Create a Firebase project.
2. Register a web app.
3. Enable Email and Password authentication.
4. Enable Google sign-in.
5. Create a Firestore database.
6. Add your Firebase configuration in `src/services/firebase.js`.

## Testing

I used Vitest and React Testing Library to test parts of the application.

To run the tests:

bash
npm test


To run all tests once:

bash
npm run test:run


To check test coverage:

bash
npm run coverage


The coverage report shows how much of the code is covered by tests. The target is at least 65%.

## Building the project

To create a production build, run:

bash
npm run build


To preview the build locally:

bash
npm run preview


## Future improvements

Some things I would like to add in the future include:

- Online payments.
- Better car availability tracking.
- Booking confirmation emails.
- Digital driver's licence verification.
- More admin features.
- Live booking and revenue information.

## Author

Benjamin Kitema

## Conclusion

DriveEasy was built to make hiring a car easier. It allows customers to browse cars and make bookings online.

Working on this project has helped me practise React, Firebase, authentication, testing and using GitHub.