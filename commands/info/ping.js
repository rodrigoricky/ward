const Discord = require('discord.js')
const client = new Discord.Client({
    shards: "auto", allowedMentions: { parse: [ ], repliedUser: false, }, 
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, ]
});
module.exports = {
	name: "ping",

	async execute(message, args) {
		
		message.channel.send({ content: `🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping).toString()}ms`});
	},
};
