const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
const Revenge = new Discord.MessageEmbed()
.setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
.setColor('DGREEN')
.setDescription(`
\`•\` Sunucuda **${message.guild.memberCount}** Kişi Bulunmaktadır.
\`•\` Sesli Sohbetlerde **${message.guild.members.cache.filter(Aventadoria => Aventadoria.voice.channel).size}** Kişi Bulunmaktadır.
\`•\` Sunucuda Aktif **${message.guild.members.cache.filter(Aventadoria => !Aventadoria.bot && Aventadoria.presence.status !== 'offline').size}** Kişi Bulunmaktadır.
\`•\` Sunucuda **${message.guild.premiumSubscriptionCount}** Boost Bulunmaktadır.

\`•\` Tagımızda **${message.guild.members.cache.filter(Frxzbie => Frxzbie.user.username.includes(ayarlar.tag)).size}** Kişi Bulunmaktadır.`)
.setThumbnail(message.guild.iconURL({dynamic:true}))
message.channel.send(Revenge).then(Antio => Antio.react('✅'))
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['say'],
   permLevel: 0
}
  
exports.help = {
   name: 'Say',
   description: 'Sunucu hakkında kısa bilgi.',
   usage: 'say'
}
