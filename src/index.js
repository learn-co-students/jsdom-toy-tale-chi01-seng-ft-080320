//provided code
let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//

//invoked functions
function main() {
  loadToys()
  clickListener()
}
//
main()

//variables
const toyCollection = document.querySelector('#toy-collection')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector("body > div.container > form")
const likeButton = document.querySelector('.like-btn')
const deleteButton = document.querySelector('.delete-btn')

//listeners
toyForm.addEventListener('submit', createToy)

//listener.functions
function clickListener() {
  toyCollection.addEventListener('click', function(event){
    if (event.target.className === 'like-btn') {
      addLike(event)
    }
    else {
      deleteToy(event)
    }
  })
}

//main.functions
function loadToys() {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {
    toys.forEach(function(toy){
      toyCollection.innerHTML += `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button data-id=${toy.id} class="like-btn">Like<3</button>
      <button data-id=${toy.id} class="delete-btn">Delete</button>
      </div>`
    });
  });
}

function createToy(event) {
  event.preventDefault()
  const toyName = event.target[0].value
  const toyImg = event.target[1].value
  const newToy = {name: toyName, image: toyImg, likes: 0}
  const reqObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }
  if (toyName != "" && toyImg != ""){
    fetch('http://localhost:3000/toys', reqObj)
    .then(res => res.json())
    .then(toy => {
      toyCollection.innerHTML += `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button data-id=${toy.id} class="like-btn">Like<3</button>
      <button data-id=${toy.id} class="delete-btn">Delete</button>
      </div>`
    });
    toyForm.parentElement.style.display = "none";
    toyForm.reset()
  }
}

function addLike(event) {
  const toyId = event.target.dataset.id
  const likesContainer = event.target.previousElementSibling
  const addLike = parseInt(likesContainer.innerText.split(' ')[0]) + 1 
  
  const reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({likes: (addLike)})
  }
  fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
    .then(res => res.json())
    .then(toy => {
      likesContainer.innerText = `<p>${toy.likes} Likes</p>`
      likesContainer.innerHTML = `${toy.likes} Likes`
    })
}

function deleteToy(event) {
  const toyCard = event.target.parentElement
  const toyId = event.target.dataset.id
  
  const reqObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
    .then(res => res.json())
    .then(toy => {
      toyCard.remove()
    })
}