import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { locations } from '../data/locations';
import { toast } from 'sonner';

export default function CancelPage() {
  const { t } = useLanguage();
  const { findBooking, cancelBooking } = useBooking();
  const [bookingId, setBookingId] = useState('');
  const [phone, setPhone] = useState('');
  const [foundBooking, setFoundBooking] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const handleSearch = () => {
    if (!bookingId || !phone) {
      toast.error(t('fillAllFields'));
      return;
    }

    const booking = findBooking(bookingId, phone);
    if (booking) {
      if (booking.status === 'cancelled') {
        toast.error(t('cancelled'));
        return;
      }
      setFoundBooking(booking);
    } else {
      toast.error(t('notFound'));
      setFoundBooking(null);
    }
  };

  const handleCancel = () => {
    const bookingDate = new Date(foundBooking.date);
    const now = new Date();
    const hoursDiff = (bookingDate - now) / (1000 * 60 * 60);

    if (hoursDiff < 2) {
      toast.error(t('cancelHelper'));
      return;
    }

    cancelBooking(foundBooking.id);
    setCancelled(true);
    toast.success(t('cancelSuccess'));
  };

  const location = foundBooking ? locations.find(l => l.id === foundBooking.locationId) : null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('cancelReservation')}</h1>
          <p className="text-center text-muted-foreground mb-8">
            {t('cancelHelper')}
          </p>

          <Card>
            <CardContent className="p-6 sm:p-8">
              {!foundBooking ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bookingId">{t('reservationNumber')}</Label>
                    <Input
                      id="bookingId"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      placeholder={t('reservationNumberPlaceholder')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+52 961 123 4567"
                    />
                  </div>

                  <Button onClick={handleSearch} className="w-full">
                    {t('searchReservation')}
                  </Button>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {t('cancelHelper')}
                    </AlertDescription>
                  </Alert>
                </div>
              ) : cancelled ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{t('cancelSuccess')}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t('reservationNumber')}: {foundBooking.id}
                  </p>
                  <Button onClick={() => window.location.reload()} className="w-full">
                    {t('backToHome')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-semibold text-lg border-b pb-2 mb-4">{t('reservationDetails')}</h2>
                    <div className="grid gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('reservationNumber')}:</span>
                        <span className="font-medium">{foundBooking.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('location')}:</span>
                        <span className="font-medium">{location?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('date')}:</span>
                        <span className="font-medium">{foundBooking.date}</span>
                      </div>
                      {foundBooking.time && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('time')}:</span>
                          <span className="font-medium">{foundBooking.time}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('guests')}:</span>
                        <span className="font-medium">{foundBooking.persons}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('status')}:</span>
                        <span className="font-medium text-success">{t('confirmed')}</span>
                      </div>
                    </div>
                  </div>

                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {t('confirmCancel')}
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setFoundBooking(null)} className="flex-1">
                      {t('previous')}
                    </Button>
                    <Button variant="destructive" onClick={handleCancel} className="flex-1">
                      {t('confirmCancel')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
