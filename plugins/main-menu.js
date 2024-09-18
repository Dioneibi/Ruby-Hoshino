import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍 📘',
  'buscador': '𝐁𝐔𝐒𝐐𝐔𝐄𝐃𝐀𝐒 🔍',
  'fun': '𝐉𝐔𝐄𝐆𝐎𝐒 🎲',
  'jadibot': '𝐒𝐮𝐛𝐁𝐨𝐭/𝐁𝐨𝐭𝐬 🤖',
  'rpg': '𝐑𝐏𝐆 🎲',
  'rg': '𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 📂',
  'xp': '𝐄𝐗𝐏𝐄𝐑𝐈𝐄𝐍𝐂𝐈𝐀 🏆',
  'sticker': '𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒 📑',
  'anime': '𝐀𝐍𝐈𝐌𝐄 🍡',
  'database': '𝐁𝐀𝐒𝐄 𝐃𝐄 𝐃𝐀𝐓𝐎𝐒 💾',
  'fix': '𝐀𝐑𝐑𝐄𝐆𝐋𝐎𝐒 🛠️',
  'grupo': '𝐆𝐑𝐔𝐏𝐎𝐒 🗣️',
  'nable': '𝐎𝐍 / 𝐎𝐅𝐅 📴',
  'descargas': '𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 ⬇️',
  'youtube': '𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐏𝐋𝐀𝐘 🎥',
  'tools': '𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒 🧰',
  'info': '𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍 📝',
  'nsfw': '𝐍𝐒𝐅𝐖 🔞',
  'owner': '𝐂𝐑𝐄𝐀𝐃𝐎𝐑 👑',
  'mods': '𝐒𝐓𝐀𝐅𝐅 🌟',
  'audio': '𝐀𝐔𝐃𝐈𝐎𝐒 🎶',
  'ai': '𝐈𝐀 🤖',
  'transformador': '𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐃𝐎𝐑𝐄𝐒 ⚙️'
}

