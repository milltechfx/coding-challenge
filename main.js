const { asda, costco, budgens } = require("./marketplace");
const { Market } = require("./Market");
const { Buyer } = require("./Buyer");


function main() {
    const market = new Market([asda, budgens, costco]);
    let buyer = new Buyer(market);
    let product = "Apples";
    let quantity = 35;
    buyerFunctions(product, quantity, buyer);
    observeMarket(market);
};

function buyerFunctions(product, quantity, buyer) {
    console.log(`The best price for ${product} is ${buyer.getBestPrice(product)}`);
    console.log(`To completely as cheapest as possible ${quantity} ${product} costs ${buyer.completelyFill(product, quantity)}`);
    console.log(`To buy as quickly as possible ${quantity} ${product} costs ${buyer.quicklyFill(product, quantity)}`);
    console.log(`To buy with largests sellers as possible ${quantity} ${product} costs ${buyer.fillWithLargestSellers(product, quantity)}`)

}

function observeMarket(market) {
    market.observable.subscribe((mkt) => {
        console.log(`The current price of apples are ${market.sellers[0].inventory["Apples"].price}`)
    });
}

main()