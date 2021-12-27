
const Discord = require('discord.js')


module.exports = {
	name: "afk",
	description: 'Enable or Disable the Auto-Moderation in the server.',
	usage: 'Doing homework.',
	cooldown: 10,
	aliases: ["setafk"],
	// permissions: 'ADMINISTRATOR',


	execute(message, args) {
		
        /* ----------

        " To Do: "

        * If a user go afk -- set current nickname added with [AFK]
        * If user is pinged while afk, and when he go back, send dm list of logs.
        * MongoDB schema.
        
        ---------- */
		
        message.reply('This command is currently work in progress, you may retry to use the command later.')


        let reason = args.slice(0).join(' ')

        
	},
};
