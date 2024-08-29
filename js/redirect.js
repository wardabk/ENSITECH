function checkUserConnection() {
    const connectedUser = localStorage.getItem('connectedUser'); 


    if (connectedUser) {
        // console.log("dd", JSON.parse(connectedUser).fonction==="Directeur");
        if(JSON.parse(connectedUser).fonction==="Directeur"){
        window.location.href = "src/screens/home/index.html";
        // console.log(("i am director"));
         
        } else {
            window.location.href = "src/screens/etudiant/index.html"; 
            // console.log(("i am resp etude"));
        }
    } else {
       
        window.location.href = "src/screens/signin/index.html";
    }
}

// Call the function on page load
checkUserConnection();