const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const express = require('express')
const ayarlar = require('./ayarlar.json')
const app = express()
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

const Peppe = message => {
  console.log(`${message}`)
}

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./komutlar/', (Error, Files) => {
    if (Error) console.error(Error)
    Peppe(`${Files.length} Komut Yüklenecek!`)
    Files.forEach(Pepe => {
        let Props = require(`./komutlar/${Pepe}`)
        Peppe(`Yüklenen Komut: ${Props.help.name}.`)
        client.commands.set(Props.help.name, Props)
        Props.conf.aliases.forEach(Alias => {
        client.aliases.set(Alias, Props.help.name)
})})})

client.reload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 client.commands.set(command, CMD)
 CMD.conf.aliases.forEach(Alias => {
 client.aliases.set(Alias, CMD.help.name)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

client.load = command => {
 return new Promise((Resolve, Reject) => {
 try {
 let CMD = require(`./komutlar/${command}`)
client.commands.set(command, CMD)
CMD.conf.aliases.forEach(Alias => {
client.aliases.set(Alias, CMD.help.name)
})
Resolve()
} catch (Hata) {
Reject(Hata)
}})}

client.unload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('message',async message => {
  let client = message.client
  if (message.author.bot) return
  if (!message.content.startsWith(ayarlar.prefix)) return
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length)
  let params = message.content.split(' ').slice(1)
  let perms = client.elevation(message) 
  let cmd
  if (client.commands.has(command)) {
    cmd = client.commands.get(command)
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command))
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return
    cmd.run(client, message, params, perms)
  }
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('ready',async () => {
const Sunucu = client.guilds.cache.get(ayarlar.sunucuid)
const Yapımcı = await client.users.fetch(ayarlar.sahip || '675593025468235806')
client.user.setActivity(ayarlar.oynuyor || `${Yapımcı.username} 💖 ${Sunucu.name}`,{ type: 'PLAYING', status: 'idle'})
const Ses = client.channels.cache.get(ayarlar.SesKanalı)
if (Ses) Ses.join()
if (db.all().length <= 0) db.set('YouTube.com/c/revengenyks31',31)
console.log(`${client.user.username}, ${Sunucu.name} için aktif durumda!`)
})
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('guildMemberAdd',async member => {
if (member.guild.id !== ayarlar.sunucuid) return
const Emotes = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
}

const Gifler = [
'https://cdn.discordapp.com/attachments/769221623337189396/770293327869247538/51868920f30546dcfdc998db25c48cba.gif',
]
const Gif = Gifler[Math.floor(Math.random() * Gifler.length)]
if (ayarlar.girişembed == 'evet') {
const Ceon = new Discord.MessageEmbed()
.setColor('BLUE')
.setThumbnail(member.user.avatarURL({dynamic:true,size: 2048}))
.setDescription(`> \`>\` **\`${member.guild.name}\`**'e hoş geldin ${member}.
> 
> Hesabın **${moment(member.user.createdAt).format('LLLL')}** tarihinde oluşturulmuş.
> 
> \`>\` Sunucu kanallarını görebilmek için önceklikle Sesli Teyit odalarından birisine girmeli ve \`isim yaş\` Belirtmelisin. 
> 
> \`>\` Sunucumuz seninle birlikte **${member.guild.memberCount.toString().split('').map(Aventadoria => Emotes[Aventadoria] || Aventadoria).join('')}** kişiye ulaştı! Tagımızı alarak bizlere destek olabilirsin **${ayarlar.tag}**
> 
> \`>\` Seninle <@&${ayarlar.teyitçi}> rolündeki yetkililer ilgilenecektir.
> 
> \`>\` Tagımıza ulaşmak için herhangi bir kanala \`${ayarlar.prefix}tag\` ya da \`tag\` yazabilirsiniz.`,true)
.setImage(Gif)
.setFooter(`Kayıt etmek için [${ayarlar.prefix}erkek, ${ayarlar.prefix}kadın]`,member.guild.iconURL({dynamic:true}))
client.channels.cache.get(ayarlar.kayıtkanal).send(`<@&${ayarlar.teyitçi}> & ${member}`)
client.channels.cache.get(ayarlar.kayıtkanal).send(Ceon)
} else {
client.channels.cache.get(ayarlar.kayıtkanal).send(`
\`>\` **\`${member.guild.name}\`**'e hoş geldin ${member}. Hesabın **${moment(member.user.createdAt).format('LLLL')}** tarihinde oluşturulmuş.

          \`>\` Sunucu kanallarını görebilmek için önceklikle Sesli Teyit odalarından birisine girmeli ve \`isim yaş\` belirtmelisin. 

          \`>\` Sunucumuz seninle birlikte **${member.guild.memberCount.toString().split('').map(Aventadoria => Emotes[Aventadoria] || Aventadoria).join('')}** kişiye ulaştı! Tagımızı alarak bizlere destek olabilirsin **${ayarlar.tag}**

          \`>\` Seninle <@&${ayarlar.teyitçi}> rolündeki yetkililer ilgilenecektir.

\`>\` Tagımıza ulaşmak için herhangi bir kanala \`${ayarlar.prefix}tag\` ya da \`tag\` yazabilirsiniz.`,{files: [Gif]})
}
member.roles.add(ayarlar.kayıtsız)
await member.setNickname(`${ayarlar.tag} Kayıtsız`) // Burası üyenin ismini değiştirir.
})

