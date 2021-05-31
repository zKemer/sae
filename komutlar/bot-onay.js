const Discord = require("discord.js")
const Db = require('croxydb'); // creating database
const db = require('croxydb'); // creating database
module.exports.run = async(client,message,args)=> {

   
  
let kana = client.channels.cache.find(r => r.id == (db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`)))
let kelimeilk = args[0]
if(!kelimeilk) return message.channel.send("Onaylanacak botun ID'si bulunamadı.")
  let kelimeikik = db.fetch(`realbots_${kelimeilk}_${message.guild.id}`)
if(!kelimeikik) return message.channel.send("Onaylanacak botun sahip ID'si bulunamadı.")
  
let user = message.author

kana.send(" <@"+kelimeikik+"> adlı kullanıcının <@" +kelimeilk+"> (`"+kelimeilk+"`) adlı botu, "+ user.username+" adlı yetkili tarafından kabul edildi")
                db.set(`botlist_${message.guild.id}.${kelimeilk}.durum`, "onaylı")
  if(db.fetch(`botlist_${message.guild.id}.bot-developer-rolü`))message.member.roles.add(db.fetch(`botlist_${message.guild.id}.bot-developer-rolü`))
        
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-onayla', 'bot-onayla'],
  permLevel: 0
};

exports.help = {
  name: 'bot-onayla',
  description: 'Espri yapar.',
  usage: 'espri'
};