$(document).ready(() => {
  createSavedPetBtns();
});

//set variables
var petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
var petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
var petAToken = "";
var jokeEndPoint =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,sexist,explicit";

//elements with query params
var zipcodeInputEl = document.querySelector("#input-zip-code");
var typeDropdown = document.querySelector("#dropdownMenuButton1");
var sizeDropdown = document.querySelector("#dropdownMenuButton2");
var ageDropdown = document.querySelector("#dropdownMenuButton3");
var genderDropdown = document.querySelector("#dropdownMenuButton4");
var searchBtn = document.getElementById("search-btn");
var savedPetsUL = document.querySelector(".saved-pets");

//modal variables
var petNameTitle = $("#myModalLabel");
var searchedPetPic = $(".pulled-pet-img");
var petJoke = document.querySelector(".pet-joke");
var modalPetDescriptionSection = document.querySelector(
  ".modal-pet-description"
);
var listPetDescriptors = document.querySelector(".pulledPetDescriptors");
var breed = document.querySelector(".breed");
var size = document.querySelector(".size");
var gender = document.querySelector(".gender");
var age = document.querySelector(".age");
var color = document.querySelector(".color");
var coat = document.querySelector(".coat");

var saveBtn = document.querySelector("#save-changes-btn");
var modalEl = document.getElementById("myModal");
var closeModalEl = document.getElementsByClassName("closebtn");
var myErrorEmptyModal = document.querySelector("#MyErrorEmptyModal");
var blankInputEl = document.querySelector("#input-zip-code");
var generatedPetIDBtn;

var emptyZip=false;


//input value set to the zip code. error messages if empty
function getInputValue() {
  let inputedZipCode = zipcodeInputEl.value;
  if (inputedZipCode === "") {
    $(".error-modal").modal("show");
    emptyZip = true;
    return;
  }
  return inputedZipCode;
}

////pass arr length as arg- remove arr logic and need for var name issues
function getRandom(len) {
  let randomIndex = Math.floor(Math.random() * len);
  return randomIndex;
}

//set modal elements > input: petObj
async function setModalElements(obj) {
  function isNull(thing) {
    return thing == null ? "???" : thing;
  }
  let { breeds, colors, id, photos } = obj;
  let breedStr = `${breeds.primary}${
    breeds.secondary && "/" + breeds.secondary
  } ${breeds.mixed && "mix"}`;
  let colorStr = `${colors.primary && colors.primary}${
    colors.secondary && "/" + colors.secondary
  } ${colors.tertiary && "with " + colors.tertiary}`;

  petNameTitle.textContent = isNull(obj.name);
  $(petNameTitle).text(obj.name);
  if (photos.length !== 0) $(searchedPetPic).attr("src", photos[0].large);

  modalPetDescriptionSection.textContent = isNull(obj.description);
  breed.textContent = "Breed: " + isNull(breedStr);
  size.textContent = "Size: " + isNull(obj.size);
  gender.textContent = "Gender: " + isNull(obj.gender);
  age.textContent = "Age: " + isNull(obj.age);
  color.textContent = "Color: " + colorStr;
  coat.textContent = "Coat: " + isNull(obj.coat);
  saveBtn.value = id;
}

// //save unique pet ID to local storage
// function saveFavoritePetID(id) {
//   ///FINISH
//   //add new pet ID to the array
//   // savedPetIDArray.push(uniquePetID);
//   // //may or may not need: if there is already values in the array, then concat the saved array to this new array (consisting of any ids searched while the browser is open??? not sure if need this)
//   // localStorage.setItem("savedPetIDArray", JSON.stringify(savedPetIDArray));
// }

//create new button attached to save pet
function createNewPetBtn(newId) {
  console.log("RUNNING CREATE NEW PET BTN FXN");
  let generatedPetIDLi = document.createElement("li");
  generatedPetIDLi.classList.add("generated-pet-ID-li");
  generatedPetIDLi.setAttribute("data-toggle", "modal");
  generatedPetIDLi.setAttribute("data-target", "#myModal");
  generatedPetIDBtn = document.createElement("BUTTON");
  generatedPetIDBtn.value = newId;
  console.log("NEW BUTTON VALUE: " + generatedPetIDBtn.value);
  generatedPetIDBtn.classList.add("generated-pet-ID-btn");
  generatedPetIDBtn.classList.add("btn");
  generatedPetIDLi.appendChild(generatedPetIDBtn);
  generatedPetIDBtn.textContent = "\u2764 Future Fur Baby \u2764";
  savedPetsUL.appendChild(generatedPetIDLi);

  generatedPetIDBtn.addEventListener("click", function (event) {
    getSavedPet(event.target.value);
  });
}

