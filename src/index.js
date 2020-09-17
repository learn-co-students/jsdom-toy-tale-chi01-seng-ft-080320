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
    function fetchToys(){
      fetch("http://localhost:3000/toys/")
      .then(resp => resp.json())
      .then(toyArray => {
        toyArray.forEach(function(toy){
          const div = document.createElement("div")
          div.class = "card"
          div.innerHTML =
           `<h2>${toy["name"]}</h2>
           <img src=${toy["image"]} class="toy-avatar">
           <p>Likes:${toy["likes"]}</p>
           <button class="like-btn">Like <3</button>`
          const collection = document.querySelector("#toy-collection")
          collection.append(div)
          const likeBtn = div.querySelector(".like-btn")
          likeBtn.addEventListener("click", function(){
            let likes = div.querySelector("p").innerHTML.split(":")[1]
            likes = parseInt(likes, 10)
            likes = likes += 1
            div.querySelector("p").innerHTML = `likes:${likes}`
          })     
         })
      })
    }

    function newToy(){
      const form = document.querySelector(".add-toy-form")
      form.addEventListener("submit", function(event){
        event.preventDefault
        const toy = {
          name: event.target[0].value,
          image: event.target[1].value,
          likes: 0
        }
        const reqObj = {method: "POST", headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        }, body: JSON.stringify(toy)}
        fetch("http://localhost:3000/toys/", reqObj)
        .then(resp => resp.json())
        .then(fetchToys())      
      })
    }

    // function likeToys(){
    //   document.querySelectorAll(".card").forEach(function(card){
    //     const likeBtn = card.querySelector(".like-btn")
    //     likeBtn.addEventListener("click", function(){
          
    //     })
    //   })
    // }

    fetchToys()
    newToy()
    // likeToys()
  });
