import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";

function register() {
  return (
    <nav>
      <header>
        <img src={logo} alt="logo Groupomania" />
        <nav>
          <Link to="/login">
            {" "}
            <button href="login.html" class="login">
              Login
            </button>
          </Link>
          <Link to="/register">
            {" "}
            <button href="inscription.html" class="inscription">
              S'inscrire
            </button>
          </Link>
        </nav>
      </header>
    </nav>
  );
}

function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

function login() {
  return (
    <nav>
      <header>
        <img src={logo} alt="logo Groupomania" />
        <nav>
          <Link to="/login">
            <button onClick={clearStorage} class="inscription">
              Se déconnecter
            </button>
          </Link>
        </nav>
      </header>
    </nav>
  );
}

export default function registerOrLogin() {
  let data = sessionStorage.getItem("userId");
  console.log(data);

  if (data) {
    return login();
  } else {
    return register();
  }
}
