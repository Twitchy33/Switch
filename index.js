const express = require("express");
const app = express();

const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});





const { Client, Collection, MessageEmbed} = require("discord.js");
const { token } = require("./botconfig.json");
const server = require('./server.js');
const bot = new Client();
bot.commands = new Collection();
bot.snipes = new Map();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop: for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }

  let channel = bot.channels.get(guild.systemChannelID || channelID);
  let embed = new MessageEmbed()
    .setDescription(
      `Sup Peeps, its **Switch**,\n\nTo get started run !help. All commands are run this way for example !dog.\n\nSwitch has commands including: currency, moderation, animals, utility, and memey! This bot is managed by Switch's moderation & Staff Team.\n**Important Links**\n[TWITTER](https://twitter.com/switchoffical) - Some updates will be posted here\n[INVITE](https://discordapp.com/oauth2/authorize?client_id=658125873530142760&permissions=8&scope=bot) - Invite the Bot into your server!\n[DISCORD](https://discord.gg/Nt54uDG) - Join our Discord TODAY!`
    )
    .setFooter("Switch was made by Twitchy#8158");
  channel.send(embed);
});

bot.login(process.env.TOKEN);
