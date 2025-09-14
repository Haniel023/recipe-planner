import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../config";
import { Card, List, Typography, Button, Select } from "antd";
import parse from "html-react-parser";
import { MealPlanContext } from "../context/MealPlanContext";

const { Title, Paragraph } = Typography;
const { Option } = Select;

function RecipeDetails(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const { addRecipeToDay } = useContext(MealPlanContext);
    const [selectedDay, setSelectedDay] = useState("Monday");

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
                const data = await res.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleAdd = () => {
        addRecipeToDay(selectedDay, {id: recipe.id, title: recipe.title, image:recipe.image});
    }

    if (!recipe) return <p>Loading...</p>

    return (
        <div>
            <Title>{recipe.title}</Title>
            <img
                src={recipe.image}
                alt={recipe.title}
                style={{ maxWidth: "100%", marginBottom: "20px" }}
            />

            <div style={{ margin: "20px 0"}}>
                <Select defaultValue="Monday" style={{ width: 150, marginRight: 10}} onChange={setSelectedDay}>
                    {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
                        <Option key={day} value={day}>{day}</Option>
                    ))}
                </Select>
                <Button type="primary" onClick={handleAdd}>Add to Meal Plan</Button>
            </div>

            <Paragraph>
                <strong>Servings:</strong> {recipe.servings} |{" "}
                <strong>Ready in:</strong> {recipe.readyInMinutes} mins
            </Paragraph>

            <Title level={3}>Ingredients</Title>
            <List
                bordered
                dataSource={recipe.extendedIngredients}
                renderItem={(item) => <List.Item>{item.original}</List.Item>}
                style={{ marginBottom: "20px" }}
            />

            <Title level={3}>Instructions</Title>
            <Paragraph>
                {recipe.instructions
                    ? parse(recipe.instructions)
                    : "No instructions available."}
            </Paragraph>
        </div>
    );
}

export default RecipeDetails;