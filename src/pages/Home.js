import react, { useState } from "react";
import { Input, Button, Row, Col, Card } from "antd";
import { API_URL, API_KEY } from "../config";

const { Search } = Input;

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecipes = async (query) => {
        if (!query) return;
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}?query=${query}&number=9&apiKey=${API_KEY}`);
            const data = await response.json();
            setRecipes(data.results || []);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Recipe Finder</h1>
            <Search
                placeholder="Search for a recipe.."
                enterButton="Search"
                size="large"
                onSearch={fetchRecipes}
                style={{ maxWidth: 400, marginBottom: 20 }}
            />

            <Row gutter={[16, 16]}>
                {recipes.map((recipe) => (
                    <Col key={recipe.id} xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            cover={<img alt={recipe.title} src={recipe.image} />}
                        >
                            <Card.Meta title={recipe.title} />
                        </Card>
                    </Col>
                ))}
            </Row>

            {loading && <p>Loading...</p>}
        </div>
    );
}

export default Home;