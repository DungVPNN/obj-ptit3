let store = document.getElementById(`store`);
let user = document.getElementById("user");
let relog = document.getElementById("relog");

let products = JSON.parse(localStorage.getItem("products"));

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
        
function render() {
    let data='';
    for(let i=0;i<products.length;i++){
        data += `
                <a href="../pages/product-detail.html?id=${products[i].id}" id="product" class="products-content" style="padding: 5px; text-decoration: none; color: black; max-width: 210px;">
                <img style="width: 200px; height: 200px;" src="${products[i].image}">
                <p class="product-name">${products[i].name}</p>
                <p style="color: red;">${VND.format(products[i].price)}</p>
                </a>
                `
    }
    store.innerHTML = data;
}
render();
        
let userLogin = JSON.parse(localStorage.getItem("users"))||[];
let renderUser = JSON.parse(localStorage.getItem("login"))||[];
        
setTimeout(checkUser, 1000);
let cartCount = document.getElementById("count");

function checkUser() {
    if(renderUser==""){
        relog.style.display = "block";
        user.innerHTML = "";
        window.location.href = "../pages/login.html";
    }
}
if(renderUser!=""){
   for (let i = 0; i < userLogin.length; i++) {
        if(userLogin[i].email===renderUser){
            if(userLogin[i].cart != ""){
                cartCount.style.display = "block";
                cartCount.innerHTML = userLogin[i].cart.length;
                break;
            }else{
                cartCount.style.display = "none";
            }
        }
    } 
}

if(renderUser!=""){
    relog.style.display = "none";
    for(let i=0;i<userLogin.length;i++){
        if(renderUser==userLogin[i].email){
            user.innerHTML = `
                            <div class="userInfor">
                                <a href="#">
                                <img style="width: 20px; height: 20px;" src="../assets/images/avt.png">
                                <t>${userLogin[i].name}</t>
                                </a>
                                <div class="userDown">
                                    <a href="#">Tài khoản của tôi</a>
                                    <a href="#">Đơn mua</a>
                                    <a href="../pages/login.html" onclick="logout()">Đăng xuất</a>
                                </div>
                            </div>
                            `
        }
    }
}
function logout() {
    localStorage.removeItem("login");
    relog.style.display = "block";
    user.innerHTML = "";
}