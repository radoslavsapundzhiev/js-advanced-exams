const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const beforeEach = require('mocha').beforeEach;
const HolidayPackage = require('./HolidayPackage');


describe("HolidayPackage tests", function () {
    let holidayPackage;
    beforeEach(function () {
        holidayPackage = new HolidayPackage('Bulgaria', 'Summer');
    });
    describe('Constructor tests', function () {
        it('should be instantiated correctly', () => {
            expect(typeof holidayPackage.destination).to.equal('string');
            expect(typeof holidayPackage.season).to.equal('string');
            expect(typeof holidayPackage.insuranceIncluded).to.equal('boolean');
            expect(holidayPackage.vacationers).to.exist;
            expect(holidayPackage.destination).to.exist;
            expect(holidayPackage.season).to.exist;
            expect(holidayPackage.insuranceIncluded).to.exist;
            expect(holidayPackage.vacationers).to.eql([]);
            expect(holidayPackage.vacationers.length).to.equal(0);
        });
        it('should has methods', () => {
            expect(HolidayPackage.prototype.hasOwnProperty('showVacationers')).to.equal(true);
            expect(HolidayPackage.prototype.hasOwnProperty('addVacationer')).to.equal(true);
            expect(HolidayPackage.prototype.hasOwnProperty('generateHolidayPackage')).to.equal(true);
        });
    });
    describe('insuranceIncluded tests', function () {
        it('check typeof', () => {
            expect(typeof holidayPackage.insuranceIncluded).to.equal('boolean');
        });
        it('default value should be false', () => {
            expect(holidayPackage.insuranceIncluded).to.equal(false);
        });
        it('change value to true', () => {
            holidayPackage.insuranceIncluded = true;
            expect(holidayPackage.insuranceIncluded).to.equal(true);
        });
        it('change value to not boolean', () => {
            expect(() => holidayPackage.insuranceIncluded = 'true').to.throw(Error, "Insurance status must be a boolean");
        });
    });
    describe('showVacationers tests', function () {
        it('with no vacationers', () => {
            expect(holidayPackage.showVacationers()).to.equal("No vacationers are added yet");
        });
        it('with some vacationers', () => {
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');
            expect(holidayPackage.showVacationers()).to.equal(`Vacationers:
Ivan Ivanov
Petar Petrov
Georgi Georgiev`);
        });
    });
    describe('addVacationer tests', function () {
        it('with empty string', () => {
            expect(() => holidayPackage.addVacationer(' ')).to.throw(Error, "Vacationer name must be a non-empty string");
        });
        it('with non string', () => {
            expect(() => holidayPackage.addVacationer({})).to.throw(Error, "Vacationer name must be a non-empty string");
        });
        it('with one string', () => {
            expect(() => holidayPackage.addVacationer('pesho')).to.throw(Error, "Name must consist of first name and last name");
        });
        it('with more than two strings', () => {
            expect(() => holidayPackage.addVacationer('pesho goshov toshov')).to.throw(Error, "Name must consist of first name and last name");
        });
        it('with two strings', () => {
            holidayPackage.addVacationer('pesho toshov')
            expect(holidayPackage.vacationers.join(', ')).to.equal('pesho toshov');
        });
    });
    describe('generateHolidayPackage tests', function () {
        it('with no vacationers', function () {
            expect(() => holidayPackage.generateHolidayPackage()).to.throw(Error, "There must be at least 1 vacationer added");
        });
        it('with some vacationers added in summer', function () {
            holidayPackage = new HolidayPackage('Bulgaria', 'Summer');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');
            let result = holidayPackage.generateHolidayPackage();
            expect(result).to.equal(`Holiday Package Generated
Destination: Bulgaria
Vacationers:
Ivan Ivanov
Petar Petrov
Georgi Georgiev
Price: 1400`);
        });
        it('with some vacationers added in winter', function () {
            holidayPackage = new HolidayPackage('Bulgaria', 'Winter');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');
            let result = holidayPackage.generateHolidayPackage();
            expect(result).to.equal(`Holiday Package Generated
Destination: Bulgaria
Vacationers:
Petar Petrov
Georgi Georgiev
Price: 1000`);
        });
        it('with some vacationers added in spring', function () {
            holidayPackage = new HolidayPackage('Bulgaria', 'Spring');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');
            let result = holidayPackage.generateHolidayPackage();
            expect(result).to.equal(`Holiday Package Generated
Destination: Bulgaria
Vacationers:
Ivan Ivanov
Petar Petrov
Georgi Georgiev
Price: 1200`);
        });
        it('with some vacationers added in autumn', function () {
            holidayPackage = new HolidayPackage('Bulgaria', 'Autumn');
            holidayPackage.addVacationer('Ivan Ivanov');
            holidayPackage.addVacationer('Petar Petrov');
            holidayPackage.addVacationer('Georgi Georgiev');
            let result = holidayPackage.generateHolidayPackage();
            expect(result).to.equal(`Holiday Package Generated
Destination: Bulgaria
Vacationers:
Ivan Ivanov
Petar Petrov
Georgi Georgiev
Price: 1200`);
        });
    });
});