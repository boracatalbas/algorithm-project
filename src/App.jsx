import React, { useState } from "react";
import Books from "./pages/Books";
import RentedBooks from "./pages/RentedBooks";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Books rentedBooks={rentedBooks} setRentedBooks={setRentedBooks} />
        }
      />
      <Route
        path="/rented-books"
        element={<RentedBooks rentedBooks={rentedBooks} />}
      />
    </Routes>
  );
};

export default App;
