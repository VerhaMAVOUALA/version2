// Imports React Router pour la gestion des routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import du composant Layout principal
import { Layouts } from "./layouts/Layouts";

// Imports des pages publiques
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";



// Imports des pages d'authentification
import { SignInPage } from "./pages/auth/SignInPage";
import { SignUpPage } from "./pages/auth/SignUpPage";

// Imports des pages clients et conducteurs (protégées)
import { HomeClientPage } from "./pages/clients/HomeClientPage";
import { HomeDriverPage } from "./pages/drivers/HomeDriverPage";

// Import du composant de protection des routes
import PrivateRoute from "./lib/PrivateRoute";
import { NewCars } from "./pages/drivers/NewCars";
import { MyCars } from "./pages/drivers/MyCars";
import { MyBookingClient } from "./pages/clients/MyBookingClient";
import { DoBookingClient } from "./pages/clients/doBookingClient";
import { FcAbout } from "react-icons/fc";
import MyBookingDriverPage from "./pages/drivers/MyBookingDriverPage";
import ProfilPage from "./pages/ProfilPage";

/**
 * Composant App - Composant racine de l'application
 * Configure le routage principal avec les routes publiques et protégées
 */
function App() {
  return (    
    <BrowserRouter>
      <Routes>
        {/* 
          Route principale avec Layout
          Toutes les routes enfants hériteront du layout principal 
        */}
        <Route element={<Layouts />}>
          {/* Route d'accueil - Page publique */}
          <Route path="/" index element={<HomePage />} />
          
          {/* Route de contact - Page publique */}
          <Route path="/contact" element={<ContactPage />} />
        
          

          {/* 
            Routes protégées - Nécessitent une authentification
            Wrapped dans PrivateRoute pour vérifier l'authentification
          */}
          <Route element={<PrivateRoute />}>
            {/* Espace client - Accessible uniquement aux utilisateurs connectés */}
            <Route path="/client" element={<HomeClientPage />} />
            <Route path="/client/do-booking" element={<DoBookingClient />} />
            <Route path="/client/my-bookings" element={<MyBookingClient />} />
            
            {/* Espace conducteur - Accessible uniquement aux utilisateurs connectés */}
            <Route path="/driver" element={<HomeDriverPage />} />
            <Route path="/driver/new-cars" element={<NewCars />} />
            <Route path="/driver/my-cars" element={<MyCars />} />
            <Route path="/driver/my-bookings" element={<MyBookingDriverPage />} />


            {/* Espace profil - Accessible uniquement aux utilisateurs connectés */}
            <Route path="/my-profil/update" element={<ProfilPage />} />
          </Route>
        </Route>

        {/* 
          Routes d'authentification - Hors du layout principal
          Ces pages ont leur propre mise en page sans header/footer
        */}
        
        {/* Page de connexion */}
        <Route path="/connexion" element={<SignInPage />} />
        
        {/* Page d'inscription */}
        <Route path="/inscription" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;