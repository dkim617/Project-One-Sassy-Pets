var inputedZipCode = ''  
var blankInputEl = document.querySelector("#input-zip-code");
var typeDropdown = document.querySelector('#dropdownMenuButton1');
var sizeDropdown = document.querySelector('#dropdownMenuButton2');
var ageDropdown = document.querySelector('#dropdownMenuButton3');
var genderDropdown = document.querySelector('#dropdownMenuButton3');



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

/*
function clickSavedPet () { 
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