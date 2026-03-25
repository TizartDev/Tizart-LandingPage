// src/App.tsx
import { useEffect } from "react";
import "./Components/Theme.css";
import { ThemeProvider } from "./Components/ThemeContext";
import { LangProvider } from "./Components/Languagecontext";

import NavBar   from "./Components/NavBar";
import Hero     from "./Components/Hero";
import About    from "./Components/About";
import Services from "./Components/Services";
import Projects from "./Components/Projects";
import Contact  from "./Components/Contact";
import Footer   from "./Components/Footer";

function App() {
  useEffect(() => {
    // Detect the current path
    const path = window.location.pathname;
    if (path.includes(".")) return;
    if (path === "/scan") {
      // Redirect to your Facebook page
      window.location.href = "https://www.facebook.com/TizartAgency/";
    }

    // Add more special routes here if needed
    // else if (path === "/promo") { ... }
  }, []);

  return (
    <ThemeProvider>
      <LangProvider>
        <NavBar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </LangProvider>
    </ThemeProvider>
  );
}

export default App;