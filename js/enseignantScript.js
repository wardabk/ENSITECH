document.addEventListener('DOMContentLoaded', function () {
    const AllEnseignants = JSON.parse(localStorage.getItem('ListEnseignants')) || [];
    const modalElement = document.getElementById('enseignantFormContainer');
    const saveButton = document.getElementById('saveButton');
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');
    const modalTitle = document.getElementById('modal-title');
    const prenom = document.getElementById('prenom');
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const adresse = document.getElementById('adresse');
    const telephone = document.getElementById('telephone');
    const dateNaissance = document.getElementById('dateNaissance');
    const searchInput = document.getElementById('searchInput');
    const LIST = "liste";
    const FORM = "Form";

    let currentEnseignant = null;

    function afficherEnseignant(enseignant) {
        prenom.value = enseignant.prenom;
        nom.value = enseignant.nom;
        email.value = enseignant.email;
        adresse.value = enseignant.adresse;
        telephone.value = enseignant.telephone;
        dateNaissance.value = enseignant.dateNaissance;
        currentEnseignant = enseignant;
        handleModalForm("open");
    }

    function listerEnseignants(listEnseignants) {
        const tableBody = document.querySelector('#enseignantTable tbody');
        tableBody.innerHTML = '';

        listEnseignants.forEach(enseignant => {
            const row = document.createElement('tr');
            row.insertCell(0).textContent = enseignant.id;
            row.insertCell(1).textContent = enseignant.prenom;
            row.insertCell(2).textContent = enseignant.nom;
            row.insertCell(3).textContent = enseignant.email;
            row.insertCell(4).textContent = enseignant.adresse;
            row.insertCell(5).textContent = enseignant.telephone;
            row.insertCell(6).textContent = enseignant.dateNaissance;

            const actionCell = row.insertCell(7);

            // Bouton "Voir"
            const viewButton = document.createElement('button');
            viewButton.className = 'btn btn-primary';
            viewButton.textContent = 'Voir';
            viewButton.onclick = () => afficherEnseignant(enseignant);
            actionCell.appendChild(viewButton);

            // Ajout du bouton "Associer"
            const associerButton = document.createElement('button');
            associerButton.className = 'btn btn-warning ms-2';
            associerButton.textContent = 'Associer';
            associerButton.onclick = () => afficherFormulaireAssociation(enseignant);
            actionCell.appendChild(associerButton);

            tableBody.appendChild(row);
        });
    }

    function handleModalForm(action) {
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            if (action === "open") {
                modalInstance.show();
            } else if (action === "close") {
                modalInstance.hide();
            }
        }
    }

    modalElement.addEventListener('hidden.bs.modal', function () {
        clearFields();
        modalTitle.innerHTML = "";
        currentEnseignant = null;
        saveButton.style.display = 'none';
        editButton.style.display = 'none';
        deleteButton.style.display = 'none';
    });

    modalElement.addEventListener('shown.bs.modal', function () {
        if (currentEnseignant === null) {
            saveButton.style.display = 'block';
            modalTitle.innerHTML = "Nouveau Enseignant";
        } else {
            modalTitle.innerHTML = "Informations de l'Enseignant";
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
            titleBox = document.querySelector("#enseignantForm");
        }

        container.insertBefore(div, titleBox);
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }

    function clearFields() {
        prenom.value = "";
        nom.value = "";
        email.value = "";
        adresse.value = "";
        telephone.value = "";
        dateNaissance.value = "";
        searchInput.value = "";
    }

    editButton.addEventListener("click", (e) => {
        const prenomInput = prenom.value,
            nomInput = nom.value,
            emailInput = email.value,
            adresseInput = adresse.value,
            telephoneInput = telephone.value,
            dateNaissanceInput = dateNaissance.value;

        if (!prenomInput || !nomInput || !emailInput || !adresseInput || !telephoneInput || !dateNaissanceInput) {
            showAlert("Veuillez remplir tous les champs", "danger", FORM);
        } else {
            const isEnseignantExist = AllEnseignants.some(
                (i) => i.email === emailInput && i.id !== currentEnseignant.id
            );
            if (isEnseignantExist) {
                showAlert("Cet enseignant existe déjà!", "danger", FORM);
            } else {
                const index = AllEnseignants.findIndex(enseignant => enseignant.id === currentEnseignant.id);
                if (index !== -1) {
                    AllEnseignants[index] = {
                        id: currentEnseignant.id,
                        prenom: prenomInput,
                        nom: nomInput,
                        email: emailInput,
                        adresse: adresseInput,
                        telephone: telephoneInput,
                        dateNaissance: dateNaissanceInput
                    };
                    listerEnseignants(AllEnseignants);
                    localStorage.setItem("ListEnseignants", JSON.stringify(AllEnseignants));
                    handleModalForm("close");
                    showAlert("Enseignant modifié avec succès", "success", LIST);
                } else {
                    showAlert("Cet enseignant n'existe pas!", "danger", FORM);
                }
            }
        }
    });

    deleteButton.addEventListener("click", (e) => {
        if (currentEnseignant) {
            const index = AllEnseignants.findIndex(enseignant => enseignant.id === currentEnseignant.id);
            if (index !== -1) {
                AllEnseignants.splice(index, 1);
                listerEnseignants(AllEnseignants);
                localStorage.setItem("ListEnseignants", JSON.stringify(AllEnseignants));
                handleModalForm("close");
                showAlert("Enseignant supprimé avec succès", "success", LIST);
            } else {
                showAlert("Cet enseignant n'existe pas!", "danger", FORM);
            }
        }
    });

    saveButton.addEventListener("click", (e) => {
        const prenomInput = prenom.value,
            nomInput = nom.value,
            emailInput = email.value,
            adresseInput = adresse.value,
            telephoneInput = telephone.value,
            dateNaissanceInput = dateNaissance.value;

        if (!prenomInput || !nomInput || !emailInput || !adresseInput || !telephoneInput || !dateNaissanceInput) {
            showAlert("Veuillez remplir tous les champs", "danger", FORM);
        } else {
            const isEnseignantExist = AllEnseignants.some((i) => i.email === emailInput);
            if (isEnseignantExist) {
                showAlert("Cet enseignant existe déjà!", "danger", FORM);
            } else {
                const lastId = Math.max(...AllEnseignants.map(i => i.id), 0);
                const newEnseignant = {
                    id: lastId + 1,
                    prenom: prenomInput,
                    nom: nomInput,
                    email: emailInput,
                    adresse: adresseInput,
                    telephone: telephoneInput,
                    dateNaissance: dateNaissanceInput,
                };
                AllEnseignants.push(newEnseignant);
                listerEnseignants(AllEnseignants);
                localStorage.setItem("ListEnseignants", JSON.stringify(AllEnseignants));
                handleModalForm("close");
                showAlert("Enseignant enregistré avec succès", "success", LIST);
            }
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        let filteredEnseignants = AllEnseignants;
        if (searchTerm !== "") {
            filteredEnseignants = AllEnseignants.filter(enseignant =>
                enseignant.prenom.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm) ||
                enseignant.nom.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm) ||
                enseignant.email.toLowerCase().includes(searchTerm) ||
                enseignant.adresse.toLowerCase().includes(searchTerm) ||
                enseignant.telephone.includes(searchTerm) ||
                enseignant.dateNaissance.includes(searchTerm)
            );
            if (filteredEnseignants.length === 0) {
                showAlert("Aucun résultat", "danger", LIST);
            }
        }
        listerEnseignants(filteredEnseignants);
    });

    // Fonction pour afficher le formulaire d'association
    function afficherFormulaireAssociation(enseignant) {
        const enseignantSelect = document.getElementById('enseignantSelect');
        const coursSelect = document.getElementById('coursSelect');

        // Vider les options existantes
        enseignantSelect.innerHTML = '';
        coursSelect.innerHTML = '';

        // Ajouter l'enseignant sélectionné au formulaire
        const optionEnseignant = document.createElement('option');
        optionEnseignant.value = enseignant.id;
        optionEnseignant.textContent = `${enseignant.prenom} ${enseignant.nom}`;
        enseignantSelect.appendChild(optionEnseignant);

        // Charger les cours disponibles
        const allCours = JSON.parse(localStorage.getItem('ListCours')) || [];
        allCours.forEach(cours => {
            const optionCours = document.createElement('option');
            optionCours.value = cours.identifiant;
            optionCours.textContent = cours.theme;
            coursSelect.appendChild(optionCours);
        });

        // Afficher le formulaire
        const modalElement = document.getElementById('associationFormContainer');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.show();
    }

    // Gérer l'association lors du clic sur le bouton "Associer"
    document.getElementById('associerButton').addEventListener('click', function() {
        const enseignantId = document.getElementById('enseignantSelect').value;
        const coursId = document.getElementById('coursSelect').value;

        // Implémentez la logique pour enregistrer l'association ici
        // Exemple: Enregistrer l'association dans le localStorage, ou l'envoyer à un serveur

        alert(`Enseignant ${enseignantId} associé au cours ${coursId} avec succès!`);

        // Fermer le modal après l'association
        const modalElement = document.getElementById('associationFormContainer');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
    });



    listerEnseignants(AllEnseignants);
});