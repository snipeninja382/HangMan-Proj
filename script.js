let Edit= "";
// store the attemps
let attempts = 5;
let phrase = "";
let check = ""
let WrongLetters = [];
let feedback = document.getElementById("feedback");

//Get the user input elemnt 
// function to guess a number 
function checkGuess(){
    const guessInput = document.getElementById('guess').value;
    if(guessInput >= 0 || guessInput<= 0){
        feedback.innerHTML = `This is not a letter!`
        return;
    }
    check = Edit;
    for(let i = 0; i < phrase.length; i++){
        if(guessInput.toLowerCase() === phrase.charAt(i).toLowerCase()){
            Edit = Edit.replace(Edit, Edit.substring(0, i) + guessInput.toLowerCase() + Edit.substring(i + 1))
        }
    }
    
    if(Edit == check){
        attempts--;
        WrongLetters += guessInput.toLowerCase();
    }

    if(attempts == 0){
        feedback.innerHTML = `you lost! Try Again?`;
    }
    else if(Edit === phrase){
        feedback.innerHTML = `you win! Try Again?`;
    }
    else{
        feedback.innerHTML = ` the phrase is ${Edit} <br> You have ${attempts} attempts left <br> Incorrect letters: ${WrongLetters}`;
    }
    
}

function FindAndEdit(phrase){
    let editiedPhrase ="";
    for(let i = 0; i < phrase.length; i++){
        if(phrase.charAt(i) === " "){
            editiedPhrase += " ";
        }
        else{
            editiedPhrase += "_";
        }
        
    }
    return editiedPhrase;
}
function startGame(){
    attempts = 5;
    WrongLetters = [];
    phrase = document.getElementById("phrase").value;
    if(phrase >= 0 || phrase<= 0){
        feedback.innerHTML = `This is not a valid phrase!`
        return;
    }
    Edit = FindAndEdit(phrase);
    console.log(Edit);
    document.getElementById('phrase').value = '';
    document.getElementById('guess').value = '';
    document.getElementById('feedback').value = '';
    feedback.innerHTML = ` the phrase is ${Edit}`;
}
