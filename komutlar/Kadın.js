const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {
if (!message.member.roles.cache.has(ayarlar.teyitçi)) return message.channel.send(`**Bu komutu kullanmak için \`${message.guild.roles.cache.find(Rol => Rol.id === ayarlar.teyitçi).name}\` rolüne sahip olman gerek!**`).then(x => x.delete({timeout:5000}))
const Üye = message.mentions.members.first() || message.guild.members.cache.find(Üye => Üye.id === args[0])
const AraÇizgi = ayarlar.çizgi
const Saat = new Date()
const Revenge = new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`**Hatalı Kullanım!** 

**Doğru Kullanım;**
> **${ayarlar.prefix}kadın ${message.author} ${message.member.displayName.replace(ayarlar.tag,'').replace(AraÇizgi,'').slice(1)}** 
\`Üye Etiketleyiniz!\``)
if (!Üye) return message.channel.send(Revenge)
if (Üye.roles.cache.has(ayarlar.kadın) && db.has(`KayıtEden_${Üye.id}`)) return message.channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`**Bu kullanıcı zaten <@${db.fetch(`KayıtEden_${Üye.id}`).Kayitci}> Tarafından \`${moment(db.fetch(`KayıtEden_${Üye.id}`).Tarih).format('LLLL')}\` saatinde kayıt edilmiş!**`))
const Data = await db.fetch(`Nickler_${Üye.id}`)
const İsim = args[1]
const Yaş = args[2]
const Revenge2 = new Discord.MessageEmbed()
.setColor('ORANGE')
.setDescription(`**Hatalı Kullanım!** 

**Doğru Kullanım;**
> **${ayarlar.prefix}kadın ${message.author} ${message.member.displayName.replace(ayarlar.tag,'').replace(AraÇizgi,'').slice(1)}** 
\`İsim Yazınız!\``)
const Revenge3 = new Discord.MessageEmbed()
.setColor('ORANGE')
.setDescription(`**Hatalı Kullanım!** 

**Doğru Kullanım;**
> **${ayarlar.prefix}kadın ${message.author} ${message.member.displayName.replace(ayarlar.tag,'').replace(AraÇizgi,'').slice(1)}** 
\`Yaş Yazınız!\``)
if (!İsim) return message.channel.send(Revenge2)
if (isNaN(Yaş)) return message.channel.send(Revenge3)
Üye.roles.add(ayarlar.kadın)
Üye.roles.remove(ayarlar.kayıtsız)
Üye.setNickname(`${ayarlar.tag} ${İsim} ${AraÇizgi} ${Yaş}`)
db.set(`KayıtEden_${Üye.id}`,{Kayitci: message.author.id,Tarih: Date.now()})
if (!Data) {
const Confirmed = new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle(message.guild.name,message.guild.iconURL({dynamic:true}))
.setDescription(`${Üye} Kullanıcısı ${message.author} Tarafından Kayıt Edildi! (${db.fetch(`Kayıt_${message.author.id}`) || 1})`)
.setTimestamp()
.setFooter(message.author.tag,message.author.avatarURL({dynamic:true}))
message.channel.send(Confirmed)
db.add(`Kayıt_${message.author.id}`,1)
db.push(`Nickler_${Üye.id}`,`${ayarlar.tag} ${İsim} | ${Yaş}`)
} else {
const Confirmed = new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle(message.guild.name,message.guild.iconURL({dynamic:true}))
.setDescription(`${Üye} Kullanıcısı ${message.author} Tarafından Kayıt Edildi! (${db.fetch(`Kayıt_${message.author.id}`) || 1})`)
.setTimestamp()
.addField('\u200b','\u200b')
.addField('Önceki Kullanıcı Adları',await db.fetch(`Nickler_${Üye.id}`).join(', \n'))
.setFooter(message.author.tag,message.author.avatarURL({dynamic:true}))
message.channel.send(Confirmed)
db.add(`Kayıt_${message.author.id}`,1)
db.push(`Nickler_${Üye.id}`,`${ayarlar.tag} ${İsim} ${AraÇizgi} ${Yaş}`)
Üye.roles.add(ayarlar.kadın)
Üye.roles.remove(ayarlar.kayıtsız)
Üye.setNickname(`${ayarlar.tag} ${İsim} ${AraÇizgi} ${Yaş}`)
}
}

exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['kadın','k'],
  permLevel: 0
}
  
exports.help = {
   name: 'Kadın',
   description: 'Kadın Olarak Kayıt Etme.',
   usage: 'kadın'
}
