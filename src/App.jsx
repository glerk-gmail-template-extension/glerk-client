import { Navigate, Route, Routes } from "react-router-dom";

import Template from "./pages/Template";
import ErrorPage from "./pages/Error";
import Navigation from "./components/navigation/Navigation";
import CreateGroup from "./pages/Group/CreateGroup";
import UpdateGroup from "./pages/Group/UpdateGroup";
import DeleteGroup from "./pages/Group/DeleteGroup";

import "./App.css";

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
            <Route path="groups/edit" element={<UpdateGroup />} />
            <Route path="groups/delete" element={<DeleteGroup />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
