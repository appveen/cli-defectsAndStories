const menu = require("./menu");
const ds = require("./dataStack");
const defect = require("./defect");
const story = require("./story");

(async function () {
	console.clear();
	await ds.init()
	while (true){
		let selection = await menu.select("Select:", ["Defect", "Story", "Logout and exit"])
		if(selection === "Defect") await defect()
		if(selection === "Story") await story()
		if(selection === "Logout and exit") break
	}
}())

