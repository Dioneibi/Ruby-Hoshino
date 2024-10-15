import axios from 'axios';

const handler = async (m, { command, conn }) => {
  try {
    // Hacer una solicitud a la API de DuckDuckGo para buscar imágenes de Ruby Hoshino
    const res = await axios.get('https://duckduckgo.com/i.js', {
      params: {
        q: 'Ruby Hoshino',
        format: 'json',
      }
    });

    // Tomar una imagen aleatoria de los resultados
    const imageList = res.data.results;
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)].image;

    // Enviar la imagen al chat
    await conn.sendFile(m.chat, randomImage, 'rubyhoshino.jpg', 'Aquí tienes una imagen de Ruby Hoshino!', m, null, rcanal);

  } catch (error) {
    console.error(error);
    // Enviar un mensaje de error si algo sale mal
    await conn.reply(m.chat, 'Lo siento, no pude encontrar una imagen de Ruby Hoshino.', m);
  }
};

handler.command = ['rubyhoshino'];
handler.tags = ['anime'];
handler.help = ['rubyhoshino'];

export default handler;
