# better-structured-clone
A node module to deep-clone objects (or anything) that works better.
Common packages like structuredClone or the deep-clone functionality in lowdash has massive drawbacks by not supporting symbols and functions. This package solves this.

## Installation
```bash
npm install better-structured-clone
```

## Usage
```javascript
const clone = require('better-structured-clone');

const object = {
	symbol: Symbol('symbol'),
	function: () => console.log('function'),
	string: 'string',
	number: 1,
}

const clonedObject = clone(object);
```