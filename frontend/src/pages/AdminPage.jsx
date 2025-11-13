import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Calendar, Users, Search, LogOut } from 'lucide-react';
import { locations } from '../data/locations';
import { calculateAvailability } from '../data/mockBookings';
import { toast } from 'sonner';

const ADMIN_USERS = [
  { username: 'dueno1', password: 'demo123', locationId: 1 }, // Cabañas El Bosque
  { username: 'dueno2', password: 'demo123', locationId: 2 }, // Alberca Las Cascadas
  { username: 'dueno3', password: 'demo123', locationId: 3 }, // Río Cristalino
  { username: 'dueno4', password: 'demo123', locationId: 4 }, // Parque Ecoturístico La Selva
  { username: 'dueno5', password: 'demo123', locationId: 5 }, // Restaurante Sabor Chiapaneco
  { username: 'dueno6', password: 'demo123', locationId: 6 }, // Cabañas Vista Hermosa
  { username: 'dueno7', password: 'demo123', locationId: 7 }, // Alberca Natural Azul
];

export default function AdminPage() {
  const { t, language } = useLanguage();
  const { bookings } = useBooking();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = () => {
    const user = ADMIN_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      setLoggedIn(true);
      setCurrentUser(user);
      toast.success(t('success'));
    } else {
      toast.error(t('invalidCredentials'));
    }
  };

  // Get the location for current user
  const userLocation = currentUser ? locations.find(l => l.id === currentUser.locationId) : null;

  // Filter bookings for current user's location only
  const locationBookings = bookings.filter(b => b.locationId === currentUser?.locationId && b.status === 'confirmed');

  const todayBookings = locationBookings.filter(b => {
    const bookingDate = new Date(b.date);
    const today = new Date();
    return bookingDate.toDateString() === today.toDateString();
  });

  const upcomingBookings = locationBookings
    .filter(b => {
      const bookingDate = new Date(b.date);
      const today = new Date();
      return bookingDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredBookings = upcomingBookings.filter(b => {
    const searchLower = searchTerm.toLowerCase();
    return (
      b.id.toLowerCase().includes(searchLower) ||
      b.name.toLowerCase().includes(searchLower) ||
      b.date.includes(searchTerm)
    );
  });

  const totalCapacity = userLocation?.capacity || 0;
  const todayOccupied = todayBookings.reduce((sum, b) => sum + b.persons, 0);
  const occupancyPercentage = totalCapacity > 0 ? Math.round((todayOccupied / totalCapacity) * 100) : 0;

  if (!loggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl">{t('ownerDashboard')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">{t('username')}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dueno1"
              />
            </div>
            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo123"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              {t('login')}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Demo: dueno1 / demo123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('ownerDashboard')}</h1>
            {userLocation && (
              <p className="text-lg text-muted-foreground mt-1">
                {userLocation.name}
              </p>
            )}
          </div>
          <Button variant="outline" onClick={() => { setLoggedIn(false); setCurrentUser(null); }}>
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </Button>
        </div>

        {/* Location Info Card */}
        {userLocation && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={userLocation.image}
                  alt={userLocation.name}
                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{userLocation.name}</h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    {userLocation.description[language]}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{t('capacity')}: {userLocation.capacity} {t('people')}</span>
                    </div>
                    {userLocation.hours && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{userLocation.hours}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('todaySummary')}</p>
                  <p className="text-2xl font-bold">{todayBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('totalBookings')}</p>
                  <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">{occupancyPercentage}%</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('occupancy')}</p>
                  <p className="text-2xl font-bold">{todayOccupied}/{totalCapacity}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <Card>
          <CardHeader>
            <CardTitle>{t('upcomingReservations')}</CardTitle>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">{t('noBookings')}</p>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map(booking => {
                  return (
                    <div key={booking.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-smooth">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{booking.id}</span>
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              {t('confirmed')}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{booking.name}</p>
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        </div>
                        <div className="text-sm sm:text-right space-y-1">
                          <p className="font-medium">{booking.date}</p>
                          {booking.time && <p className="text-muted-foreground">{booking.time}</p>}
                          <p className="text-muted-foreground">{booking.persons} {t('people')}</p>
                          <p className="text-xs font-medium">{booking.phone}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
