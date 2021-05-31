const Discord = require("discord.js")

exports.run = async (client, message, args) => {

      if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanmak için gerekli yetkiye sahip değilsin.')
  
var channel = message.channel.name

		
      message.channel.clone({position: message.channel.position}).then(channel => client.channels.cache.get(channel.id).send("Bu kanal Pusula tarafından yeniden oluşturuldu."))
      message.channel.delete();

	



};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = { 
	name: 'nuke', 
  description: "Bot bulunduğunuz kanalı siler ve yeniden oluşturur.",
  usage: 'nuke'
}
