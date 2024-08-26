document.addEventListener('DOMContentLoaded', function () {
  const AllCours = JSON.parse(localStorage.getItem('ListCours'))
  const modalElement = document.getElementById('coursFormContainer');
  const saveButton = document.getElementById('saveButton');
  const editButton = document.getElementById('editButton');
  const deleteButton = document.getElementById('deleteButton');
  const modalTitle = document.getElementById('modal-title');
  const theme = document.getElementById('theme');
  const nbreHeure = document.getElementById('nbreHeure');
  const searchInput = document.getElementById('searchInput');
  const LIST = "liste";
  const FORM = "Form";
  // Initialisation du cours selectionné
  let currentCours = null;
  // Fonction pour afficher les information d'un cours
  function afficherCours(cours) {
    console.log("ggg", cours)
    theme.value = cours.theme;
    nbreHeure.value = parseInt(cours.nbreHeure);
    currentCours = cours;
    handleModalForm("open")
  }
  // Fonction pour afficher les cours dans le tableau
  function listerCours(listCours) {
    const tableBody = document.querySelector('#coursTable tbody');
    tableBody.innerHTML = ''; // Effacer les lignes existantes

    listCours.forEach(cours => {
      const row = document.createElement('tr');
      row.insertCell(0).textContent = cours.identifiant;
      row.insertCell(1).textContent = cours.theme;
      row.insertCell(2).textContent = cours.nbreHeure;
      const actionCell = row.insertCell(3);
      const viewButton = document.createElement('button');
      viewButton.className = 'btn btn-primary';
      viewButton.textContent = 'Voir';
      viewButton.onclick = () => afficherCours(cours);
      actionCell.appendChild(viewButton);
      tableBody.appendChild(row);
    });
  }

  // gérer l'affichage du formulaire
  function handleModalForm(action) {

    if (modalElement) {
      var modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      if (action === "open") {
        modalInstance.show();

      } else if (action === "close") {
        modalInstance.hide();
      }

    }
  }
  // Listen when modal is closed 
  modalElement.addEventListener('hidden.bs.modal', function (event) {
    console.log('Modal is closed!');
    clearFields();
    modalTitle.innerHTML = ""
    currentCours = null
    saveButton.style.display = 'none';
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';
  });

  // Listen when modal is open
  modalElement.addEventListener('shown.bs.modal', function (event) {
    console.log('Modal is opened!');
    if (currentCours === null) {
      saveButton.style.display = 'block';
      modalTitle.innerHTML = "Nouveau Cours"
    } else {
      modalTitle.innerHTML = "Informations du Cours"
      editButton.style.display = 'block';
      deleteButton.style.display = 'block';
    }
  });

  function showAlert(message, className, place) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    let container = document.querySelector(".screenContainer");
    let titleBox = document.querySelector(".titleBox");
    if (place === FORM) {
      container = document.querySelector(".modal-body");
      titleBox = document.querySelector("#coursForm");
    }

    container.insertBefore(div, titleBox);
    setTimeout(() => document.querySelector(".alert").remove(), 3000)

  }
  // vider les champs
  function clearFields() {
   theme.value = "";
    nbreHeure.value = "";
    searchInput.value = "";
    // console.log("eehh");

  }
  // modification 
  editButton.addEventListener("click", (e) => {
    const themeInput= theme.value,
    nbreHeureInput= nbreHeure.value;
    console.log(themeInput,nbreHeureInput);
    
    if (themeInput === "" || nbreHeureInput === "") {
      showAlert("Veuillez remplir tous les champs", "danger", FORM)
    } else {
      const iscoursExist = AllCours.some((i) => i.theme === themeInput && i.identifiant !== currentCours.identifiant);
      if (iscoursExist) {
        console.log("ajout", iscoursExist);
        showAlert("Ce cours existe déja!", "danger", FORM)
      } else {
        const index = AllCours.findIndex(cours => cours.identifiant === currentCours.identifiant);
        if (index !== -1) {
          AllCours[index] = { identifiant:currentCours.identifiant, theme: themeInput, nbreHeure: nbreHeureInput }
          listerCours(AllCours)
          localStorage.setItem("ListCours", JSON.stringify(AllCours));
          handleModalForm("close")
          showAlert("Cours modifié avec succès", "success", LIST)
        }else {
          showAlert("Ce cours n'existe pas!", "danger", FORM)
        }
      
      }
    }

  })
  // supprimer 
  deleteButton.addEventListener("click", (e) => {
    if (currentCours) {
      const index = AllCours.findIndex(cours => cours.identifiant === currentCours.identifiant);
      if (index !== -1) {
        AllCours.splice(index, 1);
        listerCours(AllCours)
        localStorage.setItem("ListCours", JSON.stringify(AllCours));
        handleModalForm("close")
        showAlert("Cours supprimé avec succès", "success", LIST)
      }else {
        showAlert("Ce cours n'existe pas!", "danger", FORM)
      }
    }

  })
  // ajout 
  saveButton.addEventListener("click", (e) => {
    //target.parentElement.parentElement.remove();
    // showAlert("Cours Supprimé", "danger", LIST);
    const themeInput= theme.value,
    nbreHeureInput= nbreHeure.value;
    console.log(themeInput,nbreHeureInput);
    
    if (themeInput === "" || nbreHeureInput === "") {
      showAlert("Veuillez remplir tous les champs", "danger", FORM)
    } else {
      const iscoursExist = AllCours.some((i) => i.theme === themeInput);
      if (iscoursExist) {
        console.log("ajout", iscoursExist);
        showAlert("Ce cours existe déja!", "danger", FORM)
      } else {
        const lastId = Math.max(...AllCours.map(i => i.identifiant));
        console.log("ajout", lastId);
        const newCours = {
          identifiant: lastId + 1,
          theme: themeInput,
          nbreHeure: nbreHeureInput,
        }
        AllCours.push(newCours);
        listerCours(AllCours)
        localStorage.setItem("ListCours", JSON.stringify(AllCours));
        handleModalForm("close")
        showAlert("Cours enregistré avec succès", "success", LIST)
      }
    }
  })

  // recherche un cours
searchInput.addEventListener('input', (e) => {
 /* const searchTerm = e.target.value.toLowerCase();
  const filteredCours = AllCours.filter(cours => 
      cours.theme.toLowerCase().includes(searchTerm
  );
  listerCours(filteredCours);*/
  searchTerm = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let filteredCours=AllCours
      if (searchTerm !== "") {
         filteredCours = AllCours.filter(cours => 
          cours?.theme?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm) ||
          cours?.nbreHeure.toString().includes(searchTerm)
         
        );
        if(filteredCours.length === 0) {
          showAlert("Aucun résultat", "danger", LIST)
        }
        
      } 
      listerCours(filteredCours);
    
});
  listerCours(AllCours)
})