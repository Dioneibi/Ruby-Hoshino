import axios from 'axios';

const OPENAI_API_KEY = 'sk-nZrqy5EOC5P1Ozr1CJgKC53Wir51pIDnkmpId7lFCST3BlbkFJMmBlATUzbuoZmIB_C2P9uH2EPTkkI3zhLaBGC7dfIA'; // Tu clave API de OpenAI

async function generateImage(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: prompt,
            n: 1,
            size: '512x512' // Tamaño de la imagen
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.data && response.data.data[0]) {
            return response.data.data[0].url;
        } else {
            throw new Error('No se pudo generar la imagen.');
        }
    } catch (error) {
        throw new Error(`Error al generar la imagen: ${error.message}`);
    }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" };

    if (!args[0]) return conn.reply(m.chat, `🚩 Te Faltó Un Texto Para Generar La Imagen`, fkontak, m, { contextInfo: { 'forwardingScore': 0, 'isForwarded': false, externalAdReply: { showAdAttribution: false, title: packname, body: `👋 Hola ` + nombre, mediaType: 3, sourceUrl: redes, thumbnail: icons } } });

    let description = args.join(' ');

    try {
        let imageUrl = await generateImage(description);
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `Imagen generada con éxito para la descripción: "${description}"` }, { quoted: m });
    } catch (error) {
        await conn.reply(m.chat, `Error: ${error.message}`, fkontak);
    }
};

handler.tags = ['generación'];
handler.help = ['genimg *<descripción>*'];
handler.command = /^genimg|generarimagen$/i;
export default handler;
                   
