const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
module.exports.run = async(client,message,args)=> {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Ses Kanalında Bulunmadığından Müzik Bitiremessin.", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Şuanda Bitirebileceğin Bir Müzik Çalmıyor.", message.channel);
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`Şarkıyı Bitirirken Bir Hata Oldu HATA : ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
  },


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stop', 'bitir'],
  permLevel: 0
};

exports.help = {
  name: 'bitir',
  description: 'Espri yapar.',
  usage: 'espri'
};