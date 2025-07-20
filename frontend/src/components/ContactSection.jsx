import { Phone, Mail, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour tous vos besoins de transport
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Phone className="h-8 w-8" />,
              title: "Téléphone",
              details: ["+33 1 23 45 67 89", "Disponible 24h/24"]
            },
            {
              icon: <Mail className="h-8 w-8" />,
              title: "Email",
              details: ["contact@elitedriver.fr", "Réponse sous 2h"]
            },
            {
              icon: <MapPin className="h-8 w-8" />,
              title: "Adresse",
              details: ["123 Avenue des Champs", "75008 Paris, France"]
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-800 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-blue-100">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
