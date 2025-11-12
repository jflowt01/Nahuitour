import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, TreePine, Heart, Shield } from 'lucide-react';
import { locations } from '../data/locations';
import { LocationCard } from '../components/LocationCard';

export default function HomePage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const heroImage = 'https://images.unsplash.com/photo-1690652483474-1440bb43eae9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxjaGlhcGFzJTIwd2F0ZXJmYWxsfGVufDB8fHx8MTc2Mjk4NTU2NHww&ixlib=rb-4.1.0&q=85';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Chiapas Nature"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-4 sm:mb-6 leading-tight animate-fade-in">
            {t('heroTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-background/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
            <Button
              size="lg"
              onClick={() => navigate('/book')}
              className="bg-accent hover:bg-accent-hover text-accent-foreground shadow-xl animate-pulse-glow"
            >
              {t('bookNow')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-card/20 backdrop-blur-sm border-2 hover:bg-card/40"
            >
              {t('learnMore')}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('aboutTitle')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {t('aboutText')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TreePine className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">7 {t('ourDestinations')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Lugares únicos en la naturaleza' : language === 'en' ? 'Unique places in nature' : 'Lieux uniques dans la nature'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">{t('ourMission')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('missionText')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{language === 'es' ? 'Reservas Seguras' : language === 'en' ? 'Safe Bookings' : 'Réservations Sécurisées'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Confirmación instantánea y atención personalizada' : language === 'en' ? 'Instant confirmation and personalized service' : 'Confirmation instantanée et service personnalisé'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('ourDestinations')}</h2>
            <p className="text-lg text-muted-foreground">
              {language === 'es' ? 'Explora nuestros destinos naturales' : language === 'en' ? 'Explore our natural destinations' : 'Explorez nos destinations naturelles'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map(location => (
              <LocationCard
                key={location.id}
                location={location}
                onSelect={() => navigate('/book')}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => navigate('/book')}
              className="bg-primary hover:bg-primary-light"
            >
              {t('bookNow')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {language === 'es' ? '¿Listo para tu próxima aventura?' : language === 'en' ? 'Ready for your next adventure?' : 'Prêt pour votre prochaine aventure?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {language === 'es' ? 'Reserva ahora y asegura tu lugar en el paraíso' : language === 'en' ? 'Book now and secure your spot in paradise' : 'Réservez maintenant et sécurisez votre place au paradis'}
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/book')}
            className="bg-accent hover:bg-accent-hover text-accent-foreground"
          >
            {t('bookNow')}
          </Button>
        </div>
      </section>
    </div>
  );
}
