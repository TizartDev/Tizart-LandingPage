// src/App.tsx
import "./Components/theme.css";
import { ThemeProvider } from "./Components/Themecontext";
import { LangProvider } from "./Components/Languagecontext";

import NavBar   from "./Components/NavBar";
import Hero     from "./Components/Hero";
import About    from "./Components/About";
import Services from "./Components/Services";
import Projects from "./Components/Projects";
import Contact  from "./Components/Contact";
import Footer   from "./Components/Footer";

function App() {
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