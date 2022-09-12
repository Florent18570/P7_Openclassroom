// ID retrieval with URL
var urlcourante = document.location.href;
var urlData = new URL("http://localhost:3001/api/poste/deletepost/" + { id });
let params = new URLSearchParams(window.location.search);

if (urlData.searchParams.has("id")) {
  var id = urlData.searchParams.get("id");

  deletePostId(id);
}

function deletePostId(id) {
  fetch(`http://localhost:3001/api/poste/deletepost/${id}`, {
    method: "DELETE",
    body: null,
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then(() => alert("la ressource est bien supprimer"));
}