//create buttons with pets that were saved to local storage
function createSavedPetBtns() {
  let getSavedPetIDArray =
    JSON.parse(localStorage.getItem("savedPetIDArray")) || [];
  for (i = 0; i < getSavedPetIDArray.length; i++) {
    let generatedPetIDLi = document.createElement("li");
    generatedPetIDLi.classList.add("generated-pet-ID-li");
    generatedPetIDLi.setAttribute("data-toggle", "modal");
    generatedPetIDLi.setAttribute("data-target", "#myModal");
    generatedPetIDBtn = document.createElement("BUTTON");
    generatedPetIDBtn.value = getSavedPetIDArray[i];
    generatedPetIDBtn.classList.add("generated-pet-ID-btn");
    generatedPetIDLi.appendChild(generatedPetIDBtn);
    generatedPetIDBtn.textContent = "\u2764 Future Fur Baby \u2764";
    savedPetsUL.appendChild(generatedPetIDLi);
    generatedPetIDBtn.addEventListener("click", function (event) {
      getSavedPet(event.target.value);
    });
  }
}

//modal close btn
// function Close() {
//   modal.style.display = "none";
// }

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
  let { zipcode, type, size, age, gender } = params;
  let empty = false;
  for (let val in params) {
    console.log(params[val], params[val].length);
    if (params[val].length == 0) empty = true;
  }
  let url = `https://api.petfinder.com/v2/animals?&location=${zipcode}&type=${type}&size=${size}&age=${age}&gender=${gender}`;
  const testUrl = "https://api.petfinder.com/v2/animals?type=dog";
  $.ajax({
    type: "GET",
    url: empty == false ? url : testUrl,
    crossDomain: true,
    dataType: "json",
    headers: {
      Authorization: `Bearer ${petAToken.slice(1, petAToken.length - 1)}`,
    },
    success: function (res) {
      //run randomFunction, destructure res obj
      let randIndex = getRandom(res.animals.length);
      console.log(res.animals[randIndex]);
      setModalElements(res.animals[randIndex]);
      fetchJoke();
    },
    error: async function (err) {
      console.log("uh oh ", err);
      //add error handling
      getNewAToken();
    },
  });
}

//GET https://api.petfinder.com/v2/animals/{id}
async function getSavedPet(id) {
  await checkForLocalAToken();
  let url = `https://api.petfinder.com/v2/animals/${id}`;
  //testing- get by id:100
  // const testUrl = "https://api.petfinder.com/v2/animals/52179899";
  $.ajax({
    type: "GET",
    url: url,
    crossDomain: true,
    dataType: "json",
    headers: {
      Authorization: `Bearer ${petAToken.slice(1, petAToken.length - 1)}`,
    },
    success: function (res) {
      // console.log(res);
      setModalElements(res.animal);
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
      petJoke.textContent = data.setup + "- " + data.delivery;
    });
}

//pass input values to API handlers
searchBtn.addEventListener("click", function () {
  let searchParams = {
    zipcode: "",
    type: "",
    size: "",
    age: "",
    gender: "",
  };
  let zip = getInputValue();
  searchParams.zipcode = zip;
  searchParams.type = typeDropdown.options[typeDropdown.selectedIndex].value;
  searchParams.size = sizeDropdown.options[sizeDropdown.selectedIndex].value;
  searchParams.age = ageDropdown.options[ageDropdown.selectedIndex].value;
  searchParams.gender =
    genderDropdown.options[genderDropdown.selectedIndex].value;

  fetchPet(searchParams);
  blankInputEl.value = "";
  // return;
});

//when click the save btn, create a button with that saved pet's ID stored so it can be accessed later
saveBtn.addEventListener("click", function () {
  console.log("SAVING PET ID");
  let petIDs = JSON.parse(localStorage.getItem("savedPetIDArray")) || [];
  petIDs.push(this.value);
  localStorage.setItem("savedPetIDArray", JSON.stringify(petIDs));
  createNewPetBtn(this.value);
});

closeModalEl.addEventListener("click", Close);
