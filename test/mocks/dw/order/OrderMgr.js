'use strict';

var ArrayList = require('../../dw.util.Collection');

function createOrderModel() {
    return {
        'billingAddress': createOrderAddress(),
        'capturedAmount': {'currencyCode': '$', 'value': '50'},
        'confirmationStatus': {'displayValue': 'confirmed'},
        'paymentStatus': {'displayValue': 'confirmed'},
        'refundedAmount': {'currencyCode': '', 'value': ''},
        'defaultShipment': {'shippingAddress': createOrderAddress()},
        'custom': {'orderStatus': 'New'},
        'totalGrossPrice': {'currencyCode': '$', 'value': '50'},
        'customerOrderReference': null,
        'invoiceNo': '',

    }
}

function createOrderAddress() {
    return {
        'address1': '1 Drury Lane',
        'address2': null,
        'countryCode': {
            'displayValue': 'United States',
            'value': 'US'
        },
        'firstName': 'The Muffin',
        'lastName': 'Man',
        'city': 'Far Far Away',
        'phone': '333-333-3333',
        'postalCode': '04330',
        'stateCode': ''
    };
};

function searchOrders() {
    return new ArrayList([createOrderModel()]).iterator();
}

module.exports = {
    searchOrders: searchOrders
};