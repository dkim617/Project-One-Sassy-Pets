//set variables
const petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
const petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
const petAToken = "";
const jokeEndPoint =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,sexist,explicit";

var inputedZipCode = ''  
var blankInputEl = document.querySelector("#input-zip-code");
var typeDropdown = document.querySelector('#dropdownMenuButton1');
var sizeDropdown = document.querySelector('#dropdownMenuButton2');
var ageDropdown = document.querySelector('#dropdownMenuButton3');
var genderDropdown = document.querySelector('#dropdownMenuButton4');

var savedPetIDArray = [];
var getSavedPetIDArray=[];
var savedPets = document.querySelector('.saved-pets')


//on page load check local storage for access token


//input value set to the zip code. error messages if empty 
function getInputValue () {
  inputedZipCode = blankInputEl.value;
  console.log("inputed zip: " + inputedZipCode);
  if (!inputedZipCode) {
      //change to a modal, no alerts allowed: window.alert("No city entered.");
      blankInputEl.value = ''; 
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

//if res.status !== 200
//how to structure call
//https://stackoverflow.com/questions/65514400/api-access-token-expiration-is-very-short
function getNewAToken() {
  let url = "https://api.petfinder.com/v2/oauth2/token";
  let curl = `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSKey}`;

  //first check local storage for aKey
  //if aKey, set petAToken
  //else, get new token, udpate petAToken and localStorage
  fetch(url, {
    method: "post",
    body: `grant_type=client_credentials&client_id=${petFinderKey}&client_secret=${petFinderSKey}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
}

//fetch pet data
//params: type, size, gender, age, zipcode(var = inputedZipCode)
//return: name, breed, size, gender, age, color, coat, adoption organization & location, and personality traits
function fetchPet(params) {
  let url = "";
  //testing- get by id:100
  const testUrl = "https://api.petfinder.com/v2/animals/100";
  )if (petAToken !== "" {
    fetch(testUrl, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${petAToken}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //give data to modal
        console.log(data)})
      .catch((err) => {
        console.log(err);
        getNewAToken();
        fetchPet(params);
      });
  }
  else getNewAToken();
}

//get saved ID from local storage
function getSavedPetID (){
  getSavedPetIDArray = JSON.parse(localStorage.getItem("savedPetIDArray")) || [];  
  console.log("get pet ID ARRAY: " + getSavedPetIDArray);
  for (i=0; i< getSavedPetIDArray.length; i++) {
      var generatedPetIDLi = document.createElement('li');
      generatedPetIDLi.classList.add("generated-pet-ID-li");
      generatedPetIDBtn = document.createElement('BUTTON');
      generatedPetIDBtn.value = getSavedPetIDArray[i]; 
      console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
      generatedPetIDBtn.classList.add("generated-pet-ID-btn");        
      generatedPetIDLi.appendChild(generatedPetIDBtn);
      generatedPetIDBtn.textContent = "Saved Pet "+ [i];  
      savedPets.appendChild(generatedCityLi);
      getSavedPet();
  }
}

//run saved ID through API
//GET https://api.petfinder.com/v2/animals/{id}
function getSavedPet(id) {
  let url = `https://api.petfinder.com/v2/animals/${id}`;
  //testing- get by id:100
  const testUrl = "https://api.petfinder.com/v2/animals/100";
  fetch(testUrl, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${petAToken}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
      getNewAToken();
      getSavedPet(id);
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



//click save button - david. add value to the saved button to equal the unique pet ID.
//add event listener to the saved button David creates to run these functions: saveFavoritePetID, make btns of saved pets 

//make the buttons when they are saved

//save unique pet ID to local storage
function saveFavoritePetID () { ///FINISH
    //add new pet ID to the array 
    savedPetIDArray.push(//pet ID variable)
    //if there is already values in the array, then concat the saved array to this new array (consisting of any cities searched while the browser is open)
    localStorage.setItem("savedPetIDArray", JSON.stringify(savedPetIDArray));
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

