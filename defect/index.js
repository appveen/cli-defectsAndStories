const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "config.env") })
const ds = require("../dataStack")
const menu = require("../menu")
const display = require("../display")

let defectDS = null;

async function getDefectsBasedOnRelease(release) {
	let filter = { "$and": [{ "$or": [{ "releaseVersion._id": `/${release}/` }, { "releaseVersion.releaseVersion": `/${release}/` }] }] }
	let defectCount = await defectDS.DataAPIs().CountRecords({
		filter: filter
	});
	let defects = await defectDS.DataAPIs().ListRecords({
		select: process.env.DS_DEFECT_COL || "_id",
		filter: filter,
		sort: "priority",
		count: defectCount
	});
	display(process.env.DS_DEFECT_COL_NAMES.split(","), (process.env.DS_DEFECT_COL || "_id").split(","), defects)
}

async function entryPoint() {
	let selection = await menu.select("Select:", ["vNext", "Open", "Other release"])
	if(selection == "vNext") await getDefectsBasedOnRelease("vNext")
}

module.exports = async () => {
	defectDS = await ds.app.DataService(process.env.DS_Defects || 'Defects');
	await entryPoint()
};;