const { prefix } = require("./../../config.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	description: "List all commands of bot or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,

	async execute(message, args) {
		const { commands } = message.client;

		if (!args.length) {
			
			let helpEmbed = new MessageEmbed()
				.setColor(0x4286f4)
				.setURL(process.env.URL)
				.setTitle("🎄 Help Menu")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addField(
					"Access Premium Features",
					`\n[Click here](https://paypal.me/rodrigoricky) to donate towards the development to the bot and support the developers on making this bot! Any type of donation of any amount is welcomed <3`
				)

				.setFooter(
					"You can also mention the bot (with @) instead of using the prefix"
				);

			// Attempts to send embed in DMs.

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === "dm") return;

					// On validation, reply back.

					message.reply({
						content: "I've sent you a DM with all my commands!",
					});
				})
				.catch((error) => {
					// On failing, throw error.

					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);

					message.reply({ content: "It seems like I can't DM you!" });
				});
		}

		// If argument is provided, check if it's a command.

		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		// If it's an invalid command.

		if (!command) {
			return message.reply({ content: "That's not a valid command!" });
		}

		const PrefixSchema = require('../../schemas/prefix')
		const data = await PrefixSchema.findOne({ guildId: message.guild.id})
		if(!data) { useprefix = prefix; } else { useprefix = data.prefix; }

		let commandEmbed = new MessageEmbed()
			.setColor(0x4286f4)
			.setTitle("Command Help");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed
				.addField("Aliases", `\`${command.aliases.join(", ")}\``, true)
				.addField("Cooldown", `${command.cooldown || 3} second(s)`, true);
		if (command.usage)
			
		

			commandEmbed.addField(
				"Usage",
				`\`${useprefix}${command.name} ${command.usage}\``,
				true
			);

		// Finally send the embed.

		message.channel.send({ embeds: [commandEmbed] });
	},
};
