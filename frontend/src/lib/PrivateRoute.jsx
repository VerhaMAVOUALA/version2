// Imports des hooks React pour la gestion d'état et des effets
import { useEffect, useState } from "react"

// Import du hook Redux pour accéder au store
import { useSelector } from "react-redux"

// Imports React Router pour la navigation et le rendu des routes enfants
import { Link, Outlet, useNavigate } from "react-router-dom"

/**
 * Composant PrivateRoute - Route protégée pour les utilisateurs authentifiés
 * Vérifie si l'utilisateur est connecté et redirige vers la page de connexion si ce n'est pas le cas
 * Affiche un message d'erreur avec options de navigation si l'utilisateur n'est pas autorisé
 */
export default function PrivateRoute() {
  // Hook pour la navigation programmatique
  const navigate = useNavigate()
  
  // Récupération de l'utilisateur actuel depuis le store Redux
  const { currentUser } = useSelector((state) => state.user)
  
  // État local pour contrôler la visibilité du message d'erreur
  const [isVisible, setIsVisible] = useState(true)

  /**
   * Effet pour rediriger l'utilisateur vers la page de connexion
   * Se déclenche quand currentUser change
   */
  useEffect(() => {
    if (!currentUser) {
        // Redirection vers la page de connexion si pas d'utilisateur connecté
        navigate("/connexion")
    }
  }, [currentUser, navigate]) // Dépendances : se relance si currentUser ou navigate change

  /**
   * Rendu conditionnel : si pas d'utilisateur connecté,
   * affiche un message d'erreur avec options de navigation
   */
  if (!currentUser) {
    return (
      <div className="container flex items-center justify-center min-h-[50vh] px-4 py-12">
        {/* Conteneur principal avec animation de transition */}
        <div className={`w-full max-w-lg transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}>
          
          {/* Section d'alerte - Message d'avertissement */}
          <div>
            <div className="border-warning/50 bg-warning/10">
              {/* Icône d'avertissement */}
              <div className="h-5 w-5 text-warning" />
              
              {/* Titre de l'alerte */}
              <div className="text-warning">Attention</div>
              
              {/* Message principal d'erreur */}
              <div className="text-warning/90">
                Vous n&apos;êtes pas autorisé à accéder à cette page
              </div>
            </div>
          </div>
          
          {/* Section de description détaillée */}
          <div>
            <p className="text-muted-foreground text-sm">
              Pour accéder à cette page, vous devez être connecté avec les permissions appropriées.
              Veuillez vous connecter ou retourner à la page d&apos;accueil.
            </p>
          </div>
          
          {/* Section des boutons d'action */}
          <div className="flex justify-between">
            {/* Bouton de retour à l'accueil */}
            <button>
              <Link to="/">
                Retour accueil
              </Link>
            </button>
            
            {/* Bouton pour fermer le message (masquer avec animation) */}
            <button
              onClick={() => setIsVisible(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Si l'utilisateur est connecté, rend les composants enfants
   * Outlet permet de rendre les routes imbriquées
   */
  return <Outlet />
}