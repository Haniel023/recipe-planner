import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../config";
import { Card, List, Typography } from "antd";
import parse from "html-react-parser";

const { Title, Paragraph } = Typography;

function RecipeDetails(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

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

    if (!recipe) return <p>Loading...</p>

    return (
        <div>
            <Title>{recipe.title}</Title>
            <img
                src={recipe.image}
                alt={recipe.title}
                style={{ maxWidth: "100%", marginBottom: "20px" }}
            />

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