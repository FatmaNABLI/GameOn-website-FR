function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeBtn = document.querySelectorAll(".close");

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const participationNumber=document.getElementById("quantity");
const locationRBtn = document.querySelectorAll('input[name="location"]');
const conditionsUtilisationCheck = document.getElementById('checkbox1');

const submitBtn = document.getElementById("btn-submit-form");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//close Modal event avec le bouton (X)
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

//close Modal form
function closeModal() {
  modalbg.style.display = "none";
}

function isName(name){
  return /^[a-zA-Z]{2,}$/.test(name);
}

//Function to check if name is empty or contains less than 2 letters
function checkName(eltName,type){
 let name = eltName.value.trim();
 let msg = "";
  if(name == ""){
    msg = "Veuillez entrer votre " + type;
    showError(eltName,msg);
    return false;
  }
  else if(name.length<2){
    msg = "Le " + type + " doit contenir au moins deux caractères";
    showError(eltName,msg);
    return false;
  }
  else{
    removeError(eltName);
  }
  return true;
}
//fucntion To check email
function checkEmail(email){
  if(!isMail(email.value)){
    showError(email,"Veuillez vérifier votre adresse email");
    return false;
  }else{
    removeError(email);
    return true;
  }
}

function checkBirthDate(birthDate){
  if(birthDate.value ==''){
    showError(birthDate,"Vous devez entrer votre date de naissance.");
    return false;
  }else{
    removeError(birthDate);
    return true;
  }
}
function checkParticipationNumber(participationNumber){
  if(isValidNumber(participationNumber.value)){
    removeError(participationNumber);
    return true;
  }else{
    showError(participationNumber,"Entrer un nombre valide entre 0 et 99");
  }

}
function checkLocation(locationRBtn){
  if(isLocationSelected(locationRBtn)){
    removeError(locationRBtn[0]);
    return true;
  }else{
    showError(locationRBtn[0],"Vous devez choisir une option");
    return false;
  }
}
function checkCondition(conditionsUtilisationCheck){
  if(!conditionsUtilisationCheck.checked){
    showError(conditionsUtilisationCheck,"Vous devez vérifier que vous acceptez les termes et conditions.");
    return false;
  }else{
    removeError(conditionsUtilisationCheck);
    return true;
  }

}
function isLocationSelected(locationRBtn){
  for (const radioButton of locationRBtn) {
    if (radioButton.checked) {
       return true;
    }
  }
  return false;
}

function isBirthDateEntred(){
  if(birthDate.value==''){
    return false;
  }
  return true;
}
function isMail(mail){
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail);
}
function isValidNumber(valeur){
  return /^[0-9]{1,2}$/.test(valeur);
  //return !isNaN(valeur);
}
function validateForm(){
  res = checkName(firstName,"prénom")&& checkName(lastName,"nom")&& checkEmail(email)
  && checkBirthDate(birthDate) && checkLocation(locationRBtn) &&   checkCondition(conditionsUtilisationCheck)
  && checkParticipationNumber(participationNumber);
  checkName(firstName,"prénom");
  checkName(lastName,"nom");
  checkEmail(email);
  checkBirthDate(birthDate)
  checkLocation(locationRBtn);
  checkCondition(conditionsUtilisationCheck);
  checkParticipationNumber(participationNumber);
  if(res){
    document.getElementById("success").style.display='block';
  }
}
//Funtion to show msg error if the element is not valid
function showError(elt,msg){
  elt.parentElement.setAttribute('data-error',msg);
  elt.parentElement.setAttribute('data-error-visible',true);
}
//Function To remove the error msg from element if it is valid
function removeError(elt){
  elt.parentElement.removeAttribute('data-error');
  elt.parentElement.setAttribute('data-error-visible',false);

}
//Add listener to submit button of the modal form
submitBtn.addEventListener("click",function(e){
  e.preventDefault();
  validateForm();
  
});
