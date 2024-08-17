import { Outlet } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";

import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 h-auto min-h-full p-10 mb-20">
        <div className="mx-auto min-w-168 max-w-240">
          <Navigation />
          <section className="mt-12">
            <Outlet />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
