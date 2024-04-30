import React from "react";
import "./RentedBooks.scss";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import userDatas from "../users.json";

const RentedBooks = ({ rentedBooks }) => {
  if (!rentedBooks.length) {
    return <div>No books rented yet.</div>;
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
        {userDatas.users.map((user) => {
          const userBooks = rentedBooks.filter(
            (book) => book.userId === user.id
          );
          return (
            <div key={user.id}>
              <h2>{user.name}</h2>
              {userBooks.map((book, index) => (
                <div key={index} className="books">
                  <h1>
                    {book.title} ({book.year})
                  </h1>
                  <p>Author: {book.author}</p>
                  <p>Pages: {book.page_count}</p>
                  <p>Topic: {book.topic}</p>
                  <p>
                    Rental Start Date:{" "}
                    {new Date(book.rental_start_date).toLocaleDateString()}
                  </p>
                  <p>
                    Rental End Date:{" "}
                    {new Date(book.rental_end_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentedBooks;
