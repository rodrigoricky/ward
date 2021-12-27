// ██████ Integrations █████████████████████████████████████████████████████████

const Dashboard 		= require("../dashboard/dashboard");
const config		    = require("../config");

// ██████ | ███████████████████████████████████████████████████████████████████

module.exports = {
	name: "ready",
	once: true,

	execute(client) {

		// —— Below is the code to execute once the script is running.

		client.config = config;
    console.log(`Ready! Logged in as ${client.user.tag}`);
    Dashboard(client);
		
	},
};
