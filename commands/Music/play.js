const { EmbedBuilder } = require("discord.js")
const { prefix } = require("../../config.json");
const getAttachmentURL = (message) => message.attachments.first()?.url;

module.exports = {
    name: "play",
    requirements: {
        InVoiceChannel: true,
        Isplaying: false
    },
    description: "Play a track from one of our supported platforms.",
    usage: "play [input method]",
    example: `
- \`${prefix}play what is love\` - Searches for the track 'what is love" and plays the first found result.
- \`${prefix}!play https://open.spotify.com/... \`- Searches for this Spotify song, album, playlist or artist and queues the songs.
- \`${prefix}play [while uploading a file, no arguments needed]\` - Plays the audio file you uploaded.
- ch!play insert-URL-here - Plays the song linked to an URL directly. This works for all supported platforms.`,
    run: async (client, message, args) => {

        const query = args.join(' ') || getAttachmentURL(message)
        if (!query) {

            let embed = new EmbedBuilder();

            embed.setAuthor({ name: `|  Please provide an URL or search query`, iconURL: message.author.displayAvatarURL() })

            embed.setColor(client.config.color)
            return message.channel.send({ embeds: [embed] });
        }


        let player = client.poru.players.get(message.guild.id)
        if (!player) {
            player = await client.poru.createConnection({
                guildId: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                deaf: true,
            })
        }

        const resolve = await client.poru.resolve(args.join(' '), "spotify");
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === "PLAYLIST_LOADED") {

            let embed = new EmbedBuilder()
                .setColor(client.config.color)
            embed.setAuthor({ name: `Queued`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`[${playlistInfo.name}](${client.config.support}) with ${tracks.length}`)
            message.channel.send({ embeds: [embed] })

            for (let x of resolve.tracks) {
                x.info.requester = message.author;
                player.queue.add(x);
            }

            if (!player.isPlaying && !player.isPaused) {
                return player.play();
            }

        } else if (loadType === "SEARCH_RESULT" || loadType === "TRACK_LOADED") {
            const track = tracks.shift();
            track.info.requester = message.author;
            player.queue.add(track);

            let e = new EmbedBuilder()
                .setColor(client.config.color)
                .setAuthor({ name: `| Queued at position #${player.queue.length}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`[${track.info.title}](${track.info.uri}) by [${track.info.author}](${client.config.support}) `)
            if (player.currenTrack) {
                message.channel.send({ embeds: [e] })
            }
            if (!player.isPlaying && !player.isPaused) return player.play();

        } else {
            return message.channel.send(`Failed to load track try again`)
        }
    }
}
