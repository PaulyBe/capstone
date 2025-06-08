import React, { useState } from 'react';

// Main App component which acts as the entry point for the application.
// It manages the current page state and renders the Navbar and page content.
function App() {
  // State to keep track of the current page being displayed.
  // Initialized to 'home'.
  const [currentPage, setCurrentPage] = useState('home');

  // State for the "Book a Table" section
  const [numPeople, setNumPeople] = useState(1);
  const [bookingTime, setBookingTime] = useState('');

  // Mock menu data for the 'home' section
  const menuItems = [
    {
      id: 1,
      name: 'Spicy Chicken Noodles',
      description: 'A fiery blend of tender chicken, fresh vegetables, and savory noodles with a spicy kick.',
      imageUrl: 'https://placehold.co/400x300/F0F0F0/333333?text=Chicken+Noodles'
    },
    {
      id: 2,
      name: 'Vegetarian Delight Pizza',
      description: 'Hand-tossed crust topped with fresh bell peppers, onions, mushrooms, and mozzarella cheese.',
      imageUrl: 'https://placehold.co/400x300/E0E0E0/555555?text=Veggie+Pizza'
    },
    {
      id: 3,
      name: 'Classic Beef Burger',
      description: 'Juicy beef patty with lettuce, tomato, pickles, and our special sauce on a toasted bun. Served with fries.',
      imageUrl: 'https://placehold.co/400x300/D0D0D0/777777?text=Beef+Burger'
    }
  ];

  // Function to handle table booking
  const handleBooking = () => {
    if (numPeople > 0 && bookingTime !== '') {
      // In a real app, you'd send this data to a backend
      alert(`Booking confirmed for ${numPeople} people at ${bookingTime}. Thank you!`);
      console.log(`Booking details: ${numPeople} people, Time: ${bookingTime}`);
      setNumPeople(1); // Reset form after booking
      setBookingTime(''); // Reset form after booking
    } else {
      alert('Please enter a valid number of people and a time.');
    }
  };

  // Function to render the content of the current page based on `currentPage` state.
  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Our Delicious Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map(item => (
                <div key={item.id} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/CCCCCC/666666?text=Image+Error"; }} // Fallback for image loading errors
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'book-table':
        return (
          <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Book Your Table</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="numPeople" className="block text-gray-700 text-sm font-bold mb-2">
                  Number of People:
                </label>
                <input
                  type="number"
                  id="numPeople"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={numPeople}
                  onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))} // Ensure minimum 1 person
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="bookingTime" className="block text-gray-700 text-sm font-bold mb-2">
                  Preferred Time:
                </label>
                <input
                  type="time"
                  id="bookingTime"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
              <button
                onClick={handleBooking}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75 shadow-md hover:shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="p-8 text-center bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600">Have questions? Feel free to reach out to us! You can email us at info@example.com.</p>
          </div>
        );
      default:
        return (
          <div className="p-8 text-center bg-red-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-red-800 mb-4">Page Not Found</h2>
            <p className="text-lg text-red-600">The requested page does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      {/* Navbar component passes current page state and setter for navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content area, centered and with padding */}
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
        {renderPageContent()}
      </main>

      {/* Simple footer for completeness */}
      <footer className="w-full bg-gray-800 text-white text-center p-4 text-sm">
        <p>&copy; 2025 My React App. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Navbar component for navigation links.
// It receives `currentPage` to highlight the active link and `setCurrentPage` to change the page.
function Navbar({ currentPage, setCurrentPage }) {
  // Array of navigation items with their names and corresponding page identifiers.
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Book a Table', id: 'book-table' }, // Updated from 'About'
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand/Logo on the left */}
        <div className="text-white text-2xl font-bold mb-4 md:mb-0">
          TheLittleLemon Restaurant
        </div>

        {/* Navigation links */}
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id} // Unique key for each button to avoid React warnings
              onClick={() => setCurrentPage(item.id)} // Set the current page on click
              className={`
                px-4 py-2 rounded-lg text-white font-medium
                hover:bg-green-700 transition duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75
                ${currentPage === item.id ? 'bg-green-700 scale-105 shadow-md' : 'bg-transparent'}
              `}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default App; // Export the main App component
