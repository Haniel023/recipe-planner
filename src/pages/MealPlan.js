import React, {useContext} from "react";
import { MealPlanContext } from "../context/MealPlanContext";
import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

function MealPlan() {
    const {mealPlan} = useContext(MealPlanContext);

    return (
        <div>
            <Title>Weekly Meal Plan</Title>
            <Row gutter={[16, 16]}>
                {Object.keys(mealPlan).map(day =>(
                    <Col xs={24} md={12} lg={8} key={day}>
                        <Card title={day} variant="outlined">
                            {mealPlan[day].length === 0 ? (
                                <p>No recipes yet</p>
                            ) : (
                                mealPlan[day].map((recipe, i) => (
                                    <div key={i} style={{ marginBottom: "10px"}}>
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            style={{ width: "100%", borderRadius: "5px"}}
                                        />
                                        <p>{recipe.title}</p>
                                    </div>
                                ))
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default MealPlan;