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
      nextBtn.classList.add("hidden")
    } else {
      nextBtn.textContent = "Next";
    }
  }
  let valid = false;
  // next button click
nextBtn.addEventListener("click", function () {
  if (stepIndex === 0) {
    valid = inputsValidation();
    // if (!valid) return; // stop if invalid

  }

  // next step only if not last step
  if (valid && stepIndex < forms.length - 1) {
    stepIndex++;
    savetoLocalstorage();
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

  //=========== delete item funvtion =====
    function deleteItem(Div, arr,Key) {
    // Find the index of the div in its parent
    const parent = Div.parentElement;
    const index = Array.from(parent.children).indexOf(Div);

    if (index > -1) {
        arr.splice(index, 1); // remove from array
        localStorage.setItem(Key, JSON.stringify(arr)); // update localStorage
        parent.removeChild(Div); // remove from UI
    }
}
  //================================
  
  // ======================
   
  function addExperience(){
    let list = document.getElementById("experience-list");
    let experienceInput = document.getElementById("job-title");
    let dateInput = document.getElementById("date-debut-ex");
    let companyNameInput = document.getElementById("company-name");
    let lieuInput = document.getElementById("lieu");
    let description = document.getElementById("desc-ex")

    if (experienceInput.value.trim() === "" || dateInput.value.trim() === "" || companyNameInput.value.trim() === "" ||lieuInput.value.trim() === "") {
        return;
    }
    experiencesArr.push({
      jobtitle : experienceInput.value,
      companyName: companyNameInput.value,
      dateDebutEx: dateInput.value,
      lieuEx: lieuInput.value,
      descriptionEx : description.value,
    })

    let div = document.createElement("div");
    div.classList.add('list-ex'); 

    div.innerHTML = `
        
        
          <span class="opacity-50">Poste : </span>${experienceInput.value}
          <span class="opacity-50">Entreprise : </span>${companyNameInput.value}
          <span class="opacity-50">Date : </span>${dateInput.value}
          <span class="opacity-50">Lieu : </span>${lieuInput.value}
          <button type="button" class="delete-btn"><i class="fa-solid fa-xmark" style="color: #ff0000;"></i></button>
        

        
    `;
    list.appendChild(div);
    
    div.querySelector(".delete-btn").addEventListener("click",()=>{
        deleteItem(div,experiences,"experience")
      })

    experienceInput.value = "";
    dateInput.value = "";
    companyNameInput.value = "";
    lieuInput.value = "";
    description.value="";

    
}
//  Add Compétence 
function addCompetence() {
  let competenceInput = document.getElementById("competence");
  let niveauInput = document.getElementById("niveau-c");
  let list = document.getElementById("competence-list-c");

  if (competenceInput.value.trim() === "" || niveauInput.value === "Selectionner") {
    return;
  }
  competencesArr.push({
      competence : competenceInput.value,
      niveau: niveauInput.value,
    })

  let div = document.createElement("div");
  div.classList.add("list-ex");

  div.innerHTML = `

        <span><span class="opacity-50">Compétence : </span>${competenceInput.value} 
        <span class="opacity-50">| Niveau : </span>${niveauInput.value}</span>
        <button type="button" class="delete-btn"><i class="fa-solid fa-xmark" style="color: #ff0000;"></i></button>
      
    `;

  list.appendChild(div);

   div.querySelector(".delete-btn").addEventListener("click",()=>{
        deleteItem(div,competences,"competence")
      })
  competenceInput.value = "";
  niveauInput.value = "Selectionner";
}

//  Add Langue 
function addLangue() {
  let langueInput = document.getElementById("langue");
  let niveauLangueInput = document.getElementById("niveau-l");
  let list = document.getElementById("langue-list");

  if (langueInput.value.trim() === "" || niveauLangueInput.value === "Selectionner") {
    return;
  }

  languesArr.push({
      langue : langueInput.value,
      niveau: niveauLangueInput.value,
    })

  let div = document.createElement("div");
  
  div.classList.add("list-ex");

  div.innerHTML = `
          <span><span class="opacity-50">Langue : </span>${langueInput.value} 
          <span class="opacity-50">| Niveau : </span>${niveauLangueInput.value}</span>
          <button type="button" class="delete-btn""><i class="fa-solid fa-xmark" style="color: #ff0000;"></i> </button>
  `;

  list.appendChild(div);
      div.querySelector(".delete-btn").addEventListener("click",()=>{
        deleteItem(div,langues,"langue")
      })
  langueInput.value = "";
  niveauLangueInput.value = "Selectionner";
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

    formationsArr.push({
    diplome: diplomeInput.value,
    etabName: etaNameInput.value,
    dateFo: dateFoInput.value,
    lieuFo: lieuFo.value,
  });

    let div = document.createElement("div");
    div.classList.add('list-ex'); 


    div.innerHTML = `
        
        
          
            <span class="opacity-50">Diplome : </span>${diplomeInput.value}
            <span class="opacity-50">Etablissement : </span>${etaNameInput.value}
            <span class="opacity-50">Date : </span>${dateFoInput.value}
          <button type="button" class="delete-btn""><i class="fa-solid fa-xmark" style="color: #ff0000;"></i></button>
        

        
    `;

    list.appendChild(div);
    div.querySelector(".delete-btn").addEventListener("click",()=>{
        deleteItem(div,formations,"formation")
      })
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
//=======Arrays for hadnle more than one data======
let experiencesArr = [];
let formationsArr = [];
let competencesArr = [];
let languesArr = [];


// === LOCAL STORAGE FOR PERSONAL INFO ===
let prenom = document.getElementById("prenom");
let nom = document.getElementById("nom");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let adresse = document.getElementById("adresse");
let dateNaissance = document.getElementById("d-naissance");
let ville = document.getElementById("ville");
let linkedin = document.getElementById("linkedin");
let github = document.getElementById("github");
// =========== image ======


function savetoLocalstorage(){
const personnelInfo = {
    prenom : prenom.value,
    nom : nom.value,
    email :email.value,
    phone :phone.value,
    dateNaissance:dateNaissance.value,
    adresse :adresse.value,
    ville :ville.value,
    linkedin :linkedin.value,
    github :github.value,
};
const descriptionQuill = {
    description : quill.root.innerHTML
}

// const descriptionString=JSON.stringify(description);
localStorage.setItem('personnelInfo',JSON.stringify(personnelInfo));
localStorage.setItem('description',JSON.stringify(descriptionQuill));
localStorage.setItem('experience',JSON.stringify(experiencesArr));
localStorage.setItem('formation',JSON.stringify(formationsArr));
localStorage.setItem('competence',JSON.stringify(competencesArr));
localStorage.setItem('langue',JSON.stringify(languesArr ));


}

//====GET THE DATA FROM THE LOCAL STORAGE ===
const experiences = JSON.parse(localStorage.getItem("experience"));
const formations = JSON.parse(localStorage.getItem("formation"));
const competences = JSON.parse(localStorage.getItem("competence"));
const langues = JSON.parse(localStorage.getItem("langue"));


let template1 = document.getElementById("cv_template");
let choosenTemplate = document.getElementById("template-1");
let choosenTemplate2 = document.getElementById("template-2");

// =============for hiddin main =============
const main = document.querySelector("#forms");

choosenTemplate.addEventListener("click", function () {
  const personnelInfo = JSON.parse(localStorage.getItem("personnelInfo"));
  const description = JSON.parse(localStorage.getItem("description"));
    main.classList.add("hidden")
  template1.classList.remove("hidden");

  let cvHTML = `
<div id="cv-container" 
  class="w-[210mm] h-full mx-auto bg-white text-gray-900 font-sans p-[10mm] shadow-lg leading-relaxed print:w-full print:h-screen">

  <!-- === Header Section === -->
  <header class="border-b border-gray-300 pb-2 text-center">
    <h1 class="text-3xl font-bold tracking-wide uppercase">${personnelInfo.prenom} ${personnelInfo.nom}</h1>
    <p class="text-sm mt-2">${personnelInfo.email} | ${personnelInfo.phone} | ${personnelInfo.ville}</p>
  </header>

  <!-- === À propos Section === -->
  <section class="mt-2">
    <h2 class="text-xl font-semibold border-b border-gray-400 pb-1 mb-3">À propos</h2>
    <div class="text-justify text-sm">${description.description}</div>
  </section>
`;

  // === Expériences Section ===
  if (experiencesArr.length > 0) {
    cvHTML += `
    <div class="mt-6">
      <h2 class="text-xl font-semibold border-b border-gray-600 pb-5">Expériences</h2>`;
    for (let i = 0; i < experiencesArr.length; i++) {
      cvHTML += `
      <div class="mb-3">
        <p><strong>Poste :</strong> ${experiencesArr[i].jobtitle}</p>
        <p><strong>Entreprise :</strong> ${experiencesArr[i].companyName}</p>
        <p><strong>Date :</strong> ${experiencesArr[i].dateDebutEx}</p>
        <p><strong>Lieu :</strong> ${experiencesArr[i].lieuEx}</p>
        <p class="text-black">${experiencesArr[i].descriptionEx}</p>
      </div>`;
    }
    cvHTML += `</div>`;
  }

  // === Formations Section ===
  if (formationsArr.length > 0) {
    cvHTML += `
    <div class="mt-6">
      <h2 class="text-xl font-semibold border-b border-gray-600 pb-5">Formations</h2>`;
    for (let i = 0; i < formationsArr.length; i++) {
      cvHTML += `
      <div class="mb-3">
        <p><strong>Diplôme :</strong> ${formationsArr[i].diplome}</p>
        <p><strong>Établissement :</strong> ${formationsArr[i].etabName}</p>
        <p><strong>Date :</strong> ${formationsArr[i].dateFo}</p>
        <p><strong>Lieu :</strong> ${formationsArr[i].lieuFo}</p>
      </div>`;
    }
    cvHTML += `</div>`;
  }

  // === Compétences Section ===
  if (competencesArr.length > 0) {
    cvHTML += `
    <div class="mt-6">
      <h2 class="text-xl font-semibold border-b border-gray-600 pb-5">Compétences</h2>
      <ul class="list-disc pl-6">`;
    for (let i = 0; i < competencesArr.length; i++) {
      cvHTML += `<li>${competencesArr[i].competence} (${competencesArr[i].niveau})</li>`;
    }
    cvHTML += `</ul></div>`;
  }

  // === Langues Section ===
  if (languesArr.length > 0) {
    cvHTML += `
    <div class="mt-6">
      <h2 class="text-xl font-semibold border-b border-gray-600 pb-5">Langues</h2>
      <ul class="list-disc pl-6">`;
    for (let i = 0; i < languesArr.length; i++) {
      cvHTML += `<li>${languesArr[i].langue} (${languesArr[i].niveau})</li>`;
    }
    cvHTML += `</ul></div>`;
  }

  cvHTML += `</div>`; // Close CV container

  // === Buttons at the bottom of the page ===
  cvHTML += `
  <div class="flex justify-center gap-6 mt-6">
    <button id="back-btn" class="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-md"><i class="fa-solid fa-arrow-left" style="color: #ffffff;"></i> Modifier</button>
    <button id="download-btn" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md"><i class="fa-solid fa-download" style="color: #ffffff;"></i>Télécharger</button>
  </div>
  `;

  template1.innerHTML = cvHTML;
    document.getElementById("back-btn").addEventListener("click", () => {
    template1.classList.add("hidden");
    main.classList.remove("hidden")
    document.querySelector("#form-section").classList.remove("hidden"); // show form again
  });

  document.getElementById("download-btn").addEventListener("click", () => {
    const cvElement = document.getElementById("cv-container");
    html2pdf().from(cvElement).save("Mon_CV.pdf");
  });
});








// ==============================Second Template=====================
choosenTemplate2.addEventListener("click", function () {
  const personnelInfo = JSON.parse(localStorage.getItem("personnelInfo"));
  const description = JSON.parse(localStorage.getItem("description"));
  main.classList.add("hidden")
  template1.classList.remove("hidden");


  let cvHTML = `
<div id="cv-container" 
  class="w-[210mm] min-h-[220mm] mx-auto bg-white text-gray-900 font-sans flex print:w-full print:min-h-screen">

  <!-- === Sidebar === -->
  <aside class="w-[70mm] bg-gray-100 p-[10mm] flex flex-col justify-start">
    <div>
      <h2 class="text-xl font-bold mb-2">${personnelInfo.prenom} ${personnelInfo.nom}</h2>
      <p class="text-sm mb-1">${personnelInfo.email}</p>
      <p class="text-sm mb-1">${personnelInfo.phone}</p>
      <p class="text-sm mb-4">${personnelInfo.ville}</p>
    </div>

    <!-- Competences -->
    ${competencesArr.length > 0 ? `
      <div class="mt-6">
        <h3 class="text-base font-semibold border-b border-gray-400 pb-1 mb-2">Compétences</h3>
        <ul class="text-sm space-y-1 list-disc list-inside">
          ${competencesArr.map(c => `<li>${c.competence} (${c.niveau})</li>`).join("")}
        </ul>
      </div>` : ""}
    
    <!-- Langues -->
    ${languesArr.length > 0 ? `
      <div class="mt-6">
        <h3 class="text-base font-semibold border-b border-gray-400 pb-1 mb-2">Langues</h3>
        <ul class="text-sm space-y-1 list-disc list-inside">
          ${languesArr.map(l => `<li>${l.langue} (${l.niveau})</li>`).join("")}
        </ul>
      </div>` : ""}
  </aside>

  <!-- === Main content === -->
  <main class="flex-1 p-[15mm] bg-white">
    <section>
      <h2 class="text-xl font-semibold border-b border-gray-400 pb-1 mb-3">À propos</h2>
      <div class="text-sm text-justify">${description.description}</div>
    </section>

    ${experiencesArr.length > 0 ? `
      <section class="mt-6">
        <h2 class="text-xl font-semibold border-b border-gray-400 pb-1 mb-3">Expériences</h2>
        ${experiencesArr.map(e => `
          <div class="mb-4">
            <p class="font-semibold">${e.jobtitle} — ${e.companyName}</p>
            <p class="text-xs text-gray-500">${e.dateDebutEx} | ${e.lieuEx}</p>
            <p class="text-sm mt-1">${e.descriptionEx}</p>
          </div>
        `).join("")}
      </section>` : ""}

    ${formationsArr.length > 0 ? `
      <section class="mt-6">
        <h2 class="text-xl font-semibold border-b border-gray-400 pb-1 mb-3">Formations</h2>
        ${formationsArr.map(f => `
          <div class="mb-4">
            <p class="font-semibold">${f.diplome} — ${f.etabName}</p>
            <p class="text-xs text-gray-500">${f.dateFo} | ${f.lieuFo}</p>
          </div>
        `).join("")}
      </section>` : ""}
  </main>
</div>

<!-- Buttons -->
<div class="flex justify-center gap-6 mt-8 print:hidden">
  <button id="back-btn" class="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-md">
    <i class="fa-solid fa-arrow-left mr-2"></i>Modifier
  </button>
  <button id="download-btn" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md">
    <i class="fa-solid fa-download mr-2"></i>Télécharger
  </button>
</div>
`;


  template1.innerHTML = cvHTML;
    document.getElementById("back-btn").addEventListener("click", () => {
    
    template1.classList.add("hidden");
    main.classList.remove("hidden");
    document.querySelector("#form-section").classList.remove("hidden"); // show form again
  });

  document.getElementById("download-btn").addEventListener("click", () => {
    const cvElement = document.getElementById("cv-container");
    html2pdf().from(cvElement).save("Mon_CV.pdf");
  });
});









