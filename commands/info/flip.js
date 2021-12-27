const Discord = require('discord.js')


module.exports = {
	name: "flip",
	description: 'Flip a coin.',
	usage: '',
	cooldown: 5,
	aliases: ["coinflip"],
	// permissions: 'ADMINISTRATOR',


	execute(message, args) {
		
        let response = [
            'Heads', 'Tails',
            'Heads', 'Tails'
                       ]
		
        let randomMath = response[Math.floor(Math.random()*response.length)];
        
        message.reply(randomMath)

	},
};
