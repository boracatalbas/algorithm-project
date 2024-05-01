import React, { useState, useEffect } from "react";
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
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "Select User",
  });

  const [bookStatus, setBookStatus] = useState({});

  useEffect(() => {
    const status = {};
    bookDatas.books.forEach((book) => {
      status[book.title] = !!rentedBooks.find((rb) => rb.title === book.title);
    });
    setBookStatus(status);
  }, [rentedBooks]);

  const handleRent = (book) => {
    if (currentUser.name === "Select User") {
      alert("Please select a user before renting a book");
      return;
    }

    const today = new Date();
    if (startDate <= today) {
      alert("Please select a start date that is not in the past");
      return;
    }

    if (endDate < startDate) {
      alert("End date should be after start date.");
      return;
    }
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 31) {
      alert("You can rent a book for a maximum of 30 days");
      return;
    }

    if (bookStatus[book.title]) {
      alert("This book is already rented.");
      return;
    }

    const newRental = {
      ...book,
      rental_start_date: startDate.toISOString().substring(0, 10),
      rental_end_date: endDate.toISOString().substring(0, 10),
      userId: currentUser.id,
      isRented: true,
    };
    setRentedBooks([...rentedBooks, newRental]);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleUserSelect = (user) => {
    setCurrentUser(user);
    setShowUserDropdown(false);
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" />
        <div className="header-buttons">
          <Link to="/">
            <button>Books</button>
          </Link>
          <Link to="/rented-books">
            <button>Rented Books</button>
          </Link>
          <button onClick={toggleUserDropdown}>{currentUser.name}</button>
          {showUserDropdown && (
            <div className="user-dropdown">
              {userDatas.users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="item"
                >
                  {user.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {!currentUser.id ? (
        <p className="select-user-message">
          Please select a user to proceed with renting books
        </p>
      ) : (
        <div>
          {" "}
          <h3>AVAILABLE BOOKS</h3>
          <span>
            You can rent a book for a minimum 1 day and maximum of 30 days
          </span>
        </div>
      )}
      <div className={`content ${currentUser.id ? "" : "blurred"}`}>
        {bookDatas.books.map((book, index) => (
          <div key={index} className="books">
            <img src={book.imgDir} alt="book cover" />
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
            <button
              className="button"
              onClick={() => handleRent(book)}
              disabled={bookStatus[book.title]}
            >
              {bookStatus[book.title] ? "Rented" : "Rent"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
