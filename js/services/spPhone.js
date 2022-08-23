class ProductList {
    getProduct = () => {
        return axios({
            method: 'get',
            url: 'https://62e77bcf0e5d74566af56fcb.mockapi.io/JSCaption',
        });
    };
    getProductToAdd = (id) => {
        return axios({
            method: 'get',
            url: `https://62e77bcf0e5d74566af56fcb.mockapi.io/JSCaption/${id}`,
        });
    };
    postProduct = (data) => {
        return axios({
            method: 'post',
            url: `https://62e77bcf0e5d74566af56fcb.mockapi.io/JSCaption/${id}`,
            data: data
        });
    };
    checkProduct = (listProduct, id, data) => {
        for (let i = 0; i < listProduct.length; i++) {
            if (listProduct[i].id === id) {
                let increaseQuantity = listProduct[i].quantity + 1;
                listProduct[i].quantity = increaseQuantity
            }

        }
        let quantitys = 1;
        let productAddss = new Product(data.img, data.name, quantitys, data.price, data.id, data.type);
        listProduct.push(productAddss);

    }
}