import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Task from "./components/task/task";
import Comments from "./components/comments/comments";
import Register from "./components/register/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<Task />} />
        <Route path="/comments/:id/:category" element={<Comments />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
