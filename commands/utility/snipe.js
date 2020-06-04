const { MessageEmbed } = require('discord.js');
module.exports ={
  config:{
    name: "snipe",
    category: "utility",
    description: "Shows the most recent deleted message.",
    usage: ""
  },
    run: async(bot, message, args) => {
        const msg = bot.snipes.get(message.channel.id);
        if(!msg) return message.reply("There are no recently deleted messages!");

        const embed = new MessageEmbed()
            .setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL({format: 'png'}))
            .setDescription(msg.content);
      
      
      message.channel.send(embed);
    }
} 