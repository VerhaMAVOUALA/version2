import './AboutPage.css';   
import { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(
      '.about-text h2, .about-text p, ' +
      '.mission-text h2, .mission-text p, .mission-text h3, .mission-text ul li, ' +
      '.team-member, .stat-item'
    );

    elements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="about-page">
      <div className="page-banner">
        <div className="container">
          <h1>À propos de nous</h1>
          <p>Découvrez notre histoire et nos valeurs</p>
        </div>
      </div>
      
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1560177776-c19872fac4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Notre équipe" 
                loading="lazy"
              />
            </div>
            <div className="about-text">
              <h2>Notre Histoire</h2>
              <p>Fondée en 2015, LuxDrive est née de la passion pour l'excellence et le service client irréprochable. Notre fondateur, après avoir travaillé pendant plus de 15 ans dans l'industrie du transport de luxe, a décidé de créer une entreprise qui se distinguerait par la qualité de son service et l'attention portée aux détails.</p>
              <p>Au fil des années, nous avons constitué une équipe de chauffeurs professionnels et une flotte de véhicules haut de gamme pour répondre aux besoins les plus exigeants de notre clientèle. Aujourd'hui, LuxDrive est fière d'être reconnue comme l'une des entreprises leaders dans le domaine du transport privé de luxe.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Notre Mission</h2>
              <p>Chez LuxDrive, notre mission est de fournir des services de transport de luxe personnalisés qui dépassent les attentes de nos clients. Nous nous engageons à offrir une expérience exceptionnelle à chaque trajet, en combinant le confort, la sécurité et un service client attentionné.</p>
              <h3>Nos valeurs fondamentales</h3>
              <ul>
                <li>
                  <span className="value-icon excellence"></span>
                  <div>
                    <h4>Excellence</h4>
                    <p>Nous visons l'excellence dans tous les aspects de notre service, de la sélection des véhicules à la formation de nos chauffeurs.</p>
                  </div>
                </li>
                <li>
                  <span className="value-icon reliability"></span>
                  <div>
                    <h4>Fiabilité</h4>
                    <p>Ponctualité et fiabilité sont au cœur de notre service, pour vous offrir une tranquillité d'esprit totale.</p>
                  </div>
                </li>
                <li>
                  <span className="value-icon discretion"></span>
                  <div>
                    <h4>Discrétion</h4>
                    <p>Nous garantissons la confidentialité et la discrétion pour tous nos clients, qu'ils soient célébrités, hommes d'affaires ou particuliers.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1594170524773-e26c3149232c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Notre mission" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Notre Équipe</h2>
            <p>Des professionnels dédiés à votre service</p>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://randomuser.me/api/portraits/men/42.jpg" 
                  alt="Alexandre Dupont" 
                  loading="lazy"
                />
              </div>
              <h3>Alexandre Dupont</h3>
              <p className="member-position">Fondateur & CEO</p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Claire Bernard" 
                  loading="lazy"
                />
              </div>
              <h3>Claire Bernard</h3>
              <p className="member-position">Directrice des Opérations</p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Thomas Moreau" 
                  loading="lazy"
                />
              </div>
              <h3>Thomas Moreau</h3>
              <p className="member-position">Responsable de la Flotte</p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Sophie Martin" 
                  loading="lazy"
                />
              </div>
              <h3>Sophie Martin</h3>
              <p className="member-position">Service Client</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Clients Satisfaits</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Véhicules de Luxe</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Chauffeurs Professionnels</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">7</div>
              <div className="stat-label">Années d'Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default AboutPage;