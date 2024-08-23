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
const modalElement = document.getElementById('coursFormContainer');
const saveButton = document.getElementById('saveButton');
const editButton = document.getElementById('editButton');
const deleteButton = document.getElementById('deleteButton');
const modalTitle = document.getElementById('modal-title');
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
  // console.log("eehh");
  
}

/// Créer un cours
document.querySelector("#coursForm").addEventListener("submit", (e) => {
  e.preventDefault();

  //Données du formulaire
  const theme = document.querySelector('#theme').value;
  const nbreHeure = document.querySelector('#nbreHeure').value;
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
           <i class="fa-solid fa-eye detail"></i>
          </td>
        `;
      list.appendChild(row);
      selectedRow = null;
      handleModalForm("close")
      showAlert("Cours enregistré avec succès", "success", LIST)
    }/* else {
      selectedRow.children[0].textContent = theme;
      selectedRow.children[1].textContent = nbreHeure;
      selectedRow = null;
      showAlert("Cours modifié avec Succès", "info", FORM)

    }*/
    clearFields();
  }


});
// Modifier un cours
/* document.querySelector("#coursList").addEventListener("click", (e) => {
  const target = e.target;
  console.log("ddd", target);
  
 
}) */
//détail d' un cours
document.querySelector("#coursList").addEventListener("click", (e) => {

  const target = e.target;
  
 /* if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Cours Supprimé", "danger", LIST);
  } else  */if (target.classList.contains("detail")) {
    selectedRow = target.parentElement.parentElement;
    handleModalForm("open")
    if(selectedRow){
    document.querySelector("#theme").value = selectedRow.children[0].textContent
    document.querySelector("#nbreHeure").value = parseInt(selectedRow.children[1].textContent)
    }
    console.log("ee",selectedRow);
  } 
  // alert()
})

// Fermer le formulaire
function handleModalForm(action) {
 
  if (modalElement) {
    var modalInstance = bootstrap.Modal.getInstance(modalElement)|| new bootstrap.Modal(modalElement);
    if(action==="open"){
      modalInstance.show();
      // console.log("open", modalInstance);
      
    } else if(action==="close"){
      // console.log("close");
     
      modalInstance.hide();
    }
   
  }
}

// Listen when modal is closed 
modalElement.addEventListener('hidden.bs.modal', function (event) {
  console.log('Modal is closed!');
  clearFields();
  modalTitle.innerHTML=""
  selectedRow=null
  saveButton.style.display = 'none';
  editButton.style.display = 'none';
  deleteButton.style.display = 'none';
});

 // Listen when modal is open
 modalElement.addEventListener('shown.bs.modal', function (event) {
  console.log('Modal is opened!');
  if (selectedRow === null) {
  saveButton.style.display = 'block';
   modalTitle.innerHTML="Nouveau Cours"
  } else {
      modalTitle.innerHTML="Informations du Cours"
    editButton.style.display = 'block';
    deleteButton.style.display = 'block';
  }
});

// supprimer 
deleteButton.addEventListener("click", (e) => {
  //target.parentElement.parentElement.remove();
   // showAlert("Cours Supprimé", "danger", LIST);
   console.log("suppression");
   
})
// modification 
editButton.addEventListener("click", (e) => {
  //target.parentElement.parentElement.remove();
   // showAlert("Cours Supprimé", "danger", LIST);
   console.log("modification");
   
})

