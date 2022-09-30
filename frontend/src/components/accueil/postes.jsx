import React from "react";
import ReactDOM from "react-dom/client";
import troispoints from "../../Images/troispoints.png";
import coeur from "../../Images/coeur.png";
import down from "../../Images/dislike.png";

// import { ReactDOM } from "react";
var moment = require("moment"); // require

function datePost(arraydata, i) {
  // console.log(arraydata[i].nom);
  // console.log(i);
  let datepost = new Date(arraydata[i].datePost);
  let dateNow = Date.now();
  let dateDuPost = dateNow - datepost;
  // console.log(dateDuPost);

  var diff = new moment.duration(dateDuPost);

  var postday = Math.trunc(diff.asDays()); //# of minutes in the duration

  var postdayinHour = postday * 24;
  var postHour = Math.trunc(diff.asHours() - postdayinHour); //# of days in the duration

  var postHour2 = Math.trunc(diff.asHours()); //# of days in the duration
  var postHourinMinute2 = postHour2 * 60;
  var postMinute = Math.trunc(diff.asMinutes() - postHourinMinute2); //# of hours in the duration

  switch (postday) {
    case 0:
      if (postHour === 0) {
        var tempsPost = <h1 key="uniqueId1">Il y a {postMinute} minutes </h1>;
      } else {
        if (postMinute === 0) {
          tempsPost = <h1 key="uniqueId2"> Il y a {postHour} h</h1>;
        } else {
          tempsPost = (
            <h1 key="uniqueId2">
              Il y a {postHour} h {postMinute} minutes
            </h1>
          );
        }
      }
      break;

    default:
      tempsPost = (
        <h1>
          Il y a {postday} jours et {postHour}h{postMinute}
        </h1>
      );
      // console.log(tempsPost.childen);

      break;
  }

  const root = ReactDOM.createRoot(document.getElementById("div" + i));
  root.render(tempsPost.props.children);
}

var arraydata = 0;
var i = 0;

if (sessionStorage.getItem("user") != null) {
  let UserName = sessionStorage.getItem("user");
  var arrayUser = UserName.split(",");
  console.log(arrayUser);

  var requestOptions = {
    method: "GET",
    // Variable récupérer dans le LocalStorage
    headers: { Authorization: arrayUser[3] },
  };
} else {
  window.location = "./login#connexion";
  var requestOptions = null;
}

