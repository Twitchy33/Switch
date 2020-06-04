const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require("../../botconfig.json");
const db = require('quick.db')
let bal = require('../../database/balance');
let rep = require('../../database/rep');
let work = require('../../database/works');

module.exports = {
  config:{
    name: "rich",
    aliases: ["r"],
    category: "currency",
    description: "Tells who is rich",
    usage: ""
  },
run: async (client, message, args) => {
    // Get all members of the server before doing anything
    message.guild.members.fetch().then(guildMembers => {
        let board = [];

        for (let key of Object.keys(bal)) {
            // Checks if the collection of GuildMembers contains the key.
            if (guildMembers.has(key)) {
                let value = Object.assign({user: guildMembers.get(key).user}, bal[key]);
                board.push(value);
            }
        }
   const emojis = [':first_place:', ':second_place:', ':third_place:', ':small_blue_diamond:', ':small_blue_diamond:']
        board = board.sort((a,b) => b.balance-a.balance).splice(0, 5);
        let top = board.map((x, i) => `${emojis[i]} **${x.balance.toLocaleString()}** - ${x.user.tag}`).join('\n');
        let embed = new MessageEmbed() 
        .setColor("RANDOM") 
        .addField(`Richest users in **${message.guild.name}**`, `${top}`)
        .setFooter('Switch Version 1.1');
    

        return message.channel.send(embed);
    }).catch(console.error);
}
                                     }