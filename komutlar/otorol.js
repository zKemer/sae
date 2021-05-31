const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('croxydb')
const embed = require('../util/error.js')
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Bu komutu kullanmak için gerekli yetkiye sahip değilsin.')
  
  
        var rol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
 
    const olmadımıtutmadımı = new Discord.MessageEmbed()
      .setColor("#F0FFFF")
    .setTitle(`Bir seçenek belirtmelisiniz.`)
    .setDescription(`
                    > kanal-ayarla
                    > üye-rol-ayarla
                    > bot-rol-ayarla
                    > sıfırla
`)
    .setFooter(`${message.author.tag}`)
    
    
    if(!args[0]) return message.channel.send(olmadımıtutmadımı)
  
  if(args[0] == "sıfırla") {
         if(db.fetch(`${message.guild.id}_otorol`)){ db.delete(`${message.guild.id}_otorol`) 
     
    embed("Varsayılan otorol ayarları başarıyla sıfırlandı.", message.channel)
                                                     
    return
  } else {  embed("Varsayılan otorol kanalları bulunamadı.", message.channel) }
  }

  
    if(args[0] == "bot-rol-ayarla"){
            var rol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
if(!rol) embed("Lütfen bir rol etiketleyin.")

    db.set(`${message.guild.id}_otorol.bot`, rol.id)
    embed("Otorol rolü başarıyla ayarlandı.", message.channel)
    return
  }

    
    
    if(args[0] == "üye-rol-ayarla"){
            var rol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
if(!rol) embed("Lütfen bir rol etiketleyin.")

    db.set(`${message.guild.id}_otorol.üye`, rol.id)
    embed("Otorol rolü başarıyla ayarlandı.", message.channel)
    return
  }

        if(args[0] == "kanal-ayarla"){
            var rol = message.mentions.channels.first() || message.guild.channels.cache.find(r => r.id == args[1])
if(!rol) embed("Lütfen bir kanal etiketleyin.")

    db.set(`${message.guild.id}_otorol.kanal`, rol.id)
    embed("Otorol kanalı başarıyla ayarlandı.", message.channel)
    return
  }
  
message.channel.send(olmadımıtutmadımı)
}
  

exports.conf = {
    aliases: ['oto-rol']
}
exports.help = {
    name: "otorol"
}