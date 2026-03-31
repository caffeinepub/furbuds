import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: ContactForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof ContactForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Service unavailable. Please try again.");
      return;
    }
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await actor.submitContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        timestamp: BigInt(Date.now()),
      });
      setSubmitted(true);
      setForm(emptyForm);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const infoItems = [
    {
      icon: MapPin,
      label: "Address",
      content: "123 Koregaon Park, Pune,\nMaharashtra 411001",
    },
    {
      icon: Phone,
      label: "Phone",
      content: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: Mail,
      label: "Email",
      content: "hello@furbuds.in",
      href: "mailto:hello@furbuds.in",
    },
    {
      icon: Clock,
      label: "Hours",
      content: "Mon – Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 4:00 PM",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card rounded-2xl shadow-card p-8 h-full">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-sage">
                      <item.icon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground text-sm hover:text-teal transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="mt-8 rounded-xl overflow-hidden h-44 flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.92 0.02 185)" }}
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-1 text-teal" />
                  <p className="text-sm font-medium text-teal">
                    Koregaon Park, Pune
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maharashtra 411001
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {submitted ? (
              <div
                className="bg-card rounded-2xl shadow-card p-10 text-center h-full flex flex-col items-center justify-center"
                data-ocid="contact.success_state"
              >
                <CheckCircle2
                  className="w-16 h-16 mb-4"
                  style={{ color: "oklch(0.6 0.12 155)" }}
                />
                <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                <p className="text-muted-foreground mb-6">
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full px-8 font-semibold text-white bg-teal hover:bg-teal/90"
                  data-ocid="contact.primary_button"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl shadow-card p-8 space-y-5"
                data-ocid="contact.modal"
              >
                <h2 className="text-xl font-bold mb-1">Send Us a Message</h2>

                <div className="space-y-1.5">
                  <Label htmlFor="cName">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cName"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                    data-ocid="contact.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cEmail">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                    data-ocid="contact.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cPhone">
                    Phone{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="cPhone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    data-ocid="contact.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cMessage">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="cMessage"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    rows={5}
                    required
                    data-ocid="contact.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full py-3 font-semibold text-base text-white bg-teal hover:bg-teal/90"
                  data-ocid="contact.submit_button"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
