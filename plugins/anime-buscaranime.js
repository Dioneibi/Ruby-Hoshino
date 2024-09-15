import axios from 'axios';

const handler = async (m, {conn, usedPrefix, command}) => {
  try {
    // Verifica si el usuario ha enviado una imagen
    if (!m.quoted || !m.quoted.isMedia) {
      return conn.reply(m.chat, 'Por favor, responde a una imagen de anime para identificarla.', m);
    }

    // Descarga la imagen enviada por el usuario
    const media = await conn.downloadMediaMessage(m.quoted);

    // Convierte la imagen a base64
    const imageBase64 = media.toString('base64');

    // Realiza la solicitud a Trace.moe
    const res = await axios.get('https://api.trace.moe/search', {
      params: {
        image: imageBase64
      }
    });

    // Procesa el resultado
    const result = res.data.result[0];  // Toma el primer resultado
    const tituloAnime = result.anilist.title.romaji;
    const episodio = result.episode || 'Desconocido';
    const porcentajeCoincidencia = (result.similarity * 100).toFixed(2);  // Coincidencia en %

    // Envía el resultado al chat
    const mensaje = `✨ *Anime encontrado*:
📺 *Título*: ${tituloAnime}
🎬 *Episodio*: ${episodio}
🔍 *Coincidencia*: ${porcentajeCoincidencia}%`;

    conn.reply(m.chat, mensaje, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Lo siento, no se pudo identificar el anime. Intenta con otra imagen.', m);
  }
};

// Configuración del comando
handler.command = ['buscaranime', 'findanime'];
handler.tags = ['anime'];
handler.help = ['buscaranime'];
handler.limit = true;

export default handler;
