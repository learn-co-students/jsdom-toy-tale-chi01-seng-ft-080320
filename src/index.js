let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  formDisplay()
  fetchToys()
  createFormListener()
  likeListener()


  // XX grab all of thee toys
  // XX add a new toy
  // update the likes on a toy
});


function likeListener() {
  const container = document.querySelector('#toy-collection')
  container.addEventListener('click', function (event) {
    if (event.target.className === 'like-btn') {
      updateLikes(event)
    }
  })
}

function updateLikes(event) {
  const toyId = event.target.dataset.id
  const pTag = event.target.previousElementSibling
  const currentLikes = pTag.innerText.split(' ')[0]

  const reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ "likes": parseInt(currentLikes) + 1 })
  }

  fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
    .then(resp => resp.json())
    .then(toy => {
      pTag.innerText = `<div>${toy.likes} Likes</div>`
      pTag.innerHTML = `${toy.likes} Likes`
    })


  //  grab the id of the toy
  //  scrape the number of likes the toy currently has and 1
  //
  //make the fetch request with that info
  //
  //do the same on the FE
}


function createFormListener() {
  const form = document.querySelector('form')
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const formData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 10
    }



    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/toys', reqObj)
      .then(resp => resp.json())
      .then(toy => {
        form.reset()
        const container = document.querySelector('#toy-collection')
        const toyCard = `<div class="card"><h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} Likes </p><button data-id=${toy.id} class="like-btn">Like <3</button></div>`
        container.innerHTML += toyCard
      })


  })



  // find the form the dom
  // listen for a submit on the form
  // once submitted:
  //    scarape the data off the form
  //    send the info to the BE by making a fetch req
  //    send it to the front end
}


function fetchToys() {

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(toy => {
        const container = document.querySelector('#toy-collection')
        const toyCard = `<div class="card"><h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>${toy.likes} Likes </p><button data-id=${toy.id} class="like-btn">Like <3</button></div>`
        container.innerHTML += toyCard
      })


    })

  // fetch request
  // loop over the toys array
  // for each toy: 
  //    render a toy card
}

function formDisplay() {
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
}