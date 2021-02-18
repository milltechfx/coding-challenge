class Buyer {
    constructor(market) {
        this.market = market;
    }


    /**
     * This method should get the best price for a given product
     * across all sellers
     */
    getBestPrice(product) {
        const { sellers } = this.market;
        return sellers.reduce((min, item) => {
            if (item.inventory[product]) {
                min = Math.min(min, item.inventory[product].price);
            }
            return min;
        }, Number.MAX_SAFE_INTEGER);
    }


    /**
     * This method should optimise price when filling an order
     * if the quantity is greater than any single seller can accomodate
     * then the next cheapest seller should be used.
     */
    fillWithBestPrices(product, quantity) {
        const { sellers } = this.market;
        return sellers.reduce((min, productItem) => {
            if (productItem.inventory[product] && productItem.inventory[product].quantity >= quantity) {
                min = Math.min(min, productItem.inventory[product].price);
            }
            return min
        }, Number.MAX_SAFE_INTEGER);
    }


    /**
     * This method should optimise for sellers with the largest inventory when filling an order
     * if the quantity is greater than any single seller can accomodate
     * then the next largest seller should be used.
     * if multiple sellers have the same amount of inventory
     * you should use the cheaper of the two.
     */
    fillWithLargestSellers(product, quantity) {

        const tempSellers = this.fillProductWithStock(product, quantity);
        let maxItem = tempSellers.pop();

        while (tempSellers.length) {
            const curretValue = tempSellers.pop();
            if (!curretValue.inventory[product]) {
                continue;
            }
            maxItem = this.getMaxProductInInventory(maxItem, curretValue, product);
        }

        return maxItem.inventory[product].price;
    }

    fillProductWithStock(product, quantity) {
        const { sellers } = this.market;
        return sellers.filter(item => {
            if (item.inventory[product]) {
                return item.inventory[product].quantity > quantity
            }
        });
    }

    getMaxProductInInventory(maxItem, curretValue, product) {
        const firstProduct = maxItem.inventory[product];
        const secondProduct = curretValue.inventory[product];
        if (this.isQuantityOfSecondGraterThanFirstProduct(firstProduct, secondProduct)) {
            maxItem = curretValue;
        } else if (this.isTheSameQuantity(firstProduct, secondProduct)) {
            if (this.isThePriceFirstGraterThanSecondProduct(firstProduct, secondProduct)) {
                maxItem = curretValue
            }
        }
        return maxItem;
    }

    isThePriceFirstGraterThanSecondProduct(firstProduct, secondProduct) {
        return firstProduct.price > secondProduct.price;
    }

    isQuantityOfSecondGraterThanFirstProduct(firstProduct, secondProduct) {
        return firstProduct.quantity < secondProduct.quantity;
    }

    isTheSameQuantity(firstProduct, secondProduct) {
        return firstProduct.quantity === secondProduct.quantity;
    }
}

module.exports = {Buyer}
