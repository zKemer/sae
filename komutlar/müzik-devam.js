const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async(client,message,args)=> {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("Durdurmak İçin : !durdur")
      .setColor("GREEN")
      .setAuthor("Müzik Devam Ediyor")
      return message.channel.send(xd);
    }
    return sendError("Şuanda Bir Müzik Çalmıyor.", message.channel);
  },

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['devam', 'devam'],
  permLevel: 0
};

exports.help = {
  name: 'devam',
  description: 'Espri yapar.',
  usage: 'espri'
};