//set variables
<<<<<<< HEAD
var petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
var petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
var petAToken = "";
var jokeEndPoint =
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

var searchBtn = document.getElementById('search-btn');
var closeModal= document.getElementById('myModal');

// function Close(){
//   modal.style.display= 'none'
// }

// var closebtn = document.getElementsByClassName('closebtn');
// closebtn.addEventListener('click', Close());


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
=======
const petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
const petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
const petAToken = "";
const jokeEndPoint =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,sexist,explicit";

//elements with query params
var zipcodeInputEl = document.querySelector("#input-zip-code");
var typeDropdown = document.querySelector("#dropdownMenuButton1");
var sizeDropdown = document.querySelector("#dropdownMenuButton2");
var ageDropdown = document.querySelector("#dropdownMenuButton3");
var genderDropdown = document.querySelector("#dropdownMenuButton4");
var searchBtn = document.getElementById("search-btn");

//extra code to store these globally- just pass into eventlistener
// var optionTypeChoice;
// var optionSizeChoice;
// var optionAgeChoice;
// var optionGenderChoice;

// var uniquePetID; removed by passing newId
var generatedPetIDLi;

// var savedPetIDArray = [];
// var getSavedPetIDArray = [];
var savedPetsUL = document.querySelector(".saved-pets");

////unused vars
// var petName; //= data._______;
// var petPic; //= data.______;

//modal variables
var petNameTitle = document.querySelector("#MyModalLabel");
var searchedPetPic = document.querySelector(".pulled-pet-img");
var petJoke = document.querySelector(".pet-joke");
var modalPetDescriptionSection = document.querySelector(
  "#modal-pet-description"
);
var listPetDescriptors = document.querySelector("#pulledPetDescriptors");
var breed = document.querySelector(".breed");
var size = document.querySelector(".size");
var gender = document.querySelector(".gender");
var age = document.querySelector(".color");
var color = document.querySelector(".color");
var coat = document.querySelector(".coat");
var adoptionOrgAndLocation = document.querySelector(
  ".adoption-organization-and-location"
);
var personality = document.querySelector(".personality-traits");

var saveBtn = document.querySelector("#save-changes-btn");
var modalEl = document.getElementById("myModal");
var closeModalEl = document.getElementsByClassName("closebtn");
var myErrorEmptyModal = document.querySelector("#MyErrorEmptyModal");

//input value set to the zip code. error messages if empty
function getInputValue() {
  let inputedZipCode = zipcodeInputEl.value;
  console.log("inputed zip: " + inputedZipCode);
  if (inputedZipCode === "") {
    $(".error-modal").modal("show");
  }
  blankInputEl.value = "";
  return inputedZipCode;
}

////moved functionality into event listener
//get value of drop down buttons
// function getOptionType() {
//   optionTypeChoice = typeDropdown.options[typeDropdown.selectedIndex].value;
//   console.log("OUTPUT type: " + optionTypeChoice);
// }

// function getOptionSize() {
//   optionSizeChoice = sizeDropdown.options[sizeDropdown.selectedIndex].value;
//   console.log("OUTPUT size: " + optionSizeChoice);
// }

// function getOptionAge() {
//   optionAgeChoice = ageDropdown.options[ageDropdown.selectedIndex].value;
//   console.log("OUTPUT age: " + optionAgeChoice);
// }

// function getOptionGender() {
//   optionGenderChoice =
//     genderDropdown.options[genderDropdown.selectedIndex].value;
//   console.log("OUTPUT F/M: " + optionGenderChoice);
// }

////pass arr length as arg- remove arr logic and need for var name issues
function getRandom(len) {
  let randomIndex = Math.floor(Math.random() * len);
  return randomIndex;
}
>>>>>>> 1115d794681fe4c8fa2d543ea9e7e4eddeda657a

