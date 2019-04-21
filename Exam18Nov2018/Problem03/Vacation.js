class Vacation {
    constructor(organizer, destination, budget){
        this.organizer = organizer;
        this.destination = destination;
        this.budget = +budget;
        this.kids = {};
    }
    get numberOfChildren(){
        let numberOfChildren = 0;
        for (let grade of Object.keys(this.kids)) {
            if(this.kids.hasOwnProperty(grade)){
                numberOfChildren += this.kids[grade].length;
            }
        }
        return numberOfChildren;
    }
    registerChild(name, grade, budget){
        if(!this.kids.hasOwnProperty(grade)){
            this.kids[grade] = [];
        }

        if(budget < this.budget){
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }else{
            let isRecorded = false;
            for (let index = 0; index < (this.kids[grade]).length; index++) {
               if(this.kids[grade][index].name === name){
                  isRecorded = true;
               }
            }
            if(!isRecorded){
                this.kids[grade].push({name, budget});
            }else{
                return `${name} is already in the list for this ${this.destination} vacation.`;
            }
            let output = this.kids[grade].map(k => `${k.name}-${k.budget}`);
            return output;
        }
    }
    removeChild(name, grade){
        let isRecorded = false;
        let searchedIndex = 0;

        if(this.kids.hasOwnProperty(grade)){
            for (let index = 0; index < this.kids[grade].length; index++) {
                if(this.kids[grade][index].name === name){
                    isRecorded = true;
                    searchedIndex = index;
                }
            }
            let filtered = this.kids[grade].filter(k => k.name !== name);
            if(filtered.length === this.kids[grade].length){
                return `We couldn't find ${name} in ${grade} grade.`;
            }else{
                this.kids[grade] = filtered;
                let output = this.kids[grade].map(k => `${k.name}-${k.budget}`);
                return output;
            }
        }else{
            return `We couldn't find ${name} in ${grade} grade.`;
        }
    }
    toString(){
        let output = '';
        let sortedKeys = Object.keys(this.kids).sort((a, b) => a - b);

        if(this.numberOfChildren === 0){
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        output += `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        for (let grade of sortedKeys) {
            if(this.kids.hasOwnProperty(grade)){
                if(this.kids[grade].length !== 0){
                    output += `Grade: ${grade}\n`;
                    for (let index = 0; index < this.kids[grade].length; index++) {
                        let name = this.kids[grade][index].name;
                        let budget = this.kids[grade][index].budget;
                        output += `${index + 1}. ${name}-${budget}\n`;                
                    }
                }                
            }
        }
        return output;
    }
}

let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);

vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500);

console.log(vacation.toString());


