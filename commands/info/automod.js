var rhymes = require('rhymes')
const Discord = require('discord.js')


module.exports = {
	name: "automod",
	description: 'Enable or Disable the Auto-Moderation in the server.',
	usage: '',
	cooldown: 5,
	aliases: ["setautomod", "automoderation"],
	permissions: 'ADMINISTRATOR',


	execute(message, args) {
		
		message.reply('This command is currently work in progress, you may retry to use the command later.')

	},
};
