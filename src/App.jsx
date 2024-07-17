import { Navigate, Route, Routes } from "react-router-dom";

import Template from "./pages/Template";
import ErrorPage from "./pages/Error";
import Navigation from "./components/navigation/Navigation";

import "./App.css";
import CreateGroup from "./pages/Group/CreateGroup";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 mb-20">
        <Navigation />
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate replace to="/templates" />}
          />
          <Route path="/templates" element={<Template />}>
            <Route path="groups/new" element={<CreateGroup />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
