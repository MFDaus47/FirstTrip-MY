import "./App.css";
import TripForm from "@/components/TripForm";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "./components/ui/resizable-navbar";

function App() {
  const [result, setResult] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "About",
      link: "#",
    },
    {
      name: "Contact",
      link: "#",
    },
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background">
        <div>
          <Navbar>
            {/* Desktop Navbar */}
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} />
              <NavbarButton href="#">Book Now</NavbarButton>
            </NavBody>

            {/* Mobile Navbar */}
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={mobileOpen}
                  onClick={() => setMobileOpen(!mobileOpen)}
                />
              </MobileNavHeader>
              <MobileNavMenu
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
              >
                <NavItems
                  items={navItems}
                  onItemClick={() => setMobileOpen(false)}
                />
                <NavbarButton href="#">Book Now</NavbarButton>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>

        <h1>FirstTrip-MY: Trip Cost Estimator</h1>
        <TripForm setResult={setResult} />

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h2>Estimated Trip Cost</h2>
            <p>From: {result.origin}</p>
            <p>To: {result.destination}</p>
            <p>Transport: {result.transport_mode}</p>
            <p>Estimated Cost: RM {result.estimated_cost}</p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
