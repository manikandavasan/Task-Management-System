import { useState, useEffect } from "react";
// import API from "./api"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import GetTask from "./get_tasks";
import AddTask from "./add_task";
import Signin from "./signin";
import Signup from "./signup";
import EditTask from "./edit_task";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="api/tasks/:id" element={<GetTask />} />
        <Route path="" element={<Signup />} />
        <Route path="api/signin/" element={<Signin />} />
        <Route path="api/tasks/create/:id" element={<AddTask />} />
        <Route path="api/tasks/update/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;