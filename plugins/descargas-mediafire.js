import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, '🚩 Ingrese el enlace de un archivo de Mediafire.', m, rcanal);
    if (!args[0].match(/mediafire/gi)) return conn.reply(m.chat, '🍟 El enlace debe ser de un archivo de Mediafire.', m, rcanal);
    try {
        await m.react(rwait);

        // Llamada a la API de Dorratz
        let res = await axios.get(`https://api.dorratz.com/v2/mediafire-dl?url=${args[0]}`);
        let { filename, filesize, filetype, download } = res.data.result;

        let txt = `乂  *¡MEDIAFIRE - DESCARGAS!*  乂\n\n`;
        txt += `✩ *Nombre* : ${filename}\n`;
        txt += `✩ *Peso* : ${filesize}\n`;
        txt += `✩ *Tipo* : ${filetype}\n\n`;
        txt += `*- ↻ El archivo se está enviando, espera un momento...*`;

        let img = await (await fetch('https://i.ibb.co/wLQFn7q/logo-mediafire.jpg')).buffer();
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, fkontak, null, rcanal);

        // Enviar el archivo descargado
        await conn.sendFile(m.chat, download, filename, null, fkontak, null, { mimetype: filetype, asDocument: true });
        await m.react(done);
    } catch (error) {
        console.error(error);
        await m.react(error);
        conn.reply(m.chat, '🚨 Ocurrió un error al intentar descargar el archivo. Inténtalo de nuevo más tarde.', m, rcanal);
    }
};

handler.help = ['mediafire'];
handler.tags = ['descargas'];
handler.command = ['mediafire', 'mdfire', 'mf'];
handler.premium = false;

export default handler;
        
