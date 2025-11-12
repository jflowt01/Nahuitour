// Generate mock bookings for demo purposes
export const generateMockBookings = () => {
  const bookings = [];
  const today = new Date();
  
  const names = [
    'Juan García', 'María López', 'Carlos Hernández', 'Ana Martínez',
    'Pedro Rodríguez', 'Laura Sánchez', 'José González', 'Carmen Díaz',
    'Miguel Torres', 'Isabel Ramírez', 'Francisco Flores', 'Elena Morales',
    'David Silva', 'Rosa Jiménez', 'Antonio Ruiz'
  ];
  
  // Generate bookings for next 7 days
  for (let i = 0; i < 20; i++) {
    const daysAhead = Math.floor(Math.random() * 7);
    const date = new Date(today);
    date.setDate(date.getDate() + daysAhead);
    
    const locationId = Math.floor(Math.random() * 7) + 1;
    const persons = Math.floor(Math.random() * 8) + 2;
    const hour = locationId === 5 ? `${10 + Math.floor(Math.random() * 10)}:00` : null;
    
    const bookingDate = date.toISOString().split('T')[0];
    const bookingNum = `RES-${bookingDate.replace(/-/g, '')}-${String(i + 1).padStart(3, '0')}`;
    
    bookings.push({
      id: bookingNum,
      locationId,
      date: bookingDate,
      time: hour,
      persons,
      name: names[i % names.length],
      phone: `+52 ${Math.floor(Math.random() * 900000000 + 100000000)}`,
      email: `user${i}@example.com`,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    });
  }
  
  return bookings;
};

// Calculate availability percentage for a location on a specific date
export const calculateAvailability = (locationId, date, bookings, capacity) => {
  const dateBookings = bookings.filter(
    b => b.locationId === locationId && b.date === date && b.status === 'confirmed'
  );
  
  const totalPersons = dateBookings.reduce((sum, b) => sum + b.persons, 0);
  const percentage = (totalPersons / capacity) * 100;
  
  return {
    booked: totalPersons,
    available: capacity - totalPersons,
    percentage: Math.round(percentage),
    status: percentage >= 71 ? 'full' : percentage >= 31 ? 'medium' : 'available'
  };
};