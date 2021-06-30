//kyle's stuff
var petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
var petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
var petAToken = "";
var jokeEndPoint =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,sexist,explicit";

//on page load check local storage for access token
async function checkForLocalAToken() {
  let aKey = localStorage.getItem("petFinderAKey");
  if (aKey === null) {
    let newToken = await getNewAToken().then((data) => {
      return data;
    });
    petAToken = newToken.access_token;
    console.log("got a new token!");
  } else petAToken = aKey;
}

//if res.status !== 200
//how to structure call
//https://stackoverflow.com/questions/65514400/api-access-token-expiration-is-very-short > cors issue
//https://stackoverflow.com/questions/47604040/how-to-get-data-returned-from-fetch-promise > return Promise issue
async function getNewAToken() {
  let url = "https://api.petfinder.com/v2/oauth2/token";

  return await fetch(url, {
    method: "post",
    body: `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSKey}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => {
    return response
      .json()
      .then((data) => {
        localStorage.setItem(
          "petFinderAKey",
          JSON.stringify(data.access_token)
        );
        let testData = data;
        return testData;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

//fetch pet data
//params: type, size, gender, age, zipcode
//return: name, breed, size, gender, age, color, coat, adoption organization & location, and personality traits
async function fetchPet(params) {
  await checkForLocalAToken();
  let url = "";
  //testing- get by id:100
  const testUrl = "https://api.petfinder.com/v2/animals?type=dog";
  $.ajax({
    type: "GET",
    url: testUrl,
    crossDomain: true,
    dataType: "json",
    headers: {
      Authorization: `Bearer ${petAToken.slice(1, petAToken.length - 1)}`,
    },
    success: function (res) {
      console.log(res);
    },
    error: async function (err) {
      console.log("uh oh ", err);
      //add error handling
    },
  });
}

//GET https://api.petfinder.com/v2/animals/{id}
async function getSavedPet(id) {
  await checkForLocalAToken();
  // let url = `https://api.petfinder.com/v2/animals/${id}`;
  //testing- get by id:100
  const testUrl = "https://api.petfinder.com/v2/animals/52179899";
  $.ajax({
    type: "GET",
    url: testUrl,
    crossDomain: true,
    dataType: "json",
    headers: {
      Authorization: `Bearer ${petAToken.slice(1, petAToken.length - 1)}`,
    },
    success: function (res) {
      console.log(res);
    },
    error: async function (err) {
      console.log("uh oh ", err);
      //add error handling
    },
  });
}

//old (rate limit of 60/day) > https://jokes.one/api/joke/?ref=devresourc.es#:~:text=that%20is%20returned.-,Get%20a%20random%20Joke,-To%20get%20a
//new > https://sv443.net/jokeapi/v2/
//blacklist params to keep it clean
function fetchJoke() {
  fetch(
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// function testScript() {
//   fetchPet();
//   getSavedPet();
//   fetchJoke();
// }

//Maggies stuff

var inputedZipCode = "";
var blankInputEl = document.querySelector("#input-zip-code");
var typeDropdown = document.querySelector("#dropdownMenuButton1");
var sizeDropdown = document.querySelector("#dropdownMenuButton2");
var ageDropdown = document.querySelector("#dropdownMenuButton3");
var genderDropdown = document.querySelector("#dropdownMenuButton3");

var savedPetIDArray = [];
var getSavedPetIDArray = [];
var savedPets = document.querySelector(".saved-pets");

//input value set to the zip code. error messages if empty
function getInputValue() {
  inputedZipCode = blankInputEl.value;
  console.log("inputed zip: " + inputedZipCode);
  if (!inputedZipCode) {
    //change to a modal, no alerts allowed: window.alert("No city entered.");
    blankInputEl.value = "";
  }
}

//get value of drop down buttons
function getOptionType() {
  output = typeDropdown.value;
  console.log("OUTPUT: " + output);
}

function getOptionSize() {
  output = sizeDropdown.value;
  console.log("OUTPUT: " + output);
}

function getOptionAge() {
  output = ageDropdown.value;
  console.log("OUTPUT: " + output);
}

function getOptionGender() {
  output = genderDropdown.value;
  console.log("OUTPUT: " + output);
}

//click save button - david. add value to the saved button to equal the unique pet ID.
//add event listener to the saved button David creates to run these functions: saveFavoritePetID, make btns of saved pets

//make the buttons when they are saved

//save unique pet ID to local storage
function saveFavoritePetID() {
  ///FINISH
  //add new pet ID to the array
  savedPetIDArray.push(
    //pet ID variable)
    //if there is already values in the array, then concat the saved array to this new array (consisting of any cities searched while the browser is open)
    localStorage.setItem("savedPetIDArray", JSON.stringify(savedPetIDArray))
  );
}

//add event listener to the saved buttons
/*
function clickGeneratedPetIDBtn () { 
    //---SAVEBTN----.addEventListener('click', function (event){
        //set modal values to blank
        blank.textContent = "";
        //UNIQUE-PET-ID ***** = '';
        //UNIQUE-PET-ID ***** = event.target.value; 
        //console.log("SAVED PET", UNIQUE-PET-ID *****)
        //run PETFINDER API FXN ();
        //console.log("clickSavedPet fxn working");
    }) 
}
*/

function getSavedPetID() {
  getSavedPetIDArray =
    JSON.parse(localStorage.getItem("savedPetIDArray")) || [];
  console.log("get pet ID ARRAY: " + getSavedPetIDArray);
  for (i = 0; i < getSavedPetIDArray.length; i++) {
    var generatedPetIDLi = document.createElement("li");
    generatedPetIDLi.classList.add("generated-pet-ID-li");
    generatedPetIDBtn = document.createElement("BUTTON");
    generatedPetIDBtn.value = getSavedPetIDArray[i];
    console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
    generatedPetIDBtn.classList.add("generated-pet-ID-btn");
    generatedPetIDLi.appendChild(generatedPetIDBtn);
    generatedPetIDBtn.textContent = "Saved Pet " + [i];
    savedPets.appendChild(generatedCityLi);
    //API FXN();
    clickGeneratedPetIDBtn();
  }
}
