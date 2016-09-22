var models = require('./models');

const product = {
  name: 'coldplay world tour 2017',
  artist: 'coldplay',
  shortName: 'coldplay',
  deliveryChoices: [
    {
      name: 'eTicket',
      price: 0,
    },
    {
      name: 'UPS',
      price: 30,
    },
  ],
  imageURLs: [
    {
      path: 'https://storage.googleapis.com/versatick/da39a3ee5e6b4b0d3255bfef95601890afd80709.png',
    },
    {
      path: 'https://storage.googleapis.com/versatick/10a34637ad661d98ba3344717656fcc76209c2f8.jpg',
    },
    {
      path: 'https://storage.googleapis.com/versatick/da39a3ee5e6b4b0d3255bfef95601890afd87896.png',
    },
    {
      path: 'https://storage.googleapis.com/versatick/10a3454ghg51d98ba3344717656fcc76209c2f8.jpg',
    },
  ],
  variations: [
    {
      name: 'france',
      label: 'France',
      year: '2017',
      city: 'Paris',
      venue: 'Stade de France',
      artist: 'Coldplay',
      isReservable: true,
      placeImageURL: {
        path: 'https://storage.googleapis.com/versatick/place_fr.png',
      },
      legendImageURL: {
        path: 'https://storage.googleapis.com/versatick/legend_fr_lang_fr.jpg',
      },
      imageURL: {
        path: 'https://storage.googleapis.com/versatick/10a3454ghg51d98ba3344717656fcc762fg45k.jpg',
      },
      categories: [
        {
          name: 'standing',
          price: 109,
          faceValue: 60,
        },
        {
          name: 'gold_circle',
          price: 179,
          faceValue: 75,
        },
        {
          name: 'cat_1',
          price: 179,
          faceValue: 100,
        },
        {
          name: 'cat_2',
          price: 149,
          faceValue: 85,
        },
        {
          name: 'cat_3',
          price: 139,
          faceValue: 75,
        },
      ],
    },
    {
      name: 'spain',
      label: 'Espagne',
      year: '2017',
      city: '',
      venue: '',
      artist: 'Coldplay',
      isReservable: true,
      placeImageURL: {
        path: 'https://storage.googleapis.com/versatick/place_es.png',
      },
      legendImageURL: {
        path: 'https://storage.googleapis.com/versatick/legend_es_lang_fr.jpg',
      },
      imageURL: {
        path: 'https://storage.googleapis.com/versatick/10a3454ghg51d98ba3344717656fcc7GG56pp32.jpg',
      },
      categories: [
        {
          name: 'standing',
          price: 149,
          faceValue: 75,
        },
        {
          name: 'gold_circle',
          price: 179,
          faceValue: 75,
        },
        {
          name: 'upper_tier',
          price: 119,
          faceValue: 60,
        },
        {
          name: 'lower_tier',
          price: 179,
          faceValue: 90,
        },
      ],
    },
    {
      name: 'england',
      label: 'Angleterre',
      year: '2017',
      city: '',
      venue: '',
      artist: 'Coldplay',
      isReservable: true,
      placeImageURL: {
        path: 'https://storage.googleapis.com/versatick/place_en.png',
      },
      legendImageURL: {
        path: 'https://storage.googleapis.com/versatick/legend_en_lang_fr.jpg',
      },
      imageURL: {
        path: 'https://storage.googleapis.com/versatick/10a3454ghg51d98ba3344717656fcc7633FG5hy.jpeg',
      },
      categories: [
        {
          name: 'standing',
          price: 165,
          faceValue: 70,
        },
        {
          name: 'upper_tier',
          price: 115,
          faceValue: 50,
        },
        {
          name: 'lower_tier',
          price: 235,
          faceValue: 100,
        },
      ],
    },
    {
      name: 'germany',
      label: 'Allemagne',
      year: '2017',
      city: '',
      venue: '',
      artist: 'Coldplay',
      isReservable: true,
      placeImageURL: {
        path: 'https://storage.googleapis.com/versatick/place_al.png',
      },
      legendImageURL: {
        path: 'https://storage.googleapis.com/versatick/legend_al_lang_fr.jpg',
      },
      imageURL: {
        path: 'https://storage.googleapis.com/versatick/10a3454ghg51d98ba3344717656fcc7GG59966GGH55.jpg',
      },
      categories: [
        {
          name: 'standing',
          price: 159,
          faceValue: 90,
        },
        {
          name: 'gold_circle',
          price: 199,
          faceValue: 110,
        },
        {
          name: 'upper_tier',
          price: 139,
          faceValue: 80,
        },
        {
          name: 'lower_tier',
          price: 199,
          faceValue: 110,
        },
      ],
    },
    {
      name: 'italy',
      label: 'Italie',
      year: '2017',
      city: '',
      venue: '',
      artist: 'Coldplay',
      isReservable: true,
      placeImageURL: {
        path: 'https://storage.googleapis.com/versatick/place_it.png',
      },
      legendImageURL: {
        path: 'https://storage.googleapis.com/versatick/legend_it_lang_fr.jpg',
      },
      imageURL: {
        path: 'https://storage.googleapis.com/versatick/10a3454ghg51d98ba3344717656fcc7GG599pO998.JPG',
      },
      categories: [
        {
          name: 'standing',
          price: 119,
          faceValue: 60,
        },
        {
          name: 'upper_tier',
          price: 109,
          faceValue: 45,
        },
        {
          name: 'lower_tier',
          price: 149,
          faceValue: 70,
        },
      ],
    },
  ],
};

models.sequelize.sync({ force: false }).then(() => {
  return models.Room.sync({ force: true });
})
.then(() => {
  return models.Mode.sync({ force: true });
})
.then(() => {
  return models.Window.sync({ force: true });
})
.then(() => {
  return models.AirConditioning.sync({ force: true });
})
.then(() => {
  return models.Captor.sync({ force: true });
})
.then(() => {
  return models.Stat.sync({ force: true });
})
.then(() => {
  return models.User.sync({ force: true });
})
.then(() => {
  return models.ConnectedUser.sync({ force: true });
})
.catch((err) => {
  console.log(err);
});
