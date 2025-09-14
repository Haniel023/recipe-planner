import React, { createContext, useState, useEffect, Children } from "react";

export const MealPlanContext = createContext();

export const MealPlanProvider = ({children}) => {
    const [mealPlan, setMealPlan] = useState(() => {
        const saved = localStorage.getItem("mealPlan");
        return saved ? JSON.parse(saved) : {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
        };
    });

    useEffect(() => {
        localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    }, [mealPlan]);

    const addRecipeToDay = (day, recipe) => {
        setMealPlan(prev => ({
            ...prev,
            [day]: [...prev[day], recipe]
        }));
    };

    return (
        <MealPlanContext.Provider value={{ mealPlan, addRecipeToDay}}>
            {children}
        </MealPlanContext.Provider>
    );
};