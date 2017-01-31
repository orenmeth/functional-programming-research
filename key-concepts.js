// A pure function...
var z;
function add(x, y) {
    return x + y; // only operates on it's input parameters.
}

// A useful pure function will have one or more parameters...
function returnTwo() {
    return 2; // otherwise it should rather just be a constant.
}

// All useful pure functions must return something...
function addNoReturn(x, y) {
    var z = x + y; // otherwise they're useless.
}

// Pure functions will always produce the same output, given the same input.
console.log(add(1, 2)); // returns 3
console.info(add(1, 2)); // still returns 3
console.warn(add(1, 2)); // and always will return 3.

// Impure functions have an effect. 
// They do more than just operate on their inputs, so you can never predict what they return.
writeFile(fileName);
updateDatabaseTable(sqlCmd);
sendAjaxRequest(ajaxRequest);
openSocket(ipAddress);

/*  In imperative programming, state is pervaive and side-effects are the norm.
    A variable can be changed anywhere in the program. When bugs arise where a
    variable has been changed to the wrong value and/or at te wrong time, you 
    have to look everywhere for the cause.
*/

/*  If a program was constructed completely out of pure functions, it would do little
    else but warm the room it's being run in, since pure functions do not have any effect.
    Functional programming strives to confine the impure parts of the application to where
    they are required, keeping the pure parts insulated from any side-effects.
*/

/*  Immutability
    In maths, we know x = x + 10 is invalid.
    In imperative programming, we know that the identity x refers to the value of x + 10 at that point in time.
    In functional programming, this statement is simply illegal as the value of x is immutable.
    There are no variables in Functional Programming, they're all constants.
*/

// Since loops have store an internal variable which is update on each iteration, 
// function programming abandons them in favour of recursion. Non-recursive loops require mutability.

// Normal imperative loops
var acc = 0;
for (var i = 0; i <= 10; i++) {
    acc += i;
}
console.log(acc); // prints 55

// Recusrion, without loop construct or variables
function sumRange(start, end, acc) {
    if(start > end) {
        return acc;
    }
    return sumRange(start + 1, end, acc + start);
}
console.log(sumRange(1, 10, 0)); // prints 55

/*  Immutability means that you only have read access to values in the program.
    Neither yourself or anyone else can change that value. In a multi-threaded application,
    no other thread can mutate that value, it will have to create another copy.
    Immutability creates simpler and safer code.
*/

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

