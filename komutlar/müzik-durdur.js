const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
module.exports.run = async(client,message,args)=> {
 

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`Müzik Duraklatılırken Bir Hata Oluştu HATA : ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()

      .setColor("GREEN")
      .setAuthor("Müzik Durduruldu")
      return message.channel.send(xd);
    }
    return sendError("Şuan Bir Müzik Çalmıyor.", message.channel);
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
