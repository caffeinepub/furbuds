import { AppointmentStatus, PetType, ServiceType } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { CheckCircle2, Loader2, PawPrint } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PET_TYPE_MAP: Record<string, PetType> = {
  dog: PetType.dog,
  cat: PetType.cat,
  bird: PetType.other,
  rabbit: PetType.other,
  other: PetType.other,
};

const SERVICE_MAP: Record<string, ServiceType> = {
  online_vet: ServiceType.onlineVetConsultation,
  home_treatment: ServiceType.atHomeTreatment,
  home_grooming: ServiceType.atHomeGrooming,
  clinic_grooming: ServiceType.clinicGrooming,
};

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

interface FormState {
  petName: string;
  petType: string;
  ownerName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const emptyForm: FormState = {
  petName: "",
  petType: "",
  ownerName: "",
  phone: "",
  email: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

export default function BookAppointment() {
  const { actor } = useActor();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Service unavailable. Please try again.");
      return;
    }
    if (
      !form.petName ||
      !form.petType ||
      !form.ownerName ||
      !form.phone ||
      !form.email ||
      !form.service ||
      !form.preferredDate ||
      !form.preferredTime
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await actor.submitAppointment({
        petName: form.petName,
        petType: PET_TYPE_MAP[form.petType],
        ownerName: form.ownerName,
        phone: form.phone,
        email: form.email,
        service: SERVICE_MAP[form.service],
        preferredDate: form.preferredDate,
        preferredTimeSlot: form.preferredTime,
        notes: form.notes,
        status: AppointmentStatus.pending,
        timestamp: BigInt(Date.now()),
      });
      setSubmitted(true);
      setForm(emptyForm);
      toast.success("Appointment booked successfully!");
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-sage">
              <PawPrint className="w-7 h-7 text-teal" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Book Your Appointment
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below and we'll confirm your appointment
              shortly.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl shadow-card p-10 text-center"
              data-ocid="booking.success_state"
            >
              <CheckCircle2
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: "oklch(0.6 0.12 155)" }}
              />
              <h2 className="text-2xl font-bold mb-2">Appointment Booked!</h2>
              <p className="text-muted-foreground mb-6">
                We've received your request. Our team will contact you within 2
                hours to confirm.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="rounded-full px-8 font-semibold text-white bg-teal hover:bg-teal/90"
                data-ocid="booking.primary_button"
              >
                Book Another Appointment
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl shadow-card p-8 space-y-6"
              data-ocid="booking.modal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="petName">
                    Pet Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="petName"
                    placeholder="e.g., Bruno"
                    value={form.petName}
                    onChange={(e) => set("petName", e.target.value)}
                    required
                    data-ocid="booking.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>
                    Pet Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.petType}
                    onValueChange={(v) => set("petType", v)}
                  >
                    <SelectTrigger data-ocid="booking.select">
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="bird">Bird</SelectItem>
                      <SelectItem value="rabbit">Rabbit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ownerName">
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ownerName"
                    placeholder="Full name"
                    value={form.ownerName}
                    onChange={(e) => set("ownerName", e.target.value)}
                    required
                    data-ocid="booking.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    required
                    data-ocid="booking.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                    data-ocid="booking.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>
                    Service <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.service}
                    onValueChange={(v) => set("service", v)}
                  >
                    <SelectTrigger data-ocid="booking.select">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online_vet">
                        Online Vet Consultation
                      </SelectItem>
                      <SelectItem value="home_treatment">
                        At-Home Treatment
                      </SelectItem>
                      <SelectItem value="home_grooming">
                        At-Home Pet Grooming
                      </SelectItem>
                      <SelectItem value="clinic_grooming">
                        At-Clinic Pet Grooming
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="preferredDate">
                    Preferred Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    min={today}
                    value={form.preferredDate}
                    onChange={(e) => set("preferredDate", e.target.value)}
                    required
                    data-ocid="booking.input"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>
                    Preferred Time <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.preferredTime}
                    onValueChange={(v) => set("preferredTime", v)}
                  >
                    <SelectTrigger data-ocid="booking.select">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes">
                  Additional Notes{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific concerns or information about your pet..."
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  data-ocid="booking.textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full py-3 font-semibold text-base text-white bg-teal hover:bg-teal/90"
                data-ocid="booking.submit_button"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Scheduling...
                  </>
                ) : (
                  "Schedule Appointment"
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
