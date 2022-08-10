function ProductList() {
    this.getProduct = function () {
        return axios({
            method: 'get',
            url: 'https://62e77bcf0e5d74566af56fcb.mockapi.io/JSCaption',
        });
    }
}