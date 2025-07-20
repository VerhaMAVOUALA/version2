// variables d'environnement pour savoir si on est en production ou en développement
const isProduction = process.env.NODE_ENV === 'production';


// export de l'api url en fonction de l'environnement
export const apiURL = isProduction ? 'https://api.verha.com' : 'http://localhost:9000';
