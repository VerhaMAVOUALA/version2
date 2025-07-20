import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Directrice Marketing",
    text: "Service impeccable ! Le chauffeur était ponctuel et très professionnel. Je recommande vivement.",
    rating: 5
  },
  {
    name: "Pierre Martin",
    role: "Entrepreneur",
    text: "Excellent service pour mes déplacements d'affaires. Véhicules confortables et chauffeurs courtois.",
    rating: 5
  },
  {
    name: "Sophie Bernard",
    role: "Particulier",
    text: "Parfait pour notre mariage ! Le service était exceptionnel et a contribué à rendre notre jour spécial.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Ce que disent nos clients</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            La satisfaction de nos clients est notre priorité absolue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;