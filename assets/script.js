// for Quill Editor 
  var quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Décrivez-vous ici...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['clean']
      ]
    }
  });


document.addEventListener("DOMContentLoaded", function () {

  let forms = document.querySelectorAll("form");
  let nextBtn = document.getElementById("next-btn");
  let prevBtn = document.getElementById("prev-btn");
  let steps = document.querySelectorAll(".circle");
  let lines = document.querySelectorAll(".line"); 

  let stepIndex = 0; // start with first form

  //show  the first form
  for (let i = 0; i < forms.length; i++) {
    if (i === stepIndex) {
      forms[i].classList.remove("hidden");
    } else {
      forms[i].classList.add("hidden");
    }
  }

  // for update forms and progress
  function showStep(index) {

    // Show only the current form
    for (let i = 0; i < forms.length; i++) {
      if (i === index) {
        forms[i].classList.remove("hidden"); // show form
      } else {
        forms[i].classList.add("hidden"); // hide form
      }

    }

    // Update step circles
    for (let i = 0; i < steps.length; i++) {
      if (i <= index) {
        steps[i].classList.add("bg-green-500", "text-white");
        steps[i].classList.remove("bg-gray-300", "text-gray-600");
      } else {
        steps[i].classList.add("bg-gray-300", "text-gray-600");
        steps[i].classList.remove("bg-green-500", "text-white");
      }
    }

    // Updat lines
    for (let i = 0; i < lines.length; i++) {
      if (i < index) {
        lines[i].classList.add("bg-green-500");
        lines[i].classList.remove("bg-gray-300");
      } else {
        lines[i].classList.add("bg-gray-300");
        lines[i].classList.remove("bg-green-500");
      }
    }

    // Disable prev button on first step
    if (index === 0) {
      prevBtn.disabled = true;
      prevBtn.classList.add("opacity-50");
    } else {
      prevBtn.disabled = false;
      prevBtn.classList.remove("opacity-50");
    }

    // Change Next button text
    if (index === forms.length - 1) {
      nextBtn.textContent = "Terminer";
    } else {
      nextBtn.textContent = "Next";
    }
  }
  let valid = false;
  // next button click
nextBtn.addEventListener("click", function () {
  if (stepIndex === 0) {
    valid = inputsValidation();
    if (!valid) return; // stop if invalid
  }

  // next step only if not last step
  if (stepIndex < forms.length - 1) {
    stepIndex++;
    showStep(stepIndex);
  }
});



  // === Previous button click ===
  prevBtn.addEventListener("click", function () {
    if (stepIndex > 0) {
      stepIndex--;
      showStep(stepIndex);
    }
  });

  showStep(stepIndex); // show first step 

});
  function addExperience(){
    let list = document.getElementById("experience-list");
    let experienceInput = document.getElementById("job-title");
    let dateInput = document.getElementById("date-debut-ex");
    let companyNameInput = document.getElementById("company-name");
    let lieuInput = document.getElementById("lieu");

    if (experienceInput.value.trim() === "" || dateInput.value.trim() === "" || companyNameInput.value.trim() === "" ||lieuInput.value.trim() === "") {
        return;
    }

    let div = document.createElement("div");
    div.classList.add('list-ex'); 


    div.innerHTML = `
        
        
          <span class="opacity-50">Poste : </span>${experienceInput.value}
          <span class="opacity-50">Entreprise : </span>${companyNameInput.value}
          <span class="opacity-50">Date : </span>${dateInput.value}
          <span class="opacity-50">Lieu : </span>${lieuInput.value}
          <button onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark" style="color: #ff0000;"></i></button>
        

        
    `;

    list.appendChild(div);
    experienceInput.value = "";
    dateInput.value = "";
    companyNameInput.value = "";
    lieuInput.value = "";

    
}
//  Add Compétence 
function addCompetence() {
  let competenceInput = document.getElementById("competence");
  let niveauInput = document.getElementById("niveau-c");
  let list = document.getElementById("competence-list-c");

  if (competenceInput.value.trim() === "" || niveauInput.value === "Selectionner") {
    return;
  }

  let div = document.createElement("div");
  div.classList.add("list-ex");

  div.innerHTML = `

        <span><span class="opacity-50">Compétence : </span>${competenceInput.value} 
        <span class="opacity-50">| Niveau : </span>${niveauInput.value}</span>
        <button onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark" style="color: #ff0000;"></i></button>
      
    `;

  list.appendChild(div);

  
  competenceInput.value = "";
  niveauInput.value = "Selectionner";
}

