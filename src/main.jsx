import React from "react";  
import ReactDOM from "react-dom/client";  
import App from "./App.jsx";  
import "./index.css";  
  
ReactDOM.createRoot(document.getElementById("root")).render(  
  <React.StrictMode>  
    <div className="relative h-full antialiased">  
      <main className="flex flex-col min-h-screen bg-gray-200">  
        <div className="flex-grow flex-1">  
          <App />  
        </div>  
      </main>  
    </div>  
  </React.StrictMode>  
);
