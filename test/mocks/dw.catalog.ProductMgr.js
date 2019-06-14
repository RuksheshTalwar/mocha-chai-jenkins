var Product = require('./dw.catalog.Product');

var products = {
    'P3': new Product(3),
    'P20': new Product(20),
    'P21': new Product(21),
    'P0': new Product(0)
}

module.exports = {
    getProduct: function(id) {
        return products[id];
    }
}