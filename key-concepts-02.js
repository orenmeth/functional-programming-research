// https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-2-7005682cec4a

// Refactoring - Level 0
function validateSsn(ssn) {
    if(/^\d{3}-\d{2}-\d{4}$/.exec(ssn))
        console.log('Valid SSN');
    else
        console.log('Invalid SSN');
}

function validatePhone(phone) {
    if(/^\(\d{3}\)\d{3}-\d{4}$/.exec(phone))
        console.log('Valid Phone Number');
    else
        console.log('Invalid Phone Number');
}

// Refactoring - Level 1 (extract the regular exprssion)
function validateValue(value, regex, type) {
    if(regex.exec(value))
        console.log('Invalid ' + type);
    else
        console.log('Valid ' + type);
}

// And this?
function validateAddress(address) {
    if (parseAddress(address))
        console.log('Valid Address');
    else
        console.log('Invalid Address');
}

function validateName(name) {
    if (parseFullName(name))
        console.log('Valid Name');
    else
        console.log('Invalid Name');
}

// Higher Order Functions
// either take functions as parameters, returns functions or both.
function validateValueWithFunc(value, parseFunc, type) {
    if (parseFunc(value))
        console.log('Invalid ' + type);
    else
        console.log('Valid ' + type);
}

// Passing the validation function as a parameter
validateValueWithFunc('123-45-6789', /^\d{3}-\d{2}-\d{4}$/.exec, 'SSN');
validateValueWithFunc('(123)456-7890', /^\(\d{3}\)\d{3}-\d{4}$/.exec, 'Phone');
validateValueWithFunc('123 Main St.', parseAddress, 'Address');
validateValueWithFunc('Joe Mama', parseName, 'Name');

// Extracting the reuglar expressions
var parseSsn = /^\d{3}-\d{2}-\d{4}$/.exec;
var parsePhone = /^\(\d{3}\)\d{3}-\d{4}$/.exec;
validateValueWithFunc('123-45-6789', parseSsn, 'SSN');
validateValueWithFunc('(123)456-7890', parsePhone, 'Phone');
validateValueWithFunc('123 Main St.', parseAddress, 'Address');
validateValueWithFunc('Joe Mama', parseName, 'Name');

// Extracting the exec() regex function
function makeRegexParser(regex) {
    return regex.exec;
}
var parseSsn = makeRegexParser(/^\d{3}-\d{2}-\d{4}$/);
var parsePhone = makeRegexParser(/^\(\d{3}\)\d{3}-\d{4}$/);
validateValueWithFunc('123-45-6789', parseSsn, 'SSN');
validateValueWithFunc('(123)456-7890', parsePhone, 'Phone');
validateValueWithFunc('123 Main St.', parseAddress, 'Address');
validateValueWithFunc('Joe Mama', parseName, 'Name');

// A higher order function that returns a function
function makeAdder(constantValue) {
    return function adder(value) {
        return constantValue + value;
    };
}

// How it's used
var add10 = makeAdder(10);
console.log(add10(20)); // prints 30
console.log(add10(30)); // prints 40
console.log(add10(40)); // prints 50

// The add10 method continues to have access to the constant value, since constantValue was in
// its scope when it was created. This is called a closure.

// A contrived example
function grandParent(g1, g2) {
    var g3 = 3;
    return function parent(p1, p2) {
        var p3 = 33;
        return function child(c1, c2) {
            var c3 = 333;
            return g1 + g2 + g3 + p1 + p2 + p3 + c1 + c2 + c3;
        };
    };
}

// A usage example
var parentFunc = grandParent(1, 2); // returns parent()
var childFunc = parentFunc(11, 22); // returns child()
console.log(childFunc(111, 222)); // prints 738
// 1 + 2 + 3 + 11 + 22 + 33 + 111 + 222 + 333 == 738

// When a function is created, all variables that are in its scope at that time are accessible to it for 
// the lifetime of the function.

// Another definition: a closure is a function's scope that's kept alive by a reference to that function.

// In JavaScript, closure are problematic because the variables that are closed over
// are mutable, which means the values they represent may be changed.
