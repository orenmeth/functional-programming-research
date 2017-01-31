// https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-4-18fbe3ea9e49

/*
    Currying
    - A curried function is a function that only takes a single parameter at a time
*/

var add = x => y => x + y
// This function takes x, returns a function which takes y, then return the sum of x and y

var compose = (f, g) => x => f(g(x));
var mult5AfterAdd10 = compose(mult5, add(10));