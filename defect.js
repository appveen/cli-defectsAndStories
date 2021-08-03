const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "config.env") })
const ds = require("./dataStack")
const menu = require("./menu")
const display = require("./display")

let defectDS = null;
let defects = [];

let count = parseInt(process.env.DS_COUNT) || 30
let columnNames = process.env.DS_DEFECT_COL_NAMES.split(",")
let columns = (process.env.DS_DEFECT_COL || "_id").split(",")
let colWidth = process.env.DS_DEFECT_COL_WIDTH.split(",").map(_ => parseInt(_))

async function getDefectsBasedOnRelease(release) {
	let page = 1;
	while (true){
		if(page < 1) page = 1;
		let filter = { "releaseVersion.releaseVersion": release }
		let defectCount = await defectDS.DataAPIs().CountRecords({
			filter: filter
		});
		// console.log(defectCount)
		let defectsFromAPI = await defectDS.DataAPIs().ListRecords({
			select: process.env.DS_DEFECT_COL || "_id",
			filter: filter,
			sort: "status",
			count: count,
			page: page
		});
		if(defectsFromAPI.length == 0 ) {
			page = page -1
		} else defects = defectsFromAPI
		display(columnNames, columns, colWidth, defects)
		let option = await menu.select("Navigation > ", ["Next",  "Previous", "Display", "Back"])
		if(option == "Next") page += 1
		if(option == "Previous") page -= 1
		if(option == "Back") break
	}
};

async function getDefectsBasedOnStatus(status) {
	let page = 1;
	while (true) {
		let filter = {
			"status": {
				"$in": status
			}
		};
		let defectsFromAPI = await defectDS.DataAPIs().ListRecords({
			select: process.env.DS_DEFECT_COL || "_id",
			filter: filter,
			sort: "status",
			count: count,
			page: page
		});
		if(defectsFromAPI.length == 0 ) {
			page = page -1
		} else defects = defectsFromAPI
		display(columnNames, columns, colWidth, defects)
		let option = await menu.select("Navigation > ", ["Next",  "Previous", "Back"])
		if(option == "Next") page += 1
		if(option == "Previous") page -= 1
		if(option == "Back") break
	}
};

module.exports = async () => {
	defectDS = await ds.app.DataService(process.env.DS_DEFECT || 'Defects');
	while (true) {
		let selection = await menu.select("Select:", ["vNext", "Open or Re-Open", "Other release", "Back"])
		if(selection === "vNext") await getDefectsBasedOnRelease("vNext")
		if(selection === "Open or Re-Open") await getDefectsBasedOnStatus(["Open", "Re-Open"])
		if(selection == "Back") break
	}
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