client.on('userUpdate', (oldUser,newUser) => {
const Ruqq = new Discord.MessageEmbed()
.setColor('RED')
.setTitle('• Bir kullanıcı tag saldı!')
.setDescription(`${newUser} kullanıcısı **${ayarlar.tag}** tagını saldığı için <@&${ayarlar.tagrol}> rolü alındı.

Toplam taglı sayımız: ${client.guilds.cache.get(ayarlar.sunucuid).members.cache.filter(Aventador => Aventador.user.username.includes(ayarlar.tag)).size}`)
const Embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle('• Bir kullanıcı tag aldı!')
.setDescription(`${newUser} kullanıcısı **${ayarlar.tag}** tagını aldığı için <@&${ayarlar.tagrol}> rolü verildi.

Toplam taglı sayımız: ${client.guilds.cache.get(ayarlar.sunucuid).members.cache.filter(Aventador => Aventador.user.username.includes(ayarlar.tag)).size}`)
if (newUser.username !== oldUser.username) {
if (newUser.username.includes(ayarlar.tag)) {
if (!client.guilds.cache.get(ayarlar.sunucuid).members.cache.get(newUser.id).roles.cache.has(ayarlar.tagrol)) {
client.guilds.cache.get(ayarlar.sunucuid).members.cache.get(newUser.id).roles.add(ayarlar.tagrol)
client.channels.cache.get(ayarlar.taglog).send(Embed)
}
}
if (!newUser.username.includes(ayarlar.tag)) {
if (client.guilds.cache.get(ayarlar.sunucuid).members.cache.get(newUser.id).roles.cache.has(ayarlar.tagrol)) {
client.guilds.cache.get(ayarlar.sunucuid).members.cache.get(newUser.id).roles.remove(ayarlar.tagrol)
client.channels.cache.get(ayarlar.taglog).send(Ruqq)
}
}
}
})


client.on('message', message => {
if (message.content == `${ayarlar.prefix}tag` || message.content == 'tag') return message.channel.send(ayarlar.tag)
})

client.elevation = message => {
    if (!message.guild) {
        return
    }
    let permlvl = 0
    if (message.member.hasPermission('BAN_MEMBERS')) permlvl = 2
    if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl
}

client.login(process.env.token).catch(() => console.error('(node:8295) UnhandledPromiseRejectionWarning: Hata [GEÇERSİZ_TOKEN]: Geçersiz token tespit edildi.'))
