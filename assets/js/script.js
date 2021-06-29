const petFinderKey = "ndSGC9feqyCGwbQbKyyOrofwuMowCuUmKkOZhGLvrN4L6uk3dZ";
const petFinderSKey = "clSh2tlyLDixT4HzOsZFGzfx3JrLW5AChIVBfWXJ";
const petAToken = "";
const jokeEndPoint =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,sexist,explicit";

  //on page load check local storage for access token



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
//params: type, size, gender, age, zipcode
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
