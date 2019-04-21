let AutoService = require('./02. Auto Service_Ресурси');
let expect = require('chai').expect;

describe("AutoService tests", function() {
    let autoService;
    beforeEach(function(){
        autoService = new AutoService(2);
    });
    describe("initial tests", function() {
        it("repairCar exist", function() {
            expect(AutoService.prototype.hasOwnProperty('repairCar')).to.equal(true);
        });
        it("signUpForReview exist", function() {
            expect(AutoService.prototype.hasOwnProperty('signUpForReview')).to.equal(true);
        });
        it("carInfo exist", function() {
            expect(AutoService.prototype.hasOwnProperty('carInfo')).to.equal(true);
        });
        it("availableSpace exist", function() {
            expect(AutoService.prototype.hasOwnProperty('availableSpace')).to.equal(true);
        });
        it("with empty garageCapacity", function() {
            autoService = new AutoService(0);
            expect(autoService.garageCapacity).to.equal(0);
        });
        it("with empty input, workInProgress must be empty array", function() {
            autoService = new AutoService(0);
            expect(autoService.workInProgress.join('')).to.equal('');
        });
        it("with empty input, backlogWork must be empty array", function() {
            autoService = new AutoService(0);
            expect(autoService.backlogWork.join('')).to.equal('');
        });
    });
    describe('availableSpace tests', function(){
        it('with empty workInProgress', () => {
            expect(autoService.availableSpace).to.equal(2);
        });
        it('with not empty workInProgress with 1', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            
            expect(autoService.availableSpace).to.equal(1);
        });
        it('with not empty workInProgress with two', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});

            expect(autoService.availableSpace).to.equal(0);
        });
        it('with not empty workInProgress with three', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            expect(autoService.availableSpace).to.equal(0);
        });
    });
    describe('signupForReview tests', function(){
        it('with available space', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            expect(autoService.workInProgress.length).to.equal(2);
            expect(autoService.backlogWork.length).to.equal(0);
        });
        it('without available space', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            expect(autoService.backlogWork.length).to.equal(1);
            expect(autoService.workInProgress.length).to.equal(2);
        });
        it('has three arguments', () => {
            expect(autoService.signUpForReview.length).to.equal(3);
        });
    });
    describe('carInfo tests', function(){
        it('exist in workInProgress', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            expect(JSON.stringify(autoService.carInfo('CA1234CA', 'Peter'))).to.equal('{"plateNumber":"CA1234CA","clientName":"Peter","carInfo":{"engine":"MFRGG23","transmission":"FF4418ZZ","doors":"broken"}}');
        });
        it('do not exist in workInProgress-1', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            expect(autoService.carInfo('CA1234CA', 'Gosho')).to.equal('There is no car with platenumber CA1234CA and owner Gosho.');
        });
        it('do not exist in workInProgress-2', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            expect(autoService.carInfo('CB1234CA', 'Peter')).to.equal('There is no car with platenumber CB1234CA and owner Peter.');
        });
        it('do not exist in workInProgress-3', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});

            expect(autoService.carInfo('CB1234CA', 'Tisho')).to.equal('There is no car with platenumber CB1234CA and owner Tisho.');
        });
        it('exist in backlogWork', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            expect(JSON.stringify(autoService.carInfo('CA1234CA', 'Peter'))).to.equal('{"plateNumber":"CA1234CA","clientName":"Peter","carInfo":{"engine":"MFRGG23","transmission":"FF4418ZZ","doors":"broken","wheels":"broken","tires":"broken"}}');
        });
        it('do not exist in empty workInProgress', () => {
            expect(autoService.carInfo('CA1234CA', 'Tosho')).to.equal('There is no car with platenumber CA1234CA and owner Tosho.');
        });
        it('has two arguments', () => {
            expect(autoService.carInfo.length).to.equal(2);
        });
        it('do not exist in workInProgress-3', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});

            expect(JSON.stringify(autoService.carInfo('PB4321PB', 'Philip'))).to.equal('{"plateNumber":"PB4321PB","clientName":"Philip","carInfo":{"engine":"MFRGG23","transmission":"FF4418ZZ","exaustPipe":"REMUS"}}');
        });
    });
    describe('repairCar tests', function(){
        it('with full workInProgress, first', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            let result = autoService.repairCar();
            expect(result).to.be.equal('Your doors were repaired.');
        })
        it('with full workInProgress, second', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            autoService.repairCar();
            expect(autoService.repairCar()).to.be.equal('Your doors and wheels and tires were repaired.');
        })
        it('with full workInProgress, third', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            autoService.signUpForReview('Gosho', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.repairCar();
            autoService.repairCar();
            autoService.repairCar();
            expect(autoService.repairCar()).to.be.equal('Your doors were repaired.');
        })
        it('with full workInProgress, fourth', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            autoService.signUpForReview('Gosho', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.repairCar();
            autoService.repairCar();
            expect(autoService.repairCar()).to.be.equal('Your car was fine, nothing was repaired.');
        })
        it('with full workInProgress, 5', () => {
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.signUpForReview('Peter', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken', 'wheels': 'broken', 'tires': 'broken'});
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            autoService.signUpForReview('Gosho', 'CA1234CA', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'doors': 'broken'});
            autoService.repairCar();
            autoService.repairCar();
            autoService.repairCar();
            autoService.repairCar();
            expect(autoService.repairCar()).to.be.equal('No clients, we are just chilling...');
        })
        it('with full workInProgress, 6', () => {
            autoService.repairCar();
            expect(autoService.repairCar()).to.be.equal('No clients, we are just chilling...');
        })
        it('with full workInProgress, 7', () => {
            autoService.signUpForReview('Philip', 'PB4321PB', {'engine': 'MFRGG23', 'transmission': 'FF4418ZZ', 'exaustPipe': 'REMUS'});
            expect(autoService.repairCar()).to.be.equal('Your car was fine, nothing was repaired.');
        })
    });
});
