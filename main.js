let audio = document.querySelector(".audio");
let wordTitle = document.querySelector(".word");
let input = document.querySelector("input");
let meaning = document.querySelector(".meaning");
let searchBtn = document.querySelector(".search-btn");
let pronunciation = document.querySelector(".pronunciation");
let errorMessage=document.querySelector(".error-message")


function fetchWord() {
  let word = input.value;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
  .then((response) => {
    if(response.status==404){
      pronunciation.classList.add("hide")
      meaning.classList.add("hide")
      wordTitle.classList.add("hide")
 audio.classList.add("hide")
errorMessage.classList.remove("hide")

    }else{
      pronunciation.classList.remove("hide")
      meaning.classList.remove("hide")
      wordTitle.classList.remove("hide")
 audio.classList.remove("hide")
      errorMessage.classList.add("hide")
return response.json()
    }
 
  
})
    .then((response) => {
      console.log(response)
      audio.src = response[0].phonetics[0].audio;
      wordTitle.innerHTML = `<b>Word</b>: ${response[0].word}`;
      meaning.innerHTML = "";
      for (let i = 0; i < response[0].meanings.length; i++) {
        meaning.innerHTML += `<p><b>Meaning ${i + 1}</b>: ${
          response[0].meanings[i].definitions[0].definition
        } (${response[0].meanings[i].partOfSpeech})</p>`;
      }
    })
    .then(() => {
      pronunciation.classList.remove("hide");
      audio.classList.remove("hide");
    });

  input.value = "";

}
searchBtn.addEventListener("click", () => {
  fetchWord();
});
