describe("script", function() {
  var Script ;

beforeEach(function() {
Script = new script();
});
it("should be able to create a deck", function() {
	deck = [1,1,1,1,1,2,2,3,3,4,4,5,5,6,7,8];
	pachet = Script.crearePachet().sort();
	expect(pachet).toEqual(deck);
});
it("should be able to return second player's card", function() {
	var card = Script.strategieCalculator(3, 4);
	expect(card).toEqual(4);
});
beforeEach(function() {
    PrintesaJ = jasmine.createSpy("PrintesaJ");    
    PrintesaJ("called as usual");
});

it("should be able to return printesa img", function() {
	var printesa = Script.printesa_8();
var x = document.createElement("img");
	x.setAttribute("src", "Poze/printesa.JPG");
	x.setAttribute("alt", "Printesa");
	x.setAttribute("id", "printesa");
expect(x).toEqual(printesa);

});

it("should be able to return rege img", function() {
	var rege = Script.rege_6();
var x = document.createElement("img");
	x.setAttribute("src", "Poze/rege.JPG");
	x.setAttribute("alt", "Rege");
	expect(x).toEqual(rege);
});
it("should be able to return print img", function() {
	var print = Script.print_5();
	var x = document.createElement("img");
	x.setAttribute("src", "Poze/print.JPG");
	x.setAttribute("alt", "Print");
expect(x).toEqual(print);
});

});
