require("colors")
var Table = require('cli-table3');

function truncateOrPad(str, length) {
	if(!length) return str;
	if(str.length > length) return str.substr(0, length);
	let i = length - str.length
	while(i > 0) {
		str = str + " ";
		i--;
	}
	return ` ${str}`
}

function displayNoTable(col, keys, width, data){
	let table = []
	data.forEach((d, i) => {
		let row = [i + 1]
		keys.forEach((k, index) => {
			let value = k.split(".").reduce((p, c) => {
				return p ? p[c] : 'Nil'
			}, d)
			value = value || " "
			if(value.endsWith("@appveen.com")) {
				value = value.replace("@appveen.com", "")
				value = value.charAt(0).toUpperCase() + value.slice(1)
			}
			if(value === "Nil") row.push(truncateOrPad(value, width[index]).grey)
			else row.push(truncateOrPad(value, width[index]))
		})
		table.push(row)
	})

	let cols = ["#"]
	col.forEach((_col, index) => cols.push(truncateOrPad(_col, width[index])))
	console.log(cols.join(" "))
	let headerLength = width.reduce((p, c) => p+c, 0)
	headerLength += width.length
	let line = ""
	while(headerLength > 0 ) {
		line += "-";
		headerLength--;
	}
	console.log(line)
	table.forEach(row => console.log(row.join(" ")))
	console.log(line)
};

function displayTable(col, keys, width, data){
	// console.clear()
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
			if(value && typeof value != "number" && value.endsWith("@appveen.com")) {
				value = value.replace("@appveen.com", "")
				value = value.charAt(0).toUpperCase() + value.slice(1)
			}
			row.push(value)
		})
		table.push(row)
	})
	console.log(table.toString())
};

module.exports = displayNoTable