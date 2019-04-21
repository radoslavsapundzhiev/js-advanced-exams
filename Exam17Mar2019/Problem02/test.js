let FilmStudio = require('./filmStudio');
let expect = require('chai').expect;

describe("FilmStudio tests", function() {
    let filmStudio;
    beforeEach(function(){
        filmStudio = new FilmStudio('SU-Studio');
    });
    describe("initial tests", function() {
        it("with empty films", function() {
            expect(filmStudio.films.length).to.equal(0);
        });
     });
     describe("makeMovie tests", function() {
        it("", function() {
            
        });
     });
});
