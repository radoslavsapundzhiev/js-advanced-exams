const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const expect = require('chai').expect;
const createList = require('./add-swap-shift-left-right');

describe('Add Swap Shift Left Right tests', function(){
    let myList;
    beforeEach(function(){
        myList = createList();
    })
    describe('initial tests', function(){
        it('with empty list', ()=>{
            expect(myList.toString()).to.equal('');
        });
    });
    describe('add tests', function(){
        it('with one element', ()=>{
            myList.add(5);
            expect(myList.toString()).to.equal('5');
        });
        it('with mixed types', ()=>{
            myList.add(5);
            myList.add({name: 'gosho'});
            myList.add([3, 2]);
            myList.add('misho');
            expect(myList.toString()).to.equal('5, [object Object], 3,2, misho');
        });
    });
    describe('shiftLeft tests', function(){
        it('with empty list', ()=>{
            myList.shiftLeft();
            expect(myList.toString()).to.equal('')
        });
        it('with data.length = 1', ()=>{
            myList.add(5);
            myList.shiftLeft();
            expect(myList.toString()).to.equal('5')
        });
        it('with data.length > 1', ()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.shiftLeft();
            expect(myList.toString()).to.equal('3, 8, 5');
        });
    });
    describe('shiftRight tests', function(){
        it('with empty list', ()=>{
            myList.shiftRight();
            expect(myList.toString()).to.equal('')
        });
        it('with data.length = 1', ()=>{
            myList.add(5);
            myList.shiftRight();
            expect(myList.toString()).to.equal('5')
        });
        it('with data.length > 1', ()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.shiftRight();
            expect(myList.toString()).to.equal('8, 5, 3');
        });
    });
    describe('swap tests', function(){
        it('index1 is fraction',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(2.1, 2);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index1 is fraction return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(2.1, 2);
            expect(myList.swap(2.1, 2)).to.equal(false);
        });
        it('index2 is fraction',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(2, 2.5);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index2 is fraction return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(2, 2.5);
            expect(myList.swap(2, 2.5)).to.equal(false);
        });
        it('index1 is string',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap('pesho', 2);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index1 is string return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap('pesho', 2);
            expect(myList.swap('pesho', 2)).to.equal(false);
        });
        it('index2 is string',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(0, '2');
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index2 is string return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(0, '2');
            expect(myList.swap(0, '2')).to.equal(false);
        });
        it('index1 is negative',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(-1, 2);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index1 is negative return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(-1, 2);
            expect(myList.swap(-1, 2)).to.equal(false);
        });
        it('index2 is negative',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, -2);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index2 is negative return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, -2);
            expect(myList.swap(1, -2)).to.equal(false);
        });
        it('index1 is equal to data.length',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(3, 1);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index1 is equal to data.length return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(3, 1);
            expect(myList.swap(3, 1)).to.equal(false);
        });
        it('index2 is equal to data.length',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, 3);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index2 is equal to data.length return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, 3);
            expect(myList.swap(1, 3)).to.equal(false);
        });
        it('index1 is more than data.length',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(5, 1);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index1 is more than data.length return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(5, 1);
            expect(myList.swap(5, 1)).to.equal(false);
        });
        it('index2 is more than data.length',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, 5);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index2 is more than data.length return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, 5);
            expect(myList.swap(1, 5)).to.equal(false);
        });
        it('index1 is equal to index2',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, 1);
            expect(myList.toString()).to.equal('5, 3, 8');
        });
        it('index1 is equal to index2 return false',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, 1);
            expect(myList.swap(1, 1)).to.equal(false);
        });
        it('index1 and index2 are correct',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(2, 1);
            expect(myList.toString()).to.equal('5, 8, 3');
        });
        it('index1 and index2 are correct return true',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(2, 1);
            expect(myList.swap(2, 1)).to.equal(true);
        });
        it('index1 is zero',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(0, 1);
            expect(myList.toString()).to.equal('3, 5, 8');
        });
        it('index2 is zero',()=>{
            myList.add(5);
            myList.add(3);
            myList.add(8);
            myList.swap(1, 0);
            expect(myList.toString()).to.equal('3, 5, 8');
        });
    });
    describe('toString tests', function(){
        it('with no elements', ()=>{
            expect(myList.toString()).to.equal('');
        });
        it('with elements', ()=>{
            myList.add(3);
            myList.add('ficho');
            expect(myList.toString()).to.equal('3, ficho');
        });
    });
});