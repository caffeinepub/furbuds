import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, PawPrint, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Book Appointment", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleServicesClick = () => {
    setMobileOpen(false);
    if (router.state.location.pathname !== "/") {
      router.navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          document
            .getElementById("services")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      });
    } else {
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <PawPrint className="w-7 h-7 text-teal" />
            <span className="text-xl font-bold text-teal">FurBuds</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.href === "/#services" ? (
                <button
                  type="button"
                  key={link.label}
                  onClick={handleServicesClick}
                  className="text-sm font-medium text-foreground hover:text-teal transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-foreground hover:text-teal transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden md:block">
            <Link to="/book">
              <Button
                className="rounded-full px-5 font-semibold text-white bg-coral hover:bg-coral/90"
                data-ocid="nav.primary_button"
              >
                Book Now
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-border"
          >
            <nav className="flex flex-col px-4 py-4 gap-3">
              {navLinks.map((link) =>
                link.href === "/#services" ? (
                  <button
                    type="button"
                    key={link.label}
                    onClick={handleServicesClick}
                    className="text-sm font-medium text-foreground hover:text-teal py-2 text-left"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-foreground hover:text-teal py-2"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Link to="/book" onClick={() => setMobileOpen(false)}>
                <Button
                  className="rounded-full w-full font-semibold text-white bg-coral hover:bg-coral/90 mt-2"
                  data-ocid="nav.primary_button"
                >
                  Book Now
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
