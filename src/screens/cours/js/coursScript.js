document.addEventListener('DOMContentLoaded', function() {
 
  
    // Chargement du formulaire Cours
    function loadCoursForm() {
      fetch('formCours.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('formContainer').innerHTML = data;
          // document.getElementById('FormComponent').addEventListener('submit', addStudent);
        });
    }
 
    loadCoursForm();
  
    // Chargement du formulaire Cours
    function loadCoursTable() {
      fetch('tableCours.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('tableContainer').innerHTML = data;
          // document.getElementById('FormComponent').addEventListener('submit', addStudent);
        });
    }
    loadCoursTable();
})