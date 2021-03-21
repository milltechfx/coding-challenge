function productComparatorByPrice(a, b) {
    if (a.productPrice < b.productPrice) {
        return -1;
    }
    if (a.productPrice > b.productPrice) {
        return 1;
    }
    return 0;
}

function productComparatorByDeliveryWait(a, b) {
    if (a.deliveryWait < b.deliveryWait) {
        return -1;
    }
    if (a.deliveryWait > b.deliveryWait) {
        return 1;
    }
    return 0;
}

function productComparatorByQuantityDESC(a, b) {
    if (a.quantity < b.quantity) {
        return 1;
    }
    if (a.quantity > b.quantity) {
        return -1;
    }
    return 0;
}

module.exports = { productComparatorByPrice, productComparatorByDeliveryWait, productComparatorByQuantityDESC }