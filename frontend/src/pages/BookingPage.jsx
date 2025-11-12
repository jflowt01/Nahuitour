import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { ProgressStepper } from '../components/ProgressStepper';
import { CustomCalendar } from '../components/CustomCalendar';
import { LocationCard } from '../components/LocationCard';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { locations } from '../data/locations';
import { toast } from 'sonner';

export default function BookingPage() {
  const { t, language } = useLanguage();
  const { addBooking } = useBooking();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    persons: 2,
    time: '12:00'
  });
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    acceptTerms: false
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const steps = [
    t('selectDate'),
    t('selectLocation'),
    t('bookingDetails'),
    t('yourInformation')
  ];

  const handleNext = () => {
    if (currentStep === 1 && !selectedDate) {
      toast.error(t('mustSelectDate'));
      return;
    }
    if (currentStep === 2 && !selectedLocation) {
      toast.error(t('mustSelectLocation'));
      return;
    }
    if (currentStep === 3) {
      if (bookingDetails.persons < 1) {
        toast.error(t('fillAllFields'));
        return;
      }
    }
    if (currentStep === 4) {
      if (!userInfo.name || !userInfo.phone || !userInfo.email) {
        toast.error(t('fillAllFields'));
        return;
      }
      if (!userInfo.acceptTerms) {
        toast.error(t('mustAcceptTerms'));
        return;
      }
      handleConfirmBooking();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirmBooking = () => {
    const bookingDate = selectedDate;
    const bookingNum = `RES-${bookingDate.replace(/-/g, '')}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
    
    const booking = {
      id: bookingNum,
      locationId: selectedLocation.id,
      date: selectedDate,
      time: selectedLocation.type === 'restaurant' ? bookingDetails.time : null,
      persons: bookingDetails.persons,
      name: userInfo.name,
      phone: userInfo.phone,
      email: userInfo.email,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    addBooking(booking);
    setConfirmedBooking(booking);
    toast.success(t('bookingCreated'));
  };

  if (confirmedBooking) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-success/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h1 className="text-3xl font-bold mb-2">{t('bookingConfirmed')}</h1>
                <p className="text-muted-foreground">{t('reservationNumber')}: <span className="font-semibold text-foreground">{confirmedBooking.id}</span></p>
              </div>

              <div className="space-y-4">
                <h2 className="font-semibold text-lg border-b pb-2">{t('bookingSummary')}</h2>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('location')}:</span>
                    <span className="font-medium">{selectedLocation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('date')}:</span>
                    <span className="font-medium">{confirmedBooking.date}</span>
                  </div>
                  {confirmedBooking.time && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('time')}:</span>
                      <span className="font-medium">{confirmedBooking.time}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('guests')}:</span>
                    <span className="font-medium">{confirmedBooking.persons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact')}:</span>
                    <span className="font-medium">{confirmedBooking.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={() => navigate('/')}>
                  {t('backToHome')}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                  {t('bookNow')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">{t('book')}</h1>
          <p className="text-center text-muted-foreground mb-8">
            {t('step')} {currentStep} {t('of')} {steps.length}
          </p>

          <ProgressStepper steps={steps} currentStep={currentStep} />

          <Card className="mt-8">
            <CardContent className="p-6 sm:p-8">
              {/* Step 1: Date Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">{t('chooseDate')}</h2>
                    <p className="text-sm text-muted-foreground">{t('dateHelper')}</p>
                  </div>

                  <CustomCalendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    selectedLocation={selectedLocation?.id}
                  />

                  <Alert>
                    <AlertDescription className="text-sm">
                      <strong>{t('availabilityLegend')}:</strong>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-available" />
                          <span>{t('availableSpots')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-warning" />
                          <span>{t('mediumOccupancy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-full" />
                          <span>{t('fullyBooked')}</span>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {/* Step 2: Location Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">{t('chooseLocation')}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {locations.map(location => (
                      <LocationCard
                        key={location.id}
                        location={location}
                        selectedDate={selectedDate}
                        onSelect={setSelectedLocation}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Booking Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">{t('bookingDetails')}</h2>
                  </div>

                  <div className="max-w-md mx-auto space-y-4">
                    <div>
                      <Label htmlFor="persons">{t('numberOfPeople')}</Label>
                      <Input
                        id="persons"
                        type="number"
                        min="1"
                        max={selectedLocation?.capacity}
                        value={bookingDetails.persons}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, persons: parseInt(e.target.value) })}
                      />
                    </div>

                    {selectedLocation?.type === 'restaurant' && (
                      <div>
                        <Label htmlFor="time">{t('selectTime')}</Label>
                        <Input
                          id="time"
                          type="time"
                          min="10:00"
                          max="20:00"
                          value={bookingDetails.time}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{t('timeHelper')}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: User Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">{t('yourInformation')}</h2>
                  </div>

                  <div className="max-w-md mx-auto space-y-4">
                    <div>
                      <Label htmlFor="name">{t('fullName')} *</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        placeholder="Juan García"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">{t('phone')} *</Label>
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        placeholder="+52 961 123 4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">{t('email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        placeholder="juan@example.com"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={userInfo.acceptTerms}
                        onCheckedChange={(checked) => setUserInfo({ ...userInfo, acceptTerms: checked })}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        {t('agreeToTerms')}
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handlePrevious} className="flex-1">
                    {t('previous')}
                  </Button>
                )}
                <Button onClick={handleNext} className="flex-1">
                  {currentStep === 4 ? t('confirm') : t('next')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
