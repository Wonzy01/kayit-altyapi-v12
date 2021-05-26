const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
const Teyit = db.all().filter(Arktik => Arktik.ID.startsWith(`Kayıt_`)).sort((a, b) => b.data - a.data)
Teyit.length = 10
let FinalDB = ""
for (var i in Teyit) {
FinalDB += `**${Teyit.indexOf(Teyit[i])+1}.** <@${Teyit[i].ID.slice(6)}> - \`${Teyit[i].data}\` Teyit\n`
}

const Revenge = new Discord.MessageEmbed()
.setColor("#ff0000")
.addField(`Leaderboards`, FinalDB)
message.channel.send(Revenge)
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['top'],
    permLevel: 0
}

exports.help = {
    name: 'TOP Teyit',
    description: 'En Çok Teyit Yapanlar.',
    usage: 'tt'
}
