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
	var card = Script.strategieCalculator(2, 5);
	expect(card).toEqual(2);
});
it("should be able to return printesa img", function() {
	var printesa = Script.printesa_8();
	expect(printesa.isPresent()).toBe(true);
});
it("should be able to return printesa img", function() {
	var rege = Script.rege_6();
	expect(rege.isPresent()).toBe(true);
});
it("should be able to return printesa img", function() {
	var print = Script.print_5();
	expect(print.isPresent()).toBe(true);
});

});
