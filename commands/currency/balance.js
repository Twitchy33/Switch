const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require("../../botconfig.json");
const db = require('quick.db')
let balance = require("../../database/balance.json");
let bank = require("../../database/bank.json");
module.exports = {
  config:{
    name: "balance",
    aliases: ["bal"],
    category: "currency",
    description: "Gives you your balance",
    usage: "",
  },
    run: async (client, message, args) => {
if (message.channel.type == "dm") return;  
  
  let member = message.mentions.users.first() || client.users.cache.get(args[0]);
  if (!member) member = message.author;
  if (member.bot) return message.channel.send(`**${message.author.username}**, Bot don't have a balance!`);
  //!coins
  //WAJIB biar ga undefined
    if(!balance[member.id]){
      balance[member.id] = {
      balance: 0

      };
    }
    //wajib biar ga undefined
    if(!bank[member.id]){
    bank[member.id] = {
      bank: 0
    };
    }
  //buat read json  
  let uBalance = balance[member.id].balance;
  let uBank = bank[member.id].bank
  if (uBalance == 0) {
    let bEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${member.username}'s Balance`)
    .addField(`Balance:`, `0`, true)
    .addField(`Bank:`, `0`, true)
    message.channel.send(bEmbed);
  } else {
    let baEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${member.username}'s Balance`)
    .addField(`Wallet:`, `${uBalance.toLocaleString()}`, true)
    .addField(`Bank:`, `${uBank}`, true)
    message.channel.send(baEmbed);

  }
}
    }

