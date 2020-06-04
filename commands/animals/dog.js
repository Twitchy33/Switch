const {MessageEmbed} = require("discord.js")
const { cream } = require("../../colors.json");
const fetch = require("node-fetch")

module.exports = {
  config:{
  name: "dog",
  aliases: ["doggo", "doggy"],
  usage:"",
  category: "animals",
  description:"Sends a picture of a dog",
  accessableby:""
  },

  run: async (bot,message, args) => {
  let msg = await message.channel.send(":red_circle: **Compiling Image...**")

  fetch(`https://dog.ceo/api/breeds/image/random`)
  .then(res => res.json()).then(body => {
  if(!body) return message.channel.send(":red_circle: **Woops! Looks like something is wrong! Let me switch for you!**")

  let dEmbed = new MessageEmbed()
  .setColor(cream)
  .setAuthor(`${bot.user.username} | DOGS`, message.guild.iconURL({format: 'png'}))
  .setImage(body.message)
  .setTimestamp()
  .setFooter(`${message.author.username} | Dog Image`, message.author.displayAvatarURL({format: 'png'}));
  message.channel.send(dEmbed);

  msg.delete();
    })
  }
}
