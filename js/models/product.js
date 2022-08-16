function Product(img, name, quantity, price, id,type) {
    this.imgProduct = img;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.id = id;
    this.type = type;
    this.totalPrice = function () {
        var numberPrice =String(this.price).split("$");
        var totalPrice = Number(numberPrice[1]) * Number(this.quantity);
        return totalPrice
    }
    this.total=this.totalPrice()
}

// var asd = new Product(1,2,7,'$750',1)
// console.log(asd)
