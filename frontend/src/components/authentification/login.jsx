import React from "react";
import "../../styles/main.css";
import { Link } from "react-router-dom";

class register extends React.Component {
  constructor(props) {
    super(props);
    if (!window.location.hash) {
      window.location = window.location + "#connexion";
      window.location.reload();
    }
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(this.state);
  };

  send = async () => {
    const { email, password } = this.state;
    const data = {
      email: email,
      password: password,
    };
    // console.log(data);
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }

    try {
      fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.success);
          if (data.success) {
            console.log("Sucess:", data);
            let arrayUser = [
              data.prenom,
              data.nom,
              data.userId,
              data.token,
              data.Adminisatrateur,
            ];
            console.log(data.Adminisatrateur);
            sessionStorage.setItem("user", arrayUser);
            window.location = "/accueil";
            // Envoie du token
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <section>
          <div className="enregistrer">
            <h1> Bienvenue ! </h1>
            <p>Tu es nouveau ? S’inscrire, c’est rapide et facile.</p>
            <Link to="/register">
              <button type="button" className="inscription">
                S'inscrire
              </button>
            </Link>
          </div>

          <form action="accueil.php" id="formlogin">
            <div className="login">
              <h1>Connexion à votre compte</h1>
              <input
                type="text"
                name="email"
                className="input_top"
                placeholder="email"
                onChange={this.handleChange}
              />
              <input
                type="text"
                onChange={this.handleChange}
                name="password"
                placeholder="password"
              />

              <button onClick={this.send} type="button" className="btcvalider">
                Valider
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default register;
