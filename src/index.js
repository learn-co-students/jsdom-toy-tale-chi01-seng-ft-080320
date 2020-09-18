//variables
const formBtn = document.getElementsByClassName('add-toy-form')[0]
const toyForm = document.querySelector(".container")
const toyDiv = document.getElementById("toy-collection")
const likeBtn = document.getElementsByClassName('like-btn')
let addToy = false;
//eventListeners


formBtn.addEventListener('submit',createNewToy)

toyDiv.addEventListener('click',likeThatToy)

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

//functions

function createHTML(toy){
  toyDiv.innerHTML += `<div data-id = ${toy.id} class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar"/>
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  </div>`
}



function populatePageWithToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(resp => generateToys(resp))
  .catch(error => console.error(error))
}

function generateToys(resp){
  resp.forEach(toy => {
    if (toy.image.__proto__ instanceof Object){
    createHTML(toy)
  }})
}

function createNewToy(e){
  const  newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    'likes': 0
  }
  
  const reqObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToy)
  }

  fetch('http://localhost:3000/toys', reqObj)
  .then(resp => resp.json())


  createHTML(newToy)
}

function likeThatToy(e){

if(e.target.className === 'like-btn'){
  let theLikes = parseInt(e.target.parentNode.children[2].innerText.split(" ")[0])
  const likedToy = {
    'likes': `${theLikes + 1}`
  }

  e.target.parentNode.children[2].innerText = `${theLikes + 1} likes`

  const reqObj = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likedToy)
  }
  fetch(`http://localhost:3000/toys/${e.target.parentNode.dataset['id']}`,reqObj)
}
}

//invokedFunctions




populatePageWithToys()

