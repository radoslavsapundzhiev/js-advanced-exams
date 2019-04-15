class Kitchen{
    constructor(budget){
        this.budget = Number(budget);
        this.productsInStock = new Map();
        this.actionsHistory = [];
        this.menu = new Map();
    }
    loadProducts(products){
        for (let product of products) {
            let tokens = product.split(' ');
            let productName = tokens[0];
            let productQuantity = Number(tokens[1]);
            let productPrice = Number(tokens[2]);
            if(productPrice <= this.budget){
                if(!this.productsInStock.has(productName)){
                    this.productsInStock.set(productName, 0);
                }
                let currentQuantity = this.productsInStock.get(productName) + productQuantity;
                this.productsInStock.set(productName, currentQuantity);
                this.budget -= productPrice;
                this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`)
            }else{
                this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`)
            }
        }
        let output = this.actionsHistory.join('\n');
        return output.trim();
    }
    addToMenu(meal, neadedProducts, price){
        if(!this.menu.has(meal)){
            this.menu.set(meal, {neadedProducts, price});
            return `Great idea! Now with the ${meal} we have ${this.menu.size} meals in the menu, other ideas?`;
        }
        return `The ${meal} is already in the our menu, try something different.`;
    }
    showTheMenu(){
        let result = '';
        if(this.menu.size === 0){
            result = `Our menu is not ready yet, please come later...`;
        }else{
            for (let [key, value] of this.menu.entries()) {
                result += `${key} - $ ${this.menu.get(key).price}\n`;
            }
        }
        return result.trim();
    }
    makeTheOrder(meal){
        if(!this.menu.has(meal)){
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }else{
            let hasAllProducts = true;
            let neededProducts = this.menu.get(meal).neadedProducts;
            let priceOfTheMeal = this.menu.get(meal).price;

            
            for (let product of neededProducts) {
                if(!this.productsInStock.has(product)){
                    hasAllProducts = false;
                }
            }

            if(!hasAllProducts){
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }else{
                return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${priceOfTheMeal}.`
            }

            for (let product of neededProducts) {
                this.productsInStock.delete(product);
            }
            this.budget -= priceOfTheMeal;
        }
    }
}
let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.showTheMenu());