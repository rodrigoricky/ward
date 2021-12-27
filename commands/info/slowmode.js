
const Discord = require('discord.js')


module.exports = {
	name: "slowmode",
	description: 'Enable or Disable a slowmode in a channel.',
	usage: '5',
	cooldown: 10,
	aliases: ["sm"],
	permissions: 'MANAGE_MESSAGES',


	execute(message, args) {
		
		// message.reply('This command is currently work in progress, you may retry to use the command later.')

        if(!isNaN(args[0])) {
            if(args[0] >= 1) {
                 if(args[1]) {
                message.channel.setRateLimitPerUser(args[0], args[1]);
                message.react('✅') 
                } else {
                message.channel.setRateLimitPerUser(args[0], 'No reason provided.');    
                message.react('✅') 
                }
            } else {
                message.channel.setRateLimitPerUser(0, 'Disabled slowmode.');
                message.react('✅')
            } 
        } 

        if(!args[0]) {
             if(message.channel.rateLimit === 0){
                message.reply('Channel has no slowmode.')
             } else {
                message.channel.setRateLimitPerUser(0, 'Disabled slowmode.');
                message.react('✅')
            }
        }
	},
};
