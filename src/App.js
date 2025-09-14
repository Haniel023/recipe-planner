import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MealPlan from "./pages/MealPlan";
import RecipeDetails from "./pages/RecipleDetails";
import { MealPlanProvider } from "./context/MealPlanContext";


function App() {
  return (
    <MealPlanProvider>
      <Router>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/favorites" element={<h1>Favorites Page</h1>} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </Router>

    </MealPlanProvider>
  );
}

export default App;