import React from "react";
import "../../styles/main.css";
import { Link } from "react-router-dom";

class register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prénom: "",
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.value);
    // console.log(event.target.type);
    // console.log(this.state);
  };

  send = async () => {
    const { nom, prénom, email, password } = this.state;

    const data = {
      nom: nom,
      prénom: prénom,
      email: email,
      password: password,
    };
    console.log(data);
    fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <div>
        <section>
          <div className="enregistrer">
            <h1> Bienvenue ! </h1>
            <p>Tu es nouveau ? S’inscrire, c’est rapide et facile.</p>
            <Link to="/login">
              <button type="button" className="inscription">
                Connexion
              </button>
            </Link>
          </div>

          <form action="accueil.php" id="formlogin">
            <div className="login">
              <h1>Inscription</h1>
              <input
                name="nom"
                placeholder="Nom"
                onChange={this.handleChange}
                value={this.Nom}
              />
              <input
                name="prénom"
                placeholder="prénom"
                onChange={this.handleChange}
                value={this.Prénom}
              />
              <input
                name="email"
                className="email"
                value={this.email}
                placeholder="email"
                onChange={this.handleChange}
              />
              <input
                name="password"
                type="password"
                className="password"
                value={this.password}
                placeholder="password"
                onChange={this.handleChange}
              />

              <Link to="/login">
                <button
                  type="button"
                  className="btcvalider"
                  onClick={this.send}
                >
                  Valider
                </button>
              </Link>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default register;
