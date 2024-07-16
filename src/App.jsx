import { Navigate, Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation";
import Template from "./pages/Template";
import AutoReply from "./pages/AutoReply";

import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-4">
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate replace to="/templates" />}
          />
          <Route path="/templates" element={<Template />} />
          <Route path="/auto-replies" element={<AutoReply />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
