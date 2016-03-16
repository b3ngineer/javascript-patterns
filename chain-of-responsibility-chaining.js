
// This implementation uses the fn.prototype in case multiple instances of Chain()
// are created with the same business rules.

// An alternate implementation for multiple Chain() instances with *different* owners
// could use instance specific functions that are empty on _Chain().

// The "done" methods.
function _Chain() {}

_Chain.prototype.next = function() {
	return this;
};

_Chain.prototype.createChainLinks = function() {
	for (var method in Chain.prototype) {

		if (!!_Chain.prototype[method]) {
			continue;
		}

		if (!Chain.prototype.hasOwnProperty(method)) {
			continue;
		}

		_Chain.prototype[method] = _Chain.prototype.next;
	}
};

// The owner of the chain methods
function Chain() {
	this.done = new _Chain();
	this.done.createChainLinks();
	this.next = this; // included for readability
}

//
// Owner methods
//

Chain.prototype.foo = function(data) {
	if (data.type != 'foo') {
		return this.next;
	}
  console.log('Foo is responsible for this!');
	return this.done;
};

Chain.prototype.bar = function(data) {
	if (data.type != 'bar') {
		return this.next;
	}
  console.log('Bar is responsible for this!');
	return this.done;
};

// new Chain().foo(data).bar(data);
