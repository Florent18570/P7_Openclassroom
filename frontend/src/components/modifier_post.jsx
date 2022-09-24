import React from "react";
import Bienvenue from "./accueil/bienvenue";
import GetPost from "./accueil/postes";
import { Link } from "react-router-dom";
import appareilPhoto from "../Images/dislike.png";
import fermer from "../../src/Images/fermer.png";

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    let UserName = sessionStorage.getItem("user");

    this.state = {
      userId: UserName.userId,
      inputText: "",
      imageURL: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      inputText: document.querySelector(".inputText").value,
    });
  };

  send = async () => {
    // ID retrieval with URL
    var urlcourante = document.location.href;
    var urlData = new URL(urlcourante);
    let params = new URLSearchParams(window.location.search);

    if (urlData.searchParams.has("id_postupdate")) {
      var id_postupdate = urlData.searchParams.get("id_postupdate");
      console.log(id_postupdate);
      console.log(id_postupdate);
    }

    let UserName = sessionStorage.getItem("user");
    let arrayUser = UserName.split(",");

    const date = new Date();
    const { userId, inputText, imageURL } = this.state;

    var formdata = new FormData();
    formdata.append("image", document.getElementById("file").files[0]);
    formdata.append("userId", arrayUser[2]);
    formdata.append("nom", arrayUser[0]);
    formdata.append("prenom", arrayUser[1]);
    formdata.append("inputTextPost", inputText);
    formdata.append("datePost", date);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    console.log(formdata);
    try {
      fetch(
        `http://localhost:3001/api/poste/modifier_post/${id_postupdate}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location = "/accueil";
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
                onBlur={this.handleChange}
                className="inputText"
                type="text"
                value={this.state.content}
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

export default UpdatePost;
