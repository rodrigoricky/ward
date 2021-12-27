const Discord = require('discord.js')


module.exports = {
	name: "poll",
	description: 'Create a poll.',
	usage: '"Question:" "Choice 1" "Choice 2"',
	cooldown: 10,
	aliases: ["makepoll"],
	// permissions: 'ADMINISTRATOR',


	execute(message, args) {
		
        function parseQuotes(str = '') {
            let current = '',
              arr = [],
              inQuotes = false
              
            for (let char of str.trim()) {
              if (char == '"') {
                // Switch the value of inQuotes
                inQuotes = !inQuotes
              } else if (char == ' ' && !inQuotes) {
                // If there's a space and where're not between quotes, push a new word
                arr.push(current)
                current = ''
              } else {
                // Add the character to the current word
                current += char
              }
            }
                
            // Push the last word
            arr.push(current)
              
            return arr
          }


          
	},
};
