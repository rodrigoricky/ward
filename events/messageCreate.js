// ██████ Integrations █████████████████████████████████████████████████████████

const { Collection } 		= require("discord.js");
const { prefix, owner }	    = require("../config.js");
const UserSchema 		    = require("../schemas/userInfo");
const guildSettings 		= require('../schemas/guildSettings')

// ██████ | ███████████████████████████████████████████████████████████████████

	// —— Prefix regex, we will use to match in mention prefix.

	const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	};

module.exports = {
  name: "messageCreate",

  async execute(message) {

	// —— Ignore bots messages

    if (message.author.bot) return;

    // —— Create Guild Schema if none found.

    const guildStngs = await guildSettings.findOne({ guildId: message.guild.id });
    if (!guildStngs)
      await guildSettings.create({
        
		guildId: message.guild.id,
		prefix: prefix,

		isPremium: false,
		boosterId: [],
		startDate: "",
		endDate: "",

		isSrvBanned: false,
		banReason: "",
		banStart: "",
		banEnd: "",

		autoRole: [],
		mutedRole: [],
		staffRole: [],
		boosterRole: [],
		blcklstdRole: [],

		joinMessage: "",
		leaveMessage: "",
		boostMessage: ""
      });

    const { client, guild, channel, content, author } = message;

    // —— Checks if the bot is mentioned in the message all alone and triggers onMention trigger.
    // —— You can change the behavior as per your liking at ./messages/onMention.js

    if (
      message.content == `<@${client.user.id}>` ||
      message.content == `<@!${client.user.id}>`
    ) {
      require("../messages/onMention").execute(message);
      return;
    }

	const guildSetting = await guildSettings.findOne({ 
		guildId: message.guild.id 
		});


	// —— Filter if there is a custom prefix on the guild set.

		if (!guildSetting) { 
		  serverPrefix = prefix;
		} else if(guildSetting) {
		  serverPrefix = guildSetting.prefix;
		}

    const checkPrefix = serverPrefix.toLowerCase();

    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
    );

    // —— Checks if message content in lower case starts with bot's mention.

    if (!prefixRegex.test(content.toLowerCase())) return;

    /* ——

     * @description Checks and returned matched prefix, either mention or prefix in config.
    
	—— */

    const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

    /* ——
	 
     * @type {String[]}
     * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
     
	 —— */

    const args = content.slice(matchedPrefix.length).trim().split(/ +/);

    /* ——
	 
     * @type {String}
     * @description Name of the command received from first argument of the args array.
     
	—— */

    const commandName = args.shift().toLowerCase();

    // Check if mesage does not starts with prefix, or message author is bot. If yes, return.

    if (!message.content.startsWith(matchedPrefix) || message.author.bot)
      return;

    /** ——
	 
     * @description The message command object.
     * @type {Object}
	 
     —— */

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    // —— It it's not a command, return :)

    if (!command) return;

    // —— Owner Only Property, add in your command properties if true.

    if (command.ownerOnly && message.author.id !== owner) {
      return message.reply({
        content: "This is a owner only command!",
      });
    }

    // —— Guild Only Property, add in your command properties if true.

    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply({
        content: "I can't execute that command inside DMs!",
      });
    }

    // —— Author perms property

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return message.reply({
          content: "You can not do this!",
        });
      }
    }

    // —— Args missing

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.channel.send({
        content: reply,
      });
    }

    // —— Cooldowns

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply({
          content: `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`,
        });
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // —— Rest your creativity is below.
	
    const userSchema = await UserSchema.findOne({
      userId: message.author.id,
    });
    if (!userSchema) {
      await UserSchema.create({
      
		userId: message.author.id,
		counter: "",

		isBanned: false,
		bstartDate: "",
		bEndDate: "",

		isPremium: false,
		pType: "",
		pStartDate: "",
		pEndDate: "",

		isOfficial: false,
		oRole: "",

		isAfk: false,
		aReason: "",
		aLogs: {}

      }).then(message => {
		  message.author.send("New User!");
	  });
    } else {
      let index = userSchema.cmdsUsed;
      index++;
      await UserSchema.updateOne(
        {
          userId: message.author.id,
        },
        {
          cmdsUsed: index,
        }
      );
    }

    // execute the final command. Put everything above this.
    try {
      if (!userSchema) return command.execute(message, args);

      if (userSchema.isBanned) {
        message.react("❎");
      } else {
        command.execute(message, args);
      }
    } catch (error) {
      console.error(error);
      message.reply({
        content: "There was an error trying to execute that command!",
      });
    }
  },
};
