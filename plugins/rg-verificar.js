import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i


const canal = 'https://chat.whatsapp.com/J7j9IlFhxbr809Urhu5KPJ';

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  if (user.registered === true) throw `*『✦』Ya estás registrado, para volver a registrarte, usa el comando: #unreg*`
  if (!Reg.test(text)) throw `*『✦』El comando ingresado es incorrecto, uselo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.18*`

  let [_, name, splitter, age] = text.match(Reg)
  
  if (!name) throw '*『✦』No puedes registrarte sin nombre, el nombre es obligatorio. Inténtelo de nuevo.*'
  if (!age) throw '*『✦』No puedes registrarte sin la edad, la edad es opcional. Inténtelo de nuevo.*'
  if (name.length >= 30) throw '*『✦』El nombre no debe tener más de 30 caracteres.*' 
  
  age = parseInt(age)
  
  if (age > 999) throw '*『😏』¡Viejo/a Sabroso/a!*'
  if (age < 5) throw '*¿𝐃𝐨𝐧𝐝𝐞 𝐞𝐬𝐭𝐚𝐧 𝐭𝐮𝐬 𝐩𝐚𝐩á𝐬?*😂'

  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  global.db.data.users[m.sender].money += 600
  global.db.data.users[m.sender].estrellas += 10
  global.db.data.users[m.sender].exp += 245
  global.db.data.users[m.sender].joincount += 5

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)        
  m.react('✅') 

  let regbot = `╭─✦〘  𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 ✔️ 〙✦──╮
┊
┊
┊🍚᷼⃞い》𝑁𝑜𝑚𝑏𝑟𝑒: ${name}
┊🌸⃞ᰰ𝆆ᣞ 》𝐸𝑑𝑎𝑑: ${age} *Años*
┊ ֪ ׂ🗡️ ̶ ׁ ֪ *>número de serie<*
┊          
┊
┊💻 *𝚁epo𝚂𝙸𝚃𝙾𝚁𝙸𝙾* *𝙶𝙸𝚃𝙷𝚄𝙱:* 
┊https://github.com/Dioneibi/Ruby-Hoshino
┊
┊🥳 *¡Bienvenido/a al equipo!*
┊🗂️ *Utiliza* \`.menu\` *para explorar los comandos disponibles.*
┊
┊
┊✨ *𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:*
┊15 🌟 Estrellas 
┊ 5 🪙 yencoins
┊ 245 💸 Experiencia
┊ 12 💰 Tokens
╰─────────────  ✦ ⁺.
> 🎈 ¡Muchísimas gracias por usar a Ruby-Hoshino! 
> Recuerda seguirme en mi canal para que no te pierdas nada de las novedades del bot. ¡Diviértete!`

  conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰',
        body: wm, 
        thumbnailUrl: 'https://qu.ax/FGSG.jpg', 
        sourceUrl: canales,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: fkontak })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler
  
