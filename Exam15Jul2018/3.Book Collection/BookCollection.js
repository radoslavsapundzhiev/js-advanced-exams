class BookCollection{
    constructor(shelfGenre, room, shelfCapacity){
        this.room = room;
        this.shelfGenre = shelfGenre;               
        this.shelf = [];
        this.shelfCapacity = shelfCapacity;
    }
    get shelfCondition(){
        let freeSlots = this.shelfCapacity - this.shelf.length;
        if(freeSlots <= 0){
            freeSlots === 0;
        }
        return freeSlots;
    }
    get room(){
        return this._room;
    }
    set room(room){
        if(room === 'livingRoom' || room === 'bedRoom' || room === 'closet'){
            this._room = room;           
        }else{
            throw new Error(`Cannot have book shelf in ${room}`);
        }
        
    }
    addBook(bookName, bookAuthor, genre){
        if(this.shelfCapacity === this.shelf.length){           
            this.shelf.shift();
        }
        if(genre !== undefined){
            this.shelf.push({bookName, bookAuthor, genre});
        }else{
            this.shelf.push({bookName, bookAuthor});
        }
              
        // this.sort(this.shelf);
        this.shelf = this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }
    throwAwayBook(bookName){
        this.shelf = this.shelf.filter(e => e.bookName !== bookName);
    }
    showBooks(genre){
        let  result = ""; 
        let filteredBooks = this.shelf.filter(e => e.genre === genre);
        if(filteredBooks.length > 0){
            result = `Results for search \"${genre}\":\n`;
            for (let book of filteredBooks) {
                result += `\uD83D\uDCD6 ${book.bookAuthor} - \"${book.bookName}\"\n`
            }
        }
        
        return result.trim();
    }
    // sort(array){
    //     array.sort((a, b) => (a.bookAuthor).localeCompare(b.bookAuthor));
    // }
    toString(){
        if(this.shelf.length > 0){
            let result = `\"${this.shelfGenre}\" shelf in ${this.room} contains:\n`;
            for (let book of this.shelf) {
                result += `\uD83D\uDCD6 \"${book.bookName}\" - ${book.bookAuthor}\n`
            }
            return result.trim();
        }else{
            return "It's an empty shelf";
        }
    }
}

classInstance = new BookCollection('Programming', 'livingRoom', 5)

classInstance.addBook("John Adams", "David McCullough", "history");
classInstance.addBook("The Guns of August", "Cuentos para pensar", "history");
classInstance.addBook("Atlas of Remote Islands", "Judith Schalansky");
classInstance.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");

console.log(classInstance.showBooks("history"))
console.log(classInstance.toString())


