const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "config.env") })
const ds = require("./dataStack")
const menu = require("./menu")
const display = require("./display")

let storyDS = null;

let columnNames = process.env.DS_STORY_COL_NAMES.split(",")
let columns = (process.env.DS_STORY_COL || "_id").split(",")
let colWidth = process.env.DS_STORY_COL_WIDTH.split(",").map(_ => parseInt(_))

async function getDefectsBasedOnRelease(release) {
	let filter = { "releaseVersion.releaseVersion": release }
	let defectCount = await storyDS.DataAPIs().CountRecords({
		filter: filter
	});
	let stories = await storyDS.DataAPIs().ListRecords({
		select: process.env.DS_STORY_COL || "_id",
		filter: filter,
		sort: "priority",
		count: defectCount
	});
	display(columnNames, columns, colWidth, stories)
};

async function entryPoint() {
	let selection = await menu.select("Select:", ["vNext", "Backlog", "Other release"])
	if(selection == "vNext") await getDefectsBasedOnRelease("vNext")
};

module.exports = async () => {
	storyDS = await ds.app.DataService(process.env.DS_STORY || 'Story');
	await entryPoint()
};


// [
//   "Identified",
//   "In Progress",
//   "Rejected",
//   "Developed",
//   "Duplicate",
//   "Closed",
//   "Ready for Release",
//   "Released",
//   "Ready for I&T"
// ]