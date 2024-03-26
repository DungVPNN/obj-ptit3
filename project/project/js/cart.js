let userLogin = JSON.parse(localStorage.getItem("users"))||[];
let renderUser = JSON.parse(localStorage.getItem("login"))||[];
let cartProduct = document.getElementById("cartProduct");
let cartUser = document.getElementById("cartUser");
let renderCartProduct = document.getElementById("renderCartProduct");
let totalBill = document.getElementById("totalBill");


const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function renderCart() {
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
            let item = "";
            let total = "";
            if(userLogin[i].cart == ""){
                cartUser.style.display = "none";
                cartProduct.innerHTML = `<div class="cart-none">
                                            <img src="../assets/images/none-removebg-preview.png" alt="">
                                            <b>Giỏ hàng của bạn còn trống</b>
                                            <a href="../utils/index.html" class="btn-cart">Mua ngay</a>
                                        </div>
                                        `
            }else{
                for (let j = 0; j < userLogin[i].cart.length; j++) {
                    cartUser.style.display = "block";
                    item += `
                            <tr>
                                <th scope="row"><img style="width: 100px" src="${userLogin[i].cart[j].image}"/></th>
                                <td><t class="product-name">${userLogin[i].cart[j].name}</t></td>
                                <td class="text-price">${VND.format(userLogin[i].cart[j].price)}</td>
                                <td><button class="change-count-product" onclick="reduceProduct(${userLogin[i].cart[j].id})">-</button><input class="quantityProduct" type="text" value="${userLogin[i].cart[j].quantity}" style="width: 40px"><button class="change-count-product" onclick="increaseProduct(${userLogin[i].cart[j].id})">+</button></td>
                                <td class="text-price">${VND.format(+(userLogin[i].cart[j].price)*+(userLogin[i].cart[j].quantity))}</td>
                                <td><button class="remove-product" onclick="remove(${userLogin[i].cart[j].id})">Xóa</button></td>
                            </tr>
                            `
                            total += VND.format(+(userLogin[i].cart[j].price)*+(userLogin[i].cart[j].quantity));
                }
                renderCartProduct.innerHTML = item;
                totalBill.innerHTML = "Tổng: " + total;
            }
        }
    } 
}

renderCart();


let quantityProduct = document.querySelectorAll(".quantityProduct");

let removeProduct = document.querySelectorAll(".remove-product");

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

function remove(id) {
    for(let i=0;i<userLogin.length;i++){
        if(userLogin[i].email===renderUser){
            for(let j=0;j<userLogin[i].cart.length;j++){
                if(userLogin[i].cart[j].id===id){
                    let check = confirm("Bạn thực sự muốn xóa sản phẩm này chư?");
                    if(check){
                        userLogin[i].cart.splice(j,1);
                        localStorage.setItem("users", JSON.stringify(userLogin));
                        if(userLogin[i].cart != ""){
                            cartCount.style.display = "block";
                            cartCount.innerHTML = userLogin[i].cart.length;
                            break;
                        }else{
                            cartCount.style.display = "none";
                        }
                    }
                    renderCart();
                }
            } 
        }
    }
}


function reduceProduct(id) {
    let flag = true;
    for (let i = 0; i < userLogin.length; i++) {
        if(userLogin[i].email===renderUser){
            for (let j = 0; j < userLogin[i].cart.length; j++) {
                if(userLogin[i].cart[j].id===id){
                    if(userLogin[i].cart[j].quantity == 1){
                        flag = false;
                    }
                    if(flag){
                        userLogin[i].cart[j].quantity = --userLogin[i].cart[j].quantity;
                        localStorage.setItem("users", JSON.stringify(userLogin));   
                    }   
                }
            }
            renderCart();
        }
    }
}

function increaseProduct(id) {
    for (let i = 0; i < userLogin.length; i++) {
        if(userLogin[i].email===renderUser){
            for (let j = 0; j < userLogin[i].cart.length; j++) {
                if(userLogin[i].cart[j].id===id){
                    userLogin[i].cart[j].quantity = ++userLogin[i].cart[j].quantity;
                    localStorage.setItem("users", JSON.stringify(userLogin));
                }
                renderCart();
            }
        }
    }
}