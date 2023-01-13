import "./App.css";
import Users from "./content/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="text-2xl mt-[-180px] p-3">User Details</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
