import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args.length) return conn.reply(m.chat, `🚩 Faltó el texto de entrada para la generación de la imagen.`, m);
    
    let prompt = args.join(' '); // Combina todos los argumentos en un solo texto
    let url = `https://api.dorratz.com/v2/image-ai?prompt=${encodeURIComponent(prompt)}`;

    await conn.reply(m.chat, `🌺 Espera un momento, estamos generando la imagen...`, m);

    try {
        let response = await axios.get(url);
        let imageUrl = response.data.imageUrl; // Suponiendo que la API devuelve la URL de la imagen en el campo 'imageUrl'

        if (imageUrl) {
            await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `Aquí tienes la imagen generada basada en: ${prompt}` }, { quoted: m });
        } else {
            await conn.reply(m.chat, `🚫 No se pudo obtener la imagen.`, m);
        }
    } catch (error) {
        console.error('Error:', error);
        await conn.reply(m.chat, `⚠️ Ocurrió un error al generar la imagen.`, m);
    }
}

handler.tags = ['imágenes'];
handler.help = ['imagen *<texto>*'];
handler.command = /^imagen$/i;

export default handler;
