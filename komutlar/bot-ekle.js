const Discord = require("discord.js")
const Db = require('croxydb'); // creating database
const db = require('croxydb'); // creating database

const ayarlar = require("../ayarlar.json");
module.exports.run = async(client,message,args)=> {
 let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
      if(!db.fetch(`botlist_${message.guild.id}.bot-ekleme-kanalı`)) return message.channel.send(`Bu sunucuda BotList sistemi tamamıyla açık değil.`)
  if(!db.fetch(`botlist_${message.guild.id}.onay-red-kanalı`))return message.channel.send(`Bu sunucuda BotList sistemi tamamıyla açık değil.`)
  if(!db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`))return message.channel.send(`Bu sunucuda BotList sistemi tamamıyla açık değil.`) 
  if(message.channel.id === db.fetch(`botlist_${message.guild.id}.bot-ekleme-kanalı`)){      

    }else return message.channel.send(`Bot ekleme sadece <#${db.fetch(`botlist_${message.guild.id}.bot-ekleme-kanalı`)}> adlı kanalda yapılabilir.`)

let kelimeilk = args[0];
let kelimeiki = args[1];

 let kanal = client.channels.cache.get(db.fetch(`botlist_${message.guild.id}.onay-red-kanalı`));
message.delete();

if (!kelimeilk) return message.channel.send("Botunuzun ID'sini bilmezsek onu ekleyemeyiz.")
if(!kelimeiki) return message.channel.send("Botunuzun prefixini bilmezsek onu ekleyemeyiz.")
if(db.fetch(`botlist_${message.guild.id}.${kelimeilk}.durum`) == "bekliyor") return message.channel.send("Botunuz zaten başvuru listesinde yer alıyor.")
  

        db.set(`botlist_${message.guild.id}.${kelimeilk}.sahip`, message.author.id)
          db.set(`botlist_${message.guild.id}.${kelimeilk}.durum`, "bekliyor")

message.channel.send("Bot ekleme isteğiniz başarıyla alındı.")
const evomed = new Discord.MessageEmbed()

.setColor("ORANGE") 
.setTitle("Link")
.setDescription(`<@${kelimeilk}> \n Prefix: ${kelimeiki} \n Owner: <@${message.author.id}>`)
.setFooter(`${prefix}bot-onayla ${kelimeilk} | ${prefix}bot-reddet ${kelimeilk}`)
.setURL(`https://discord.com/oauth2/authorize?client_id=${kelimeilk}&scope=bot&permissions=0`)
kanal.send(evomed).then(msg => {

msg.react('✔️')
  .then(r => {
    msg.react('❌')
 

   
      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '❌' 
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '✔️'  

  
const backwards = msg.createReactionCollector(backwardsFilter, );
     const forwards = msg.createReactionCollector(forwardsFilter, );




      forwards.on('collect', (r, user)  => {
           // if(!user.roles.cache.has(db.fetch(`bot-tester-rolü_${message.guild.id}`))) return;
        if(user.id === "796747151266414622") return;
        
   const evomedd = new Discord.MessageEmbed()

.setColor("GREEN") 
.setTitle("Link")
.setDescription(`<@${kelimeilk}>, <@${user.id}> adlı yetkili tarafından kabul edildi.`)
.setURL(`https://discord.com/oauth2/authorize?client_id=${kelimeilk}&scope=bot&permissions=0`)

let kana = client.channels.cache.find(r => r.id == (db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`)))
msg.delete()

kana.send(" <@"+message.author.id+"> adlı kullanıcının <@" +kelimeilk+"> (`"+kelimeilk+"`) adlı botu, "+ user.username+" adlı yetkili tarafından kabul edildi")
              db.set(`botlist_${message.guild.id}.${kelimeilk}.durum`, "onaylı")
if(db.fetch(`botlist_${message.guild.id}.bot-developer-rolü`))message.member.roles.add(db.fetch(`botlist_${message.guild.id}.bot-developer-rolü`))
        
      })

 
   
  
  backwards.on('collect', (r, user)  => {
 
if(user.id == client.user.id) return;

  
   // if(!user.roles.cache.has(db.fetch(`bot-tester-rolü_${message.guild.id}`))) return;
    const evomeddd = new Discord.MessageEmbed()

.setColor("RED") 
.setTitle("Davet Linki")
.setDescription(`<@${kelimeilk}>, <@${user.id}> adlı yetkili tarafından reddedildi.`)
.setURL(`https://discord.com/oauth2/authorize?client_id=${kelimeilk}&scope=bot&permissions=0`)
    msg.delete()
message.channel.send(evomeddd)
    
        db.delete(`botlist_${message.guild.id}.${kelimeilk}.sahip`, message.author.id)
        db.set(`botlist_${message.guild.id}.${kelimeilk}.durum`, "redli")

client.channels.cache.find(r => r.id == (db.fetch(`botlist_${message.guild.id}.bot-log-kanalı`))).send(" <@"+message.author.id+"> adlı kullanıcının <@" +kelimeilk+"> (`"+kelimeilk+"`) adlı botu, "+ user.username+" adlı yetkili tarafından reddedildi")
  
    





                                
 })

    })
  })

}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['addbot', 'bot-ekle'],
  permLevel: 0
};

exports.help = {
  name: 'botekle',
  description: 'Espri yapar.',
  usage: 'espri'
};