const Discord = require("discord.js");
const db = require('croxydb')
exports.run = async (client, message, args) => {
     let eklemekanal;
  if(   db.fetch(`botlist_${message.guild.id}.bot-ekleme-kanalı`) == undefined) {eklemekanal = "Ayarlanmamış" } else { eklemekanal = `<#${   db.fetch(`botlist_${message.guild.id}.bot-ekleme-kanalı`)}>` }
      let glstrc;
  if(   db.fetch(`botlist_${message.guild.id}.bot-developer-rolü`)== undefined) {glstrc = "Ayarlanmamış" } else { glstrc = `<@&${db.fetch(`botlist_${message.guild.id}.bot-developer-rolü`)}>` }
  let onayred;
  if(db.fetch(`botlist_${message.guild.id}.onay-red-kanalı`)   == undefined) {onayred = "Ayarlanmamış" } else { onayred = `<#${db.fetch(`botlist_${message.guild.id}.onay-red-kanalı`) }>` }
    let onayreds;
  if(db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`)== undefined) {onayreds = "Ayarlanmamış" } else { onayreds = `<#${db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`)}>` }
 
  if(args[0] == "sıfırla")  {  
    if(db.fetch(`botlist_${message.guild.id}.onay-red-kanalı`)) if(db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`))    if(db.fetch(`botlist_${message.guild.id}.bot-developer-rolü`))      if(db.fetch(`botlist_${message.guild.id}.bot-ekleme-kanalı`)) {

db.delete(`botlist_${message.guild.id}.onay-red-kanalı`)    
db.delete(`botlist_${message.guild.id}.bot-log-kanalı`)
      db.delete(`botlist_${message.guild.id}.bot-developer-rolü`)
      db.delete(`botlist_${message.guild.id}.bot-ekleme-kanalı`)
    
    
    message.channel.send("Bütün Botlist ayarları başarıyla sıfırlandı.")
  return
    } else {
    
    return message.channel.send("Botlist ayarlarını sıfırlamak için her şeyin ayarlı olması gerekiyor.")
  }
                            } else {
  const ayarlars = new Discord.MessageEmbed()


 .setDescription(`
 **Bot Log Kanalı:** ${onayreds}
 
  **Bot Onaylama/Reddetme Kanalı:** ${onayred}
 
 **Bot Ekleme Kanalı:** ${eklemekanal}
 
 **Bot Geliştiricisi Rolü:** ${glstrc}
 `)
 .setColor("#F0FFFF")
 
 
 return message.channel.send(ayarlars)
                            }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bot-list-ayarları"],
  permLevel: 0
};

exports.help = {
  name: "botlist-ayarları",
  description: "YardÄ±m MenÃ¼sÃ¼nÃ¼ GÃ¶sterir.",
  usage: "yardÄ±m"
};

