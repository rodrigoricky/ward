var rhymes = require('rhymes')
const Discord = require('discord.js')
const ms = require("ms");
const Schema = require('../../schemas/codeList')

module.exports = {
	name: "createcode",
	description: 'Create a premium code.',
	usage: '',
	cooldown: 5,
	aliases: ["createpremiumcode", "cpc"],
	permissions: 'ADMINISTRATOR',
	//guildOnly: true,

	/**
	 * @description Executes when the command is called by command handler.
	 	 * @param {Object} message The Message Object of the command.
	 * @param {String[]} args The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
	 */

	async execute(message, args) {
		
	let premiumTypes = ["guild", "personal", "boost"];

	function makeid(length) {
		
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  	var charactersLength = characters.length;
 
	for ( var i = 0; i < length; i++ ) {
     	result += characters.charAt(Math.floor(Math.random() * 
	charactersLength));
 					    }
	return result;
			       }
	// args 1 -- premiumType: guild only or personal only or both
	// args 2 -- premiumDuration: 1w, 1m, 1y.
	// to do l8r: args 3 [optional] -- give the code automatically to the id given.

	if(message.author.id != 852757964291833886) return message.react('❎')
	
	let premiumType = args[0];
	if(!premiumType) return message.reply('Please enter a valid premium type.')
	if(!premiumTypes.some(type => type === premiumType)) return message.reply('Please enter a correct premium type.')
	
	let premiumDuration = args[1];
	if(!premiumDuration || isNaN(ms(premiumDuration))) return message.reply('Please enter a valid time duration.')


	
	let getPremiumCode = makeid(6);
		
		await Schema.create({

	
		dateCreated: Date.now(),
		premiumCode: getPremiumCode,
		createdBy: message.author.id,

		codeAvailable: true,
		premiumDuration: premiumDuration,
		premiumType: premiumType
			   })

		message.reply(`Successfully created code: ${getPremiumCode}`)
	},
};
