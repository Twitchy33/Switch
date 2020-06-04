const { MessageEmbed } = require("discord.js")
const { cream } = require("../../colors.json");
const fetch = require("node-fetch")
  module.exports= {
    config:{
    name: "cat",
    aliases: ["catto", "kitty"],
    usage:"",
    category: "animals",
    description:"Sends a picture of a cat",
    accessableby:"Members"
    },
  
  run: async (bot,message, args) => {
  let msg = await message.channel.send(":red_circle: **Compiling Image...**")

  fetch(`http://aws.random.cat/meow`)
  .then(res => res.json()).then(body => {
        if(!body) return message.reply(":red_circle: **Woops! Looks like something is wrong! Let me switch for you!**")

  let cEmbed = new MessageEmbed()
  .setColor(cream)
  .setAuthor(`${bot.user.username} | CATS`, message.guild.iconURL({format: 'png'}))
  .setImage(body.file)
  .setTimestamp()
  .setFooter(`${message.author.username} | Cat Image`, message.author.displayAvatarURL({format: 'png'}));
  message.channel.send(cEmbed);

  msg.delete();
    })
  }
}
