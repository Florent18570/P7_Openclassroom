// ID retrieval with URL
var urlcourante = document.location.href;
var urlData = new URL(urlcourante);
let params = new URLSearchParams(window.location.search);

if (urlData.searchParams.has("id") || urlData.searchParams.has("delete_post")) {
  var id = urlData.searchParams.get("id");
  console.log("id: " + id);
  deletePostId(id);
  console.log("id: " + id);
}

function deletePostId(id) {
  fetch(`http://localhost:3001/api/poste/deletepost${id}`, {
    method: "DELETE",
    body: null,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location = "/accueil";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
