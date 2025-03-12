let Edit= "";
// store the attemps
let attempts = 5;
let isFalse = true;
let phrase = "";
let check = ""
let WrongLetters = [];
let feedback = document.getElementById("feedback");
let phraseFeedback = document.getElementById("feedback2");
let specialCharacters = ["`","~","!","#","$","%","^","&","*","(",")","_","-","=","+","{","}","[","]","|","\"",":",";","\'","<",">","?","/",".",",","\\","@"]

document.getElementById('guess').addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        checkGuess();
    }
});
document.getElementById('phrase').addEventListener('keydown', function(event){
    if(event.key == 'Enter'){
        startGame();
    }
});


//Get the user input elemnt 
// function to guess a number 
function checkGuess(){
    //checks and replaces letters on the editited phrase to display more of the phrase to the player
    let guessInput = document.getElementById('guess').value;
    let guessArrayOutput = phrase.toLowerCase().split("");
    if(isFalse){
        phraseFeedback.innerHTML = "";

        if(Edit == ""){
            feedback.style.color = 'red'
            return feedback.innerHTML = `No phrase has been entered yet!`
        }

        if(guessInput >= 0 || guessInput<= 0){
            return feedback.innerHTML = `<span class="red">(This is not a letter!)</span><br> the phrase is ${Edit} <br> You have ${attempts} attempts left <br> Incorrect letters: ${WrongLetters}`;
        }

        for(let i = 0; i< specialCharacters.length; i++){
            if(specialCharacters[i] === guessInput.toLowerCase()){
                return feedback.innerHTML = `<span class="red">(You cannot enter a special character!)</span><br> the phrase is ${Edit} <br> You have ${attempts} attempts left <br> Incorrect letters: ${WrongLetters}`;
            }
        }

        check = Edit;
        for(let i = 0; i < phrase.length; i++){
            if(guessInput.toLowerCase() === phrase.charAt(i).toLowerCase()){
                Edit = Edit.replace(Edit, Edit.substring(0, i) + guessInput.toLowerCase() + Edit.substring(i + 1))
            }
        }
        

        // checks if the phrase has not changed and if so, add letters and remove guesses
        if(Edit == check){
            attempts--;
            let dontadd = false;
            for(let i = 0; i<guessArrayOutput.length; i++){
                if(guessArrayOutput[i] === guessInput.toLowerCase()){
                    dontadd = true;
                    continue;
                }
            }
            for(let i = 0; i<WrongLetters.length; i++){
                if(WrongLetters[i] === guessInput.toLowerCase()){
                    dontadd = true;
                    continue;
                }
            }
            if(!dontadd){
                WrongLetters += guessInput.toLowerCase(); 
            }
            
        }
        document.getElementById('guess').value = '';

        // seperate checks for whether or not you won or lost
        
            if(attempts == 0){
                feedback.style.color = 'red'
                feedback.innerHTML = `you lost! Try Again? <br> The phrase was "${phrase}"`;
                isFalse = false;
            }
            else if(Edit === phrase){
                feedback.style.color = 'green'
                feedback.innerHTML = `you win! Try Again? <br> the phrase was "${Edit}"`;
                isFalse = false;
            }
            else{
                feedback.style.color = 'black'
                feedback.innerHTML = `the phrase is ${Edit} <br> You have ${attempts} attempts left <br> Incorrect letters: ${WrongLetters}`;
            }
    }
    console.log(isFalse);
    
}

function FindAndEdit(phrase){
    let editiedPhrase ="";
    for(let i = 0; i < phrase.length; i++){

        // checks if the player has entered a number into the phrase
        let int = parseInt(phrase.charAt(i))
        if(isNaN(int) === false){
            phraseFeedback.style.color = 'red'
            phraseFeedback.innerHTML = `(You cannot enter a number in your phrase!): ${phrase.charAt(i)}`;
            isFalse = false;
            return;
        };
        
        for(let i = 0; i< specialCharacters.length; i++){
            for(let j = 0; j<phrase.length; j++){
                if(specialCharacters[i] === phrase.charAt(j)){
                    phraseFeedback.style.color = 'red'
                    phraseFeedback.innerHTML = `(You cannot enter a special character!): ${phrase.charAt(j)}`;
                    isFalse = false;
                    return; 
                }
            }  
        }

        //creates the hidden but visable phrase to the player
        if(phrase.charAt(i) === " "){
            editiedPhrase += " ";
            
        }
        else{
            editiedPhrase += "_";
        }
    }
    return editiedPhrase;
    console.log(isFalse)
}
function instructions(){
    return feedback.innerHTML =
    `<div class = "instructions">
    <h3>How to play</h3>
    <ol>
        <li>To start you need atleast 2 people to play</li>
        <li>The Gamemaster will enter a phrase or word that is withing the games guidlines</li>
        <li>You cannot enter <b>special characters</b> or <b>numbers</b> within your Phrase or your Guesses!</li>
        <li>Once the phrase is entered click <i>"start game"</i> to play, You will only have <b>5 attempts</b> before you lose</li>
        <li>The player will try and guess the phrase by entering a single letter and clicking <i>"submit guess"</i></li>
        <li>Feedback will be given to the other player as to how many guesses they have left, which letters are incorrect, and whether or not what they entered is something within the games guidelines</li>
        <li>Have Fun!</li>
    </ol> 
    </div>`
}
function startGame(){
    isFalse = true;
    attempts = 5;
    WrongLetters = [];
    phrase = document.getElementById("phrase").value;
    (phrase);
    phraseFeedback.innerHTML = "";

    if(phrase === ""){ // checks if the player has entered nothing at all and retu8rns an error
        phraseFeedback.style.color = 'red'
        return phraseFeedback.innerHTML = "(This is not a valid phrase)"
    }
    
    // restarts for all aspects of the game once the start button has been clicked
    Edit = FindAndEdit(phrase);
    (Edit);
    if(isFalse){
        document.getElementById('phrase').value = '';
        document.getElementById('guess').value = '';
        document.getElementById('feedback').value = '';
        feedback.style.color = 'black'
        feedback.innerHTML = `The phrase is ${Edit}`;
    }
    
    
}
