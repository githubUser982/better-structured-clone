const {clone} = require('./index.js');
const assert = require('assert');

const testObj1 = {
	string: "string",
	number: 1,
	boolean: true,
	null: null,
	array: [1, 2, 3],
	map: new Map([["key", "value"]]),

	function: function() {},
	symbol: Symbol("symbol"),

	obj: {
		obj2: {
			string: "haha",
		}
	}

}

const clonedObj1 = clone(testObj1);

assert(clonedObj1 !== testObj1, "The cloned object is the same as the original object. This is not a deep clone.");
assert(clonedObj1.function === testObj1.function, "The function was not cloned, it is a reference to the original function.");

//check that the string, number, boolean, and null are the same
assert(clonedObj1.string === testObj1.string, "The string was not cloned correctly.");
assert(clonedObj1.number === testObj1.number, "The number was not cloned correctly.");
assert(clonedObj1.boolean === testObj1.boolean, "The boolean was not cloned correctly.");
assert(clonedObj1.null === testObj1.null, "The null was not cloned correctly.");

//check the array
assert(clonedObj1.array !== testObj1.array, "The array was not cloned correctly, it is a reference to the original array.");
//contents:
assert(clonedObj1.array[0] === testObj1.array[0], "The array contents were not cloned correctly.");

//check the map
assert(clonedObj1.map !== testObj1.map, "The map was not cloned correctly, it is a reference to the original map.");
//contents:
assert(clonedObj1.map.get("key") === testObj1.map.get("key"), "The map contents were not cloned correctly.");

//check the symbol
assert(clonedObj1.symbol === testObj1.symbol, "The symbol was not cloned correctly, it is a reference to the original symbol.");

//check the object
assert(clonedObj1.obj !== testObj1.obj, "The object was not cloned correctly, it is a reference to the original object.");
//check the nested object
assert(clonedObj1.obj.obj2 !== testObj1.obj.obj2, "The nested object was not cloned correctly, it is a reference to the original object.");
//and the contents
assert(clonedObj1.obj.obj2.string === testObj1.obj.obj2.string, "The nested object contents were not cloned correctly.");

console.log("All tests passed!");