export const locations = [
  {
    id: 1,
    name: 'Cabañas El Bosque',
    type: 'cabin',
    capacity: 60,
    //image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnxlbnwwfHx8fDE3NjI5ODU1NzF8MA&ixlib=rb-4.1.0&q=85',
    image: "https://res.cloudinary.com/ddwxh8oxg/image/upload/v1763044285/verde_ydlllf.jpg",
    description: {
      es: 'Acogedoras cabañas rodeadas de naturaleza',
      en: 'Cozy cabins surrounded by nature',
      fr: 'Cabanes confortables entourées de nature'
    }
  },
  {
    id: 2,
    name: 'Alberca Las Cascadas',
    type: 'pool',
    capacity: 100,
    image: 'https://images.unsplash.com/photo-1623334999098-7333609260cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwcG9vbHxlbnwwfHx8fDE3NjI5ODU1ODF8MA&ixlib=rb-4.1.0&q=85',
    description: {
      es: 'Alberca natural con vista a las cascadas',
      en: 'Natural pool with waterfall views',
      fr: 'Piscine naturelle avec vue sur les cascades'
    }
  },
  {
    id: 3,
    name: 'Río Cristalino',
    type: 'river',
    capacity: 150,
    image: 'https://images.pexels.com/photos/6942667/pexels-photo-6942667.jpeg',
    description: {
      es: 'Río de aguas cristalinas para nadar y explorar',
      en: 'Crystal clear river for swimming and exploring',
      fr: 'Rivière aux eaux cristallines pour nager et explorer'
    }
  },
  {
    id: 4,
    name: 'Parque Ecoturístico La Selva',
    type: 'ecopark',
    capacity: 200,
    image: 'https://images.unsplash.com/photo-1755103910358-b7834600e964?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxqdW5nbGUlMjBlY28lMjBwYXJrfGVufDB8fHx8MTc2Mjk4NTU4N3ww&ixlib=rb-4.1.0&q=85',
    description: {
      es: 'Aventuras en la selva con senderos guiados',
      en: 'Jungle adventures with guided trails',
      fr: 'Aventures dans la jungle avec sentiers guidés'
    }
  },
  {
    id: 5,
    name: 'Restaurante Sabor Chiapaneco',
    type: 'restaurant',
    capacity: 40,
    image: 'https://images.unsplash.com/photo-1759156241324-6343c446a27c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxvdXRkb29yJTIwcmVzdGF1cmFudCUyMG5hdHVyZXxlbnwwfHx8fDE3NjI5ODU1OTZ8MA&ixlib=rb-4.1.0&q=85',
    description: {
      es: 'Cocina tradicional chiapaneca al aire libre',
      en: 'Traditional Chiapas cuisine outdoors',
      fr: 'Cuisine traditionnelle du Chiapas en plein air'
    },
    hours: '10:00-20:00'
  },
  {
        id: 6,
        name: 'Cabañas Vista Hermosa',
        type: 'cabin',
        capacity: 40,
        image: 'https://images.unsplash.com/photo-1515592559813-3f7dff97e185?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxmb3Jlc3QlMjBjYWJpbnxlbnwwfHx8fDE3NjI5ODU1NzF8MA&ixlib=rb-4.1.0&q=85',
        //image: '/assets/cabaña.jpeg"',
        description: {
          es: 'Vistas panorámicas del valle y montañas',
          en: 'Panoramic views of valley and mountains',
          fr: 'Vues panoramiques sur la vallée et les montagnes'
        }
  },
  {
    id: 7,
    name: 'Alberca Natural Azul',
    type: 'pool',
    capacity: 80,
    image: 'https://images.unsplash.com/photo-1690898796608-be19326b8fb3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxuYXR1cmFsJTIwcG9vbHxlbnwwfHx8fDE3NjI5ODU1ODF8MA&ixlib=rb-4.1.0&q=85',
    description: {
      es: 'Piscina de agua azul turquesa en medio del bosque',
      en: 'Turquoise blue pool in the middle of the forest',
      fr: 'Piscine bleue turquoise au milieu de la forêt'
    }
  }
];

export const typeLabels = {
  cabin: { es: 'Cabaña', en: 'Cabin', fr: 'Cabane' },
  pool: { es: 'Alberca', en: 'Pool', fr: 'Piscine' },
  river: { es: 'Río', en: 'River', fr: 'Rivière' },
  ecopark: { es: 'Parque Eco', en: 'Eco Park', fr: 'Parc Éco' },
  restaurant: { es: 'Restaurante', en: 'Restaurant', fr: 'Restaurant' }
};