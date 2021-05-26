const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const axios = require('axios')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {

if(!args.length) {
axios.get('https://corona.lmao.ninja/v2/all').then(Aventadoria => {
const All = new Discord.MessageEmbed()
.setColor('RED')
.setTitle('Dünya Geneli Covid-19 Bilgileri')
.addField('💀 Ölüm Sayısı', Aventadoria.data.deaths.toLocaleString(),true)
.addField('😷 Hasta Sayısı', Aventadoria.data.cases.toLocaleString(),true)
.addField('😊 İyileşen Sayısı', Aventadoria.data.recovered.toLocaleString(),true)
.addField('Ülkeler Hakkında Bilgi',`${ayarlar.prefix}corona Turkey`)
.setThumbnail('https://cdn.discordapp.com/attachments/834876723035111424/845658629620236288/Earth_Globe_Americas_Emoji_grande.png')
.setFooter(`Son güncelleme: ${moment(Aventadoria.data.updated).format("LLL")}`)
message.channel.send(All)
}).catch(() => {
return
})
} else {
axios.get(`https://corona.lmao.ninja/v2/countries/${args[0]}`).then(Aventadoria => {
const Ülke = new Discord.MessageEmbed()
.setColor('RED')
.setTitle(`${Aventadoria.data.country} Ülkesi Hakkında "Covid-19" Bilgileri`)
.addField('💀 Ölüm Sayısı', Aventadoria.data.deaths.toLocaleString(),true)
.addField('😷 Hasta Sayısı', Aventadoria.data.cases.toLocaleString(),true)
.addField('😊 İyileşen Sayısı', Aventadoria.data.recovered.toLocaleString(),true)
.addField(`📅 Bugünün bilgileri (${moment().format("DD/MM/YYYY")})`, `💀 **Ölüm**: ${Aventadoria.data.todayDeaths}, 🤒 **Vaka**: ${Aventadoria.data.todayCases}`)
.setThumbnail(Aventadoria.data.countryInfo.flag)
.setFooter(`Son güncelleme: ${moment(Aventadoria.data.updated).format("LLL")}`)
message.channel.send(Ülke)
}).catch(error => {
return message.channel.send('Bir hata ile karşılaştık. Lütfen düzgün bir ülke adı girdiğinize emin olun.')
})
}
}
exports.conf = {
   enabled: true,
   guildOnly: true,
   aliases: ['corona','korona','covid'],
   permLevel: 0
}
  
exports.help = {
   name: 'Korona',
   description: 'Tabloyu Atar.',
   usage: 'corona'
}
