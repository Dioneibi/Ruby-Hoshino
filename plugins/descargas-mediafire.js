import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.reply(m.chat, '🚩 Ingrese el enlace de un archivo de Mediafire.', m, rcanal)
  if (!args[0].match(/mediafire/gi)) return conn.reply(m.chat, '🍟 El enlace debe ser de un archivo de Mediafire.', m, rcanal)

  try {
    await m.react(rwait)

    // Realiza la solicitud a la API
    let response = await axios.get(`https://api.dorratz.com/v2/mediafire-dl?url=${encodeURIComponent(args[0])}`)

    // Verifica si la solicitud fue exitosa
    if (response.data && response.data.status === 'success') {
      let { filename, filesize, mimetype, filelink } = response.data.result

      let txt = `乂  *¡MEDIAFIRE - DESCARGAS!*  乂\n\n`
      txt += `✩ *Nombre* : ${filename}\n`
      txt += `✩ *Peso* : ${filesize}\n`
      txt += `✩ *MimeType* : ${mimetype}\n\n`
      txt += `*- ↻ El archivo se está enviando, espera un momento, soy lento...*\n`

      let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer()
      await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, fkontak, null, rcanal)
      await conn.sendFile(m.chat, filelink, filename, null, fkontak, null, { mimetype: mimetype, asDocument: true })

      await m.react(done)
    } else {
      throw new Error('Error al obtener los datos del archivo de Mediafire.')
    }
  } catch (error) {
    console.error(error)
    await conn.reply(m.chat, '❌ Ocurrió un error al descargar el archivo de Mediafire.', m, rcanal)
    await m.react(error)
  }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mediafire', 'mdfire', 'mf']
handler.premium = false

export default handler
                          
