const { MessageEmbed } = require("discord.js")
module.exports = async (text, channel, message) => {
    let embed = new MessageEmbed()
    .setColor("#F0FFFF")
    .setDescription(text)
    await channel.send(embed)
}
