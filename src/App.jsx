import { Navigate, Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Template from "./pages/Template";
import TemplateList from "./pages/TemplateList";
import CreateGroup from "./pages/Group/CreateGroup";
import UpdateGroup from "./pages/Group/UpdateGroup";
import DeleteGroup from "./pages/Group/DeleteGroup";
import ErrorPage from "./pages/Error";

import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-10 mb-20">
        <div className="mx-auto min-w-168 max-w-240">
          <Navigation />
          <section className="mt-12">
            <Routes>
              <Route
                path="/"
                exact
                element={<Navigate replace to="/templates" />}
              />
              <Route path="/templates" element={<TemplateList />}>
                <Route path="groups/new" element={<CreateGroup />} />
                <Route path="groups/edit" element={<UpdateGroup />} />
                <Route path="groups/delete" element={<DeleteGroup />} />
              </Route>
              <Route path="/templates/new" element={<Template />} />
              <Route path="/templates/edit/:id" element={<Template />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
