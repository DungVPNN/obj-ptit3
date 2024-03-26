let profile = document.getElementById("adminProfile");
let manager = document.getElementsByClassName("manager");
let managerItem = document.getElementsByClassName("manager-item");

let d = new Date();
let dd = d.getDate();
let mm = d.getMonth() + 1;
let yy = d. getFullYear();
let dateCr = dd + '/' + mm + '/' + yy;

let users = JSON.parse(localStorage.getItem("users"))||[];
let categorys = JSON.parse(localStorage.getItem("categorys"))||[];

let productName = document.getElementById("productName");
let productImage = document.getElementById("productImage");
let productStock = document.getElementById("productStock");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");

let productNameEdit = document.getElementById("productNameEdit");
let productImageEdit = document.getElementById("productImageEdit");
let productStockEdit = document.getElementById("productStockEdit");
let productPriceEdit = document.getElementById("productPriceEdit");
let productCategoryEdit = document.getElementById("productCategoryEdit");

formEdit.style.display = "none";

formAdd.style.display = "none";



const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

let products = JSON.parse(localStorage.getItem("products"))||[];

profile.innerHTML = `
                        <img style="width: 100px; height: 100px; border-radius:50%" src="../assets/images/admin.png" alt="">
                        <div style="color: white; font-size: 24px">Xin chào Admin!</div>
                    `

function manager1() {
    managerItem[0].style.display = "block";
    managerItem[1].style.display = "none";
    managerItem[2].style.display = "none";
    manager[2].style.background = "rgb(255, 216, 87)";
    manager[1].style.background = "#f84b34";
    manager[0].style.background = "#f84b34";
    let text = `
                <div style="display: flex; justify-content: space-between">
                    <h2 style="color: red">Danh sách sản phẩm:</h2>
                    <button class="Btn" onclick="addForm()">Thêm sản phẩm</button> 
                    </div>
                <table class="table">
                <thead>
                        <tr>         
                        <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Trữ lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col" colspan="2">Tùy chỉnh</th>
                        </tr>          
                    </thead>
                    <tbody>
                `
    for(let i=0;i<products.length;i++){
        products[i].id = i+1;
        localStorage.setItem("products", JSON.stringify(products));
        text += `
                    <tr>
                        <th>${i+1}</th>
                        <td><div class="productName">${products[i].name}</div></td>
                        <td><img style="width: 100px" src="${products[i].image}"/></td>
                        <td>${products[i].stock}</td>
                        <td>${VND.format(products[i].price)}</td>
                        <td><button class="Btn" onclick="editForm(${i})">Sửa</button></td>
                        <td><button class="Btn" onclick="deleteProduct(${i+1})">Xóa</button></td>
                    </tr>
                `
    }
    text += `  </tbody>
            </table>
            `;
    managerItem[0].innerHTML = text;
}
function manager2() {
    managerItem[1].style.display = "block";
    managerItem[0].style.display = "none";
    managerItem[2].style.display = "none";
    manager[0].style.background = "rgb(255, 216, 87)";
    manager[1].style.background = "#f84b34";
    manager[2].style.background = "#f84b34";
    let text = `
                <div style="display: flex; justify-content: space-between">
                    <h2 style="color: red">Danh sách Users đã đăng kí:</h2>
                </div>
                <table class="table">
                    <thead>
                        <tr>         
                        <th scope="col">STT</th>
                            <th scope="col">ID User</th>
                            <th scope="col">Tên User</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mật khẩu</th>
                            <th scope="col" colspan="3">Trạng thái</th>      
                        </tr>          
                    </thead>
                `
    for (let i = 0; i < users.length; i++) {
        text += `
                    <tr>
                        <th>${i+1}</th>
                        <td>${users[i].id}</td>
                        <td>${users[i].name}</td>
                        <td>${users[i].email}</td>
                        <td>${users[i].status}</td>
                        <td><button class="Btn" onclick="lockAcc(${i})">Khóa/Mở TK</button></td>
                    </tr>
                `
    }
    text += `  </tbody>
            </table>
            `;
    managerItem[1].innerHTML = text;
    
}
function manager3() {
    managerItem[2].style.display = "block";
    managerItem[1].style.display = "none";
    managerItem[0].style.display = "none";
    manager[1].style.background = "rgb(255, 216, 87)";
    manager[0].style.background = "#f84b34";
    manager[2].style.background = "#f84b34";
    let text = `
                <div style="display: flex; justify-content: space-between">
                    <h2 style="color: red">Danh sách danh mục sản phẩm:</h2>
                    <button class="Btn" onclick="categoryAdd()">Thêm danh mục</button> 
                    </div>
                <table class="table">
                    <thead>
                        <tr>         
                        <th scope="col">STT</th>
                            <th scope="col">Tên danh mục</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col" colspan="2">Tùy chỉnh</th>
                        </tr>          
                    </thead>
                    <tbody>
                `
    for(let i=0;i<categorys.length;i++){
        text += `
                    <tr>
                        <th>${categorys[i].id}</th>
                        <td><t>${categorys[i].name}</t></td>
                        <td>${categorys[i].date}</td>
                        <td><button class="Btn" onclick="categoryForm(${i})">Sửa</button></td>
                        <td><button class="Btn" onclick="deleteCategory(${i+1})">Xóa</button></td>
                    </tr>
                `
    }
    text += `       </tbody>
                </table>
            `;
    managerItem[2].innerHTML = text;
}

