
// ██████ Integrations █████████████████████████████████████████████████████████


// none yet

// ██████ | █████████████████████████████████████████████████████████

module.exports = {

	async execute(interaction) {

		// —— Below is replying if error is encountered.


		await interaction.reply({
			content: "There was an issue while fetching this select menu option!",
			ephemeral: true,
		});
	
		return;

	},
};
