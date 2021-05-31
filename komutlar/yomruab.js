const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('croxydb'); // creating database


 
exports.run = (client, message, args) => {
     if(message.author.id !== "785765015487381525") return;

const kelime = args.join(" ")
  if(!kelime) return 
  db.set(`presence_status`, kelime)
  client.user.setActivity(db.fetch(`presence_status`))
  message.channel.send("Şu anki durum " +kelime+ " olarak ayarlandı.")
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'durum',
  description: 'Kod denemek için kullanılır.',
  usage: 'eval [kod]'
};