function addForm() {
    formAdd.style.display = "flex";
}

let idProduct;
function editForm(id) {
    formEdit.style.display = "flex";
    productNameEdit.value = products[id].name;
    productImageEdit.value = products[id].image;
    productStockEdit.value = products[id].stock;
    productPriceEdit.value = products[id].price;
    for(let i=0;i<categorys.length;i++){
        if(products[id].idCategory==categorys[i].id){
            console.log(productCategoryEdit.value);
            productCategoryEdit.value = categorys[i].name;
            break;
        }
    }
    idProduct = id;
}

function addProduct() {
    let id;
    for(let i=0;i<categorys.length;i++){
        if(productCategory.value == categorys[i].name){
            id = categorys[i].id;
            break;
        }
    }
    products.push({
        id: products.length + 1,
        name: productName.value,
        image: productImage.value,
        idCategory: id,
        stock: productStock.value,
        price: productPrice.value,
    });
    localStorage.setItem("products", JSON.stringify(products));
    closeAdd();
    manager1();
}  
function editProduct() {
    let id;
    for(let i=0;i<categorys.length;i++){
        if(productCategoryEdit.value == categorys[i].name){
            id = categorys[i].id;
            break;
        }
    }
    products.splice(idProduct, 1, {
        name: productNameEdit.value,
        image: productImageEdit.value,
        idCategory: id,
        stock: productStockEdit.value,
        price: productPriceEdit.value,
    })
    localStorage.setItem("products", JSON.stringify(products));
    closeEdit();
    manager1();
}
function deleteProduct(id) {
    let checkRemove = confirm("Xóa sản phẩm này?");
    if(checkRemove){
        if(id == products.length){
            products.pop();
            localStorage.setItem("products", JSON.stringify(products));
            manager1();
        }else{
            products.splice(id-1, 1);
            localStorage.setItem("products", JSON.stringify(products));
            manager1();
        }
    }
}
function lockAcc(id) {
    for(let i=0;i<users.length+1;i++){
        if(i==id){
            if(users[i].status){
                users[i].status = false;
                localStorage.setItem("usersRegister", JSON.stringify(users));
                manager2();
            }else{
                users[i].status = true;
                localStorage.setItem("usersRegister", JSON.stringify(users));
                manager2();
            }
        }
    }
}
function closeAdd() {
    formAdd.style.display = "none";
    productName.value ="";
    productImage.value ="";
    productStock.value ="";
    productPrice.value ="";
}
function closeEdit() {
    formEdit.style.display = "none";
}