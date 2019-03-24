class Vacationer {
    constructor(fullName, creditCard) {
        this.fullName = fullName;
        this.idNumber = this.generateIDNumber();
        this.creditCard = {
            cardNumber: 1111,
            expirationDate: "",
            securityNumber: 111
        };
        if (creditCard !== undefined) {
            this.addCreditCardInfo(creditCard);
        }
        this.wishList = [];
    }
    get fullName() {
        return this._fullName;
    }
    set fullName(input) {
        if (input.length !== 3) {
            throw new Error("Name must include first name, middle name and last name");
        }
        let pattern = /\b[A-Z][a-z]+\b/gm;
        input.forEach(element => {
            if (!pattern.test(element)) {
                throw new Error("Invalid full name");
            }
        })
        this._fullName = {};
        this._fullName.firstName = input[0];
        this._fullName.middleName = input[1];
        this._fullName.lastName = input[2];
    }
    generateIDNumber() {
        let vowel = ['a', 'e', 'i', 'o', 'u'];
        let idNumber = (231 * this.fullName.firstName.charCodeAt(0) + 139 * this.fullName.middleName.length).toString();
        let lastChar = this.fullName.lastName.charAt(this.fullName.lastName.length - 1);
        if (vowel.includes(this.fullName.lastName.charAt(this.fullName.lastName.length - 1))) {
            idNumber += 8;
        } else {
            idNumber += 7;
        }
    }
    addCreditCardInfo(input) {
        if (input.length !== 3) {
            throw new Error("Missing credit card information");
        }
        if (typeof input[0] !== 'number' || typeof input[2] !== 'number') {
            throw new Error("Invalid credit card details");
        }
        this.creditCard.cardNumber = input[0];
        this.creditCard.expirationDate = input[1];
        this.creditCard.securityNumber = input[2];
    }
    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw new Error("Destination already exists in wishlist");
        }
        this.wishList.push(destination);
        this.wishList.sort((a, b) => a.length - b.length);
    }
    getVacationerInfo() {
        return "Name: " + this.fullName.firstName + " " + this.fullName.middleName + " " + this.fullName.lastName + "\n" +
            "ID Number: " + this.idNumber + "\n" +
            "Wishlist:\n" + (this.wishList.length === 0 ? "empty" : this.wishList.join(", ")) + "\n" +
            "Credit Card:\n" +
            "Card Number: " + this.creditCard.cardNumber + "\n" +
            "Expiration Date: " + this.creditCard.expirationDate + "\n" +
            "Security Number: " + this.creditCard.securityNumber;
    }
}

// Should throw an error (Missing credit card information)
try {
    let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
    vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
} catch (err) {
    console.log("Error: " + err.message);
}