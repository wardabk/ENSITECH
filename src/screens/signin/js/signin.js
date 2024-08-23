function signin() {
    const connectedUser={prenom: "Oumou", nom:"Sow", fonction:"Responsable des études"}
   localStorage.setItem("connectedUser", JSON.stringify(connectedUser)); 
   window.location.href = "../home/index.html"; 
}

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("mail").value.trim();
    const password = document.getElementById("mdp").value.trim();
    
       if (email === "" || password === "") {
        alert("Veuillez remplir tous les champs avant de vous connecter.");
    } else { 
        signin();
       
    }
});
