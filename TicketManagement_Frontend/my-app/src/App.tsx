import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketsPage from "./pages/TicketsPage";
import UpdatePage from "./pages/UpdatePage";
import CreatePage from "./pages/CreatePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketsPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
