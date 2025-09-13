import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

function Navbar(){
    return (
        <Menu mode="horizontal" theme="dark">
            <Menu.Item key="home">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="meal-plan">
                <Link to="/meal-plan">Meal Plan</Link>
            </Menu.Item>
            <Menu.Item key="favorites">
                <Link to="/favorites">Favorites</Link>
            </Menu.Item>
        </Menu>
    );
}

export default Navbar;