let reg = 60

var handler = async (m, { conn, args, usedPrefix, command }) => {

let fa = `🚩 *Cuanto Quieres Apostar?*\n\n💥 Ejemplo:
*${usedPrefix + command}* 50`.trim()
if (!args[0]) throw fa
if (isNaN(args[0])) throw fa
let apuesta = parseInt(args[0])
let users = global.db.data.users[m.sender]
let time = users.lastslot + 10000
if (new Date - users.lastslot < 10000) throw `🕒 Espere *${msToTime(time - new Date())}* Para Usar De Nuevo`
if (apuesta < 10) throw '🚩 Lo Mínimo Para Apostar Es 100 *XP*'
if (users.exp < apuesta) {
throw `🚩 No Tienes Sufuciente *XP*`
}
let emojis = ['✨️', '💖', '🤍', '☁️', '🐶']
let a = Math.floor(Math.random() * emojis.length)
let b = Math.floor(Math.random() * emojis.length)
let c = Math.floor(Math.random() * emojis.length)
let x = [],
y = [],
z = []
for (let i = 0; i < 3; i++) {
x[i] = emojis[a]
a++
if (a == emojis.length) a = 0;
}
for (let i = 0; i < 3; i++) {
y[i] = emojis[b]
b++
if (b == emojis.length) b = 0;
}
for (let i = 0; i < 3; i++) {
z[i] = emojis[c]
c++
if (c == emojis.length) c = 0
}
let end
if (a == b && b == c) {
end = `🎁 *GANASTE* 🎁\n*+${apuesta + apuesta + apuesta + apuesta + apuesta} XP*`
users.exp += apuesta + apuesta
} else if (a == b || a == c || b == c) {
end = `🚩 *Casi lo logras sigue intentando*\n*Te regalo ${reg} XP*`
users.exp += reg
} else {
end = `🤯 *PERDISTE* 🤯\n*Te e quitado ${apuesta} XP*`
users.exp -= apuesta
}
users.lastslot = new Date * 1

var hawemod = [
`${x[0]} : ${y[1]} : ${z[0]}
${z[0]} : ${y[0]} : ${x[1]}
${z[2]} : ${x[2]} : ${y[2]}`, 
`${x[0]} : ${y[0]} : ${z[0]}
${y[1]} : ${z[1]} : ${x[1]}
${x[2]} : ${y[2]} : ${z[2]}`, 
`${x[0]} : ${y[1]} : ${z[0]}
${y[1]} : ${z[0]} : ${x[1]}
${x[2]} : ${y[1]} : ${z[0]}`
]

const maxIterations = 25;
const arrayCasuale = generaArrayCasuale(hawemod, maxIterations);

const array = [...arrayCasuale, ];

let { key } = await conn.sendMessage(m.chat, { text: `*A cruzar los dedos*` }, { quoted: fkontak });

for (let i = 1; i <= maxIterations; i++) {
await conn.sendMessage(m.chat, { text: `🎰 | *RANURAS* | 🎰\n────────\n` + `${array[i]}` + `\n ────────\n🎰 |   *SLOTS*   | 🎰`, edit: key }, { quoted: fkontak });
await new Promise((resolve) => setTimeout(resolve, 50))}

return await conn.sendMessage(m.chat, {text: `
🎰 ┃ *SLOTS* 
───────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
───────────
🎰┃🎰┃ 🎰\n\n${end}`, edit: key}, {quoted: fkontak})
}
handler.help = ['slot']
handler.tags = ['rpg']
handler.command = ['slot']
handler.register = true

export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return seconds + " Segundo(s)"
}

function generaArrayCasuale(array, ripetizioni) {
  let risultato = [];
  for (let i = 0; i < ripetizioni; i++) {
    risultato = risultato.concat(array);
  }
  return risultato;
}