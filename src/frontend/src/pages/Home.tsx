import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Clock,
  MapPin,
  Scissors,
  ShieldCheck,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Video,
    title: "Online Vet Consultation",
    desc: "Consult certified vets from the comfort of your home via video call. Quick, easy, and affordable.",
    id: "s1",
  },
  {
    icon: Stethoscope,
    title: "At-Home Treatment",
    desc: "Our experienced vets visit your home to examine and treat your pet. No stress, no travel needed.",
    id: "s2",
  },
  {
    icon: Scissors,
    title: "At-Home Pet Grooming",
    desc: "Professional grooming at your doorstep. Bath, trim, and spa — stress-free for your furry friend.",
    id: "s3",
  },
  {
    icon: Building2,
    title: "At-Clinic Pet Grooming",
    desc: "Full grooming experience at our Pune clinic. State-of-the-art facility and expert groomers.",
    id: "s4",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Veterinarians",
    desc: "All our vets are licensed professionals with years of hands-on experience in pet care.",
  },
  {
    icon: MapPin,
    title: "Pune-Based & Local",
    desc: "We know Pune and its neighborhoods. Fast home visits, reliable service, always nearby.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    desc: "Available Monday to Saturday, 9 AM to 7 PM. Sundays 10 AM to 4 PM for your convenience.",
  },
];

const testimonials = [
  {
    name: "Priya Kulkarni",
    location: "Kothrud, Pune",
    text: "FurBuds saved my golden retriever Bruno during an emergency. The vet was at our home within 30 minutes. Absolutely incredible service!",
    rating: 5,
    pet: "Golden Retriever",
  },
  {
    name: "Rahul Deshmukh",
    location: "Baner, Pune",
    text: "Used the online vet consultation for my cat Mochi. So convenient — no travel stress and the vet was super knowledgeable and caring.",
    rating: 5,
    pet: "Persian Cat",
  },
  {
    name: "Sneha Joshi",
    location: "Koregaon Park, Pune",
    text: "The at-home grooming is a game-changer! My Labrador Simba loves the FurBuds groomers. He comes out looking like a show dog every time!",
    rating: 5,
    pet: "Labrador",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[560px] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.36 0.065 185) 0%, oklch(0.28 0.06 185) 100%)",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/furbuds-hero.dim_1200x600.jpg"
            alt="Happy pet with owner"
            className="w-full h-full object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, oklch(0.28 0.06 185 / 0.92) 40%, oklch(0.28 0.06 185 / 0.4) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span
              className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4 text-white"
              style={{ backgroundColor: "oklch(0.65 0.14 38 / 0.8)" }}
            >
              🐾 Pune's #1 Pet Care Service
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Expert Care for Your{" "}
              <span style={{ color: "oklch(0.85 0.1 60)" }}>Furry Friends</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Pune's most trusted pet care service — online consultations, home
              visits, and professional grooming, all from the comfort of your
              home.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/book">
                <Button
                  size="lg"
                  className="rounded-full px-8 font-semibold text-white text-base shadow-lg bg-coral hover:bg-coral/90"
                  data-ocid="hero.primary_button"
                >
                  Book Appointment
                </Button>
              </Link>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full px-8 py-2.5 font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors text-base"
                data-ocid="hero.secondary_button"
              >
                Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive pet care designed around your convenience and your
              pet's wellbeing.
            </p>
          </motion.div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="services.list"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-ocid={`services.item.${i + 1}`}
              >
                <Card className="h-full bg-card rounded-2xl shadow-card hover:shadow-lg transition-shadow border-0">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-sage">
                      <service.icon className="w-7 h-7 text-teal" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {service.desc}
                    </p>
                    <Link to="/book" className="mt-auto">
                      <Button
                        size="sm"
                        className="rounded-full font-semibold text-white bg-coral hover:bg-coral/90"
                        data-ocid="services.primary_button"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Why Choose FurBuds?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We put your pet's health and happiness first — every single time.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.94 0.025 185)" }}
                >
                  <feat.icon className="w-8 h-8 text-teal" />
                </div>
                <h3 className="font-bold text-xl mb-2">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Happy Pet Parents
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Thousands of Pune families trust FurBuds with their most beloved
              companions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <Card className="bg-card rounded-2xl shadow-card border-0 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].slice(0, t.rating).map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-current"
                          style={{ color: "oklch(0.75 0.14 70)" }}
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
                      “{t.text}”
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-teal">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.location} · {t.pet}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.46 0.07 185) 0%, oklch(0.36 0.065 185) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Care for Your Pet?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Book an appointment today and let Pune's best pet care team take
            care of your furry family member.
          </p>
          <Link to="/book">
            <Button
              size="lg"
              className="rounded-full px-10 font-semibold text-base text-white shadow-lg bg-coral hover:bg-coral/90"
              data-ocid="cta.primary_button"
            >
              Book Appointment Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