//set modal elements > input: petObj
function setModalElements(obj) {
  let { breeds, colors, id, photos } = obj;
  let breedStr = `${breeds.primary && breeds.primary}${
    breeds.secondary && "/" + breeds.secondary
  } ${breeds.mixed && "mix"}`;
  let colorStr = `${colors.primary && colors.primary}${
    colors.secondary && "/" + colors.secondary
  } ${colors.tertiary && "with " + colors.tertiary}`;
  let photo = photos[0];
  let joke = fetchJoke();

  petNameTitle = obj.name;
  searchedPetPic = photo;
  petJoke = joke;
  modalPetDescriptionSection = obj.description;
  listPetDescriptors = ""; //what data prop is this?
  breed = breedStr;
  size = obj.size;
  gender = obj.gender;
  age = obj.age;
  color = colorStr;
  coat = obj.coat;
  adoptionOrgAndLocation = ""; //maybe skip, have to make fetch
  personality = ""; //no data
  // uniquePetID = id;
  saveBtn.value = id;
}

<<<<<<< HEAD
// >>>>>>> 9079c5c15b0067e37a45ca551d3f72dbc33d3f86

function getOptionSize() {
  optionSizeChoice = sizeDropdown.options[sizeDropdown.selectedIndex].value;
  console.log("OUTPUT size: " + optionSizeChoice);
=======
//save unique pet ID to local storage
function saveFavoritePetID(id) {
  ///FINISH
  //add new pet ID to the array
  // savedPetIDArray.push(uniquePetID);
  // //may or may not need: if there is already values in the array, then concat the saved array to this new array (consisting of any ids searched while the browser is open??? not sure if need this)
  // localStorage.setItem("savedPetIDArray", JSON.stringify(savedPetIDArray));
>>>>>>> 1115d794681fe4c8fa2d543ea9e7e4eddeda657a
}

//create new button attached to save pet
function createNewPetBtn(newId) {
  generatedPetIDLi = document.createElement("li");
  generatedPetIDLi.classList.add("generated-pet-ID-li");
  generatedPetIDBtn = document.createElement("BUTTON");
  generatedPetIDBtn.value = newId;
  console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
  generatedPetIDBtn.classList.add("generated-pet-ID-btn");
  generatedPetIDLi.appendChild(generatedPetIDBtn);
  generatedPetIDBtn.textContent = "\u2764 Future Fur Baby \u2764";
  savedPetsUL.appendChild(generatedPetIDLi);
}

////moved to createSavedPetBtns
//get saved IDs from local storage
// function getSavedPetIDs() {
//   getSavedPetIDArray =
//     JSON.parse(localStorage.getItem("savedPetIDArray")) || [];
//   console.log("get pet ID ARRAY: " + getSavedPetIDArray);
//   createSavedPetBtns();
// }

//create buttons with pets that were saved to local storage
function createSavedPetBtns() {
  let getSavedPetIDArray =
    JSON.parse(localStorage.getItem("savedPetIDArray")) || [];

  for (i = 0; i < getSavedPetIDArray.length; i++) {
    generatedPetIDLi = document.createElement("li");
    generatedPetIDLi.classList.add("generated-pet-ID-li");
    generatedPetIDBtn = document.createElement("BUTTON");
    generatedPetIDBtn.value = getSavedPetIDArray[i];
    console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
    generatedPetIDBtn.classList.add("generated-pet-ID-btn");
    generatedPetIDLi.appendChild(generatedPetIDBtn);
    generatedPetIDBtn.textContent = "\u2764 Future Fur Baby \u2764";
    savedPetsUL.appendChild(generatedPetIDLi);
  }
}

<<<<<<< HEAD
//on page load check local storage for access token
=======
//modal close btn
function Close() {
  modal.style.display = "none";
}

////API FUNKS

//reduce API call fails > on page load check local storage for access token
>>>>>>> 1115d794681fe4c8fa2d543ea9e7e4eddeda657a
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

<<<<<<< HEAD
//fetch pet data
//params: type, size, gender, age, zipcode(var = inputedZipCode)
//return: name, breed, size, gender, age, color, coat, adoption organization & location, and personality traits
=======
//params: type, size, gender, age, zipcode(var = inputedZipCode)
>>>>>>> 1115d794681fe4c8fa2d543ea9e7e4eddeda657a
async function fetchPet(params) {
  await checkForLocalAToken();
  //construct url from params
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
      //run randomFunction, destructure res obj
<<<<<<< HEAD
      breed.textContent = "Breed: " /* + data.API breed data*/;
        size.textContent = "Size: " /* + data.API size data*/;
        gender.textContent = "Gender: " /* + data.API gender data*/;
        age.textContent = "Age: " /* + data.API age data*/;
        color.textContent = "Color: " /* + data.API color data*/;
        coat.textContent = "Coat: " /* + data.API coat data*/;
        adoptionOrgAndLocation.textContent = "Adoption Organization: " /* + data.API organization name data + "in " + data./*API organization location data*/ ;
        personality.textContent = "Personality traits: " /* + data.API personality traits data*/;
=======
      let randIndex = getRandom(res.length);
      setModalElements(res[randIndex]);
      // breed.textContent = "Breed: " /* + res.API breed data*/;
      // size.textContent = "Size: " /* + res.API size data*/;
      // gender.textContent = "Gender: " /* + res.API gender data*/;
      // age.textContent = "Age: " /* + res.API age data*/;
      // color.textContent = "Color: " /* + res.API color data*/;
      // coat.textContent = "Coat: " /* + res.API coat data*/;
      // adoptionOrgAndLocation.textContent =
      //   "Adoption Organization: " /* + res.API organization name data + "in " + res./*API organization location data*/;
      // personality.textContent =
      //   "Personality traits: " /* + res.API personality traits data*/;
>>>>>>> 1115d794681fe4c8fa2d543ea9e7e4eddeda657a
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

//new > https://sv443.net/jokeapi/v2/
function fetchJoke() {
  fetch(
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      petJoke.textContent /* =  data.pet joke from API*/;
    });
}

//run these functions when clicking the search button
searchBtn.addEventListener("click", function () {
  ////refactor below functions to make params arg for fetchPet()
  let searchParams = {
    zipcode: "",
    type: "",
    size: "",
    age: "",
    gender: "",
  };
  let zip = getInputValue();
  searchParams.zipcode = zip;
  // getOptionType();
  searchParams.type = typeDropdown.options[typeDropdown.selectedIndex].value;
  // getOptionSize();
  searchParams.size = sizeDropdown.options[sizeDropdown.selectedIndex].value;
  // getOptionAge();
  searchParams.age = ageDropdown.options[ageDropdown.selectedIndex].value;
  // getOptionGender();
  searchParams.gender =
    genderDropdown.options[genderDropdown.selectedIndex].value;

  //fetchPet(params);
  //fetchJoke();
  blankInputEl.value = "";
  return;
});

//when click the save btn, create a button with that saved pet's ID stored so it can be accessed later
saveBtn.addEventListener("click", function () {
  console.log("SAVING PET ID");
<<<<<<< HEAD
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
  var modal2 = document.getElementById("exampleModal");

  generatedPetIDLi = document.createElement('li');
  generatedPetIDLi.classList.add("generated-pet-ID-li");
  generatedPetIDBtn = document.createElement('BUTTON');
  generatedPetIDBtn.value = uniquePetID;
  generatedPetIDBtn.dataset.target = "#exampleModal";
  generatedPetIDBtn.addEventListener('click', function(){
    console.log("clicked?>");
    modal2.style.display = "block";
  } )      
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
=======
  let petIDs = localStorage.getItem("savedPetIDArray");
  petIDs.push(this.value);
  localStorage.setItem("savedPetIDArray", JSON.stringify(petIDs));
  createNewPetBtn(this.value);
});
>>>>>>> 1115d794681fe4c8fa2d543ea9e7e4eddeda657a

//add event listener to the saved buttons
// function clickSavedPetIDBtn() {
generatedPetIDBtn.addEventListener("click", function (event) {
  //set modal values to blank
  petNameTitle.textContent = "";
  searchedPetPic = "";
  listPetDescriptors = "";
  //UNIQUE-PET-ID ***** = '';
  //UNIQUE-PET-ID ***** = event.target.value;
  //console.log("SAVED PET", UNIQUE-PET-ID *****)
  getSavedPet(id);
  //console.log("clickSavedPet fxn working");
});
// }

closeModalEl.addEventListener("click", Close);

<<<<<<< HEAD
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
=======
>>>>>>> 1115d794681fe4c8fa2d543ea9e7e4eddeda657a
//On page load, create saved buttons loaded from IDs in local storage
createSavedPetBtns();
