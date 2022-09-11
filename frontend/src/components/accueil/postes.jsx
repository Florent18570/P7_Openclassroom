import React from "react";
import ReactDOM from "react-dom/client";

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
      // console.log(arraydata);
      return arraydata;
    })
    .then((arraydata) => {
      for (i = 0; i < arraydata.length; i++) {
        let div = document.createElement("div");
        div.className = "containerPost";
        div.id = "containerPost" + i;
        document.getElementById("bigContainer").appendChild(div);

        let containerTop = document.createElement("div");
        containerTop.className = "containerTop";
        containerTop.id = "containerTop" + i;
        document.getElementById("containerPost" + i).appendChild(containerTop);

        let user = document.createElement("p");
        user.innerHTML = arraydata[i].nom + " " + arraydata[i].prénom;
        user.id = "p" + i;
        user.className = "user";

        document.getElementById("containerTop" + i).appendChild(user);

        let div2 = document.createElement("div");
        div2.id = "div" + i;
        document.getElementById("containerTop" + i).appendChild(div2);

        let p = document.createElement("p");
        p.innerHTML = arraydata[i].inputTextPost;
        p.id = "p" + i;
        p.className = "post";
        document.getElementById("containerPost" + i).appendChild(p);

        let imagePost = document.createElement("img");
        imagePost.src = arraydata[i].inputTextPost;
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
