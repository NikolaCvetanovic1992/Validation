import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthForm from "./components/AuthForm";
import UserProfile from "./components/user-profile";
import Layout from "./components/Layout/Layout";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route key="/" path="/" element={<HomePage />} />
          <Route key="/auth" path="/auth" element={<AuthForm />} />
          <Route key="/profile" path="/profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
