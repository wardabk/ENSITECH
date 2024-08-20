function signout() {
   
  // localStorage.setItem("connectedUser", JSON.stringify(connectedUser)); 
   // window.location.href = "../../dashboard/index.html"; 
   const projectRootUrl = window.location.origin + window.location.pathname.split('/').slice(0, -4).join('/');
   localStorage.clear();
   window.location.href = projectRootUrl+"/index.html"; 
 

   

}
document.addEventListener("DOMContentLoaded", function () {
  const logout = document.getElementById("signoutButton");
  if(logout) {
    //console.log("exist");
    document.getElementById("signoutButton").addEventListener("click", signout);
    
  } else {
    console.log(" logout not exist");
  }
})
