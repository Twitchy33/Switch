const { MessageEmbed } = require("discord.js")
const { cream } = require("../../colors.json");
const fetch = require('node-fetch');

module.exports = {
  config:{
        name: "meme",
        description: "Sends a meme from a website!",
        usage: "",
        category: "memey",
        accessableby: "Members"
  },
  
    run: async (bot, message, args) => {
    let msg = await message.channel.send(":red_circle:**Compiling Meme**")

    fetch("https://apis.duncte123.me/meme")
    .then(res => res.json()).then(body => {
        if(!body) return message.reply(":red_circle: **Woops! Looks like something is wrong! Let me switch for you!**")

        let mEmbed = new MessageEmbed()
        .setColor(cream)
        .setAuthor(`${bot.user.username} | Memes!`, message.guild.iconURL({format: 'png'}))
        .setImage(body.data.image)
        .setTimestamp()
.setFooter(`${message.author.username} | Meme`, message.author.displayAvatarURL({format: 'png'}));
            message.channel.send(mEmbed)
            msg.delete();
        })
    }
}