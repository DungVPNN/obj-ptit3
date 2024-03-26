let id = window.location.href.split(`?`)[1].split(`=`)[1];
let user = document.getElementById("user");
let relog = document.getElementById("relog");
let title = document.getElementById("title");
let detailProduct = document.getElementById("product-render");

let userLogin = JSON.parse(localStorage.getItem("users"))||[];
let renderUser = JSON.parse(localStorage.getItem("login"))||[];
let productDetail = JSON.parse(localStorage.getItem("products"))||[];

let product = productDetail.find(function (e, i){
    return e.id === +id;
});
title.innerHTML = product.name;

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

let cartCount = document.getElementById("count");
        
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

for(let i=0;i<userLogin.length;i++){
    if(userLogin[i].email===renderUser){
        user.innerHTML = `
                                <div class="userInfor">
                                    <a href="#">
                                        <img style="width: 20px; height: 20px;" src="../assets/images/avt.png">
                                        <t>${userLogin[i].name}</t>
                                    </a>
                                    <div class="userDown">
                                        <a href="#">Tài khoản của tôi</a>
                                        <a href="#">Đơn mua</a>
                                        <a href="../pages/login.html" onclick="logout(event)">Đăng xuất</a>
                                    </div>
                                </div>
                            `
    }
}

detailProduct.innerHTML = `
                            <div class="card mb-3" style="max-width: 1150px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${product.image}" class="img-fluid rounded-start" />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body" style="width: 500px;">
                                            <h5 class="card-title">${product.name}</h5>
                                            <p class="card-text">${VND.format(product.price)}</p>
                                            <div class="quantity-product">
                                                <p><small class="text-muted">Số lượng: <input type="number" class="amount-product" id="quantityToBuy" value="1" min="1"/></small></p>
                                                <p><small class="text-muted">${product.stock} sản phẩm hiện có</small></p>
                                            </div>
                                        </div>
                                        <t class="add-cart" onclick="addToCart(event)"><i class="bi bi-cart-plus"></i> Thêm vào giỏ hàng</t>
                                        <t class="buy" onclick="buyProduct(event)">Mua ngay</t>
                                        <div id="snackbar">Đã thêm sản phẩm vào giỏ hàng!!</div>
                                    </div>
                                </div>
                            </div>
                        `
function addToCart(e) {
    let quantityToBuy = document.getElementById("quantityToBuy"); 
    let checkLogin = JSON.parse(localStorage.getItem("login"));
    for (let i = 0; i < userLogin.length; i++) {
        if(checkLogin === userLogin[i].email){
            for (let j = 0; j < productDetail.length; j++) {
                if(id == productDetail[j].id){
                    let index = userLogin[i].cart.findIndex((item, index)=>{
                        return item.id == id;
                    });
                    if(index == -1){
                        userLogin[i].cart.push({...productDetail[j], quantity: +(quantityToBuy.value)});
                        cartCount.innerHTML = userLogin[i].cart.length;
                        localStorage.setItem("users", JSON.stringify(userLogin));
                        localStorage.setItem("usersRegister", JSON.stringify(userLogin));
                    }else{
                        userLogin[i].cart[index].quantity += +quantityToBuy.value;
                        localStorage.setItem("users", JSON.stringify(userLogin));
                        localStorage.setItem("usersRegister", JSON.stringify(userLogin));
                    }
                }
            }
            let alertLogin = document.getElementById("snackbar");
            alertLogin.className = "show";
            setTimeout(function(){ alertLogin.className = alertLogin.className.replace("show", ""); }, 3000);
        }
    }
    for (let i = 0; i < userLogin.length; i++) {
        if(userLogin[i].cart != ""){
            cartCount.style.display = "block";
            cartCount.innerHTML = userLogin[i].cart.length;
            break;
        }else{
            cartCount.style.display = "none";
        }
    }
}