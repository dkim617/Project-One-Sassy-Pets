//API data variables
/*const petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
const petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
const petAToken = "";
const jokeEndPoint =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,sexist,explicit"; */

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

var uniquePetID;
var generatedPetIDLi;

// var savedPetIDArray = [];
var getSavedPetIDArray = [];
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
  if (!inputedZipCode) {
    window.alert("error");
    myErrorEmptyModal.show();
    console.log("WORKED");
  }
  //maybe this was meant to go in if statement?
  // zipcodeInputEl.value = "";
  // return;
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

//set modal elements > input: petObj
function setModalElements(obj) {
  let { breeds, colors, id, photos } = obj;
  let breedStr = `${breeds.primary && breeds.primary}${
    breeds.secondary && "/" + breeds.secondary
  } ${breeds.mixed && "mix"}`;
  let color = `${colors.primary && colors.primary}${
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
  color = obj.color;
  coat = obj.coat;
  adoptionOrgAndLocation = ""; //maybe skip, have to make fetch
  personality = ""; //no data
  uniquePetID = id;
  saveBtn.value = id;
}

//save unique pet ID to local storage
function saveFavoritePetID(id) {
  ///FINISH
  //add new pet ID to the array
  // savedPetIDArray.push(uniquePetID);
  // //may or may not need: if there is already values in the array, then concat the saved array to this new array (consisting of any ids searched while the browser is open??? not sure if need this)
  // localStorage.setItem("savedPetIDArray", JSON.stringify(savedPetIDArray));
  ////TODO:
  //var = localStorage.getItem
  //var.push
  //localStorage.setItem
}

//create new button attached to save pet
function createNewPetBtn() {
  generatedPetIDLi = document.createElement("li");
  generatedPetIDLi.classList.add("generated-pet-ID-li");
  generatedPetIDBtn = document.createElement("BUTTON");
  generatedPetIDBtn.value = uniquePetID;
  console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
  generatedPetIDBtn.classList.add("generated-pet-ID-btn");
  generatedPetIDLi.appendChild(generatedPetIDBtn);
  generatedPetIDBtn.textContent = "\u2764 Future Fur Baby \u2764";
  savedPetsUL.appendChild(generatedPetIDLi);
}

//get saved ID from local storage
function getSavedPetID() {
  getSavedPetIDArray =
    JSON.parse(localStorage.getItem("savedPetIDArray")) || [];
  console.log("get pet ID ARRAY: " + getSavedPetIDArray);
  createSavedPetBtns();
}

//add event listener to the saved buttons
function clickSavedPetIDBtn() {
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
}

//create buttons with pets that were saved to local storage
function createSavedPetBtns() {
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

//modal close btn
function Close() {
  modal.style.display = "none";
}

////API FUNKS

//reduce API call fails > on page load check local storage for access token
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

//params: type, size, gender, age, zipcode(var = inputedZipCode)
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
  saveFavoritePetID(this.value);
  createNewPetBtn();
});

closeModalEl.addEventListener("click", Close);

//On page load, create saved buttons loaded from IDs in local storage
createSavedPetBtns();
