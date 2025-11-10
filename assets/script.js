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

  // next button click
  nextBtn.addEventListener("click", function () {
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
