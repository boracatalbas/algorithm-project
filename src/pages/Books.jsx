import React, { useState } from "react";
import bookDatas from "../bookDatas.json";
import userDatas from "../users.json";
import bookImg from "../assets/book.png";
import logo from "../assets/logo.png";
import "./Books.scss";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Books({ rentedBooks, setRentedBooks }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState("Select User");

  const handleRent = (book) => {
    setRentedBooks([
      ...rentedBooks,
      { ...book, rental_start_date: startDate, rental_end_date: endDate },
    ]);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleUserSelect = (user) => {
    setCurrentUser(user.name);
    setShowUserDropdown(false);
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="" />
        <div className="header-buttons">
          <Link to="/">
            <button>Books</button>
          </Link>
          <Link to="/rented-books">
            <button>Rented Books</button>
          </Link>
          <button onClick={toggleUserDropdown}>{currentUser}</button>
          {showUserDropdown && (
            <div className="user-dropdown">
              {userDatas.users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="user-dropdown-item"
                >
                  {user.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
      <h3>AVAILABLE BOOKS</h3>
      <div className="content">
        {bookDatas.books.map((book, index) => (
          <div key={index} className="books">
            <img src={bookImg} alt="" />
            <div className="text-wrapper">
              <div style={{ display: "flex" }}>
                <h1>{book.title}</h1>
                <p style={{ marginLeft: "0.5vw" }}>{book.year}</p>
              </div>
              <p>Author: {book.author}</p>
              <p>Pages: {book.page_count}</p>
              <p>Topic: {book.topic}</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <button className="button" onClick={() => handleRent(book)}>
              Rent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
