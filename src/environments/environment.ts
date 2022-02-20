export const environment = {
  production: false,
  url: {
    gameBaseUrl: 'http://localhost:8080/api/games',
    pageableGameBaseUrl: 'http://localhost:8080/api/games/pageable',
    saveGameImageUrl: 'http://localhost:8080/api/games/multipart',
    classificationBaseUrl: 'http://localhost:8080/api/classification',
    genreBaseUrl: 'http://localhost:8080/api/genre',
    platformBaseUrl: 'http://localhost:8080/api/platform',
    publisherBaseUrl: 'http://localhost:8080/api/publisher',
    businessModelBaseUrl: 'http://localhost:8080/api/business-model',
    playerSignUpUrl: 'http://localhost:8080/api/player/signup',
    addReview: 'http://localhost:8080/api/reviews/add',
    getClassificationByName: 'http://localhost:8080/api/classification/',
    getGenreByName: 'http://localhost:8080/api/genre/',
    getPublisherByName: 'http://localhost:8080/api/publisher/',
    getBusinessModelByName: 'http://localhost:8080/api/business-model/',
  },
};
