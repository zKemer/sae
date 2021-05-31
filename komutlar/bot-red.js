const Discord = require("discord.js")
const Db = require('croxydb'); // creating database
const db = require('croxydb'); // creating database
module.exports.run = async(client,message,args)=> {

   
  
    const evomeddd = new Discord.MessageEmbed()
let kelimeilk = args[0]
if(!kelimeilk) return message.channel.send("Reddedilecek botun ID'si bulunamadı.")
  let kelimeikik = db.fetch(`realbots_${kelimeilk}_${message.guild.id}`)
if(!kelimeikik) return message.channel.send("Reddedilecek botun sahip ID'si bulunamadı.")
    let user = message.author
    
let kana = client.channels.cache.find(r => r.id == (db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`)))
                db.set(`botlist_${message.guild.id}.${kelimeilk}.durum`, "redli")

kana.send(" <@"+kelimeikik+"> adlı kullanıcının <@" +kelimeilk+"> (`"+kelimeilk+"`) adlı botu, "+ user.username+" adlı yetkili tarafından reddedildi")

}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-reddet', 'botreddet'],
  permLevel: 0
};

exports.help = {
  name: 'bot-reddet',
  description: 'Espri yapar.',
  usage: 'espri'
};