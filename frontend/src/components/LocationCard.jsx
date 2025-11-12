import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Users } from 'lucide-react';
import { AvailabilityBadge } from './AvailabilityBadge';
import { calculateAvailability } from '../data/mockBookings';
import { typeLabels } from '../data/locations';

export const LocationCard = ({ location, selectedDate, onSelect }) => {
  const { language, t } = useLanguage();
  const { bookings } = useBooking();

  const availability = selectedDate
    ? calculateAvailability(location.id, selectedDate, bookings, location.capacity)
    : null;

  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-lg border border-border">
      <div className="relative h-48 overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            {typeLabels[location.type][language]}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{location.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {location.description[language]}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span>{location.capacity} {t('people')}</span>
          </div>
        </div>
        {availability && (
          <div className="mt-3">
            <AvailabilityBadge status={availability.status} percentage={availability.percentage} />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onSelect(location)}
          disabled={availability?.status === 'full'}
          className="w-full"
          variant={availability?.status === 'full' ? 'outline' : 'default'}
        >
          {availability?.status === 'full' ? t('fullyBooked') : t('checkAvailability')}
        </Button>
      </CardFooter>
    </Card>
  );
};