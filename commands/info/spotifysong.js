var rhymes = require('rhymes')
const Discord = require('discord.js')

	var SpotifyWebApi = require('spotify-web-api-node');
	var spotifyApi = new SpotifyWebApi({ clientId: '28c27124cec64c219dc60ec978fb4933', clientSecret: '2aa0334609cd45a6b80b8807be761c1f', redirectUri: 'http://www.example.com/callback' });
	spotifyApi.setAccessToken('BQBWeHJrVYLLyLtx5cWkiRtPEEP9jBsGTeSmxLJbiVofVSkaKmQrMc6xbt9g80B6TNVGlQqWbzh0w88TC4dbIGcAbI2kcvuFkKPPjLuvziFNmehyMT8cwB7PX1-BOjnIQNf_9CuoqPH99al_hlNtKm2m7hD7BzLvSfNtxRMt55i143unZBpnWJlHrFI');


module.exports = {
	name: "spotifysong",
	description: 'Fetch random spotify songs.',
	usage: '',
	cooldown: 5,
	aliases: ["spotify"],


	execute(message, args) {
		
		spotifyApi.getPlaylistTracks('6yPiKpy7evrwvZodByKvM9', { offset: 1, limit: 100, fields: 'items' }).then(
        	function(data) {
       		let randomnumber = Math.floor((Math.random() * 99) + 1);
		let testing = data.body.items[randomnumber].track.id
     		 //console.log('The playlist contains these tracks', testing);
        	message.reply(`Here's a random Spotify Song! https://open.spotify.com/track/${testing}`)
   			
		       },
      function(err) {
      console.log('Something went wrong!', err);
    });
			
	// message.reply('This command is currently work in progress, you may retry to use the command later.')

	},
};
