let register = document.getElementById("formRegister");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let email = document.getElementById("email");
let pass = document.getElementById("pass");

let nameError = document.getElementById("nameError");
let emailError1 = document.getElementById("emailError1");
let emailError2 = document.getElementById("emailError2");
let passError = document.getElementById("passError");

let usersRegister = JSON.parse(localStorage.getItem("usersRegister"))||[];
localStorage.setItem("usersRegister", JSON.stringify(usersRegister));
        
register.addEventListener("submit", function(e, i){
    e.preventDefault();
    if(!fName.value||!lName.value){
        nameError.style.display = "block";
    }else{
        nameError.style.display = "none";
    }
    if(!email.value){
        emailError1.style.display = "block";
    }else{
        emailError1.style.display = "none";
    }
    if(!pass.value){
        passError.style.display = "block";
    }else{
        passError.style.display = "none";
    }
    for(let i=0;i<usersRegister.length;i++){
        if(email.value == usersRegister[i].email){
            emailError2.style.display = "block";
            return;
        }else{
            emailError2.style.display = "none";
        }
    }
    if(fName.value && lName.value && email.value && pass.value){
            usersRegister.push({
            id: Math.ceil(Math.random() * 1000000000),
            cart: [],
            name: fName.value + " " + lName.value,
            email: email.value,
            password: pass.value,
            status: true,
        })
        localStorage.setItem("usersRegister", JSON.stringify(usersRegister));
        window.location.href = "login.html";
    }
})