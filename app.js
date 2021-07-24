const menu = require("./menu");
const ds = require("./dataStack");
const defect = require("./defect");

(async function () {
	await ds.init()
	let selection = await menu.select("Select:", ["Defect", "Story"])
	if(selection == "Defect") await defect()
}())

