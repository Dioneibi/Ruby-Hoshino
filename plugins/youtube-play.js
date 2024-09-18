import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `_𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧𝐚 𝐩𝐞𝐭𝐢𝐜𝐢𝐨́𝐧 𝐥𝐮𝐞𝐠𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞𝐣𝐞𝐦𝐩𝐥𝐨:_ \n*${usedPrefix + command} Billie Eilish - Bellyache*`;

    try {
        const yt_play = await search(args.join(' '));  // Busca el video en YouTube con la query proporcionada

        const texto1 = `
╭───⬪══🅳🄴🅂🄲🄰🅁🄶🄰🅂══⬪───╮
├─ 🅃𝕚𝕥𝕦𝕝𝕠: ${yt_play[0].title}
├─ 🄿𝕦𝕓𝕝𝕚𝕔𝕒𝕕𝕠: ${yt_play[0].ago}
├─ 🄳𝕦𝕣𝕒𝕔𝕚𝕠𝕟: ${secondString(yt_play[0].duration.seconds)}
├─ 🅅𝕚𝕤𝕥𝕒𝕤: ${MilesNumber(yt_play[0].views)}
├─ 🄰𝕦𝕥𝕠𝕣(𝕒): ${yt_play[0].author.name}
├─ 🄴𝕟𝕝𝕒𝕔𝕖: ${yt_play[0].url}
╰───⬪══════⬪───╯`.trim();

        // Enviar un botón que permita al usuario elegir entre audio o video
        await conn.sendButton(
            m.chat, 
            "¿Quieres descargar como audio o video?", 
            texto1, 
            yt_play[0].thumbnail, 
            [
                ['🔥 Audio', `${usedPrefix}play5 ${yt_play[0].url}`],
                ['🔥 Video', `${usedPrefix}play6 ${yt_play[0].url}`]
            ], 
            null, 
            null
        );

    } catch (e) {
        await conn.reply(m.chat, `*[ ! ] Hubo un error en el comando, por favor intenta más tarde.*`, m);
        console.error(`❗❗ Error en ${usedPrefix + command}:`, e);
    }
};

const playAudio = async (m, url, conn) => {
    try {
        const info = await ytdl.getInfo(url);
        const audioStream = ytdl(url, { filter: 'audioonly' });
        await conn.sendFile(m.chat, audioStream, `${info.videoDetails.title}.mp3`, `Aquí tienes el audio: ${info.videoDetails.title}`, m);
    } catch (e) {
        await conn.reply(m.chat, `*[ ! ] Hubo un error al descargar el audio.*`, m);
        console.error(`❗❗ Error al descargar el audio:`, e);
    }
};

const playVideo = async (m, url, conn) => {
    try {
        const info = await ytdl.getInfo(url);
        const videoStream = ytdl(url, { quality: 'highestvideo' });
        await conn.sendFile(m.chat, videoStream, `${info.videoDetails.title}.mp4`, `Aquí tienes el video: ${info.videoDetails.title}`, m);
    } catch (e) {
        await conn.reply(m.chat, `*[ ! ] Hubo un error al descargar el video.*`, m);
        console.error(`❗❗ Error al descargar el video:`, e);
    }
};

handler.command = ['play', 'play2', 'play3', 'play4'];
handler.limit = 0;
handler.register = true;
handler.group = true;
export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
            }
            
