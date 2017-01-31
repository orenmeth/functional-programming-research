// https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-3-1b0fd14eb1a7

/*
    Function Composition
    -- Functions are building blocks.
    -- We create small, re-usable pieces that we can put together to construct more complex functionality.
*/

var add10 = function(value) {
    return value + 10;
};
var mult5 = function(value) {
    return value * 5;
};

// It's very verbose. Rewrite using fat arrow notation
var add10 = value => value + 10;
var mult5 = value => value * 5;

// Say we need a function that takes a value, adds 10 to it, then multiplies the result by 5
var mult5AfterAdd10 = value => 5 * (value + 10);

// It's simple, but we don't want to write it from scratch.
// We already have a function that adds 10 and another that multiplies by 5.
// So lets compose the more complex function using the simple building blocks.
var mult5AfterAdd10 = value => mult5(add10(value));

// In maths this would look like f(g(x)), or f after g.
// Javascript doesn't do function composition natively, so let's look at some Elm.
