# getFunky
Gets the name of the current function in js.

# WARNING
This is working on some node(v8). I am not sure about other engines or browsers. It could be running on other engines with v8 engine.

This IS ugly, but works in strict mode and is synced.

Imho there should be a low end api for caller and callee names
that does not need reading the stack manually.

To properly get the function name, `getCalleeName()` must be the first call in the callee. Otherwise you have to count the
functions on the stack yourself.

When the function is flattened or optimized away there is no function name. You will get a WRONG name then.

# Installation

`npm install https://github.com/CowboyJoe997/getFunky`

# Usage

see test.js:

```js
"use strict"

const getFunky = require('./getFunky.js');

function main() {
	getFunky.test();
}

main();
```
You have to call:
```console
> npm run test

```

This should result in
```console
> node run test

test1
test2
test
```
It calls `test[123]()` and MUST return the correct names `test1`, `test2` and `test`. The last one must be `test`, not `test3`, because it is the caller!
If it does not, you might have to adjust the relative position yourself.

# How does it work ?

The stack SOMEWHAT looks like this:

| Depth | Name   |
|-------|--------|
|     0 | callee |
|     1 | caller |
|   ... | ...    |
|     n | bottom |

Now we need to get a stackpointer with `getCalleeName()`. After that the stack looks like this:


| Depth | Name            |
|-------|-----------------|
|     0 | getStack        |
|     1 | getFunctionName |
|     2 | getCalleeName   |
|     3 | callee          |
|     4 | caller          |
|   ... |  ...            |
|     n | bottom          |

Although `getStack()` is finished, it stays on the stack and must be taken into account when counting the depth. The calls can be flattened out and integrated into the callee to remove stacklevels, but the getCaller and getCallee do not work properly anymore.

We then get the stackframe of the specified depth and the functionname from it.

Without proper knowledge of the stack this tool is not helpful to you.

# License

MIT
