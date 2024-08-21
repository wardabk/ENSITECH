document.addEventListener('DOMContentLoaded', function() {
    loadCoursForm();
  
    // Chargement du formulaire Cours
    function loadCoursForm() {
      fetch('formCours.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('formContainer').innerHTML = data;
          // document.getElementById('FormComponent').addEventListener('submit', addStudent);
        });
    }
 
})