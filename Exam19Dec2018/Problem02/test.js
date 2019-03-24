let Warehouse = require('./Warehouse');
let describe = require('mocha').describe;
let it = require('mocha').it;
let beforeEach = require('mocha').beforeEach;
let expect = require('chai').expect;

describe('Warehouse tests', function () {
    let warehouse;
    beforeEach(function () {
        warehouse = new Warehouse(25);
    });
    describe('methods exist', function () {
        it('initial tests', () => {
            expect(Warehouse.prototype.hasOwnProperty('addProduct')).to.equal(true);
            expect(Warehouse.prototype.hasOwnProperty('orderProducts')).to.equal(true);
            expect(Warehouse.prototype.hasOwnProperty('occupiedCapacity')).to.equal(true);
            expect(Warehouse.prototype.hasOwnProperty('revision')).to.equal(true);
            expect(Warehouse.prototype.hasOwnProperty('scrapeAProduct')).to.equal(true);
        })
    });
    describe('constructor tests', function () {
        it('with negative', () => {
            expect(() => warehouse = new Warehouse(-2)).to.throw("Invalid given warehouse space");
        });
        it('with zero', () => {
            expect(() => warehouse = new Warehouse(0)).to.throw("Invalid given warehouse space");
        });
        it('with not a number', () => {
            expect(() => warehouse = new Warehouse('test')).to.throw("Invalid given warehouse space");
        });
        it('with correct value', () => {
            expect(warehouse.capacity).to.equal(25);
        });
        it('initialization', ()=>{
            let food = warehouse.availableProducts['Food'];
            let drink = warehouse.availableProducts['Drink'];
            expect(JSON.stringify(food)).to.equal('{}');
            expect(JSON.stringify(drink)).to.equal('{}');
        });
    });
    describe('addProduct tests', function () {
        it('with empty warehouse', () => {
            expect(() => warehouse.addProduct('Food', 'apple', 26)).to.throw("There is not enough space or the warehouse is already full");
        });
        it('with full warehouse', () => {
            warehouse.addProduct('Food', 'apple', 5);
            warehouse.addProduct('Drink', 'coke', 20);
            expect(() => warehouse.addProduct('Food', 'apple', 2)).to.throw("There is not enough space or the warehouse is already full");
        });
        it('with full warehouse', () => {
            warehouse.addProduct('Food', 'apple', 5);
            warehouse.addProduct('Drink', 'coke', 10);
            warehouse.addProduct('Drink', 'coke', 10);
            expect(() => warehouse.addProduct('Food', 'apple', 2)).to.throw("There is not enough space or the warehouse is already full");
        });
        it('with correct value', () => {
            warehouse.addProduct('Food', 'apple', 5);
            warehouse.addProduct('Drink', 'coke', 8);
            let result = warehouse.addProduct('Drink', 'water', 6);
            expect(JSON.stringify(result)).to.equal('{"coke":8,"water":6}');
        });
        it('with correct value', () => {
            warehouse.addProduct('Food', 'apple', 5);
            warehouse.addProduct('Drink', 'coke', 8);
            warehouse.addProduct('Drink', 'coke', 4);
            let result = warehouse.addProduct('Drink', 'water', 6);
            expect(JSON.stringify(result)).to.equal('{"coke":12,"water":6}');
        });
        it('with correct value addedQuantity === 0', () => {
            warehouse.addProduct('Food', 'apple', 5);
            warehouse.addProduct('Drink', 'coke', 10);
            warehouse.addProduct('Drink', 'coke', 9);
            let result = warehouse.addProduct('Drink', 'water', 1);
            expect(JSON.stringify(result)).to.equal('{"coke":19,"water":1}');
        });
    });
    describe('orderProducts tests', function () {
        it('normal case Drink', () => {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Drink', 'coke', 5);
            warehouse.addProduct('Drink', 'coke', 2);
            warehouse.addProduct('Drink', 'water', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            let result = warehouse.orderProducts('Drink');
            expect(JSON.stringify(result)).to.equal('{"coke":7,"juice":6,"water":3}');
        });
        it('normal case Food', () => {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Food', 'bread', 2);
            warehouse.addProduct('Food', 'milk', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            let result = warehouse.orderProducts('Food');
            expect(JSON.stringify(result)).to.equal('{"bread":7,"apple":4,"milk":3}');
        });
        it('normal case Food', () => {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Food', 'bread', 2);
            warehouse.addProduct('Food', 'milk', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            warehouse.addProduct('Food', 'apple', 3);
            let result = warehouse.orderProducts('Food');
            expect(JSON.stringify(result)).to.equal('{"apple":7,"bread":7,"milk":3}');
        });
        it('with empty warehouse', () => {
            let result = warehouse.orderProducts('Food');
            expect(JSON.stringify(result)).to.equal('{}');
        });
    });
    describe('occupiedCapacity tests', function () {
        it('with empty warehouse', () => {
            expect(warehouse.occupiedCapacity()).to.equal(0);
        });
        it('with not empty warehouse', () => {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Food', 'bread', 2);
            warehouse.addProduct('Food', 'milk', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            expect(warehouse.occupiedCapacity()).to.equal(20);
        });
    });
    describe('revision tests', function () {
        it('with empty warehouse', () => {
            expect(warehouse.revision()).to.equal('The warehouse is empty');
        });
        it('with not empty warehouse', () => {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Drink', 'rakia', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            let result = warehouse.revision();
            expect(result).to.equal(`Product type - [Food]\n- apple 4\n- bread 5\nProduct type - [Drink]\n- rakia 3\n- juice 6`);
        });
        it('with one product Food in warehouse', () => {
            warehouse.addProduct('Food', 'apple', 4);
            let result = warehouse.revision();
            expect(result).to.equal(`Product type - [Food]\n- apple 4\nProduct type - [Drink]`);
        });
        it('with one product Drink in warehouse', () => {
            warehouse.addProduct('Drink', 'rakia', 4);
            let result = warehouse.revision();
            expect(result).to.equal(`Product type - [Food]\nProduct type - [Drink]\n- rakia 4`);
        });
    });
    describe('scrapeAProduct tests', function () {
        it('type is undefined', function () {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Drink', 'rakia', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            expect(() => warehouse.scrapeAProduct('milk', 6)).to.throw('milk do not exist');
        });
        it('type is undefined and product do not exist', function () {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Drink', 'rakia', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            expect(() => warehouse.scrapeAProduct('vodka', 6)).to.throw('vodka do not exist');
        });
        it('type is undefined with empty warehouse', function () {
            expect(() => warehouse.scrapeAProduct('milk', 6)).to.throw('milk do not exist');
        });
        it('type exixt and quantity is less', function () {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Drink', 'rakia', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            let result = warehouse.scrapeAProduct('apple', 3);
            expect(JSON.stringify(result)).to.equal('{"apple":1,"bread":5}');
        });
        it('type exixt and quantity is more', function () {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Drink', 'rakia', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            let result = warehouse.scrapeAProduct('apple', 5);
            expect(JSON.stringify(result)).to.equal('{"apple":0,"bread":5}');
        });
        it('type exixt and quantity is equal', function () {
            warehouse.addProduct('Food', 'apple', 4);
            warehouse.addProduct('Food', 'bread', 5);
            warehouse.addProduct('Drink', 'rakia', 3);
            warehouse.addProduct('Drink', 'juice', 6);
            let result = warehouse.scrapeAProduct('apple', 4);
            expect(JSON.stringify(result)).to.equal('{"apple":0,"bread":5}');
        });
    });
});