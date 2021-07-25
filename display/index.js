require("colors")
var Table = require('cli-table3');

module.exports = (col, keys, width, data) => {
	let table = new Table({
		head: col,
		colWidths: width
	});
	data.forEach(d => {
		let row = []
		keys.forEach(k => {
			let value = k.split(".").reduce((p, c) => {
				return p ? p[c] : 'Nil'.grey
			}, d)
			row.push(value)
		})
		table.push(row)
	})
	console.log(table.toString())
} ;