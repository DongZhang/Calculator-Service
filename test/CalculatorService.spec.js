'use strict';

describe('Calculator Service', function() {

    var service;

    beforeEach(function() {
        service = new CalculatorService();
    });

    // display 0 on start
    it('should display 0 when loaded', function() {
        expect(service.getDisplay()).toEqual('0');
    });

    // display the digit if enter a digit
    it('should display 1 if entered one', function() {
        service.enterDigit('one');
        expect(service.getDisplay()).toEqual('1');
    });

    // display the 0 if enter +
    it('should display 0 if entered +', function() {
        service.enterOperation('+');
        expect(service.getDisplay()).toEqual('0');
    });

    // display the 0 if enter equal
    it('should display 0 if entered equal', function() {
        service.enterEquals();
        expect(service.getDisplay()).toEqual('0');
    });

    // test with missing number operation
    it('should display error if enter + and equal', function() {
        service.enterOperation('+');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('error');
    });

    // test with missing number operation
    it('should display 0 if enter equal and equal', function() {
        service.enterEquals();
        service.enterEquals();
        expect(service.getDisplay()).toEqual('0');
    });

    // display the digit if enter a digit then enter equal
    it('should display 1 if entered one and equal', function () {
        service.enterDigit('one');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('1');
    });

    // display the number if enter digits consecutively then enter equal
    it('should display 12 if entered one, two and equal', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('12');
    });

    // display the 0 if enter operators consecutively
    it('should display 0 if entered +, + and +', function() {
        service.enterOperation('+');
        service.enterOperation('+');
        service.enterOperation('+');
        expect(service.getDisplay()).toEqual('0');
    });

    // display the number if enter digits consecutively
    it('should display 123 if entered one, two and three', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterDigit('three')
        expect(service.getDisplay()).toEqual('123');
    });

    // display the number stargint with a zero if enter digits consecutively starting with a 0
    it('should display 012 if entered zero, one and two', function() {
        service.enterDigit('zero');
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterDigit('three')
        expect(service.getDisplay()).toEqual('0123');
    });

    // display the number if enter digits consecutively then enter an operator
    it('should display 12 if entered one, two and +', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('+');
        expect(service.getDisplay()).toEqual('12');
    });

    // display the number if enter +s or -s then a digit
    it('should display 1 if entered +, -, + and one', function () {
        service.enterOperation('+');
        service.enterOperation('-');
        service.enterOperation('+');
        service.enterDigit('one');
        expect(service.getDisplay()).toEqual('1');
    });

    // display error if enter missing digit
    it('should display error if entered one, + and equal', function () {
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('error');
    });

    // display result if enter several equals in a row
    it('should display error if entered one, equal and equal', function () {
        service.enterDigit('one');
        service.enterEquals();
        service.enterEquals();
        expect(service.getDisplay()).toEqual('1');
    });

    // display error if missing digit
    it('should display error if entered *, one and equal', function () {
        service.enterOperation('*');
        service.enterDigit('one');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('error');
    });

    // display last entered digit after entering an operator
    it('should display 3 if entered one, two, + and three', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('three');
        expect(service.getDisplay()).toEqual('3');
    });

    // display last entered number after entering an operator
    it('should display 34 if entered one, two, +, three and four', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('three');
        service.enterDigit('four');
        expect(service.getDisplay()).toEqual('34');
    });

    // test the addition
    // 12 + 3 = 15
    it('should display 15 if entered one, two, +, three and equal', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('three');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('15');
    });

    // test the subtraction
    // 12 - 3 = 9
    // it('should display 9 if entered one, two, -, three and equal', function() {
    //     service.enterDigit('one');
    //     service.enterDigit('two');
    //     service.enterOperation('-');
    //     service.enterDigit('three');
    //     service.enterEquals();
    //     expect(service.getDisplay()).toEqual('9');
    // });

    // test the multiplication
    // 12 * 3 = 36
    it('should display 36 if entered one, two, *, three and equal', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('*');
        service.enterDigit('three');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('36');
    });

    // test the division
    // 12 / 3 = 4
    it('should display 4 if entered one, two, /, three and equal', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('/');
        service.enterDigit('three');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('4');
    });

    // test the combination of addition and subtraction, with all 10 digits
    // 10 + 2 + 3 - 4 + 5 - 6 + 7 - 8 + 9 = 18;
    it('should display 18 if entered one, zero, +, two, +, three, -, four, +, five, -, six, +, seven, -, eight, +, nine and equal', function() {
        service.enterDigit('one');
        service.enterDigit('zero');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('three');
        service.enterOperation('-');
        service.enterDigit('four');
        service.enterOperation('+');
        service.enterDigit('five');
        service.enterOperation('-');
        service.enterDigit('six');
        service.enterOperation('+');
        service.enterDigit('seven');
        service.enterOperation('-');
        service.enterDigit('eight');
        service.enterOperation('+');
        service.enterDigit('nine');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('18');
    });

    // test the combination of multiplication and division
    // 10 * 2 / 5 * 3 = 12
    it('should display 12 if entered one, zero, *, two, /, five, *, three and equal', function() {
        service.enterDigit('one');
        service.enterDigit('zero');
        service.enterOperation('*');
        service.enterDigit('two');
        service.enterOperation('/');
        service.enterDigit('five');
        service.enterOperation('*');
        service.enterDigit('three');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('12');
    });

    // test the combinatino of addition, subtraction, multiplicatoin and division
    // 9 + 2 * 3 / 6 - 4 = 6
    it('should display 6 if entered nine, +, two, *, three, /, six, -, four and equal', function() {
        service.enterDigit('nine');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterOperation('*');
        service.enterDigit('three');
        service.enterOperation('/');
        service.enterDigit('six');
        service.enterOperation('-');
        service.enterDigit('four');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('6');
    });

    // test the combination of addition and subtraction, with negative numbers
    // -12 + 2 + 3 - -4 = -3
    it('should display -3 if entered -, one, two, +, three, -, -, four and equal', function() {
        service.enterOperation('-');
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('three');
        service.enterOperation('-');
        service.enterOperation('-');
        service.enterDigit('four');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('-3');
    });

    // test the combination of addition and subtraction, with consecutive operators
    // -12 + 2 + 3 - + + -4 = -3
    it('should display -3 if entered -, one, two, +, three, -, +, +, -, four and equal', function() {
        service.enterOperation('-');
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('three');
        service.enterOperation('-');
        service.enterOperation('+');        
        service.enterOperation('+');
        service.enterOperation('-');
        service.enterDigit('four');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('-3');
    });    

    // test the combination of addition and subtraction, with consecutive operators
    // -12 + 2 + 3 - * -4 ====> error
    it('should display error if entered -, one, two, +, three, -, *, -, four and equal', function() {
        service.enterOperation('-');
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterOperation('+');
        service.enterDigit('three');
        service.enterOperation('-');
        service.enterOperation('*');
        service.enterOperation('-');
        service.enterDigit('four');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('error');
    });

    // test when input start with 0
    // 01 + 02 = 3
    it('should display 0 if entered zero, one, +, zero, two and equal', function() {
        service.enterDigit('zero');
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterDigit('zero');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('3');
    });

    // test with decimal
    // 3 / 2 = 1.5
    it('should display 1.5 if entered three, /, two and equal', function() {
        service.enterDigit('three');
        service.enterOperation('/');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('1.5');
    });

    // test with decimal
    // 2 / 3 = 0.6666666666666666
    it('should display 0.6666666666666666 if entered two, /, three and equal', function() {
        service.enterDigit('two');
        service.enterOperation('/');
        service.enterDigit('three');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('0.6666666666666666');
    });

    // test with negative output
    // 1 - 8 = -7
    it('should display -7 if entered one, -, eight and equal', function() {
        service.enterDigit('one');
        service.enterOperation('-');
        service.enterDigit('eight');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('-7');
    });

    // test division with 0, let's keep it in the Javascript way
    it('should display Infinity if entered one, /, zero and equal', function() {
        service.enterDigit('one');
        service.enterOperation('/');
        service.enterDigit('zero');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('Infinity');
    });

    // test division with 0
    it('should display 0 if entered zero, /, one and equal', function() {
        service.enterDigit('zero');
        service.enterOperation('/');
        service.enterDigit('one');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('0');
    });

    // test with enter + or - and number
    it('should display error if entered +, one and equal', function() {
        service.enterOperation('+');
        service.enterDigit('one');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('1');
    });

    // test with invalid operator input
    it('should display error if entered Dong', function() {
        service.enterOperation('Dong');
        expect(service.getDisplay()).toEqual('error');
    });

    // test with invalid operator input
    it('should display error if entered one, Dong, two and equal', function() {
        service.enterDigit('one');
        service.enterOperation('Dong');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('error');
    });

    // test with invalid digit input
    it('should display  error if entered Dong', function() {
        service.enterDigit('Dong');
        expect(service.getDisplay()).toEqual('error');
    });

    // test with invalid digit input
    it('should display error if entered, Dong, +, one and equal', function() {
        service.enterDigit('Dong');
        service.enterOperation('+');
        service.enterDigit('one');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('error');
    });

    // test for enterClear
    it('should display 0 if entered clear and equal', function() {
        service.enterClear();
        expect(service.getDisplay()).toEqual('0');
    });

    // test for enterClear
    it('should display 0 if entered clear and equal', function() {
        service.enterClear();
        service.enterEquals();
        expect(service.getDisplay()).toEqual('0');
    });

    // test for enterClear
    it('should display 0 if entered one, +, two, equal and clear', function() {
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterEquals();
        service.enterClear();
        expect(service.getDisplay()).toEqual('0');
    });

    // test for new calculation after clearing a calculation
    it('should display 0 if entered one, +, two, equal, clear, one, +, two and equal', function() {
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterEquals();
        service.enterClear();
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('3');
    });

    // test for new calculation after clearing a digit entering
    it('should display 0 if entered one, two, equal, clear, one, +, two and equal', function() {
        service.enterDigit('one');
        service.enterDigit('two');
        service.enterClear();
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('3');
    });

    // test for new calculation after clearing an error
    it('should display 0 if entered +, equal, clear, one, +, two and equal', function() {
        service.enterDigit('+');
        service.enterEquals();
        service.enterClear();
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('3');
    });

    // test for consecutive calculation
    it('should display 5 if entered one, +, two, equal, +, two and equal', function() {
        service.enterDigit('one');
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterEquals();
        service.enterOperation('+');
        service.enterDigit('two');
        service.enterEquals();
        expect(service.getDisplay()).toEqual('5');
    });
});
