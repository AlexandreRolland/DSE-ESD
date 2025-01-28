import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import VoteResults from "./VoteResults"; // Import de la nouvelle page
import "./lib/css/index.css";
import "./lib/css/results.css";
import "./assets/index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/results" element={<VoteResults />} /> {/* Nouvelle page */}
            </Routes>
        </Router>
    </React.StrictMode>
);
