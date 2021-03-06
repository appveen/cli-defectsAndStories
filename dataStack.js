const fs = require("fs")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "config.env") })
const SDK = require("@appveen/ds-sdk");

const menu = require("./menu")

const credentialsFile = path.join(__dirname, "credentials")

let logger = {
	level: "INFO",
	info: () => {},
	error: () => {},
	debug: () => {},
	trace: () => {},
};

let dataStack = null;
let e = {}

e.app = null

e.init = async () => {

	if(!fs.existsSync(credentialsFile)) {
		let username = await menu.question("Username - ")
		let password = await menu.password("Password - ")
		fs.writeFileSync(credentialsFile, `${username}\n${password}`)
	}

	let credentials = fs.readFileSync(credentialsFile).toString().split("\n")

	process.env.DATA_STACK_USERNAME = credentials[0];
	process.env.DATA_STACK_PASSWORD = credentials[1];

	dataStack = await SDK.authenticateByCredentials({
		logger: logger
	});

	e.app = await dataStack.App(process.env.APP || "data-stack")
}

process.on('SIGINT', async function() {
  await dataStack.Logout();
  process.exit();
});



module.exports = e;