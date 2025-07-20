// Import de createSlice depuis Redux Toolkit pour créer le slice
import { createSlice } from '@reduxjs/toolkit';

/**
 * État initial du slice utilisateur
 * Définit la structure de base de l'état de l'utilisateur dans le store Redux
 */
const initialState = {
  currentUser: null,    // Informations de l'utilisateur connecté (null si non connecté)
  loading: false,       // Indicateur de chargement pour les opérations asynchrones
  error: false,         // Stockage des erreurs (false si pas d'erreur, sinon message d'erreur)
};

/**
 * Slice Redux pour la gestion de l'état utilisateur
 * Contient tous les reducers et actions pour l'authentification et la gestion utilisateur
 */
const userSlice = createSlice({
  name: 'user',           // Nom du slice dans le store
  initialState,           // État initial défini ci-dessus
  reducers: {
    
    // === ACTIONS DE CONNEXION ===
    
    /**
     * Démarre le processus de connexion
     * Active l'état de chargement
     */
    signInStart: (state) => {
      state.loading = true;
    },
    
    /**
     * Succès de la connexion
     * @param {Object} action.payload - Données utilisateur reçues de l'API
     */
    signInSuccess: (state, action) => {
      // Gestion flexible du payload (peut contenir user ou être directement l'utilisateur)
      state.currentUser = action.payload?.user || action.payload;
      state.loading = false;
      state.error = false;
    },
    
    /**
     * Échec de la connexion
     * @param {Object} action.payload - Message d'erreur
     */
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // === ACTIONS DE MISE À JOUR UTILISATEUR ===
    
    /**
     * Démarre le processus de mise à jour du profil utilisateur
     * Active l'état de chargement
     */
    updateUserStart: (state) => {
      state.loading = true;
    },
    
    /**
     * Succès de la mise à jour du profil utilisateur
     * @param {Object} action.payload - Nouvelles données utilisateur
     */
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload?.user || action.payload;
      state.loading = false;
      state.error = false;
    },
    
    /**
     * Échec de la mise à jour du profil utilisateur
     * @param {Object} action.payload - Message d'erreur
     */
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // === ACTIONS DE SUPPRESSION UTILISATEUR ===
    
    /**
     * Démarre le processus de suppression du compte utilisateur
     * Active l'état de chargement
     */
    deleteUserStart: (state) => {
      state.loading = true;
    },
    
    /**
     * Succès de la suppression du compte utilisateur
     * Remet l'utilisateur à null (déconnexion)
     */
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    
    /**
     * Échec de la suppression du compte utilisateur
     * @param {Object} action.payload - Message d'erreur
     */
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // === ACTIONS DE SYNCHRONISATION ===
    
    /**
     * Démarre le processus de synchronisation des données utilisateur
     * Utile pour mettre à jour les données depuis le serveur
     */
    syncUserStart: (state) => {
      state.loading = true;
    },
    
    /**
     * Succès de la synchronisation des données utilisateur
     * Fusionne les nouvelles données avec les données existantes
     * @param {Object} action.payload - Nouvelles données à synchroniser
     */
    syncUserSuccess: (state, action) => {
      // Utilisation du spread operator pour merger les données
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.loading = false;
      state.error = false;
    },
    
    /**
     * Échec de la synchronisation des données utilisateur
     * @param {Object} action.payload - Message d'erreur
     */
    syncUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // === ACTION DE DÉCONNEXION ===
    
    /**
     * Déconnecte l'utilisateur
     * Remet l'état à sa valeur initiale
     */
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

/**
 * Export des actions générées automatiquement par createSlice
 * Ces actions peuvent être importées et utilisées dans les composants
 */
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  syncUserStart,
  syncUserSuccess,
  syncUserFailure,
  signOut,
} = userSlice.actions;

// Export du reducer pour l'intégrer dans le store Redux
export default userSlice.reducer;