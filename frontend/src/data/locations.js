export const locations = [
  {
    id: 1,
    name: 'El Diamante',
    type: 'ecopark',
    capacity: 60,
    image: 'https://customer-assets.emergentagent.com/job_96941555-751d-4e74-9e3f-61517f5c6456/artifacts/oay6y1md_Diamante.jpg',
    description: {
      es: 'Hermoso parque natural con áreas recreativas y juegos infantiles',
      en: 'Beautiful natural park with recreational areas and children\'s games',
      fr: 'Magnifique parc naturel avec aires de loisirs et jeux pour enfants'
    }
  },
  {
    id: 2,
    name: 'Rancho Nuevo',
    type: 'ecopark',
    capacity: 100,
    image: 'https://customer-assets.emergentagent.com/job_96941555-751d-4e74-9e3f-61517f5c6456/artifacts/fxmpsish_Rancho_Nuevo.jpg',
    description: {
      es: 'Senderos naturales entre bosques de pinos con aire fresco de montaña',
      en: 'Natural trails through pine forests with fresh mountain air',
      fr: 'Sentiers naturels à travers les forêts de pins avec air frais de montagne'
    }
  },
  {
    id: 3,
    name: 'Rio Sangre',
    type: 'river',
    capacity: 150,
    image: 'https://customer-assets.emergentagent.com/job_96941555-751d-4e74-9e3f-61517f5c6456/artifacts/rp2za4rm_Rio_Sangre.jpg',
    description: {
      es: 'Río natural con pozas cristalinas para nadar y refrescarse',
      en: 'Natural river with crystal clear pools for swimming and refreshment',
      fr: 'Rivière naturelle avec bassins cristallins pour nager et se rafraîchir'
    }
  },
  {
    id: 4,
    name: 'Siempre Verde',
    type: 'cabin',
    capacity: 80,
    image: 'https://customer-assets.emergentagent.com/job_96941555-751d-4e74-9e3f-61517f5c6456/artifacts/w7p0irsj_Siempre_Verde.jpeg',
    description: {
      es: 'Cabañas acogedoras rodeadas de bosque verde durante todo el año',
      en: 'Cozy cabins surrounded by year-round green forest',
      fr: 'Cabanes confortables entourées de forêt verte toute l\'année'
    }
  },
  {
    id: 5,
    name: 'Yerbabuena',
    type: 'ecopark',
    capacity: 120,
    image: 'https://customer-assets.emergentagent.com/job_96941555-751d-4e74-9e3f-61517f5c6456/artifacts/3xjy2995_yerba.jpg',
    description: {
      es: 'Rancho familiar con amplias áreas verdes y ambiente tranquilo',
      en: 'Family ranch with large green areas and peaceful atmosphere',
      fr: 'Ranch familial avec de grands espaces verts et atmosphère paisible'
    }
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