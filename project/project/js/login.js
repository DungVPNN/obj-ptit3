let login = document.getElementById("formLogin");
let email = document.getElementById("emailUser");
let pass = document.getElementById("passUser");

let emailError1 = document.getElementById("emailError1");
let emailError2 = document.getElementById("emailError2");
let passError1 = document.getElementById("passError1");
let passError2 = document.getElementById("passError2");

let userLock = document.getElementById("userLock");

let usersLogin = JSON.parse(localStorage.getItem("usersRegister"))||[];
localStorage.setItem("users", JSON.stringify(usersLogin));
login.addEventListener("submit", function(e){
    e.preventDefault();

    emailError1.style.display = "none";
    emailError2.style.display = "none";
    passError1.style.display = "none";
    passError2.style.display = "none";
    userLock.style.display = "none";

    if(!email.value){
        emailError2.style.display = "block";
        return;
    }

    if(!pass.value){
        passError1.style.display = "block";
        return;
    }
    if(email.value === "admin@gmail.com" && pass.value === "123456789"){
        window.location.href = "../admin/admin.html";
        return;
    }
    let foundUser = false;
    for(let i = 0; i < usersLogin.length; i++){
        if(email.value === usersLogin[i].email){
            if(!usersLogin[i].status){
                userLock.style.display = "block";
                return;
            }
            foundUser = true;
            if(pass.value === usersLogin[i].password){
                var alertLogin = document.getElementById("snackbar");
                alertLogin.className = "show";
                setTimeout(function(){ alertLogin.className = alertLogin.className.replace("show", ""); }, 3000);
                setTimeout(function(){window.location.href = "../utils/index.html";}, 3000);
                localStorage.setItem("login", JSON.stringify(email.value));
                return;
            } else {
                passError2.style.display = "block";
                return;
            }
        }
    }

    if(!foundUser){
        emailError1.style.display = "block";
    }
});
