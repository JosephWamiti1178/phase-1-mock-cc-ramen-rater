// write your code here
//API END POINT
//See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
// const ramenImg = document.getElementById('ramen-menu')
// const details = document.getElementById('ramen-detail')
// const url = 'http://localhost:3000/ramens'

// //fetch requet
// fetch(url)//fetch content of url
// .then(response => response.json())//renders the APIs response as plain old js object, returns and passes the object to the nex ,then
// .then(data => data.forEach(renderImg))//prints the js data(returned object) to our browsers console     data.)
//      //data => data.forEach(renderImages) iterate through our array object

// function createImage() {
//     let ramenMenu = document.querySelector("#ramen-menu");
    
//     //create image and append it to ramen menu
//     for (let i = 0; i < data.length; i++) {
//       img = document.createElement("img");
//       img.src = data[i].image;
//       ramenMenu.appendChild(img);
//     }
// }
// const renderImg=(ramen)=>{// renders ramen image to  the ramen men 
//     //create img
//     let imageElement = document.createElement('img')
//     imageElement.src = ramen.image;
//     ramenImg.appendChild(imageElement)//append child to parent element
// }

// //Click on an image from the #ramen-menu div and see all the info about
// // that ramen displayed inside the #ramen-detail div and where it says 
// //insert comment here and insert rating here
// const details
// let data;
// fetch(" http://localhost:3000/ramens", {
//   //method: "GET",
// })
//   .then((response) => response.json())
//   .then((result) => {
//     //console.log("Success:", result);
//     data = result;
//     //console.log("Data:", data[0].name);
//     createImage();
//   })
// //   .catch((error) => {
// //     console.error("Error:", error);
// //     alert("Error! Try again later \n" + error.message);
// //   });


// function createImage() {
//     let ramenMenu = document.querySelector("#ramen-menu");
    
//     //create image and append it to ramen menu
//     for (let i = 0; i < data.length; i++) {
//       img = document.createElement("img");
//       img.src = data[i].image;
//       ramenMenu.appendChild(img);
//     }
  
//     //adds main image 
//     let detailsImage = document.querySelector(".detail-image");
//     console.log(detailsImage.src);
//     detailsImage.src = data[0].image;
  
//     //add name to main image
//     let mainName= document.querySelector("#mainName")
//     mainName.innerHTML = data[0].name;
  
//      //add restaurant to main image
//      let restaurant= document.querySelector("#restaurant")
//      restaurant.innerHTML = data[0].restaurant;
  
//      //add rating
//      let rating = document.querySelector("#rating-display")
//      rating.innerHTML = data[0].rating;
  
//      let comment = document.querySelector("#comment-display")
//      comment.innerHTML = data[0].comment;
//   }
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit)

function handleSubmit(event){
    event.preventDefault();

    const menuObj = {
        name: event.target["new-name"].value,
        restaurant: event.target["new-restaurant"].value,
        image: event.target["new-image"].value,
        rating: event.target["new-rating"].value,
        comment: event.target["new-comment"].value
    }
    renderOneData(menuObj)
    addRamens(menuObj)
  
}

// Initial render, get data and append to the DOM
const init = () => getData();

// Function to fetch data from the DB
const getData = () => {
    fetch("http://localhost:3000/ramens")
             .then(res => res.json())
             .then(data => data.forEach(item => renderOneData(item)))
             .catch(err => console.log(err.message))
}

// Function to render each menu items and populate the website on load
const renderOneData = (item) => {
    const parentDiv = document.querySelector("#ramen-menu");
    const image = document.createElement("img");
    image.addEventListener("click", ()=> displayInfo(item.id))
    image.src = item.image
    parentDiv.append(image)
   
}

// Polpulate detail section when image is clicked
const displayInfo = (id) => {
   fetch(`http://localhost:3000/ramens/${id}` )
     .then(res => res.json())
     .then(data => {
        
        const detailContainer = document.querySelector("#ramen-detail"); 
        const rating = document.querySelector("#rating-display");
        const comment = document.querySelector("#comment-display")

        detailContainer.innerHTML = `
            <img
            class="detail-image"
            src="${data.image}"
            alt="Insert Name Here"
            />
            <h2 class="name">${data.name}</h2>
            <h3 class="restaurant">${data.restaurant}</h3>
        `;

        rating.textContent = `${data.rating}`;
        comment.textContent = `${data.comment}`
     })

     .catch(err => console.log(err.message))

}

// Add a ramen menu through the submit form
const addRamens = (menu) => {
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Accept: "application/json"
        },
        body: JSON.stringify(menu)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err.message))
       
}



init()