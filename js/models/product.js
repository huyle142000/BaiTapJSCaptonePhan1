function Product(img, name, quantity, price, id, type, totalQuantity,backCamera,frontCamera,desc,iconLogo) {
    this.img = img;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.id = id;
    this.type = type;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.desc = desc;
    this.iconLogo = iconLogo
    this.totalQuantity = totalQuantity;
    this.totalPrice = function () {
        var numberPrice = String(this.price).split("$");
        var totalPrice = Number(numberPrice[1]) * Number(this.quantity);
        return totalPrice
    }
    this.total = this.totalPrice()
}
