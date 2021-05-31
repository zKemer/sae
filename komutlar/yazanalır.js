const Discord = require("discord.js");
const db = require('croxydb'); // creating database
const canvas = require('canvas')
const ayarlar = require("../ayarlar.json");
const rCaptcha = require('rcaptcha')
const sendError = require("../util/error");
exports.run = async (client, message, args) => {


  let ez;
  let ezkod;
     if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setColor("#f0ffff") .setDescription("Bir zorluk belirtmedin") .setFooter("Kolay, orta, zor ve çok-zor şeklinde zorluk seviyesi seç."))
  if(args[0]== "kolay") {ez = "EASY"
                         ezkod = 5
                        }
    if(args[0]== "orta") {ez = "MEDIUM"
                          ezkod = 10
                          
                         }
    if(args[0]== "zor") {ez = "HARD"
                        ezkod = 20
                        
                        }
    if(args[0]== "çok-zor") {ez = "VERYHARD" 
                             ezkod = 30
                            }
  
    if(!ez) return message.channel.send(new Discord.MessageEmbed() .setDescription("Bir zorluk belirtmedin") .setFooter("Kolay, orta, zor ve çok-zor şeklinde zorluk seviyesi seç."))
 
    const newCaptcha = new rCaptcha({
        language: "TR", // TR or EN is available...
        difficulty: ez, // EASY, MEDIUM, HARD, VERYHARD is available...
        length: 8, // Length is must me between 4 and 12...
    })
    
        function buyukHarf(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  
const xe = new Discord.MessageEmbed()

.setTitle(`${client.user.username}`)
.setColor("#F0FFFF")
.setDescription(buyukHarf(`${args[0]} zorluğunda atacağım kodu **10 saniye** içerisinde yazarsan **${ezkod}TL** kazanacaksın`))


  const x = new Discord.MessageAttachment(newCaptcha.resim.buffer)
    message.channel.send(xe)
         message.channel.send(x) .then(() => {
    message.channel.awaitMessages(response => response.content === newCaptcha.kod, {
    max: 1,
    time: 10000,
    errors: ['time'],
    
}) .then((collected) => {
      function buyukHarf(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

          const başardı = new Discord.MessageEmbed()
  .setTitle(`${client.user.username}`)
  .setColor("#F0FFFF")
  .setDescription(`> `+ buyukHarf(`${args[0]} zorlukta bir kodu 10 saniyeden daha hızlı bir şekilde girerek **${ezkod}TL** kazandın.`))
    db.add(`para_${message.author.id}`,ezkod)       
message.channel.send(başardı)

    
        
        
      
      

})

  


}

) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yarışma"],
  permLevel: 0
};

exports.help = {
  name: "yazanalır",
  description: "Yardım Menüsünü Gösterir.",
  usage: "yardım"
};
