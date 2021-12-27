// ██████ Integrations █████████████████████████████████████████████████████████


const { prefix } 	= require("../config");
const guildSettings = require('../schemas/guildSettings')
const userInfo 		= require("../schemas/userInfo")

// ██████ | █████████████████████████████████████████████████████████

module.exports = {

	async execute(message) {
		
	    // —— Below is me finding the guildId in the database.

		const guildSetting = await guildSettings.findOne({ 
			guildId: message.guild.id 
			});


		// —— Filter if there is a custom prefix on the guild set.

   		 if (!guildSetting) { 
			  serverPrefix = prefix;
			} else if(guildSetting) {
			  serverPrefix = guildSetting.prefix;
			}
		
		return message.reply(
			`Heya ${message.member.displayName}, looking for my prefix in this server? It's \`${useprefix}\`. You can also just ping me and the command instead of the prefix!`
		);


	},
};
