'use strict';
const path = require('path');
const cp = require('child_process');

module.exports = () => {
	const subProcess = cp.spawn(path.join(__dirname, 'check.js'), [], {
		detached: true,
		stdio: 'ignore'
	});
	subProcess.unref();
};
