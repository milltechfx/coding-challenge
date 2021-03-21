const { productComparatorByPrice, productComparatorByDeliveryWait, productComparatorByQuantityDESC } = require("./utils")

class Buyer {
    constructor(market) {
        this.market = market;
    }


    /**
     * This method should get the best price for a given product 
     * across all sellers
     */
    getBestPrice(product) {
        let price
        for (let seller of this.market.sellers) {
            let productPrice = seller && seller.inventory && seller.inventory[product] && seller.inventory[product].price
            if (price === undefined || productPrice < price) {
                price = productPrice
            }
        }
        if (price === undefined) {
            throw new Error("This product is not available")
        }
        return price;
    }

    /**
     * Completes the order using the cheapest price as possible
     * @param {string} product 
     * @param {int} quantity 
     */
    completelyFill(product, quantity) {
        let totalPrice = 0
        const listIdPrice = []
        let sellerMap = new Map()
        for (let seller of this.market.sellers) {
            listIdPrice.push({ id: seller.id, productPrice: seller.inventory[product].price })
            sellerMap.set(seller.id, seller)
        }
        const sortedlistIdPrice = listIdPrice.sort(productComparatorByPrice)
        return this.processTotalPrice(quantity, sortedlistIdPrice, sellerMap, product);
    }

    /**
     * Completes the order as fast as possible. Price does not matter
     * @param {string} product 
     * @param {int} quantity 
     */
    quicklyFill(product, quantity) {
        let totalPrice = 0
        const listIdDeliveryWait = []
        let sellerMap = new Map()
        for (let seller of this.market.sellers) {
            listIdDeliveryWait.push({ id: seller.id, deliveryWait: seller.deliveryWait })
            sellerMap.set(seller.id, seller)
        }
        const sortedlistDeliveryWait = listIdDeliveryWait.sort(productComparatorByDeliveryWait)
        return this.processTotalPrice(quantity, sortedlistDeliveryWait, sellerMap, product);
    }


    /**
     * This method should optimise price when filling an order
     * if the quantity is greater than any single seller can accomodate
     * then the next cheapest seller should be used.
     */
    fillWithBestPrices(product, quantity) {
        return this.completelyFill(product, quantity)
    }


    /**
     * This method should optimise for sellers with the largest inventory when filling an order
     * if the quantity is greater than any single seller can accomodate
     * then the next largest seller should be used.
     * if multiple sellers have the same amount of inventory
     * you should use the cheaper of the two.
     */
    fillWithLargestSellers(product, quantity) {
        const listIdQuantity = []
        let sellerMap = new Map()
        for (let seller of this.market.sellers) {
            listIdQuantity.push({ id: seller.id, quantity: seller.inventory[product].quantity })
            sellerMap.set(seller.id, seller)
        }
        const sortedlistQuantity = listIdQuantity.sort(productComparatorByQuantityDESC)
        return this.processTotalPrice(quantity, sortedlistQuantity, sellerMap, product);
    }

    processTotalPrice(quantity, sortedList, sellerMap, product) {
        let totalPrice = 0
        let remainedQuantity = quantity;
        let count = 0;
        while (remainedQuantity > 0 && count < sortedList.length) {
            let item = sortedList[count];
            let amountToRetrieve;
            const seller = sellerMap.get(item.id);
            let quantityProduct = seller.inventory[product].quantity;
            let priceProduct = seller.inventory[product].price;
            if (remainedQuantity > quantityProduct) {
                amountToRetrieve = quantityProduct;
            } else {
                amountToRetrieve = remainedQuantity;
            }
            totalPrice = totalPrice + (amountToRetrieve * priceProduct);
            remainedQuantity = remainedQuantity - amountToRetrieve;
            count++;
        }
        if (remainedQuantity > 0) {
            throw new Error(`Not enough products. We need ${remainedQuantity} products`);
        }
        return totalPrice;
    }
}

module.exports = { Buyer }
