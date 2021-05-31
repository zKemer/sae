const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports.run = async(client,message,args)=> {
 
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Ses Kanalında Bulunmadığından Şarkı Ses Seviyesi Ayarlayamassın.", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Şuanda Bir Müzik Çalmıyor.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send('Sadece Sayı Girebilirsin.').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('Şarkı Ses Seviyesi En Çok **150** En Az **0** Olabilir.',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Yeni Ses Seviyesi: **${args[0]/1}/150** olarak ayarlandı.`)

    .setColor("GREEN")
    return message.channel.send(xd);
  },

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ses', 'ses'],
  permLevel: 0
};

exports.help = {
  name: 'volume',
  description: 'Espri yapar.',
  usage: 'espri'
};