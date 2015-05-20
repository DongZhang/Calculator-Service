# Calculator-Service
Implementation of a really simple calculator without using eval() function

### Methods:
- enterDigit(digit) - enter a digit of string, e.g. 'one'
- enterOperation(operation) - operation is one character, e.g. '+'
- enterEquals()
- enterClear() - full clear
- getDisplay() - returns current display as a string

### Examples:
- enterDigit('one') ==> expect to display '1'
- enterDigit('two') ==> expect to display '12'
- enterOperation('+') ==> expect to display '12'
- enterDigit('three') ==> expect to display '3'
- enterEquals() ==> expect to display '15'

### Note: 
- Valid input digits: 0 - 9
- Valid operator: +, -, *, /
- Do not take any brackets as input
- Need to enterClear before start a new calculation, if the previous one is completed
