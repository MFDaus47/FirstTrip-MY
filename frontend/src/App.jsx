import "./App.css";
import TripForm from "@/components/TripForm";
// import { MapContainer } from "react-leaflet/MapContainer";
import MapContainer from "@/components/MapContainer";
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
  const [mapData, setMapData] = useState({
    origin: null,
    destination: null,
    route: null,
  });

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
      <div className="bg-background min-h-screen">
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

        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            FirstTrip-MY: Trip Cost Estimator
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[calc(100vh-200px)] ">
            <div className="bg-card rounded-lg border p-6">
              <div className="pb-4">
                <h2 className="text-xl font-semibold">Trip Details</h2>
              </div>
              <TripForm setResult={setResult} setMapData={setMapData} />
            </div>
            <div className="h-full">
              <div className="bg-card rounded-lg border overflow-hidden">
                <MapContainer mapData={mapData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Estimated Trip Cost</h3>
          <div className="space-y-2">
            <p>From: {result.origin}</p>
            <p>To: {result.destination}</p>
            <p>Transport: {result.transport_mode}</p>
            <p>Estimated Cost: RM {result.estimated_cost}</p>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
