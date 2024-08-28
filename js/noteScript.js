document.addEventListener('DOMContentLoaded', function () {
  const AllNote = JSON.parse(localStorage.getItem('ListNote'))
  const AllCours = JSON.parse(localStorage.getItem('ListCours'))
  const AllEtudiant = JSON.parse(localStorage.getItem('etudiants'))
  const AllEnseignant = JSON.parse(localStorage.getItem('ListEnseignant'))

  const modalElement = document.getElementById('noteFormContainer');
  const saveButton = document.getElementById('saveButton');
  const editButton = document.getElementById('editButton');
  const deleteButton = document.getElementById('deleteButton');
  const modalTitle = document.getElementById('modal-title');
  const searchInput = document.getElementById('searchInput');
  const etudiantSelect = document.getElementById('etudiantSelect');
  const enseignantSelect = document.getElementById('enseignantSelect');
  const coursSelect = document.getElementById('coursSelect');
  const noteValue = document.getElementById('noteValue');
  const alertElement = document.querySelector(".alert")
  const LIST = "liste";
  const FORM = "Form";
  // Initialisation du note selectionné
  let currentNote = null;
  let fullDataNote = null;
  // Fonction pour afficher les information d'un note
  function affichernote(note) {
    /*console.log("ggg", note)
    theme.value = note.theme;
    nbreHeure.value = parseInt(note.nbreHeure);*/
console.log("afficher")
const optionEmptyEtudiant = document.createElement('option');
      optionEmptyEtudiant.value = "";
      optionEmptyEtudiant.textContent ="Selectionnez un etudiant";
      etudiantSelect.appendChild(optionEmptyEtudiant);

      const optionEmptyEnseignant = document.createElement('option');
      optionEmptyEnseignant.value = "";
      optionEmptyEnseignant.textContent ="Selectionnez un enseignant";
      enseignantSelect.appendChild(optionEmptyEnseignant);

      const optionEmptyCours = document.createElement('option');
      optionEmptyCours.value = "";
      optionEmptyCours.textContent ="Selectionnez un cours";
      coursSelect.appendChild(optionEmptyCours);

      AllEtudiant.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent =`${item?.prenom ?? ""} ${item?.nom ?? ""}`;
        etudiantSelect.appendChild(option);
    });

      AllEnseignant.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent =`${item?.prenom ?? ""} ${item?.nom ?? ""}`;
        enseignantSelect.appendChild(option);
    });

      AllCours.forEach(item => {
        const option = document.createElement('option');
        option.value = item.identifiant;
        option.textContent =item.theme;
        coursSelect.appendChild(option);
    });

    etudiantSelect.value = note.idEtudiant;
    enseignantSelect.value = note.idEnseignant;
    coursSelect.value = note.idCours;
    noteValue.value = note.valeur;
    currentNote = note;
    handleModalForm("open")
  }
  // Fonction pour afficher les note dans le tableau
  function listerNote(ListNote) {
    const tableBody = document.querySelector('#noteTable tbody');
    tableBody.innerHTML = '';
    
    const noteArray = ListNote.map((note) => {
      const enseignant = AllEnseignant.find((i) => i.id === note.idEnseignant)
      const etudiant = AllEtudiant.find((i) => i.id === note.idEtudiant)
      const cours = AllCours.find((i) => i.identifiant === note.idCours)
      const item = {
        ...note,
        enseignant: `${enseignant?.prenom ?? ""} ${enseignant?.nom ?? ""}`,
        etudiant: `${etudiant?.prenom ?? ""} ${etudiant?.nom ?? ""}`,
        cours: cours?.theme ?? ""

      }
      return item
    })
    if (!searchInput.value) {
      fullDataNote = noteArray;
    }
    noteArray.forEach(note => {
      const row = document.createElement('tr');
      row.insertCell(0).textContent = note.identifiant;
      row.insertCell(1).textContent = note.etudiant;
      row.insertCell(2).textContent = note.cours;
      row.insertCell(3).textContent = note.enseignant;
      row.insertCell(4).textContent = note.valeur;
      const actionCell = row.insertCell(5);
      const viewButton = document.createElement('button');
      viewButton.className = 'btn btn-success';
      viewButton.textContent = 'Détails';
      viewButton.onclick = () => affichernote(note);
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
    currentNote = null
    saveButton.style.display = 'none';
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';
  });

  // Listen when modal is open
  modalElement.addEventListener('shown.bs.modal', function (event) {
    console.log('Modal is opened!');
    
    if (currentNote === null) {
      const optionEmptyEtudiant = document.createElement('option');
      optionEmptyEtudiant.value = "";
      optionEmptyEtudiant.textContent ="Selectionnez un etudiant";
      etudiantSelect.appendChild(optionEmptyEtudiant);

      const optionEmptyEnseignant = document.createElement('option');
      optionEmptyEnseignant.value = "";
      optionEmptyEnseignant.textContent ="Selectionnez un enseignant";
      enseignantSelect.appendChild(optionEmptyEnseignant);

      const optionEmptyCours = document.createElement('option');
      optionEmptyCours.value = "";
      optionEmptyCours.textContent ="Selectionnez un cours";
      coursSelect.appendChild(optionEmptyCours);

      AllEtudiant.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent =`${item?.prenom ?? ""} ${item?.nom ?? ""}`;
        etudiantSelect.appendChild(option);
    });

      AllEnseignant.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent =`${item?.prenom ?? ""} ${item?.nom ?? ""}`;
        enseignantSelect.appendChild(option);
    });

      AllCours.forEach(item => {
        const option = document.createElement('option');
        option.value = item.identifiant;
        option.textContent =item.theme;
        coursSelect.appendChild(option);
    });
    
      saveButton.style.display = 'block';
      modalTitle.innerHTML = "Nouvelle note"
      
    } else {
      modalTitle.innerHTML = "Informations de la  note"
      editButton.style.display = 'block';
      deleteButton.style.display = 'block';
    }
  });

  function showAlert(message, className, place) {
    // console.log("showAlert",alertElement, document.querySelector(".alert"));
    if(document.querySelector(".alert")) {
      document.querySelector(".alert").remove()
    }
    
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    let container = document.querySelector(".screenContainer");
    let titleBox = document.querySelector(".titleBox");
    if (place === FORM) {
      container = document.querySelector(".modal-body");
      titleBox = document.querySelector("#noteForm");
    }

    container.insertBefore(div, titleBox);
    setTimeout(() => {
      if(document.querySelector(".alert")) {
      document.querySelector(".alert").remove()
      }
      /*if(alertElement) {
        alertElement.remove()
      }*/
    }
    , 3000)

  }
  // vider les champs
  function clearFields() {
    console.log('clearFields!');
    etudiantSelect.innerHTML = '';
    enseignantSelect.innerHTML = '';
    coursSelect.innerHTML = '';
    noteValue.value = "";
    searchInput.value = "";
    // console.log("eehh");

  }
  // modification 
  editButton.addEventListener("click", (e) => {
    const etudiantInput = etudiantSelect.value,
    enseignantInput = enseignantSelect.value,
    coursInput=coursSelect.value,
    noteInput=noteValue.value;
  console.log(etudiantInput, enseignantInput, coursInput, noteInput);

  if (etudiantInput === "" || enseignantInput === "" || coursInput === "" || noteInput === "") {
    showAlert("Veuillez remplir tous les champs", "danger", FORM)
  } else {
     
        const index = AllNote.findIndex(note => note.identifiant === currentNote.identifiant);
        if (index !== -1) {
          const editNote = {
            identifiant: currentNote.identifiant,
            idEtudiant: parseInt(etudiantInput),
            idCours: parseInt(coursInput),
            idEnseignant: parseInt(enseignantInput),
            valeur: parseInt(noteInput),
          }
          AllNote[index] = editNote
          listerNote(AllNote)
          localStorage.setItem("ListNote", JSON.stringify(AllNote));
          handleModalForm("close")
          showAlert("note modifié avec succès", "success", LIST)
        } else {
          showAlert("Ce note n'existe pas!", "danger", FORM)
        }

         }

  })
  // supprimer 
  deleteButton.addEventListener("click", (e) => {
    if (currentNote) {
      const index = AllNote.findIndex(note => note.identifiant === currentNote.identifiant);
      if (index !== -1) {
        AllNote.splice(index, 1);
        listerNote(AllNote)
        localStorage.setItem("ListNote", JSON.stringify(AllNote));
        handleModalForm("close")
        showAlert("note supprimée avec succès", "success", LIST)
      } else {
        showAlert("Cette note n'existe pas!", "danger", FORM)
      }
    }

  })
  // ajout 
  saveButton.addEventListener("click", (e) => {
    //target.parentElement.parentElement.remove();
    // showAlert("note Supprimé", "danger", LIST);
    const etudiantInput = etudiantSelect.value,
      enseignantInput = enseignantSelect.value,
      coursInput=coursSelect.value,
      noteInput=noteValue.value;
    console.log(etudiantInput, enseignantInput, coursInput, noteInput);

    if (etudiantInput === "" || enseignantInput === "" || coursInput === "" || noteInput === "") {
      showAlert("Veuillez remplir tous les champs", "danger", FORM)
    } else {
      /*const isnoteExist = AllNote.some((i) => i.theme === themeInput);
      if (isnoteExist) {
        console.log("ajout", isnoteExist);
        showAlert("Ce note existe déja!", "danger", FORM)
      } else {*/
       const lastId = Math.max(...AllNote.map(i => i.identifiant));
        // console.log("ajout", lastId);
        const newnote = {
          identifiant: lastId + 1,
          idEtudiant: parseInt(etudiantInput),
          idCours: parseInt(coursInput),
          idEnseignant: parseInt(enseignantInput),
          valeur: parseInt(noteInput),
        }
        AllNote.push(newnote);
       
        localStorage.setItem("ListNote", JSON.stringify(AllNote));
        listerNote(AllNote)
        handleModalForm("close")
        showAlert("note enregistré avec succès", "success", LIST)
     // }
    }
  })

  // recherche un note
  searchInput.addEventListener('input', (e) => {

    searchTerm = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
   
    
let filterednote=fullDataNote
    if (searchTerm !== "") {
      console.log("searchTerm exist", fullDataNote.length);
       filterednote = fullDataNote.filter(note =>
        note?.note?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm) ||
        note?.enseignant?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm) ||
        note?.etudiant?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm) ||
        note?.cours?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm)
      );
      if(filterednote.length === 0) {
        showAlert("Aucun résultat", "danger", LIST)
      }
      
    }else {
      console.log("no searchh",alertElement);
      /*if(alertElement) {
        console.log("ddddd alert remove");
        
        alertElement.remove()
      }*/
    }
      listerNote(filterednote);

  });
  listerNote(AllNote)
})