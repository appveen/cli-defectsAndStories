require("colors")
var Table = require('cli-table3');

module.exports = (col, keys, width, data) => {
	console.clear()
	let table = new Table({
		head: col,
		colWidths: width
	});
	data.forEach((d, i) => {
		let row = [i + 1]
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