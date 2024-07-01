import React from "react";
import { Routes, Route } from "react-router-dom";

import UserForm from "./Components/Users/UserForm";
import UserDetail from "./Components/Users/UserDetail";
import UserList from "./Components/Users/UserList";
import UserEdit from "./Components/Users/UserEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<UserForm />} />
        <Route path="/userDetails" exact element={<UserDetail />} />
        <Route path="/userList" exact element={<UserList />} />
        <Route path="/userEdit" exact element={<UserEdit />} />
      </Routes>
    </div>
  );
}

export default App;
