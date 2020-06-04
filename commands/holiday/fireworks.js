
const { MessageEmbed } = require('discord.js');
const { getMember } = require("../../functions.js");

module.exports = {
  config:{
        name: "fireworks",
        description: "WIP!",
        usage: "!luck",
        aliases: [],
        category: "holiday",
        accessableby: "Members"
  },


run: async (client, message, args, color, prefix) => {

// Get a member from mention, id, or username
        let person = getMember(message, args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "🥚".repeat(loveIndex) + "🐣".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`**${message.member.displayName}'s** Egg finding ability is this much:`,
            `${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send("coming soon");
    }
}