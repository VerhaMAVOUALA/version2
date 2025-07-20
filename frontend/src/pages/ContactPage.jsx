import React, { useState } from 'react';
import './ContactPage.css';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pourriez ajouter la logique pour envoyer les données
    console.log('Données du formulaire:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contactez-nous</h1>
        <p>Nous serions ravis d'avoir de vos nouvelles !</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="icon-container">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Adresse</h3>
            <p>123 Rue Example, Ville, 75000</p>
          </div>

          <div className="info-card">
            <div className="icon-container">
              <i className="fas fa-phone"></i>
            </div>
            <h3>Téléphone</h3>
            <p>+33 1 23 45 67 89</p>
          </div>

          <div className="info-card">
            <div className="icon-container">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>contact@monsite.com</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Envoyez-nous un message</h2>
          {isSubmitted && (
            <div className="success-message">
              Merci ! Votre message a été envoyé avec succès.
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="Carte de localisation"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.99144060821!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1623258136843!5m2!1sfr!2sfr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
export default ContactPage;