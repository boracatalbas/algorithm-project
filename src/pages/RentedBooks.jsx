import React from "react";
import "./RentedBooks.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const RentedBooks = ({ rentedBooks }) => {
  if (!rentedBooks) {
    console.log("No rented books received. Check prop passing.");
    return <div>Loading...</div>;
  }

  return (
    <div className="rented">
      <header className="header">
        <img src={logo} alt="" />
        <div className="header-buttons">
          <Link to="/">
            <button>Books</button>
          </Link>
          <Link to="/rented-books">
            <button>Rented Books</button>
          </Link>
        </div>
      </header>
      <div className="content">
        {rentedBooks.map((book, index) => (
          <div key={index} className="books">
            <h1>
              {book.title} ({book.year})
            </h1>
            <p>Author: {book.author}</p>
            <p>Pages: {book.page_count}</p>
            <p>Topic: {book.topic}</p>
            <p>
              Rental Period: {book.rental_start_date.toLocaleDateString()} to{" "}
              {book.rental_end_date.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentedBooks;
