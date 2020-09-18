let addToy = false;
//event listners && execution to render

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

  getToys();

});



const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', submitToy)


// WHY DOES IT RETURN AN EMPTY NODE LIST IF I AM EXECUTING IT AFTER DOM CONTENT LOADED
// had to move it to after fetch request was made to get all of the toys that will be rendered!!!

function addLikeListeners(){
  let toyCards = document.querySelectorAll('.card')
  toyCards.forEach(card => {
    card.lastElementChild.addEventListener('click', like)
  });
}

// ONLY WORKS WHEN REFRESHING PAGE WHY??
// when adding a new toy the data-id appears with a space and as an integer? but after refreshing it appears normally

// <div class="card  data-id= " 10">
//         <h2>Charlie</h2>
//         <img src="http://www.pngmart.com/files/6/Buzz-Lightyear-PNG-Transparent-Picture.png " class="toy-avatar">
//         <p> Likes: 0 </p>
//         <button class="like-btn">Like &lt;3</button>
//     </div>
function addLastToyListner(){
  let toys = document.querySelectorAll(".card")
  toys[toys.length - 1].addEventListener('click', like)
}



//functions 

function getToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(response => {
    renderToys(response)
    addLikeListeners()
  });
}


function renderToys(toys){
  let toyHtml = ''
    toys.forEach(toy =>{
      toyHtml += 
      `<div class="card" data-id= "${toy.id}">
          <h2>${toy.name}</h2>
          <img src= "${toy.image}" class="toy-avatar" />
          <p> Likes: ${toy.likes} </p>
          <button class="like-btn">Like <3</button>
      </div> `
    });
    const toyCollection = document.querySelector("#toy-collection");
    toyCollection.innerHTML = toyHtml;

}



function renderIndividualToy(toy){
  let toyHtml = 
    `<div class="card  data-id= "${toy.id}">
        <h2>${toy.name}</h2>
        <img src= "${toy.image}" class="toy-avatar" />
        <p> Likes: ${toy.likes} </p>
        <button class="like-btn">Like <3</button>
    </div> `
    const toyCollection = document.querySelector("#toy-collection");
    toyCollection.innerHTML += toyHtml;
} 



function submitToy(event){
  event.preventDefault()
  const toyObject = {
    name : event.target['name'].value,
    image : event.target['image'].value,
    likes : 0
  }

  const toyStuff = {
    method : 'POST',
    headers : {
      "Content-Type" : "application/json", 
      "Accept" : "application/json"
    },
    body : JSON.stringify(toyObject)
  };

  fetch('http://localhost:3000/toys', toyStuff)
  .then(response => response.json())
  .then(response => {
    renderIndividualToy(response)
    addLastToyListner()
  });
  event.target.reset()
}


function like(e){
  let likes = parseInt(e.target.previousElementSibling.innerText.split(' ')[1]);
  const toyId = parseInt(e.target.parentNode.dataset.id);
  const toyStuff = {
    method : 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likes + 1
    })
  }
  fetch(`http://localhost:3000/toys/${toyId}`, toyStuff)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    e.target.previousElementSibling.innerText = `Likes: ${response.likes}`
  });
}