//  Add Langue 
function addLangue() {
  let langueInput = document.getElementById("langue");
  let niveauInput = document.getElementById("niveau-l");
  let list = document.getElementById("langue-list");

  if (langueInput.value.trim() === "" || niveauInput.value === "Selectionner") {
    return;
  }

  let div = document.createElement("div");
  
  div.classList.add("list-ex");

  div.innerHTML = `
          <span><span class="opacity-50">Langue : </span>${langueInput.value} 
          <span class="opacity-50">| Niveau : </span>${niveauInput.value}</span>
          <button onclick="this.parentElement.remove()" class="text-red-500 font-bold">X</button>
  `;

  list.appendChild(div);

  langueInput.value = "";
  niveauInput.value = "Selectionner";
}
// Add formation
function addFormation(){
    let list = document.getElementById("formation-list");
    let diplomeInput = document.getElementById("diplome");
    let etaNameInput = document.getElementById("etab-name");
    let dateFoInput = document.getElementById("date-fo");
    let lieuFo = document.getElementById("lieu-fo");

    if (diplomeInput.value.trim() === "" || etaNameInput.value.trim() === "" || dateFoInput.value.trim() === "") {
        return;
    }

    let div = document.createElement("div");
    div.classList.add('list-ex'); 


    div.innerHTML = `
        
        
          <span class="opacity-50">Diplome : </span>${diplomeInput.value}
          <span class="opacity-50">Etablissement : </span>${etaNameInput.value}
          <span class="opacity-50">Date : </span>${dateFoInput.value}
          <button onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark" style="color: #ff0000;"></i></button>
        

        
    `;

    list.appendChild(div);
    diplomeInput.value = "";
    etaNameInput.value = "";
    dateFoInput.value = "";
    lieuFo.value = "";

    
}
function inputsValidation() {
  let errSpan = document.querySelectorAll(".form-error");

  // Inputs
  let prenom = document.getElementById("prenom").value.trim();
  let nom = document.getElementById("nom").value.trim();
  let email = document.getElementById("email").value.trim();
  let adresse = document.getElementById("adresse").value.trim();
  let linkedin = document.getElementById("linkedin").value.trim();

  // Regex patterns
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const adresseRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s,'-]+$/;
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;

  let isValid = true;

  // Clear all previous errors
  errSpan.forEach(span => (span.textContent = ""));

  // Prenom
  if (prenom === "") {
    errSpan[0].textContent = "Le prénom est requis.";
    errSpan[0].classList.add("text-red-500");
    isValid = false;
  } else if (!nameRegex.test(prenom)) {
    errSpan[0].textContent = "Le prénom ne doit contenir que des lettres.";
    errSpan[0].classList.add("text-red-500");
    isValid = false;
  }

  // Nom
  if (nom === "") {
    errSpan[1].textContent = "Le nom est requis.";
    errSpan[1].classList.add("text-red-500");
    isValid = false;
  } else if (!nameRegex.test(nom)) {
    errSpan[1].textContent = "Le nom ne doit contenir que des lettres.";
    errSpan[1].classList.add("text-red-500");
    isValid = false;
  }

  // Email
  if (email === "") {
    errSpan[2].textContent = "L'email est requis.";
    errSpan[2].classList.add("text-red-500");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    errSpan[2].textContent = "Email invalide.";
    errSpan[2].classList.add("text-red-500");
    isValid = false;
  }

  // Adresse
  if (adresse === "") {
    errSpan[4].textContent = "L'adresse est requise.";
    errSpan[4].classList.add("text-red-500");
    isValid = false;
  } else if (!adresseRegex.test(adresse)) {
    errSpan[4].textContent = "Adresse invalide.";
    errSpan[4].classList.add("text-red-500");
    isValid = false;
  }

  // LinkedIn validate if filled
  if (linkedin !== "" && !linkedinRegex.test(linkedin)) {
    errSpan[7].textContent = "Lien linkedIn invalide (https://www.linkedin.com/).";
    errSpan[7].classList.add("text-red-500");
    isValid = false;
  }

  return isValid;
}
  

