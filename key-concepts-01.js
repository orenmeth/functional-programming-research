// https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536

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
