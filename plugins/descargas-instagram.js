import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Verificar si se proporcionó una URL
  if (!text) throw `❗️ *Uso incorrecto del comando* ❗️\n\n🌟 *Debe utilizar el comando de la siguiente manera:*\n${usedPrefix + command} <url de Instagram>`;

  try {
    // Responder mientras se procesa la solicitud
    conn.reply(m.chat, '🚩 *Procesando la descarga de Instagram...*', m);

    // Realizar una solicitud a un sitio de scraping para obtener el contenido
    const res = await axios.get(`https://instadownloader.co/instagram.php?url=${encodeURIComponent(text)}`);

    // Utilizando cheerio para extraer los datos
    const $ = cheerio.load(res.data);
    const videoURL = $('a').attr('href');

    if (!videoURL) throw 'No se pudo extraer el contenido. Asegúrate de que la URL sea correcta.';

    // Enviar el video descargado al chat
    await conn.sendMessage(m.chat, { video: { url: videoURL }, caption: '🎥 *Aquí está tu video descargado de Instagram*' }, { quoted: m });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '❌ *Error al descargar el contenido. Asegúrate de que la URL es correcta o intenta nuevamente.*', m);
  }
};

// Configuración del comando
handler.tags = ['descargas'];
handler.help = ['igdl'];
handler.command = /^(igdl|instagramdl)$/i;

export default handler;
