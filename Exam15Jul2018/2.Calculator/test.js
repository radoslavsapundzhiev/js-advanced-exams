const expect = require('chai').expect;
const Calculator = require('./Calculator');
const describe = require('mocha').describe;
const it = require('mocha').it;
const beforeEach = require('mocha').beforeEach;

describe('Calculator tests', function(){
    let calculator;
    beforeEach(function(){
        calculator = new Calculator();
    });
    describe('Initial test', function(){
        it('add', ()=>{
            expect(Calculator.prototype.hasOwnProperty('add')).to.equal(true);
        });
        it('divideNums', ()=>{
            expect(Calculator.prototype.hasOwnProperty('divideNums')).to.equal(true);
        });
        it('toString', ()=>{
            expect(Calculator.prototype.hasOwnProperty('toString')).to.equal(true);
        });
        it('orderBy', ()=>{
            expect(Calculator.prototype.hasOwnProperty('orderBy')).to.equal(true);
        });
    });
    describe('Constructor test', function(){
        it('with empty array', ()=>{
            expect(calculator.toString()).to.equal('empty array');
            expect(calculator.expenses).to.eql([]);
        });
    });
    describe('Add tests', function(){
        it('add one number', ()=>{
            calculator.add(5);
            expect(calculator.toString()).to.equal('5');
        });
        it('add many elements', ()=>{
            calculator.add(5);
            calculator.add({name: 'Gosho'});
            calculator.add('Pesho');
            calculator.add([0,1]);
            expect(calculator.toString()).to.equal('5 -> [object Object] -> Pesho -> 0,1');
        });
    });
    describe('divideNums tests', function(){       
        it('with empty array', ()=>{
            expect(()=>calculator.divideNums()).to.throw(Error, "There are no numbers in the array!")
        });
        it('without numbers', ()=>{
            calculator.add({name: 'Gosho'});
            calculator.add('Pesho');
            calculator.add([0,1]);
            expect(()=>calculator.divideNums()).to.throw(Error, "There are no numbers in the array!")
        });
        it('with floating-point numbers', ()=>{
            calculator.add(2.4);
            calculator.add(-1.2);
            calculator.add(0.6);
            expect(calculator.divideNums()).to.be.closeTo(-3.33, 0.01);
        });
        it('with negative numbers', ()=>{
            calculator.add(24);
            calculator.add(-2);
            calculator.add(6);
            expect(calculator.divideNums()).to.equal(-2);
        });
        it('with one number', ()=>{
            calculator.add({name: 'Gosho'});
            calculator.add('Pesho');
            calculator.add(6);
            calculator.add([0,1]);
            expect(calculator.divideNums()).to.equal(6);
        });
        it('with more numbers', ()=>{
            calculator.add({name: 'Gosho'});
            calculator.add(12);
            calculator.add('Pesho');
            calculator.add(6);
            calculator.add([0,1]);
            expect(calculator.divideNums()).to.equal(2);
        });
        it('with zero', ()=>{
            calculator.add(24);
            calculator.add(12);
            calculator.add(0);
            expect(calculator.divideNums()).to.equal('Cannot divide by zero');
        });
    });
    describe('orderBy tests', function(){
        it('with empty array', function(){
            expect(calculator.orderBy()).to.equal('empty');
        });
        it('with only numbers', function(){
            calculator.add(12);
            calculator.add(6);
            calculator.add(-1.3);
            expect(calculator.orderBy()).to.equal('-1.3, 6, 12');
        });
        it('with only strings', function(){
            calculator.add('gosho');
            calculator.add('alf');
            calculator.add('mincho');
            expect(calculator.orderBy()).to.equal('alf, gosho, mincho');
        });
        it('with mixed types', function(){
            calculator.add({name: 'Gosho'});
            calculator.add(12);
            calculator.add('Pesho');
            calculator.add(6);
            calculator.add([0,1]);
            calculator.add(-1.5);
            expect(calculator.orderBy()).to.equal('-1.5, 0,1, 12, 6, Pesho, [object Object]');
        });
        it('without numbers', function(){
            calculator.add({name: 'Gosho'});
            calculator.add('Pesho');
            calculator.add([0,1]);;
            expect(calculator.orderBy()).to.equal('0,1, Pesho, [object Object]');
        });
    });
    describe('toString tests', function(){
        it('with empty array', ()=>{
            expect(calculator.toString()).to.equal('empty array');
        });
        it('with non empty array', ()=>{
            calculator.add({name: 'Gosho'});
            calculator.add(12);
            calculator.add('Pesho');
            calculator.add(6);
            calculator.add([0,1]);
            calculator.add(-1.5);
            expect(calculator.toString()).to.equal('[object Object] -> 12 -> Pesho -> 6 -> 0,1 -> -1.5');
        });
    });
});