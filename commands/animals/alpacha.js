const { MessageEmbed } = require("discord.js")
const { cream } = require("../../colors.json");
const fetch = require('node-fetch');

module.exports = {
  config:{
        name: "alpacha",
        description: "Sends a alpaca from a website!",
        usage: "",
        category: "animals",
        accessableby: "Members"
  },
  
    run: async (bot, message, args) => {
    let msg = await message.channel.send(":red_circle:**Compiling Image**")

    fetch("https://apis.duncte123.me/alpaca")
    .then(res => res.json()).then(body => {
        if(!body) return message.reply(":red_circle: **Woops! Looks like something is wrong! Let me switch for you!**")

        let aEmbed = new MessageEmbed()
        .setColor(cream)
        .setAuthor(`${bot.user.username} | ALPACAS!`, message.guild.iconURL({format: 'png'}))
        .setImage(body.data.file)
        .setTimestamp()
        .setFooter(`${message.author.username} | Alpaca`, message.author.displayAvatarURL({format: 'png'}));
            message.channel.send(aEmbed)
            msg.delete();
        })
    }
}