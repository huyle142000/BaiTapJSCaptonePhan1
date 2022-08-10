// Xử lý modal
var mymodal = document.getElementById('my_modal');

//Show modal
var storeCart = document.getElementById('store_cart');
storeCart.addEventListener('click', function (e) {
    mymodal.classList.add('show')
})


// closeModal
var closeModal = document.querySelector('.modal_close');
closeModal.addEventListener('click', function(e) {
    mymodal.classList.remove('show')
    
})
var overlay = document.querySelector('.overlay');

overlay.addEventListener('click', function (e) {
    closeModal.click();
});








//ProductAXIOS
var productList = new ProductList();

function getProductList() {
    productList.getProduct().then(function (result) {
        console.log(result);
        showWeb(result.data);
    }).catch(function (err) { });
}
getProductList()

function showWeb(data) {
    var content = '';
    var stt = 1;
    data.map(function (item) {
        content += `
        <div class="col-3 wrap-products">
        <div class="store_product">
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
                    <button type="button" class="btn" onclick="">Add</button>
                 </div>
            </div>
        </div>
        </div>
        `
    });
    document.getElementById('store_list-products').innerHTML = content;
}





