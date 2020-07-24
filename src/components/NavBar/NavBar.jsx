import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {
  let nav = user ? (
    <>
      <nav>
        <div className="nav-wrapper">
          <img
            src="https://www.pinclipart.com/picdir/big/65-653120_pokeball-transparent-background-clipart.png"
            alt="pokeball icon"
            width="50"
            id="logo"
          />
          PokeTeam Builder
          <ul id="nav-mobile" className="right">
            <li>
              <a href="/" className="nav-link">
                Pokedex
              </a>
            </li>
            <li>
              <Link to="/trainer" className="nav-link">
                Trainer Profile
              </Link>
            </li>
            <li>
              <Link to="/teams" className="nav-link">
                Teams
              </Link>
            </li>
            <li>
              <a href="#" className="nav-link">
                Welcome, {user.name}
              </a>
            </li>
            <li>
              <a href=" " className="nav-link" onClick={handleLogout}>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  ) : (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right">
            <li>
              <a href="/login" className="nav-link">
                Log In
              </a>
            </li>
            <li>
              <a href="/signup" className="nav-link">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );

  return <>{nav}</>;
};

export default NavBar;
