// Xử lý modal
let mymodal = document.getElementById('my_modal');
let modal_body = document.querySelector('.modal_body');

//Show modal
let storeCart = document.getElementById('store_cart');
storeCart.addEventListener('click', function (e) {
    mymodal.classList.add('show');

})

// closeModal
let closeModal = document.querySelector('.modal_close');
closeModal.addEventListener('click', function (e) {
    mymodal.classList.remove('show')
})
let overlay = document.querySelector('.overlay');

overlay.addEventListener('click', function (e) {
    closeModal.click();
});


//Product List
let productListAdded = [];

//ProductAXIOS
let productList = new ProductList();

function getProductList() {
    productList.getProduct().then(function (result) {
        showWeb(result.data);
        //BTN add
        let storeProduct = document.querySelectorAll('.store_product-price');

        for (let i = 0; i < storeProduct.length; i++) {
            const c = storeProduct[i];
            //QUANTITY SPAN
            const quantityAmount = c.querySelector('.quantityAmount');
            const id = result.data[i].id;

            //btnAdd
            const btnAdd = c.querySelector('.btnAdd');

            btnAdd.addEventListener('click', function (e) {
                productAddtoCart(id, quantityAmount)
                c.classList.add('show')
            });
        }


    }).catch(function (err) {
    });
}
getProductList()



//SHOW TO WEB
function showWeb(data) {
    let content = '';
    let stt = 1;
    data.map(function (item) {
        content +=
            `
        <div class="wrap-products col-12 col-sm-4 col-lg-3">
        <div class="store_product-icon d-flex  justify-content-between">
            <i class="${item.iconLogo}"></i>
            <span>In Stock</span>
        </div>
        <div class="store_product-img">
            <img src="${item.imgChangeColor}" id="changeColor" class="img-fluid" alt="placeholder"/>
            <img src="${item.img}" class="img-fluid store_product-imgItem" alt="placeholder"/>
        </div>
        <div class="store_product-content">
            <div class="store_product-title d-flex  justify-content-between align-items-center mt-4">
                <span>${item.name}<br> ${item.desc}</span>
                <i class="fa-solid fa-heart"></i>
            </div>
            <div class="store_product-features">
                <h2>Features:</h2>
                <h2>- FrontCamera: ${item.frontCamera}</h2>
                <h2>- BackCamera: ${item.backCamera}</h2>
            </div>
            <div class="store_product-price d-flex  justify-content-between align-items-center">

                <span>${item.price}</span>

                <button type="button" class="btn btnAdd"">Add</button>
                
                <div class=" product_quantity">
                    <i class="fa-solid fa-circle-arrow-left btnDown" onclick="removeProduct('${item.id}')"></i>
                    <span class="quantityAmount${item.id} quantitySpan">1</span>
                    <i class="fa-solid fa-circle-arrow-right btnUp" onclick="addProduct('${item.id}')"></i>
            </div>

        </div>
    </div>
    </div>
                `
    });
    document.getElementById('store_list-products').innerHTML = content;
    let heart = document.querySelectorAll('.fa-heart');
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener('click', () => {
            heart[i].classList.toggle('active');
        })
    }
}
//add To Cart
function productAddtoCart(id) {
    productList.getProductToAdd(id).then(function (result) {
        let product = productListAdded.find((x) => x.id === id)
        if (product === undefined) {
            let quantity = 1;
            let { img, name, price, id, type, totalQuantity, backCamera, frontCamera, desc, iconLogo } = result.data;
            let productAddss = new Product(img, name, quantity, price, id, type, totalQuantity, backCamera, frontCamera, desc, iconLogo);
            productListAdded.push(productAddss)
            let valuequantity = `quantityAmount${id}`;
            let quantitySpan = document.querySelector(`.${valuequantity}`);
            quantitySpan.innerHTML = quantity;
        } else {
            product.quantity += 1;
        }
        console.log(productListAdded)
        //quantityCartIcon
        let quantityOfCart = document.querySelector('.quantityOfCart');
        let numberOfCart = 0;
        for (let i = 0; i < productListAdded.length; i++) {
            numberOfCart += productListAdded[i].quantity
        }
        quantityOfCart.innerHTML = numberOfCart;

        //showCart        
        showCart(productListAdded);

    }
    )

}

//Add Product
function addProduct(id) {
    let valuequantity = `quantityAmount${id}`
    let quantity = document.querySelector(`.${valuequantity}`)
    if (quantity.innerHTML < 10) {
        productListAdded.map(function (product) {
            if (product.id == id) {
                let plusQuantity = ++product.quantity;
                product.quantity = plusQuantity;

                //TotalAfteradd
                let numberPrice = String(product.price).split("$");
                let totals = Number(numberPrice[1]) * Number(plusQuantity);
                product.total = totals;

                //quantity inner
                quantity.innerHTML = plusQuantity;
            }
        })

    } else {
        let overAdded = document.getElementById('overAdded');
        let overAddedBody = document.querySelector('.overAdded_body');
        overAddedBody.innerHTML = `
        <h2 class="overAdded_title">You Can Only Buy 10 Items For Each Product</h2>
            <button class="btn btnOverAdded">OKAY</button>
            `

        overAdded.classList.toggle('show')

        let btnOverAdded = document.querySelector('.btnOverAdded');
        btnOverAdded.onclick = function () {
            storeCart.click()
            overAdded.classList.remove('show')

        }

    }

    showCart(productListAdded)


}

