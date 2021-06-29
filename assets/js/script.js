var inputedZipCode = ''  
var blankInputEl = document.querySelector("#input-zip-code");
var typeDropdown = document.querySelector('#dropdownMenuButton1');
var sizeDropdown = document.querySelector('#dropdownMenuButton2');
var ageDropdown = document.querySelector('#dropdownMenuButton3');
var genderDropdown = document.querySelector('#dropdownMenuButton3');

var savedPetIDArray = [];
var getSavedPetIDArray=[];
var savedPets = document.querySelector('.saved-pets')



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
        //API FXN();
        clickGeneratedPetIDBtn();
    }
}

