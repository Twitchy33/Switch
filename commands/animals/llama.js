const { MessageEmbed } = require("discord.js")
const { cream } = require("../../colors.json");
const fetch = require('node-fetch');

module.exports = {
  config:{
        name: "llama",
        description: "Sends a llama from a website!",
        usage: "",
        category: "animals",
        accessableby: "Members"
  },
    run: async (bot, message, args) => {
    let msg = await message.channel.send(":red_circle:**Compiling Image**")

    fetch("https://apis.duncte123.me/llama")
    .then(res => res.json()).then(body => {
        if(!body) return message.reply(":red_circle: **Woops! Looks like something is wrong! Let me switch for you!**")

        let mEmbed = new MessageEmbed()
        .setColor(cream)
        .setAuthor(`${bot.user.username} | LLAMAS!`, message.guild.iconURL({format: 'png'}))
        .setImage(body.data.file)
        .setTimestamp()
.setFooter(`${message.author.username} | Llama`, message.author.displayAvatarURL({format: 'png'}));
            message.channel.send(mEmbed)
            msg.delete();
        })
    }
}
