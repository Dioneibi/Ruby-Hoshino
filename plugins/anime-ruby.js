import axios from 'axios';

const handler = async (m, {command, conn, usedPrefix}) => {
    try {
        // Realizamos una búsqueda de imágenes de Ruby Hoshino usando una API de imágenes aleatorias
        const query = 'Ruby Hoshino anime';
        const res = await axios.get(`https://api.qwant.com/v3/search/images`, {
            params: {
                count: 10,
                q: query,
                t: 'images',
                safesearch: 1,
                locale: 'en_US',
                offset: 1,
                device: 'desktop'
            }
        });

        // Seleccionamos una imagen al azar del resultado
        const images = res.data.data.result.items;
        const randomImage = images[Math.floor(Math.random() * images.length)].media;

        // Enviamos la imagen al chat
        await conn.sendFile(m.chat, randomImage, 'ruby-hoshino.jpg', '🌟 Aquí tienes una imagen de Ruby Hoshino 🌟', m, null, rcanal);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, '⚠️ No se pudo obtener una imagen en este momento. Inténtalo más tarde.', m);
    }
};

handler.command = handler.help = ['ruby'];
handler.tags = ['anime'];

export default handler;
