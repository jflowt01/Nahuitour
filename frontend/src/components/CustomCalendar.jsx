import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { locations } from '../data/locations';
import { calculateAvailability } from '../data/mockBookings';

export const CustomCalendar = ({ selectedDate, onDateSelect, selectedLocation }) => {
  const { bookings } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setHours(minDate.getHours() + 1);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getAvailabilityForDate = (date) => {
    if (!selectedLocation) return null;
    const location = locations.find(l => l.id === selectedLocation);
    if (!location) return null;
    const dateStr = date.toISOString().split('T')[0];
    return calculateAvailability(location.id, dateStr, bookings, location.capacity);
  };

  const renderDays = () => {
    const days = [];
    const emptyCells = firstDayOfMonth;

    for (let i = 0; i < emptyCells; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      date.setHours(0, 0, 0, 0);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate === dateStr;
      const isPast = date < minDate;
      const isFuture = date > maxDate;
      const isDisabled = isPast || isFuture;

      const availability = getAvailabilityForDate(date);
      let availabilityClass = '';
      if (availability && !isDisabled) {
        if (availability.status === 'full') {
          availabilityClass = 'bg-full/5 border-full/20';
        } else if (availability.status === 'medium') {
          availabilityClass = 'bg-warning/5 border-warning/20';
        } else {
          availabilityClass = 'bg-available/5 border-available/20';
        }
      }

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && availability?.status !== 'full' && onDateSelect(dateStr)}
          disabled={isDisabled || availability?.status === 'full'}
          className={`p-2 rounded-lg border transition-smooth text-sm ${
            isSelected
              ? 'bg-primary text-primary-foreground border-primary'
              : isToday
              ? 'border-primary text-primary font-semibold'
              : isDisabled || availability?.status === 'full'
              ? 'text-muted-foreground opacity-40 cursor-not-allowed'
              : `hover:bg-muted ${availabilityClass}`
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={previousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <Button variant="outline" size="sm" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{renderDays()}</div>
    </div>
  );
};