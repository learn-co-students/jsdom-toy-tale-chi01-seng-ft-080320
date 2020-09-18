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
  getToys();
});

  

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
  
    toys.forEach(function(toy){
      const divTag = document.createElement('div')
      divTag.className = 'card'
      divTag.innerHTML = `<h2>${toy.name}</h2> 
      <img src=${toy.image} class='toy-avatar'>
      <p>${toy.likes} likes </p> 
      <button class='like-btn'>Like</button>
      `
      


      const toyContainer = document.querySelector('#toy-collection')
      toyContainer.append(divTag)
    })
  })
}

function toyFormPost () {
  const form = document.querySelector('form')

  form.addEventListener('submit', function(event){
    event.preventDefault()
    const newToy = {
      name: event.target['name'].value,
      image: event.target['image'].value
    }
    
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    }

    fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(toy => {
      const divTag = document.createElement('divTag')
      divTag.innerHTML = `${toy.name}-${toy.image}`

      const toyContainer = document.querySelector('#toy-collection')
      toyContainer.append(divTag)
    })
    form.reset()
  })
}



