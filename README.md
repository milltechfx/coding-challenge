# CODING CHALLENGE
Prior considerations:
1. Code is not testing all possible scenarios
2. Code is not defensive
3. Should be more tests, covertura, mutation testing, functional tests...

As this is an academic example I solved the problems attacking them directly

## Implement Buyer
### Introduction
There is something that I didn't understand. The class Buyer defines the methods:
- fillWithBestPrices
- fillWithLargestSellers

But they are not used ANYWHERE in the code

What I did is the following


### getBestPrice

Returns the best price accross all sellers
Cost: O(n) due to iterates all sellers


### completelyFill
Completes the order using the cheapest price as possible
The algortihm is trying to get the cheapest possible products from the first seller. If we need more products we take the second cheapest. And the alorithm keeps going until the N seller that is the more expensive one.

Cost Worst Case Scenario Computation = O(n)
Formula Computation = O(n) + O(n) = 2*O(n) -> O(n)
Extra Memory = O(n)

We can accomplish this because we are using extra memory.
We create an Map<String, Seller> where the key is the ID
As we order the sellers by the cheapest price, we can acces them with a cost of O(1) using the map

### quicklyFill
Completes the order as fast as possible. Price does not matter
The algortihm is trying to get the products from the seller that has LESS deliveryWait. If we need more products we take the second seller with LESS deliveryWait. And the alorithm keeps going until the N seller.

Cost Worst Case Scenario Computation = O(n)
Formula Computation = O(n) + O(n) = 2*O(n) -> O(n)
Extra Memory = O(n)

We can accomplish this because we are using extra memory.
We create an Map<String, Seller> where the key is the ID
As we order the sellers by the deliveryWait, we can acces them with a cost of O(1) using the map


# fillWithLargestSellers
Completes the order using the sellers with bigger quantity.
The algortihm is trying to get the products from the seller that has BIGGER quantity. If we need more products we take the second seller with BIGGER quantity. And the alorithm keeps going until the N seller.

Cost Worst Case Scenario Computation = O(n)
Formula Computation = O(n) + O(n) = 2*O(n) -> O(n)
Extra Memory = O(n)

We can accomplish this because we are using extra memory.
We create an Map<String, Seller> where the key is the ID
As we order the sellers by the quantity of products, we can acces them with a cost of O(1) using the map


## Pricing Bug
There is an error on the formula
```javascript
const v = 0.1
const ec = getExpectedChange(this.random_generator);
const alpha = inventory.startingQuantity
const beta = inventory.quantity
const inv_based_change = Math.log10(beta / alpha) * (-v);
const sentimentChange = inv_based_change + ((ec - 0.5)*v)
```

Last line was an extra multipication using `v`
The formula must be
```javascript
const sentimentChange = inv_based_change + (ec - 0.5)
```

### How can we make the code more safe?
Doing a Unit Test for the formula


### Under what circumnstances may this code fail?
If `α = 0` the formula is Broken

If `β / α = 0` then `log` is undefined. This happens when `β = 0`

### Multiple Sellers
The market is subscribed to the changes of the sellers.
If we want to have two differen types of sellers we should mark them with some attribute firts.
Once the buyer is identified, the market does not have to observe the changes of this seller due to the price never changes.
The `tick` methos of the Market class should exclude the sellers that are static.





