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
console.log(toyForm)
toyForm.addEventListener('submit', submitToy)




//functions 

function getToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(response => {
    console.log(response)
    renderToys(response)
  });
}


function renderToys(toys){
  let toyHtml = ''
    toys.forEach(toy =>{
      toyHtml += 
      `<div class="card">
          <h2 data-id= "${toy.id}" >${toy.name}</h2>
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
    `<div class="card">
        <h2 data-id= "${toy.id}" >${toy.name}</h2>
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
    image : event.target['image'].value
  }
  console.log(toyObject);

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
  });
}


{/* 
  <div class="card">
      <h2 data-id= ${toy.id} >${toy.name}</h2>
      <img src= ${toy.image} class="toy-avatar" />
      <p> ${toy.likes} </p>
      <button class="like-btn">Like <3</button>
  </div> 
*/}

//add event listener to like
