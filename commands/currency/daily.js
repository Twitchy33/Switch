const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require("../../botconfig.json");
let balance = require("../../database/balance.json");
const db = require('quick.db');
const fs = require('fs');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');

var ms = require('parse-ms');

//Set cooldown


module.exports = {
  config:{
    name: "daily",
    aliases: [],
    category: "currency",
    description: "Gets you money",
    usage: ""
  },
    run: async (client, message, args) => {

  if (message.channel.type == "dm") return;  
  
  if(!balance[message.author.id]){
    balance[message.author.id] = {
      balance: 0
    };
  }
  
  let curcoins = balance[message.author.id].balance;
  
  
    let cooldown = 8.64e+7,
    amount = 1500
  
  let lastdaily = await db.fetch(`lastDaily_${message.author.id}`)
  if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastdaily))
        let cEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Slow down, cmon!")
        .setDescription(`You have to wait \`${timeObj.hours} hours, ${timeObj.minutes} minutes and ${timeObj.seconds} seconds\` to collect your daily coins again!\n\nWhile you wait why not follow our [Twitter](https://twitter.com/switchoffical)`)
        message.channel.send(cEmbed)
    } else  {
        db.set(`lastDaily_${message.author.id}`, Date.now());        
          balance[message.author.id].balance = curcoins + amount;
    
          fs.writeFile("././database/balance.json", JSON.stringify(balance, null, 2), (err) => {
            let dEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Here are your daily coins, ${message.author.username}`)
            .setDescription(`**${amount} coins** were placed in your wallet!`)
             message.channel.send(dEmbed);
          })
  } 
}
}

    

