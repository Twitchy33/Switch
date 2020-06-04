const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
  config:{
    name: "whois",
    aliases: ["who", "user", "info"],
   category: "utility",
    description: "Returns user information",
    usage: "<user>"
  },
    run: (client, message, args) => {
        const member =  message.mentions.members.first();

        // Member variables
        const roles = member.roles.cache.map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);
      const joined = formatDate(member.user.joinedAt)

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL({format: 'png'}))
            .setThumbnail(member.user.displayAvatarURL({format: 'png'}))
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
            .setAuthor(`${member.displayName} | WHOIS`, member.user.displayAvatarURL({format: 'png'}))

            .addField('Member information:', stripIndents`** Display name:** ${member.displayName}
            ** Joined at:** ${joined}
            ** Roles:** ${roles}`, true)

            .addField('User information:', stripIndents`** ID:** ${member.user.id}
            ** Username**: ${member.user.username}
            ** Tag**: ${member.user.tag}
            ** Created at**: ${created}`, true)
            .setTimestamp()
           

        message.channel.send(embed);
    }
}