/**

Calculator Service
Author: Dong Zhang

Note: 

- Valid input digits: 0 - 9
- Valid operator: +, -, *, /
- Do not take any brackets as input
- Need to enterClear before start a new calculation, if the previous one is completed

**/
'use strict';

function CalculatorService() {

	// the object can convert number names to values
	var digits = {
		zero: '0',
		one: '1',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9'
	};

	// helper to check if a operation sub-array is valid and determin if the overall value of the sub-array is positive
	// checkOperation() returns a boolean or null or string of 'same', based on the passed in array
	var checkOperation = function(array) { 
		// if the subarray is not valid, return null
		if ((array.indexOf('*') !== -1 && array.indexOf('*') !== 0)
		 || (array.indexOf('/') !== -1 && array.indexOf('/') !== 0)) {
			return null;
		}
		// determine if the overall value of the sub-array is positive
		else if (array.length > 1) {
			var count = 0;
			// count the number of '-'
			array.map(function(a, b) {
				if (a === '-') count++;
			});
			if (count % 2) {
				return false;
			} else {
				return true;
			}
		} else {
			// for subarray of length 1, return string 'same'
			return 'same';
		}
	};

	// helper to check valid operator
	var ifValidOp = function(op) {
		return (op === '+' || op === '-' || op === '*' || op === '/');
	};

	// initilize two arrays that to keep track of numbers and operators
	var currents = [];
	var operations = [[]]; // array of array so that operator can be pushed directly to the first element
	var Error = false;

	// digit is string, e.g. 'one'
	this.enterDigit = function(digit) {
		// check if the digit is valid
		if (digit in digits) {
			if (currents.length === 0) {
				currents[0] = digits[digit];
			} else {
				currents[currents.length - 1] += digits[digit];
			}

			// check if need to create space for next operator
			if (operations.length !== 0 && operations[operations.length - 1].length !== 0) {
				operations.push([]);
			}
		} else {
			// the digit is not valid
			Error = true;
		}
	};

	// operation is one character, e.g. '+'
	this.enterOperation = function(operation) {
		// check if the operator is valid
		if (ifValidOp(operation)) {
			// only + or - can use as sign changer
			if (currents.length === 0 && (operation === '+' || operation === '-')) {
				currents[0] = operation;
			} else {
				operations[operations.length - 1].push(operation);
				if (currents[currents.length - 1] !== '') {
					// add an empty string to currents so that the comming up number can be added seperately
					currents.push('');
				}
			}
		} else {
			Error = true;
		}
	};

	this.enterEquals = function() {
		// take care of base cases

		// add empty array to operations if it is empty
		if (operations.length === 0) {
			operations.push([]);
		}

		if (operations[0].length === 0) {
			if (currents.length === 0) {
				// if enter with equal directly
				return currents[0] = '0';
			} else if (!isNaN(Number(currents[0]))) {
				// if the first element of currents is a number, in case of '+1'
				currents[0] = String(Number(currents[0]));
			} else {
				// error if not a number
				Error = true;
			}
		}

		// remove the last empty sub-array in operations
		if (operations[0] && operations[operations.length - 1].length === 0) operations.pop();

		// remove the last empty string in currents
		if (currents[0] && currents[currents.length - 1].length === 0) currents.pop();

		// operate each sub-array of operations
		for (var i = 0; i < operations.length; i++) {
			// error if sub-array is not valid
			if (checkOperation(operations[i]) === null)	Error = true;
			// do nothing if sub-array should stay the same
			else if (checkOperation(operations[i]) === 'same') null;
			// if sub-array can be substitued by addition operation
			else if (checkOperation(operations[i])) operations[i] = ['+'];
			// if sub-array can be substitued by substraction operation
			else operations[i] = ['-'];
		}

		// the length of currents should be greater by 1 than the length of operations
		if (currents.length - 1 === operations.length) {
			// do multiplication and division first
			for (var i = 0; i < currents.length - 1;) {
				switch(operations[i][0]) {
					case '*':
						// updated the first number with the outcome of calculation
						currents[i] = String(Number(currents[i]) * Number(currents[i + 1]));
						// delete the second number that just been calculated
						currents.splice(i + 1, 1);
						// delete the operator has been used
						operations.splice(i, 1);
						break;
					case '/':
						currents[i] = String(Number(currents[i]) / Number(currents[i + 1]));
						currents.splice(i + 1, 1);
						operations.splice(i, 1);
						break;
					case '+':
						i++; // check the next operator if it is not * or /
						break;
					case '-':
						i++
						break;
				}
			}
			// do addition and subtraction
			for (var i = 0; i < currents.length - 1;) {
				switch(operations[i][0]) {
					case '+':
						currents[i] = String(Number(currents[i]) + Number(currents[i + 1]));
						currents.splice(i + 1, 1);
						operations.splice(i, 1);
						break;
					case  '-':
						currents[i] = String(Number(currents[i]) - Number(currents[i + 1]));
						currents.splice(i + 1, 1);
						operations.splice(i, 1);
						break;
				}
			}
		} else {
			Error = true;
		}
		// reset operations to get ready for consecutive calculation
		operations = [[]];
	};

	// full clear
	this.enterClear = function() {
		// reset two arrays and error indicator
		currents = [];
		operations = [[]];
		Error = false;
	};

	// return current display as a string
    this.getDisplay = function () {
    	if (Error) return 'error';
    	else if (currents.length === 0) {
    		// if the currents is empty, stay with 0
    		return '0';
    	} else if(currents.length === 1 && ifValidOp(currents[0])) {
    		// in case of only one operator entered
    		return '0';
    	} else if(currents.length === 2 && ifValidOp(currents[0]) && currents[1] === '') {
    		// in case of serveral operators entered
    		return '0';
    	} else if (currents[currents.length - 1] === '') {
    		// if the last element is empty string added by enter an operator, the cases without equal
    		return currents[currents.length - 2];
    	} else {
    		// display the last element of the currents
    		return currents[currents.length - 1];
    	}
    };
}
