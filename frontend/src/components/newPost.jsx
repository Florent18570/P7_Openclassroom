import React from "react";
import Bienvenue from "./accueil/bienvenue";
import GetPost from "./accueil/postes";
import { Link } from "react-router-dom";
import appareilPhoto from "../Images/dislike.png";
import fermer from "../../src/Images/fermer.png";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    let data = sessionStorage.getItem("userId");
    console.log(data);

    let UserName = sessionStorage.getItem("user");

    this.state = {
      userId: UserName.userId,
      inputText: "",
      // imageURL: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleChange = (event) => {
    // this.setState({
    //   inputText: document.querySelector(".inputText").value,
    // });
    // console.log(this.state.inputText);

    const name = event.target.name;
    const value = event.target.value;
  };

  addImage = (event) => {
    this.setState({
      imageURL: document.querySelector(".buttonImage").value,
    });
  };

  send = async () => {
    let UserName = sessionStorage.getItem("user");
    let arrayUser = UserName.split(",");

    const imageURL = document.querySelector(".buttonImage").files[0];

    const date = new Date();
    console.log(typeof date);

    // const { userId, inputText, imageURL } = this.state;
    const formatData = new formatData();
    formatData.append("imageURL", imageURL);
    formatData.append("post", JSON.stringify(this.state));

    // const data = {
    //   userId: userId,
    //   nom: arrayUser[0],
    //   prénom: arrayUser[1],
    //   datePost: date,
    //   inputTextPost: inputText,
    //   UrlImage: imageURL,
    // };

    try {
      fetch("http://localhost:3001/api/poste/newpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formatData,
      })
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
                <h2>Nouveau Post</h2>
                <Link to="/accueil">
                  <img src={fermer} alt="fermer nouveau post" />
                </Link>
              </div>

              <p>Qu'avez vous à partager ?</p>
            </div>

            <form action="">
              <input
                onChange={this.handleChange}
                className="inputText"
                type="text"
                value={this.state.content}
              />

              <div className="button_bottom">
                <img href={appareilPhoto}></img>
                <input
                  className="buttonImage"
                  type="file"
                  id="file"
                  name="imageURL"
                />
                <label for="file">Image</label>

                <Link to="/accueil">
                  <button onClick={this.send} className="publier" type="submit">
                    Publier
                  </button>
                </Link>
              </div>
            </form>
          </div>

          <div className="containerPost">
            <GetPost />
          </div>
        </section>
      </>
    );
  }
}

export default NewPost;
