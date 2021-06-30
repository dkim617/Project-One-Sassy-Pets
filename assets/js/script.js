//set variables
const petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
const petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
const petAToken = "";
const jokeEndPoint =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,sexist,explicit";

//search variables
var inputedZipCode = ''  
var blankInputEl = document.querySelector("#input-zip-code");
var typeDropdown = document.querySelector('#dropdownMenuButton1');
var sizeDropdown = document.querySelector('#dropdownMenuButton2');
var ageDropdown = document.querySelector('#dropdownMenuButton3');
var genderDropdown = document.querySelector('#dropdownMenuButton4');

var optionTypeChoice;
var optionSizeChoice;
var optionAgeChoice;
var optionGenderChoice;

var uniquePetID;

var savedPetIDArray = [];
var getSavedPetIDArray=[];
var savedPetsUL = document.querySelector('.saved-pets')

//API data variables
var petName; //= data._______;
var petPic; //= data.______;
 

//modal variables
var petNameTitle = document.querySelector('#MyModalLabel');
var searchedPetPic = document.querySelector('.pulled-pet-img');
var petJoke = document.querySelector('.pet-joke');
var modalPetDescriptionSection = document.querySelector('#modal-pet-description');
var listPetDescriptors = document.querySelector('#pulledPetDescriptors');
var breed = document.querySelector('.breed');
var size = document.querySelector('.size');
var gender = document.querySelector('.gender');
var age = document.querySelector('.color');
var color = document.querySelector('.color');
var coat = document.querySelector('.coat');
var adoptionOrgAndLocation = document.querySelector('.adoption-organization-and-location');
var personality = document.querySelector('.personality-traits');
var saveBtn = document.querySelector('#save-changes-btn');

var generatedPetIDLi;

var searchBtn = document.querySelector('.search-btn');



//on page load check local storage for access token

/* --------------------------------------------------------------------*/
//WHEN CLICK SEARCH BUTTON

//run these functions when clicking the search button
searchBtn.addEventListener('click', function (){
  getInputValue();
  getOptionType();
  getOptionSize();
  getOptionAge();
  getOptionGender();
  //fetchPet(params);
  //fetchJoke();
  blankInputEl.value = ''; 
  return;
})

//input value set to the zip code. error messages if empty 
function getInputValue () {
  inputedZipCode = blankInputEl.value;
  console.log("inputed zip: " + inputedZipCode);
  if (!inputedZipCode) {
      /*change to a modal, no alerts allowed: */ window.alert("No zip code entered.");
      blankInputEl.value = ''; 
  }
} 

//get value of drop down buttons 
function getOptionType(){
    optionTypeChoice = typeDropdown.options[typeDropdown.selectedIndex].value;
    console.log("OUTPUT type: " + optionTypeChoice);
  }


function getOptionSize() {
  optionSizeChoice = sizeDropdown.options[sizeDropdown.selectedIndex].value;
  console.log("OUTPUT size: " + optionSizeChoice);
}

function getOptionAge() {
  optionAgeChoice = ageDropdown.options[ageDropdown.selectedIndex].value;
  console.log("OUTPUT age: " + optionAgeChoice);
}

function getOptionGender() {
  optionGenderChoice = genderDropdown.options[genderDropdown.selectedIndex].value;
  console.log("OUTPUT F/M: " + optionGenderChoice);
}

function getRandom(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomPet = array[randomIndex];
  console.log("RANDOM PET SELECTED: " + randomPet);
  return randomPet;
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
  if (petAToken !== "") {
    fetch(testUrl, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${petAToken}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //give data to modal
        getRandom("NAME OF THE ARRAY OF THE 20 LISTED PETS")
        console.log(data)
        breed.textContent = "Breed: " /* + data.randomPet.API breed data*/;
        size.textContent = "Size: " /* + data.randomPet.API size data*/;
        gender.textContent = "Gender: " /* + data.randomPet.API gender data*/;
        age.textContent = "Age: " /* + data.randomPet.API age data*/;
        color.textContent = "Color: " /* + data.randomPet.API color data*/;
        coat.textContent = "Coat: " /* + data.randomPet.API coat data*/;
        adoptionOrgAndLocation.textContent = "Adoption Organization: " /* + data.randomPet.API organization name data + "in " + data./*API organization location data*/ ;
        personality.textContent = "Personality traits: " /* + data.randomPet.API personality traits data*/;
      })
      .catch((err) => {
        console.log(err);
        getNewAToken();
        fetchPet(params);
      });
  }
  else getNewAToken();
}