//Remove product
function removeProduct(id) {
    let valuequantity = `quantityAmount${id}`
    let quantity = document.querySelector(`.${valuequantity}`)
    console.log(quantity)

    if (Number(quantity.innerHTML) <= 10 && Number(quantity.innerHTML) > 1) {
        productListAdded.map(function (product) {
            if (product.id == id) {
                let minusQuantity = --product.quantity;
                product.quantity = minusQuantity;

                //quantity innerHTML
                quantity.innerHTML = minusQuantity;
                //TotalAfterRemove
                let numberPrice = String(product.price).split("$");
                let totals = Number(numberPrice[1]) * Number(minusQuantity);
                product.total = totals;

            }
        })

    } else {
        productListAdded.map(function (product) {
            if (product.id == id) {
                let minusQuantity = --product.quantity;
                product.quantity = minusQuantity;
                deleteProduct(id);
                quantity.parentElement.parentElement.classList.remove('show');

            }
        })
    }
    showCart(productListAdded)

}
//DELETE PRODUCT
function deleteProduct(id) {
    let quantity = document.querySelector(`.quantityAmount${id}`);
    console.log(quantity)
    productListAdded.map(function (product, index) {
        if (product.id === id) {
            productListAdded.splice(index, 1)
            product.quantity = 0;
            quantity.parentElement.parentElement.classList.remove('show');
            quantity.innerHTML = 1;


        }
    })
    showCart(productListAdded)



}
//Show to CART
function showCart(listProducts) {
    let tableProducts = document.querySelector('.table_products');
    let content = "";
    let divFilters = "";
    if (listProducts.length > 0) {
        content = "";
        let totalSpan = 0;
        listProducts.map(function (product) {
            let { img, name, id, quantity, price, total } = product;
            totalSpan += total;
            content += `
        <tr>
            <td><img src="${img}" class="img-fluid"></td>
            <td>${name}</td>
            <td>
                <i class="fa-solid fa-circle-arrow-left" class ="btnDown" onclick="removeProduct('${id}')"></i>
                 ${quantity}
                <i class="fa-solid fa-circle-arrow-right" class ="btnUp" onclick="addProduct('${id}')"></i>
            </td>
            <td>
                ${price}
            </td>
            <td>
                <i class="fa-solid fa-trash btnTrash"onclick="deleteProduct('${product.id}')" style="padding:8px"></i>
            </td>
        </tr>
        `
        })
        divFilters = `
        <tr>
        <td colspan="5">
        <div class="d-flex justify-content-between wrap-foundProduct">
        <input class="form-control" id="inputFound"style="display: inline-block;" type="text" placeholder="Found product">
        <i class="fa-solid fa-magnifying-glass" onclick="foundProduct()"></i>
        </div>
        </td>
        </tr>
        `
        document.querySelector('.modal_total').innerHTML = ` 
        <h2 class="totalH2">
            Total:<span style="color:green">$${totalSpan}</span>
            </h2>
            <button class="btn" id="purchaseProduct" onclick="purchaseProduct()">Purchase</button>
            <button class="btn" id="resetProduct" onclick="resetCart()">Reset</button>
            `

        tableProducts.innerHTML = divFilters + content;
    } else {
        content = `
        <div id="backHome">
            <i class="fa-solid fa-arrow-left removeHome"></i>
            <p>Back</p>
        </div>
        <tr>
            <td style = "font-size:50px ;" > No Product Added</td>
        </tr >
        `;
        document.querySelector('.modal_total').innerHTML = ``
        tableProducts.innerHTML = content;
        document.querySelector('.removeHome').onclick = function () {
            showCart(productListAdded);
        }
    }
    //quantityCartIcon
    let quantityOfCart = document.querySelector('.quantityOfCart');
    let numberOfCart = 0;
    for (let i = 0; i < listProducts.length; i++) {
        numberOfCart += listProducts[i].quantity
    }
    quantityOfCart.innerHTML = numberOfCart;

}
//Found Product
let productListFound = [];
function foundProduct() {
    document.getElementById('inputFound').classList.toggle('active');
    let inputFound = document.getElementById('inputFound').value
    productListAdded.map(function (product) {
        let productType = product.type;
        if (isNaN(productType)) {
            let toLowerCaseProduct = productType.toLowerCase();
            if (toLowerCaseProduct) {
                if (toLowerCaseProduct.indexOf(inputFound.toLowerCase()) >= 0) {
                    return productListFound.push(product);
                }
            }
        }

    })
    showCart(productListFound)
    console.log(productListAdded)



}

//RESET CART
function resetCart() {
    let quantityAmount = document.querySelectorAll(`.quantitySpan`);
    Array.from(quantityAmount).map(function (item) {
        item.innerHTML = 1;
    })
    productListAdded = [];
    let storeProduct = document.querySelectorAll('.store_product-price');
    for (let i = 0; i < storeProduct.length; i++) {
        const c = storeProduct[i];
        c.classList.remove('show');
    }

    return showCart(productListAdded);

}
