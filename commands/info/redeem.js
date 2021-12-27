var rhymes = require('rhymes')
const Discord = require('discord.js')
const ms = require('ms')
/*
Schemas
*/
/*
const PremiumCode = require('../../schemas/premiumCode')
const guildPremium = require('../../schemas/guildPremium')
const personalPremium = require('../../schemas/personalPremium')
const userInfo = require('../../schemas/userInfo')
*/
module.exports = {
	name: "redeem",
	description: 'Redeem Bought Premium',
	usage: '[xDaFlO]',
	cooldown: 5,

	

	async execute(message, args) {
		
	//message.reply('This command is currently work in progress, you may retry to use the command later.')
	
	let dateNow = Date.now();

	let premiumCode = args[0];
	if(!premiumCode) return message.reply('Please enter a valid premium code.')	

	const premiumSchema = await PremiumCode.findOne({ premiumCode: premiumCode})
	if(!premiumSchema) return message.reply("This code does not exist and is not available to use.")
	if(premiumSchema.codeAvailable === false) return message.reply("This code is expired, please use an unused code.")

	// to do: fix personal 
	if(premiumSchema.premiumType === 'personal') {
	const userInfo = await PremiumCode.findOne({ userId: message.author.id })
	if(userInfo.isPremium === true) return message.reply('You already have personal premium, either wait until it runs out or you can give it to someone else, your call.')
				
	if(userInfo) {
	await userInfo.updateOne({ userId: message.author.id}, { isPremium: true, PremiumType: premiumSchema.premiumType})
		     } else {
	await userInfo.create({ userId: message.author.id, isPremium: true, PremiumType: premiumSchema.premiumType, isDeveloper: false })
			    } 
	message.reply('You have activated your personal premium for pineapple, enjoy!')
	await premiumSchema.updateOne({ premiumCode: args[0] } , { codeAvailable: false})
					       }	
	
	
	


	if(premiumSchema.premiumType === 'guild') {
	const guildInfo = await guildPremium.findOne({ guildId: message.author.id })
	//if(guildInfo.isPremium === true) return message.reply(`This guild has already premium. Please wait until it expires before adding a new one. Time remaining:`)
	
	
	await guildPremium.updateOne({ guildId: message.guild.id}, { isPremium: true, userSponsor: message.author.id, codeUsed: premiumCode, startDate: Date.now(), endDate: Date.now()+ms(premiumSchema.premiumDuration)})
	await PremiumCode.updateOne({ premiumCode: premiumCode}, { codeAvailable: false })
	message.reply('Guild is now premium!')
	}
	
	

	
	},
};
