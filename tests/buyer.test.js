const expect = require("expect")
const {Market} = require("../Market")
const { asda, budgens, costco } = require('../marketplace');
const { Buyer } = require('../Buyer');

describe("Buyer", function(){
    beforeEach(() => {
        this.sellers = [
            {
                "inventory": {
                    "Apples": {
                        "quantity": 100,
                        "price": 5.25,
                        "startingQuantity": 100,
                        "priceHistory": [
                            5.25
                        ],
                        "stingyness": 0
                    },
                    "Oranges": {
                        "quantity": 150,
                        "price": 8,
                        "startingQuantity": 150,
                        "priceHistory": [
                            8
                        ],
                        "stingyness": 0
                    }
                },
                "deliveryWait": 5,
                "id": "Asda"
            },
            {
                "inventory": {
                    "Apples": {
                        "quantity": 25,
                        "price": 4.25,
                        "startingQuantity": 25,
                        "priceHistory": [
                            4.25
                        ],
                        "stingyness": 0
                    },
                    "Oranges": {
                        "quantity": 15,
                        "price": 6,
                        "startingQuantity": 15,
                        "priceHistory": [
                            6
                        ],
                        "stingyness": 0
                    }
                },
                "deliveryWait": 1,
                "id": "Budgens"
            },
            {
                "inventory": {
                    "Apples": {
                        "quantity": 250,
                        "price": 6.25,
                        "startingQuantity": 250,
                        "priceHistory": [
                            6.25
                        ],
                        "stingyness": 0
                    },
                    "Oranges": {
                        "quantity": 300,
                        "price": 10,
                        "startingQuantity": 300,
                        "priceHistory": [
                            10
                        ],
                        "stingyness": 0
                    }
                },
                "deliveryWait": 10,
                "id": "Costco"
            },
            {
                "inventory": {
                    "Apples": {
                        "quantity": 8,
                        "price": 2.25,
                        "startingQuantity": 250,
                        "priceHistory": [
                            6.25
                        ],
                        "stingyness": 0
                    }
                },
                "deliveryWait": 8,
                "id": "Any other"
            },
            {
                "inventory": {
                    "Apples": {
                        "quantity": 250,
                        "price": 4.25,
                        "startingQuantity": 100,
                        "priceHistory": [
                            5.25
                        ],
                        "stingyness": 0
                    },
                    "Oranges": {
                        "quantity": 50,
                        "price": 6,
                        "startingQuantity": 150,
                        "priceHistory": [
                            8
                        ],
                        "stingyness": 0
                    }
                },
                "deliveryWait": 5,
                "id": "Tesco"
            },
            {
                "inventory": {
                    "Oranges": {
                        "quantity": 70,
                        "price": 9,
                        "startingQuantity": 150,
                        "priceHistory": [
                            8
                        ],
                        "stingyness": 0
                    }
                },
                "deliveryWait": 5,
                "id": "Cada"
            },
        ]
        this.buyer = new Buyer({ sellers: this.sellers });
    })

    it("should bring the best price of any products given across all markets ", () => {
        const bestPrice = this.buyer.getBestPrice('Oranges');
        expect(bestPrice).toEqual(6);
    });

    it('should get the cheapest prices if from all sellers that have greater quantity', () =>{
        const bestPrices = this.buyer.fillWithBestPrices('Apples', 10);
        expect(bestPrices).toEqual(4.25);
    });

    it('should be the largest product in inventory', () => {
        const largestProduct = this.buyer.fillWithLargestSellers('Apples', 10);
        expect(largestProduct).toEqual(4.25);
    });

    it('should filter just products need to be validated', () => {
        const product = this.buyer.fillProductWithStock('Apples', 10);
        expect(product.length).toEqual(4);
    });

    it('should bring the seller with the grater product in stock', () => {
        const product = this.buyer.getMaxProductInInventory(this.sellers[0], this.sellers[1], 'Apples');
        expect(product).toHaveProperty('id', 'Asda');
        expect(product).toHaveProperty('inventory.Apples.quantity', 100);
    });

    it('should bring the seller with the grater product in stock with less price', () => {
        const product = this.buyer.getMaxProductInInventory(this.sellers[2], this.sellers[4], 'Apples');
        expect(product).toHaveProperty('id', 'Tesco');
        expect(product).toHaveProperty('inventory.Apples.quantity', 250);
        expect(product).toHaveProperty('inventory.Apples.price',  4.25);
    });

})

