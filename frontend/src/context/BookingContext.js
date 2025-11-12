import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockBookings } from '../data/mockBookings';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem('bookings');
    return stored ? JSON.parse(stored) : generateMockBookings();
  });

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings([...bookings, booking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    ));
  };

  const findBooking = (bookingId, phone) => {
    return bookings.find(b => b.id === bookingId && b.phone === phone);
  };

  const getLocationBookings = (locationId) => {
    return bookings.filter(b => b.locationId === locationId && b.status === 'confirmed');
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      cancelBooking,
      findBooking,
      getLocationBookings
    }}>
      {children}
    </BookingContext.Provider>
  );
};
