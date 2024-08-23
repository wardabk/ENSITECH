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

var selectedRow = null;
const LIST = "liste";
const FORM = "Form";
// Fonction alert

function showAlert(message, className, place) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));

  let container = document.querySelector(".container");
  let screenContainer = document.querySelector(".screenContainer");
  if (place === FORM) {
    container = document.querySelector(".modal-body");
    screenContainer = document.querySelector("#coursForm");
  }

  container.insertBefore(div, screenContainer);
  setTimeout(() => document.querySelector(".alert").remove(), 3000)

}
//Vider la liste des champs

function clearFields() {
  document.querySelector("#theme").value = "";
  document.querySelector("#nbreHeure").value = "";
}

/// Créer un cours
document.querySelector("#coursForm").addEventListener("submit", (e) => {
  console.log("ddd")
  e.preventDefault();

  //Données du formulaire
  const theme = document.querySelector('#theme').value;
  const nbreHeure = document.querySelector('#nbreHeure').value;
  console.log("ddd", theme)
  //validation des données
  if (theme === "" || nbreHeure === "") {
    showAlert("Veuillez remplir tous les champs", "danger", FORM)
  } else {
    if (selectedRow === null) {
      const list = document.querySelector("#coursList");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td> ${theme}</td>
        <td> ${nbreHeure}</td>
         <td>
            <a href="" class="btn btn-success btn-sm detail">Détails</a>
            <a href="" class="btn btn-warning btn-sm edit">Modifier</a>
            <a href="#" class="btn btn-danger btn-sm delete">Supprimer</a>
          </td>
        `;
        list.appendChild(row);
        selectedRow=null;
        showAlert("Cours enregistré avec succès", "success",LIST)
    }
    }


});

//supprimer un cours
document.querySelector("#coursList").addEventListener("click", (e) => {

  const target = e.target;
  // console.log("ee",e.target);
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Cours Supprimé", "danger", LIST);
  }
  // alert()
})