const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require("../../botconfig.json");
const db = require('quick.db')
let bal = require('../../database/balance');
let rep = require('../../database/rep');
let work = require('../../database/works');

module.exports = {
  config:{
    name: "shop",
    aliases: ["store"],
    category: "currency",
    description: "Brings Up The Shop",
    usage: ""
  },
run: async (client, message, args) => {
   const embed = new MessageEmbed()
    .setTitle('🛒 Shop')
    .setDescription(`To purchase an item, type \`${prefix}buy <item>\``)
    .setColor("RANDOM")
    .addField('💍 Wedding Ring ($1,300)', `Used to propose to your partner via \`${prefix}marry\`.`, true)
    .addField('🥫 Pet Food ($50)', `Used to feed your \`${prefix}pet\`.`, true)
    .addField('🌰 Seed ($5)', `Random seed to plant in your \`${prefix}garden\`.`, true)
    .addField('🚗 Car ($25,000)', `Go fast.`, true)
    .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send("Coming Soon To Switch 1.2")
}
    
}
                                     