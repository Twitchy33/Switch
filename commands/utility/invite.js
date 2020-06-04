const { inspect } = require("util")
const {MessageEmbed} = require("discord.js");

module.exports = {
  config:{
        name: "invite",
        description: "Invites bot",
        category: "utility",
        accessableby: "Members",
        usage: ""
  },
    run: async (bot, message, args) => {
  
           let embed = new MessageEmbed()
           .setTitle("Invite Switch")
           .setDescription(`Hello why not invite me to your server! I do not bite just invite me! I will still be here when you feel ready! Right now while you wait I will switch for you! [Invite](https://discordapp.com/api/oauth2/authorize?client_id=697406385889214485&permissions=2134207679&scope=bot) SWITCH NOW!`)

message.channel.send(embed)
    }
}
