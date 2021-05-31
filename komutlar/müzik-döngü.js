const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
module.exports.run = async(client,message,args)=> {
 
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `🔁  **|**  Döngü : **\`${serverQueue.loop === true ? "Başarıyla açıldı." : "Başarıyla kapatıldı."}\`**`
                }
            });
        };
    return sendError("Şuanda Oynatılan Bir Müzik Bulunmuyor.", message.channel);
  },

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['loop', 'tekrar'],
  permLevel: 0
};

exports.help = {
  name: 'döngü',
  description: 'Espri yapar.',
  usage: 'espri'
};