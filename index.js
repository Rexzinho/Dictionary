const wordPlaced = document.getElementById("wordPlaced");
const wordDefinition = document.getElementById("wordDefinition");
const displayWord = document.getElementById("displayWord");
const displayDefinition = document.getElementById("displayDefinition");
const displaySynonymous = document.getElementById("displaySynonymous");
const errorMessage = document.getElementById("errorMessage");
const displayPartOfSpeech = document.getElementById("displayPartOfSpeech");
const wordSound = document.getElementById("wordSound");
const wordAudio = new Audio();
const loadDictionary = true;

async function fetchData(word){

    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return await response.json();
    }
    catch(error){
        console.error(error);
    }
}

async function updateDictionary(){

    resetDictionary();

    const word = wordPlaced.value;
    const data = await fetchData(word);
    console.log(data);

    try{
        displayWord.textContent = data[0].word;
        displayWord.style.display = "block";
    }
    catch(error){
        errorMessage.style.display = "block";
    }
    if(displayWord.textContent){
            
        displayPartOfSpeech.textContent = data[0].meanings[0].partOfSpeech;
        displayPartOfSpeech.style.display = "block";

        if(data[0].meanings[0].synonyms[0]){

            const synonyms = [];
            synonyms.push(data[0].meanings[0].synonyms[0]);

            displaySynonymous.textContent = `${synonyms[0]}` 

            if(data[0].meanings[0].synonyms[1]){
                synonyms.push(data[0].meanings[0].synonyms[1]);
                displaySynonymous.textContent = `${synonyms[0]} / ${synonyms[1]}` 
            }
            if(data[0].meanings[0].synonyms[2]){
                synonyms.push(data[0].meanings[0].synonyms[1]);
                displaySynonymous.textContent = `${synonyms[0]} / ${synonyms[1]} / ${synonyms[2]}` 
            }

            displaySynonymous.style.display = "block";

        }

        displayDefinition.textContent = data[0].meanings[0].definitions[0].definition;
        displayDefinition.style.display = "block";

        if(data[0].phonetics[0].audio){

            wordAudio.src = data[0].phonetics[0].audio;
            wordSound.style.display = "block";
                
        }
    }
}

function playSound(){
    wordAudio.play()
}

function resetDictionary(){
    displayWord.style.display = "none";
    displayPartOfSpeech.style.display = "none";
    displaySynonymous.style.display = "none";
    displayDefinition.style.display = "none";
    wordSound.style.display = "none";
    errorMessage.style.display = "none";
}