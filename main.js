//console.log("Hello")
// Adding a promise

let timer
let deleteFirstPhotoDelay

async function start(){
  try{
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
  } catch (e) {
    console.log("Error : Cannot Fetch Data.")
  }
}
start()

function createBreedList(breedList) {
   document.getElementById("breed").innerHTML = `
   <select onchange="loadByBreed(this.value)" >
     <option>Choose Your Fav Breed</option>
     ${Object.keys(breedList).map(function(breed){
       return `<option>${breed}</option>`
     }).join('')}
   </select>
   `
}

async function loadByBreed(breed){
  if(breed != 'Choose Your Fav Breed'){
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json()
    createShow(data.message)
  }
}

function createShow(images){
  let current =0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)

  if(images.length > 1){
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image : url('${images[0]}')"></div>
    <div class="slide" style="background-image : url('${images[1]}')"></div>
    `
    current +=2
    if (images.length == 2){
    current =0
    }
    timer = setInterval(nextSlide,4500)

  }
  else{
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image : url('${images[0]}')"></div>
    <div class="slide" ></div>
    `
  }


  function nextSlide(){
    document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide" style="background-image : url('${images[current]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function(){
      document.querySelector(".slide").remove()
    },1000)
    if(current +1 >= images.length){
      current =0
    }
    else{
      current+=1
    }
  }
}
