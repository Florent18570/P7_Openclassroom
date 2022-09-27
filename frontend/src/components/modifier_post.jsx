import React from "react";
import Bienvenue from "./accueil/bienvenue";
import GetPost from "./accueil/postes";
import { Link } from "react-router-dom";
import appareilPhoto from "../Images/dislike.png";
import fermer from "../../src/Images/fermer.png";
import { useState } from "react";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    let UserName = sessionStorage.getItem("user");
    let arrayUser = UserName.split(",");
    // console.log(arrayUser);
    this.state = {
      inputTextPost: "toto",
      image: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var str = window.location.href;
    var url = new URL(str);
    var idPostValue = url.searchParams.get("id_postupdate");

    const data = {
      idPost: idPostValue,
    };

    console.log(JSON.stringify(data));

    try {
      const datasearch = async () => {
        var requestOptions2 = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          `http://localhost:3001/api/poste/getPostSelected`,
          requestOptions2
        );
        const dataSearch = await response.json();
        var datatext = dataSearch.inputTextPost;
        var image = dataSearch.image;

        this.setState({
          inputTextPost: datatext,
          image: "post.image",
        });
      };

      datasearch();
    } catch (error) {
      // window.location = "/login";
      console.log("Error:", error);
    }
  }

  handleChange = (e) => {
    this.setState({
      inputTextPost: e.target.value,
    });
  };

  send = () => {
    let UserName = sessionStorage.getItem("user");
    let arrayUser = UserName.split(",");

    var str = window.location.href;
    var url = new URL(str);
    var idPostValue = url.searchParams.get("id_postupdate");
    console.log(idPostValue);

    const date = new Date();
    const { inputTextPost, image } = this.state;

    const dataUpdate = {
      userId: arrayUser[2],
      nom: arrayUser[0],
      prenom: arrayUser[1],
      inputTextPost: inputTextPost,
      datePost: date,
      image: "toto",
    };

    // if (sessionStorage.getItem("user") != null) {
    //   var requestOptions = {
    //     method: "POST",
    //     body: JSON.stringify(dataUpdate),
    //     // Variable récupérer dans le LocalStorage
    //     headers: { Authorization: arrayUser[3] },
    //   };
    // } else {
    //   window.location = "./login#connexion";
    //   var requestOptions = null;
    // }

    var requestOptions = {
      method: "PUT",
      body: JSON.stringify(dataUpdate),
      // Variable récupérer dans le LocalStorage
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      fetch(
        `http://localhost:3001/api/poste/modifier_post/${idPostValue}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          window.location = "/accueil";
        })
        .catch((error) => {
          window.location = "/accueil";
          console.log("Error:", error);
        });
    } catch (error) {
      window.location = "/accueil";
      console.log("Error:", error);
      // console.error(error);
    }
  };

  render() {
    return (
      <>
        <section className="bigContainer" id="bigContainer">
          <Bienvenue />
          <div className="newPostContainer">
            <div class="addPostTop">
              <div className="flex">
                <h2>Modification d'un poste</h2>
                <Link to="/accueil">
                  <img src={fermer} alt="fermer nouveau post" />
                </Link>
              </div>

              <p>Modification du text de poste</p>
            </div>

            <form action="">
              <input
                onChange={this.handleChange}
                className="inputText"
                type="text"
                value={this.state.inputTextPost}
              />

              <div className="button_bottom">
                <img href={appareilPhoto}></img>
                <label for="file">Image</label>
                <input
                  className="buttonImage"
                  type="file"
                  id="file"
                  name="imageURL"
                />

                <button onClick={this.send} className="publier" type="submit">
                  Valider
                </button>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default NewPost;
