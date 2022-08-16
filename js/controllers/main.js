// Xử lý modal
var mymodal = document.getElementById('my_modal');
var modal_body = document.querySelector('.modal_body');

//Show modal
var storeCart = document.getElementById('store_cart');
storeCart.addEventListener('click', function (e) {
    mymodal.classList.add('show');

})

// closeModal
var closeModal = document.querySelector('.modal_close');
closeModal.addEventListener('click', function (e) {
    mymodal.classList.remove('show')
})
var overlay = document.querySelector('.overlay');

overlay.addEventListener('click', function (e) {
    closeModal.click();
});


//Product List
var productListAdded = [];

//ProductAXIOS
var productList = new ProductList();

function getProductList() {
    productList.getProduct().then(function (result) {
        showWeb(result.data);
        //BTN add
        var storeProduct = document.querySelectorAll('.store_product-price');

        for (var i = 0; i < storeProduct.length; i++) {
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

        getLocalstorages()

    }).catch(function (err) {
    });
}
getProductList()



//SHOW TO WEB
function showWeb(data) {
    var content = '';
    var stt = 1;
    data.map(function (item) {
        content += `
        <div class="card wrap-products">
        <div class="store_product-icon d-flex  justify-content-between">
        <i class="${item.iconLogo}"></i>
        <span>In Stock</span>
        </div>
        <div class="store_product-img">
        <img src="${item.img}" class="img-fluid" alt="placeholder" />
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
                
                <div class="product_quantity">
                <i class="fa-solid fa-circle-arrow-left btnDown" onclick="removeProduct('${item.id}')"></i>
                <span class="quantityAmount${item.id} quantitySpan" >1</span>
                <i class="fa-solid fa-circle-arrow-right btnUp"  onclick="addProduct('${item.id}')"></i>
                </div>
                
                </div>
                </div>
                </div>
                `
    });
    document.getElementById('store_list-products').innerHTML = content;
    var heart = document.querySelectorAll('.fa-heart');
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener('click', () => {
            heart[i].classList.toggle('active');
        })
    }
}
//add To Cart
function productAddtoCart(id) {
    productList.getProductToAdd(id).then(function (result) {
        var quantitys = 1;
        var productAddss = new Product(result.data.img, result.data.name, quantitys, result.data.price, result.data.id, result.data.type);
        productListAdded.push(productAddss);

        //valueQuantity
        var valuequantity = `quantityAmount${id}`;
        var quantity = document.querySelector(`.${valuequantity}`);
        quantity.innerHTML = quantitys;

        //quantityCartIcon
        var quantityOfCart = document.querySelector('.quantityOfCart');
        var numberOfCart = 0;
        for (var i = 0; i < productListAdded.length; i++) {
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
    var valuequantity = `quantityAmount${id}`

    var quantity = document.querySelector(`.${valuequantity}`)
    if (quantity.innerHTML < 10) {
        productListAdded.map(function (product) {
            if (product.id == id) {
                var plusQuantity = ++product.quantity;
                product.quantity = plusQuantity;

                //TotalAfteradd
                var numberPrice = String(product.price).split("$");
                var totals = Number(numberPrice[1]) * Number(plusQuantity);
                product.total = totals;

                //quantity inner
                quantity.innerHTML = plusQuantity;
            }
        })

    } else {
        var overAdded = document.getElementById('overAdded');
        var overAddedBody = document.querySelector('.overAdded_body');
        overAddedBody.innerHTML = `
        <h2 class="overAdded_title">You Can Only Buy 10 Items For Each Product</h2>
            <button class="btn btnOverAdded">OKAY</button>
            `

        overAdded.classList.toggle('show')

        var btnOverAdded = document.querySelector('.btnOverAdded');
        btnOverAdded.onclick = function () {
            storeCart.click()
            overAdded.classList.remove('show')

        }

    }

    showCart(productListAdded)


}

//Remove product
function removeProduct(id) {
    var valuequantity = `quantityAmount${id}`
    var quantity = document.querySelector(`.${valuequantity}`)
    console.log(quantity)

    if (Number(quantity.innerHTML) <= 10 && Number(quantity.innerHTML) > 1) {
        productListAdded.map(function (product) {
            if (product.id == id) {
                var minusQuantity = --product.quantity;
                product.quantity = minusQuantity;

                //quantity innerHTML
                quantity.innerHTML = minusQuantity;
                //TotalAfterRemove
                var numberPrice = String(product.price).split("$");
                var totals = Number(numberPrice[1]) * Number(minusQuantity);
                product.total = totals;

            }
        })

    } else {
        productListAdded.map(function (product) {
            if (product.id == id) {
                var minusQuantity = --product.quantity;
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
    var quantity = document.querySelector(`.quantityAmount${id}`);
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
function showCart(productListAdded) {
    var tableProducts = document.querySelector('.table_products');
    var content = "";
    var divFilters = "";
    if (productListAdded.length > 0) {
        content = "";
        var total = 0;
        productListAdded.map(function (product) {
            total += product.total;
            content += `
        <tr>
            <td><img src="${product.imgProduct}" class="img-fluid"></td>
            <td>${product.name}</td>
            <td>
                <i class="fa-solid fa-circle-arrow-left" class ="btnDown" onclick="removeProduct('${product.id}')"></i>
                 ${product.quantity}
                <i class="fa-solid fa-circle-arrow-right" class ="btnUp" onclick="addProduct('${product.id}')"></i>
            </td>
            <td>
                ${product.price}
            </td>
            <td>
                <i class="fa-solid fa-trash btnTrash"onclick="deleteProduct('${product.id}')" style="padding:8px"></i>
            </td>
        </tr>
        `
        })
        divFilters = `
        <tr>
        <td colspan="5  ">
        <div class="d-flex justify-content-between">
        <input class="form-control" id="inputFound"style="display: inline-block;" type="text" placeholder="Found product">
        <i class="fa-solid fa-magnifying-glass" onclick="foundProduct()"></i>
        </div>
        </td>
        </tr>
        `
        document.querySelector('.modal_total').innerHTML = ` 
        <h2 class="totalH2">
            Total:<span style="color:green">$${total}</span>
        </h2>
        <button class="btn" id="purchaseProduct" onclick="purchaseProduct()">Purchase</button>
        <button class="btn" id="resetProduct" onclick="resetCart()">Reset</button>
        `

    } else {
        content = `
        <tr>
            <td style = "font-size:50px ;" > No Product Added</td>
        </tr >
        `;
        document.querySelector('.modal_total').innerHTML = ``

    }
    //quantityCartIcon
    var quantityOfCart = document.querySelector('.quantityOfCart');
    var numberOfCart = 0;
    for (var i = 0; i < productListAdded.length; i++) {
        numberOfCart += productListAdded[i].quantity
    }
    quantityOfCart.innerHTML = numberOfCart;
    setLocalstorages();

    return tableProducts.innerHTML = divFilters + content;
}
//Found Product
function foundProduct() {
    document.getElementById('inputFound').classList.toggle('active');
    var inputFound = document.getElementById('inputFound').value
    var productListFound = [];
    productListAdded.map(function (product) {
        var productType = product.type;
        console.log(productType)
        if (isNaN(productType)) {
            var toLowerCaseProduct = productType.toLowerCase();
            if (toLowerCaseProduct) {

                if (toLowerCaseProduct.indexOf(inputFound.toLowerCase()) >= 0) {
                    return productListFound.push(product);
                }

            }
        }

    })
    showCart(productListFound)
}


