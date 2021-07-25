const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "config.env") })
const ds = require("../dataStack")
const menu = require("../menu")
const display = require("../display")

let defectDS = null;

let columnNames = process.env.DS_DEFECT_COL_NAMES.split(",")
let columns = (process.env.DS_DEFECT_COL || "_id").split(",")
let colWidth = process.env.DS_DEFECT_COL_WIDTH.split(",").map(_ => parseInt(_))

async function getDefectsBasedOnRelease(release) {
	let filter = { "releaseVersion.releaseVersion": release }
	let defectCount = await defectDS.DataAPIs().CountRecords({
		filter: filter
	});
	let defects = await defectDS.DataAPIs().ListRecords({
		select: process.env.DS_DEFECT_COL || "_id",
		filter: filter,
		sort: "priority",
		count: defectCount
	});
	display(columnNames, columns, colWidth, defects)
};

async function getDefectsBasedOnStatus() {
	let filter = {
		"status": {
			"$in": status
		}
	};
	let defectCount = await defectDS.DataAPIs().CountRecords({
		filter: filter
	});
	let defects = await defectDS.DataAPIs().ListRecords({
		select: process.env.DS_DEFECT_COL || "_id",
		filter: filter,
		sort: "priority",
		count: defectCount
	});
	display(columnNames, columns, colWidth, defects)
};

async function entryPoint() {
	let selection = await menu.select("Select:", ["vNext", "Open or Re-Open", "Other release"])
	if(selection === "vNext") await getDefectsBasedOnRelease("vNext")
	if(selection === "Open or Re-Open") await getDefectsBasedOnStatus(["Open", "Re-Open"])
};

module.exports = async () => {
	defectDS = await ds.app.DataService(process.env.DS_DEFECT || 'Defects');
	await entryPoint()
};

// [
//   "Open",
//   "In Progress",
//   "Ready for QA",
//   "Ready for Release",
//   "Rejected",
//   "Cannot Reproduce",
//   "Working as Expected",
//   "Configuration Issue",
//   "Duplicate",
//   "Closed",
//   "Re-Open",
//   "Fixed",
//   "Ready for I&T"
// ]