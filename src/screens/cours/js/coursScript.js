/* document.addEventListener('DOMContentLoaded', function() {
 
  
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
}) */

  var selectedRow= null;
  // Fonction alert

  function showAlert(message, className){
    const div= document.createElement("div");
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container= document.querySelector(".container");
    const screenContainer= document.querySelector(".screenContainer");
    container.insertBefore(div, screenContainer);
    setTimeout(()=> document.querySelector(".alert").remove(),3000)

  }

  //supprimer un cours

  document.querySelector("#coursList").addEventListener("click",(e) => {
    
    const target= e.target;
    // console.log("ee",e.target);
    if(target.classList.contains("delete")){
      target.parentElement.parentElement.remove();
      showAlert("Cours Supprimé", "danger");
    }
    // alert()
  })