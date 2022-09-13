import React from "react";
import ReactDOM from "react-dom/client";
import troispoints from "../../Images/troispoints.png";

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

        // console.log(tempsPost.props.children);
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

const GetPost = (props) => {
  fetch("http://localhost:3001/api/poste/getpost")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      arraydata = Object.values(data.reverse());
      console.log(data);
      return arraydata;
    })
    .then((arraydata) => {
      console.log(arraydata.length);

      for (i = 0; i < arraydata.length; i++) {
        let div = document.createElement("div");
        div.className = "containerPost";
        div.id = "containerPost" + i;
        document.getElementById("bigContainer").appendChild(div);

        let containerTop = document.createElement("div");
        containerTop.className = "containerTop";
        containerTop.id = "containerTop" + i;
        document.getElementById("containerPost" + i).appendChild(containerTop);

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
          "/modifier_post?id=" + arraydata[i]._id
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
          "/delete_post?id=" + arraydata[i]._id
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
        user.id = "p" + i;
        user.className = "user";

        document.getElementById("containerTop" + i).appendChild(user);

        let div3 = document.createElement("div");
        div3.id = "div" + i;
        document.getElementById("containerTop" + i).appendChild(div3);

        let p = document.createElement("p");
        p.innerHTML = arraydata[i].inputTextPost;
        p.id = "p" + i;
        p.className = "post";
        document.getElementById("containerPost" + i).appendChild(p);

        let imagePost = document.createElement("img");
        imagePost.src =
          "http://localhost/projet7/backend/images/" + arraydata[i].image;
        imagePost.id = "img" + i;
        imagePost.alt = "imagePost";
        document.getElementById("containerPost" + i).appendChild(imagePost);

        datePost(arraydata, i);
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
