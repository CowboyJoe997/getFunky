"use strict"

function getStack() {

	let backup = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => {
		// console.log(_);
		// console.log(stack)
		return stack;
	};

	let error = new Error();
	Error.captureStackTrace(error);

	let stack = error.stack;
	Error.prepareStackTrace = backup;

	return stack;
};

function getCalleeName() {

	return getFunctionName(3);
}

function getCallerName() {

	return getFunctionName(4);
}

function getFunctionName(index) {

	index = index || 0;

	let stack = getStack(); // NOTE: gets placed on the stack

	if (stack.length <= index) {
		throw('Stack does not contain ' + index + ' levels.');
	}

	let site = stack[index];
	if (!site) throw('No Site');

	let s = site.getFunctionName();

	return s;
}

function showStack() {

	let stack = getStack();

	for ( let site of stack ) {
		let fName = site.getFunctionName() || 'anonymous';
		console.log(fName);
	}
}

function test1() {
	console.log( getFunctionName(2) );
}

function test2() {
	console.log(getCalleeName());
}

function test3() {
	console.log(getCallerName());
}

function test() {

	test1();
	test2();
	test3();
}

module.exports = {
	getStack,
	getCalleeName,
	getCallerName,
	getFunctionName,
	test,
	showStack
}