//old (rate limit of 60/day) > https://jokes.one/api/joke/?ref=devresourc.es#:~:text=that%20is%20returned.-,Get%20a%20random%20Joke,-To%20get%20a
//new > https://sv443.net/jokeapi/v2/
//blacklist params to keep it clean
function fetchJoke() {
  fetch(
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      petJoke.textContent /* =  data.pet joke from API*/;
    });
}

/* ******************PUSH AGAIN FOR JOKE API WHEN PULL APPROVED ************/

/* --------------------------------------------------------------*/
//WHEN CLICK SAVE BUTTON: 

//when click the save btn, create a button with that saved pet's ID stored so it can be accessed later 
saveBtn.addEventListener('click', function(){
  console.log("SAVING PET ID");
  saveFavoritePetID();
  createNewPetBtn();
})

//save unique pet ID to local storage
function saveFavoritePetID () { ///FINISH
  //add new pet ID to the array 
  savedPetIDArray.push(uniquePetID);
  //may or may not need: if there is already values in the array, then concat the saved array to this new array (consisting of any ids searched while the browser is open??? not sure if need this)
  localStorage.setItem("savedPetIDArray", JSON.stringify(savedPetIDArray));
}

//create new button attached to save pet
function createNewPetBtn() {
  generatedPetIDLi = document.createElement('li');
  generatedPetIDLi.classList.add("generated-pet-ID-li");
  generatedPetIDBtn = document.createElement('BUTTON');
  generatedPetIDBtn.value = uniquePetID;       
  console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
  generatedPetIDBtn.classList.add("generated-pet-ID-btn");        
  generatedPetIDLi.appendChild(generatedPetIDBtn);
  generatedPetIDBtn.textContent = "\u2764 Future Fur Baby \u2764";  
  savedPetsUL.appendChild(generatedPetIDLi);
}


//get saved ID from local storage
function getSavedPetID (){
  getSavedPetIDArray = JSON.parse(localStorage.getItem("savedPetIDArray")) || [];  
  console.log("get pet ID ARRAY: " + getSavedPetIDArray);
  createSavedPetBtns();
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

//add event listener to the saved buttons
function clickSavedPetIDBtn () { 
  generatedPetIDBtn.addEventListener('click', function (event){
      //set modal values to blank
      petNameTitle.textContent = "";
      searchedPetPic = ''
      listPetDescriptors = "";
      //UNIQUE-PET-ID ***** = '';
      //UNIQUE-PET-ID ***** = event.target.value; 
      //console.log("SAVED PET", UNIQUE-PET-ID *****)
      getSavedPet(id);
      //console.log("clickSavedPet fxn working");
  }) 
}

//create buttons with pets that were saved to local storage
function createSavedPetBtns () {
  for (i=0; i< getSavedPetIDArray.length; i++) {
      generatedPetIDLi = document.createElement('li');
      generatedPetIDLi.classList.add("generated-pet-ID-li");
      generatedPetIDBtn = document.createElement('BUTTON');
      generatedPetIDBtn.value = getSavedPetIDArray[i]; 
      console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
      generatedPetIDBtn.classList.add("generated-pet-ID-btn");        
      generatedPetIDLi.appendChild(generatedPetIDBtn);
      generatedPetIDBtn.textContent = "\u2764 Future Fur Baby \u2764";  
      savedPetsUL.appendChild(generatedPetIDLi);
      }
}
//On page load, create saved buttons loaded from IDs in local storage
createSavedPetBtns()





