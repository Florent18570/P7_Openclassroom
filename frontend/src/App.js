import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/accueil";
import Login from "./components/authentification/login";
import Register from "./components/authentification/register";
import Navbar from "./components/Nav/nav";
import NewPost from "./components/newPost";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/new_Post" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
