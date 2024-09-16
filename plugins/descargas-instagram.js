import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Verificar si el usuario ha proporcionado una URL
  if (!text) throw `❗️ *Uso incorrecto del comando* ❗️\n\n🌟 *Debe utilizar el comando de la siguiente manera:*\n${usedPrefix + command} <url de Instagram>`;
  
  try {
    // Responder mientras se procesa la descarga
    conn.reply(m.chat, '🚩 *Descargando el contenido de Instagram...*', m);

    // Realizar la solicitud a la API de Dorrat
    const res = await axios.get(`https://api.dorratz.com/igdl?url=${encodeURIComponent(text)}`);
    
    if (res.data.status === false) {
      throw 'No se pudo descargar el contenido. Asegúrate de que el enlace sea correcto.';
    }

    const { url, thumbnail } = res.data.result[0];

    // Enviar el video descargado al chat
    await conn.sendMessage(m.chat, { video: { url }, caption: '🎥 *Aquí está tu video descargado de Instagram*' }, { quoted: m });

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