const GetPost = (props) => {
  fetch("http://localhost:3001/api/poste/getpost", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      arraydata = Object.values(data.reverse());
      console.log(data);
      return arraydata;
    })
    .then((arraydata) => {
      //console.log(arraydata.length);

      for (var i = 0; i < arraydata.length; i++) {
        localStorage.clear();
        let div = document.createElement("div");
        div.className = "containerPost";
        div.id = "containerPost" + i;
        document.getElementById("bigContainer").appendChild(div);

        let containerTop = document.createElement("div");
        containerTop.className = "containerTop";
        containerTop.id = "containerTop" + i;
        document.getElementById("containerPost" + i).appendChild(containerTop);

        if (arrayUser[4] == "true") {
          let imagetroispoints = document.createElement("img");
          imagetroispoints.src = troispoints;
          imagetroispoints.id = "imagetroispoints" + i;
          imagetroispoints.alt = "imagetroispoints";
          imagetroispoints.style.width = "30px";
          imagetroispoints.style.height = "30px";
          document
            .getElementById("containerPost" + i)
            .appendChild(imagetroispoints);

          var btcimagetroispoints = document.getElementById(
            "imagetroispoints" + i
          );
          btcimagetroispoints.addEventListener("click", updateBtn);
        } else if (arraydata[i].userId == arrayUser[2]) {
          let imagetroispoints = document.createElement("img");
          imagetroispoints.src = troispoints;
          imagetroispoints.id = "imagetroispoints" + i;
          imagetroispoints.alt = "imagetroispoints";
          imagetroispoints.style.width = "30px";
          imagetroispoints.style.height = "30px";
          document
            .getElementById("containerPost" + i)
            .appendChild(imagetroispoints);

          var btcimagetroispoints = document.getElementById(
            "imagetroispoints" + i
          );
          btcimagetroispoints.addEventListener("click", updateBtn);
        }

        /////////////////////////////////////////////////

        function updateBtn() {
          if (div2.style.display == "none") {
            div2.style.display = "block";
          } else {
            div2.style.display = "none";
          }
        }

        let div2 = document.createElement("div");
        div2.className = "containerPost";
        div2.id = "div2" + i;
        div2.style.display = "none";
        document.getElementById("containerPost" + i).appendChild(div2);

        let link_modifier = document.createElement("a");
        link_modifier.setAttribute(
          "href",
          "/modifier_post/?id_postupdate=" + arraydata[i]._id
        );
        link_modifier.id = "modifier" + i;
        document.getElementById("div2" + i).appendChild(link_modifier);

        let modifier = document.createElement("p");
        modifier.innerHTML = "Modifier";
        modifier.className = "user";
        document.getElementById("modifier" + i).appendChild(modifier);

        let link_suprimer = document.createElement("a");
        link_suprimer.setAttribute(
          "href",
          "/delete_post/?id=" + arraydata[i]._id
        );
        link_suprimer.id = "suprimer" + i;
        document.getElementById("div2" + i).appendChild(link_suprimer);

        let suprimer = document.createElement("p");
        suprimer.innerHTML = "Supprimer";
        suprimer.className = "user";
        document.getElementById("suprimer" + i).appendChild(suprimer);

        ////////////////////////////////////////////////////////////////////
        let user = document.createElement("p");
        user.innerHTML = arraydata[i].nom + " " + arraydata[i].prenom;
        user.id = "pUser" + i;
        user.className = "user";

        document.getElementById("containerTop" + i).appendChild(user);

        let div3 = document.createElement("div");
        div3.id = "div" + i;
        document.getElementById("containerTop" + i).appendChild(div3);

        let div_bottom = document.createElement("div");
        div_bottom.id = "div_bottom" + i;
        div_bottom.style.width = "680px";
        div_bottom.style.height = "auto";
        div_bottom.style.position = "relative";
        div_bottom.style.maxWidth = "100%";
        div_bottom.style.margin = "auto";

        document.getElementById("containerPost" + i).appendChild(div_bottom);

        let p = document.createElement("p");
        p.innerHTML = arraydata[i].inputTextPost;
        p.id = "p" + i;
        p.className = "post";
        document.getElementById("div_bottom" + i).appendChild(p);

        let imagePost = document.createElement("img");
        imagePost.src =
          "http://localhost/projet7/backend/images/" + arraydata[i].image;
        imagePost.id = "img" + i;
        // imagePost.style.width = "300px";
        imagePost.style.maxWidth = "100%";
        imagePost.style.height = "auto";
        imagePost.style.maxHeight = "100%";
        imagePost.style.objectFit = "cover";
        // imagePost.style.boxShadow = "8px 8px 10px 0 rgba(0,0,0,0.5)";
        imagePost.style.borderRadius = "0 0 21px 21px";

        imagePost.alt = "imagePost";
        document.getElementById("div_bottom" + i).appendChild(imagePost);
        datePost(arraydata, i);

        let like_dislike = document.createElement("div");
        like_dislike.id = "like_dislike" + i;
        document.getElementById("containerPost" + i).appendChild(like_dislike);

        let like = document.createElement("img");
        like.src = coeur;
        like.alt = "like";
        like.id = "like" + i;
        document.getElementById("like_dislike" + i).appendChild(like);

        let plike = document.createElement("p");
        plike.id = "plike" + i;
        plike.innerText = arraydata[i].like;
        document.getElementById("like_dislike" + i).appendChild(plike);

        plike.addEventListener("click", likeFunction);

        function likeFunction(arraydata) {
          var dataUpdate;
          if (arraydata[i].like == 0) {
            let UserName = sessionStorage.getItem("user");
            var arrayUser = UserName.split(",");
            console.log(arrayUser);
            const like = arraydata[i].like + 1;
            dataUpdate = {
              like: like,
              usersLiked: arrayUser[3],
            };
          } else {
            const like = arraydata[i].like - 1;
            dataUpdate = {
              like: like,
              usersLiked: arrayUser[3],
            };
          }

          console.log(dataUpdate);

          var requestOptions = {
            method: "PUT",
            body: JSON.stringify(dataUpdate),
            headers: {
              "Content-Type": "application/json",
            },
          };

          try {
            fetch(
              `http://localhost:3001/api/poste/modifier_post/${arraydata[i]._id}`,
              requestOptions
            ).then((response) => {
              return response.json();
            });
          } catch (error) {
            console.log("Error:", error);
          }
        }

        let dislike = document.createElement("img");
        dislike.src = down;
        dislike.alt = "dislike";
        dislike.id = "dislike" + i;
        document.getElementById("like_dislike" + i).appendChild(dislike);

        let pDisLike = document.createElement("p");
        pDisLike.id = "plike" + i;
        pDisLike.innerText = arraydata[i].dislike;
        document.getElementById("like_dislike" + i).appendChild(pDisLike);
      }

      // console.log(y);
      window.setInterval(() => {
        interval(arraydata, i);
      }, 60000);
    });

  function interval() {
    for (var y = 0; y < arraydata.length; y++) {
      // console.log(arraydata, y);
      datePost(arraydata, y);
    }
  }
};

export default GetPost;
