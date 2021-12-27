// ██████ Integrations █████████████████████████████████████████████████████████

const Discord  	 	 = require('discord.js')
const guildSettings	 = require('../../schemas/guildSettings.js')

// ██████ | ███████████████████████████████████████████████████████████████████

module.exports = {

	name		: "setprefix",
	description	: 'Change the bot prefix in this guild.',
	usage		: '!',
	cooldown	: 5,
	aliases		: ["prefix"],
	permissions : 'ADMINISTRATOR',


	async execute(message, args) {
		try {
		if(!args[0]) return message.reply('Please enter a prefix to replace.')
		let newprefix = args.slice(0).join(' ');	
		
		const foundData = await Schema.findOne({ guildId: message.guild.id })
		if(foundData) {
		 await Schema.updateOne({ guildId: message.guild.id }, { prefix: newprefix });  

		} else {
		 await Schema.create({ guildId: message.guild.id, prefix: newprefix })
		}

		message.reply(`The new server prefix is now \`${newprefix}\``)

		} catch(e) {
		message.reply('An error occured!')
		console.log(e)
		}
	},
};