const defaultMenu = {
  before: `｡☆✼★━━━━━━━━━━━━━━━━━★✼☆｡
        ┎┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┒
    𓏲꯭֟፝੭ ꯭⌑(꯭𝐑).꯭𝐔.꯭𝐁.꯭𝐘.꯭ ⭑𝐇.꯭𝐎.꯭𝐒.꯭𝐇.꯭𝐈.꯭𝐍.꯭𝐎.꯭𓏲꯭֟፝੭ 
        ┖┈┈┈┈┈┈┈୨♡୧┈┈┈┈┈┈┈┚
｡☆✼★━━━━━━━━━━━━━━━━━★✼☆｡


"¡Hola, %name! Mi nombre es *Ruby Hoshino*"


╔═══════⩽✦✰✦⩾═══════╗
       「 𝙄𝙉𝙁𝙊 𝘿𝙀𝙇 𝘽𝙊𝙏 」
╚═══════⩽✦✰✦⩾═══════╝
║ ☆ 🌟 *𝖳𝖨𝖯𝖮 𝖣𝖤 𝖡𝖮𝖳*: *𝖶𝖠𝖨𝖥𝖴*
║ ☆ 🚩 *𝖬𝖮𝖣𝖮*: *𝖯𝖴𝖡𝖫𝖨𝖢𝖮*
║ ☆ 📚 *B𝖠𝖨𝖫𝖤𝖸𝖲*: *𝖬𝖴𝖫𝖳𝖨 𝖣𝖤𝖵𝖨𝖢𝖤*
║ ☆ ⏱️ *𝖳𝖨𝖤𝖬𝖯𝖮* *𝖠𝖢𝖳𝖨𝖵𝖮*: %muptime
║ ☆ 👤 *𝖴𝖲𝖴𝖠𝖱𝖨𝖮𝖲* *𝖱𝖤𝖦𝖨𝖲𝖳𝖱𝖠𝖣𝖮𝖲*: %totalreg
║ ☆ 👩‍💻 *𝖢𝖱𝖤𝖠𝖣𝖮𝖱*: [𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑](https://Wa.me/18294868853)
╚════════════════════════╝

╔═══════⩽✦✰✦⩾═══════╗
     「 𝙄𝙉𝙁𝙊 𝘿𝙀𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 」
╚═══════⩽✦✰✦⩾═══════╝
║ ☆  🌐 *𝖢𝖫𝖨𝖤𝖭𝖳𝖤*: %name
║ ☆ 🚀 *𝖤𝖷𝖯𝖤𝖱𝖨𝖤𝖭𝖢𝖨𝖠*: %exp
║ ☆ ✨ *𝖤𝖲𝖳𝖱𝖤𝖫𝖫𝖠𝖲*: %estrellas
║ ☆ 📊 *𝖭𝖨𝖵𝖤𝖫*: %level
║ ☆ 🏅 *𝖱𝖠𝖭𝖦𝖮*: %role
╚═══════════════════════╝

╔═══════⩽✦✰✦⩾═══════╗
    「 𝙎𝙪𝙗𝘽𝙤𝙩 / 𝘽𝙤𝙩 𝙊𝙛𝙞𝙘𝙞𝙖𝙡 」
╚═══════⩽✦✰✦⩾═══════╝
║ ☆ %botofc 
╚═════════════════════✦

%readmore
*☆─ׅ─ׄ★─ׅ─ׄ✮─ׅ─ׄ★─ׅ─ׄ☆─ׅ─ׄ☆─ׅ─ׄ★─ׅ─ׄ✮─ׅ─ׄ★─ׅ─ׄ☆*

\t*L I S T A  -  D E  -  C O M A N D O S* 
`.trimStart(),
      header: '.    ╔═══════ • ° ❁⊕❁ ° • ═══════╗\n╭╼☁️✿⃟⃢᭄͜═✩═[%category]═✩═⃟⃢᭄͜✿☁️\n┃֪࣪  ╚═══════ • ° ❁⊕❁ ° • ═══════╝',
  body: '├ׁ̟̇˚₊· ͟͟͞͞➳❥ %cmd\n',
  footer: '╰[ ᳘‿⃜፝֟ ᳘۪۪۪۪‿۪۪۪۪۪۪⃜ ᳘֟፝‿⃜ ᳘‿⃜፝֟ ᳘۪۪۪۪‿۪۪۪۪۪۪⃜ ᳘֟፝‿⃜ ᳘  🌸֦    ᳘‿⃜፝֟ ᳘۪۪۪۪‿۪۪۪۪۪۪⃜ ᳘֟፝‿⃜ ᳘‿⃜፝֟ ᳘۪۪۪۪‿۪۪۪۪۪۪⃜ ᳘֟፝‿⃜ ᳘\n',
  after: `> ${dev}`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
botofc: (conn.user.jid == global.conn.user.jid ? '🚩 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙱𝙾𝚃 𝙾𝙵𝙲' : `🚩 𝚂𝚄𝙱-𝙱𝙾𝚃 𝙳𝙴: Wa.me/${global.conn.user.jid.split`@`[0]}`), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, estrellas, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  let category = "video"
  const db = './media/database/db.json'
  const db_ = JSON.parse(fs.readFileSync(db))
  const random = Math.floor(Math.random() * db_.links[category].length)
  const rlink = db_.links[category][random]
  global.vid = rlink
  const response = await fetch(vid)
  const gif = await response.buffer()

    // Define rcanal here
    let rcanal = "https://chat.whatsapp.com/KBQZ7fAdAY3HtVudDl3Cmy";
  
  
    await conn.reply(m.chat, '*ꪹ͜𓂃⌛͡𝗘𝗻𝘃𝗶𝗮𝗻𝗱𝗼 𝗠𝗲𝗻𝘂 𝗱𝗲𝗹 𝗕𝗼𝘁....𓏲੭*', fkontak, { contextInfo:{ forwardingScore: 2022, isForwarded: true, externalAdReply: {title: packname, body: '%greeting', sourceUrl: redes, thumbnail: icons }}})

// await conn.reply(m.chat, '🍟 Enviando el menú.....', m, rcanal)

await m.react('💖') 

//await conn.sendFile(m.chat, imagen1, 'yaemori.jpg', text.trim(), fkontak, null, rcanal)

await conn.sendMessage(
  m.chat,
  { video: { url: vid }, caption: text.trim(),
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363263466636910@newsletter',
      newsletterName: '『✯ Team Channe✯』',
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: 'ᶻ 𝗓 𐰁✰ŕüḅÿ ħόşħίήό✰🦋⃤.ᐟ ֹ ₊ ꒱',
      body: dev,
      thumbnailUrl: icono,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false,
    },
  },

  gifPlayback: true, gifAttribution: 0 },
  { quoted: fkontak })

  } catch (e) {
    conn.reply(m.chat, '🔵 Lo sentimos, el menú tiene un error', m, rcanal, )
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'menuall', 'allmenú', 'allmenu', 'menucompleto'] 
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

var ase = new Date();
var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
var greeting = hour;

    
