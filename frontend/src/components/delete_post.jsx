// ID retrieval with URL
var urlcourante = document.location.href;
var urlData = new URL(urlcourante);
let params = new URLSearchParams(window.location.search);

if (urlData.searchParams.has("id")) {
  var id = urlData.searchParams.get("id");
  console.log("id: " + id);
  deletePostId(id);
  console.log("id: " + id);
}

function deletePostId(id) {
  fetch(`http://localhost:3001/api/poste/deletepost/${id}`, {
    method: "DELETE",
    body: null,
  })
    .then((response) => response.json())
    .then(
      (response) =>
        response.status(201).json({ message: "suppression réussie" }),
      (window.location = "/accueil")
    );
}
