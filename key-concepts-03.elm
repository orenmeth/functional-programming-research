add10 value =
    value + 10

mult5 value =
    value * 5

mult5AfterAdd10 value =
    (mult5 << add10) value

-- The infix operator << is how you compose a functio in Elm
-- Gives a visual sense of how the data is flowing
-- Value is passed to add10, then the result is passed to mult5

-- You can compose as many functions as you like in this manner
f x =
   (g << h << s << r << t) x

-- Point Free Notation
-- A style of writing functions without having to specify the parameters
-- In mult5AfterAdd10, value is specified twice, once in the parameter list
-- and then again where it's being used.

-- This is a function that expects one parameter, using point free notation
mult5AfterAdd10 =
    (mult5 << add10)

-- The benefits are
-- 1) Don't have to specify redundant parameters
-- 2) Easier to read and less verbose. Imagine a function that took more parameters

-- Now we want an add function, instead of an add10
add x y =
    x + y
mult5 value =
    value * 5

-- This is wrong becaause it only passed 1 parameter to add
mult5AfterAdd10 =
    (mult5 << add) 10

-- It's obviously wrong when we translate it to JavaScript
var mult5AfterAdd10 = mult5(add(10));

-- This will work, but we're no longer just combining functions, we're creating new ones
var mult5AfterAdd10 = y => mult5(add(10, y));

-- Currying to the rescue!
