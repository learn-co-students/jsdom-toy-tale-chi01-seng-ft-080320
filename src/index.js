// Variables
let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollectionDiv = document.querySelector('#toy-collection') 
const newToyForm = document.querySelector('form')

// Functions
function addLike(event){
let toyId = parseInt(event.target.id)
let currentLikes = parseInt(event.target.parentNode.childNodes[4].innerText)
let newLikes = currentLikes += 1
const reqObj = {
  method: 'PATCH',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "likes": newLikes
  })
}
fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
  .then(res => res.json())
  .then(updatedToy => { 
    let id = parseInt(updatedToy.id)
    let updatedLikes = updatedToy.likes
    let likesPTag = document.getElementById(id).parentNode.childNodes[4]
    likesPTag.innerText = `${updatedLikes} Likes`
  })
}


function fetchToys(){ 
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(function(toy){
        let toyDiv = document.createElement('div')
        toyDiv.setAttribute('class', 'card')
        let toyId = toy.id
        toyDiv.innerHTML =
         `<h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" data-id=${toy.id} />
          <p name="likes">${toy.likes} Likes </p>
          <button class="like-btn" id=${toyId} >Like <3</button>`
        toyCollectionDiv.append(toyDiv)
        const likeBtn = document.getElementById(toyId);
        likeBtn.addEventListener('click', addLike)
      })  
    })
}


function addNewToy(){
  newToyForm.addEventListener('submit', function(event){
    event.preventDefault()
    const newToyName = event.target[0].value
    const newToyURL = event.target[1].value
    const newToyObject = {name: newToyName, image: newToyURL, likes:0}
    const reqObj = {
      method: 'POST',  
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
      body: JSON.stringify(newToyObject)
    }
    if (newToyName != "" && newToyURL != ""){
    fetch('http://localhost:3000/toys', reqObj)
    .then(response => response.json())
    .then(newToy => {
      let toyDiv = document.createElement('div')
      toyDiv.setAttribute('class', 'card')
      let toyId = newToy.id
      toyDiv.innerHTML =
       `<h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" data-id=${newToy.id} />
        <p name="likes">${newToy.likes} Likes </p>
        <button class="like-btn" id=${toyId} >Like <3</button>`
      toyCollectionDiv.append(toyDiv) 
      const likeBtn = document.getElementById(toyId);
      likeBtn.addEventListener('click', addLike);
      })
    }
    newToyForm.reset();
  })
}





// Event Listeners
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});


 
// Invoked Functions
addNewToy()
fetchToys()

