
		/** 
		 * betterStructuredClone
		 * Deep-clone an object, including functions, symbols, maps, and arrays.
		 *
		 * @param { Object } obj - The object to clone
		 * @param { boolean } supressWarnings - Whether to supress warnings about functions and symbols, explaining that they are instances of the original function/symbol.
		 * @returns { Object } - The cloned object
		 */
		const betterStructuredClone = (obj, supressWarnings = false) => {
			function warn(thing) {
				// check if it's a function
				if (typeof thing === 'function') {
					console.warn("Function found in object. It will be still be kept, but it will not be a true clone. it will be a reference to the original function.")
				}
				// warn when the key is a symbol
				if (typeof thing === 'symbol') {
					console.warn("Symbol found in object key. It will be still be kept, but it will not be a true clone. it will be a reference to the original symbol, because symbols are unique, your program would break if it was not the same.")
				}
			}


			// if string or number or boolean, return it
			if (typeof obj !== 'object' || obj === null) {
				if (!supressWarnings) warn(obj);
				return obj;
			}

			let newObj = Object.assign({}, obj);
			for (let key of Object.keys(newObj)) {

				if (!supressWarnings) warn(newObj[key]);

				if (typeof newObj[key] === 'object' && (!Array.isArray(newObj[key])) && !(newObj[key] instanceof Map)) {
					// check if it's a function
					if (!supressWarnings) warn(newObj[key]);
					newObj[key] = betterStructuredClone(newObj[key]);
				}
				// support arrays too
				if (Array.isArray(newObj[key])) {
					let newArr = [];
					for (let i = 0; i < newObj[key].length; i++) {
						newArr.push(betterStructuredClone(newObj[key][i]))
					}
					newObj[key] = newArr;
				}
				// and map
				if (newObj[key] instanceof Map) {
					// get the entries, and clone them
					let newMap = new Map();
					for (let [k, v] of newObj[key].entries()) {
						newMap.set(k, betterStructuredClone(v));
					}
					newObj[key] = newMap;

				}
			}
			return newObj;
		}

		module.exports.betterStructuredClone = betterStructuredClone;