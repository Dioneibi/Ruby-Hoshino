import fg from 'api-dylux';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import yts from 'yt-search';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    let lister = ["mp3", "yta", "audio", "mp4", "video", "vídeo"];
    let [feature, inputs] = text.split(" ", 2);
    
    if (!lister.includes(feature)) {
        return conn.reply(m.chat, `🚩 Ingresa el formato en que deseas descargar más el título de un video o música de YouTube.\n\nEjemplo : ${usedPrefix + command} *mp3* SUICIDAL-IDOL - ecstacy\n\nFormatos disponibles :\n${usedPrefix + command} *mp3*\n${usedPrefix + command} *mp4*`, m);
    }

    if (!inputs) {
        return conn.reply(m.chat, `🚩 Ingresa el título de un video o canción de YouTube.\n\n*Ejemplo:*\n*${usedPrefix + command}* Alan Walker - Sing Me To Sleep`, m);
    }

    await m.react('🕓');
    let res = await yts(inputs);
    let vid = res.videos[0];
    let q = feature === 'mp3' ? '128kbps' : '360p';
    let txt = `*乂  Y O U T U B E  -  P L A Y*\n\n`
        + `    ✩   *Título* : ${vid.title}\n`
        + `    ✩   *Duración* : ${vid.timestamp}\n`
        + `    ✩   *Visitas* : ${vid.views}\n`
        + `    ✩   *Autor* : ${vid.author.name}\n`
        + `    ✩   *Publicado* : ${eYear(vid.ago)}\n`
        + `    ✩   *Url* : ${'https://youtu.be/' + vid.videoId}\n\n`
        + `*- ↻ El archivo se está enviando, espera un momento...*`;

    await conn.sendFile(m.chat, vid.thumbnail, 'thumbnail.jpg', txt, m);

    try {
        if (feature === 'mp3' || feature === 'yta' || feature === 'audio') {
            let yt = await fg.yta(vid.url, q);
            let { title, dl_url, size } = yt;
            let limit = 100;

            if (size.split('MB')[0] >= limit) {
                return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la descarga.`, m).then(() => m.react('✖️'));
            }

            await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
            await m.react('✅');
        } else if (feature === 'mp4' || feature === 'video' || feature === 'vídeo') {
            let yt = await fg.ytv(vid.url, q);
            let { title, dl_url, size } = yt;
            let limit = 300;

            if (size.split('MB')[0] >= limit) {
                return conn.reply(m.chat, `El archivo pesa más de ${limit} MB, se canceló la descarga.`, m).then(() => m.react('✖️'));
            }

            await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: '', mimetype: 'video/mp4', fileName: `${vid.title}.mp4` }, { quoted: m });
            await m.react('✅');
        }
    } catch {
        await m.react('✖️');
    }
}

handler.help = ['play <formato> <búsqueda>', 'play2 <formato> <búsqueda>'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2'];
handler.register = true;

export default handler;

function eYear(txt) {
    if (!txt) return '×';
    if (txt.includes('month ago')) return 'hace ' + txt.replace("month ago", "").trim() + ' mes';
    if (txt.includes('months ago')) return 'hace ' + txt.replace("months ago", "").trim() + ' meses';
    if (txt.includes('year ago')) return 'hace ' + txt.replace("year ago", "").trim() + ' año';
    if (txt.includes('years ago')) return 'hace ' + txt.replace("years ago", "").trim() + ' años';
    if (txt.includes('hour ago')) return 'hace ' + txt.replace("hour ago", "").trim() + ' hora';
    if (txt.includes('hours ago')) return 'hace ' + txt.replace("hours ago", "").trim() + ' horas';
    if (txt.includes('minute ago')) return 'hace ' + txt.replace("minute ago", "").trim() + ' minuto';
    if (txt.includes('minutes ago')) return 'hace ' + txt.replace("minutes ago", "").trim() + ' minutos';
    if (txt.includes('day ago')) return 'hace ' + txt.replace("day ago", "").trim() + ' dia';
    if (txt.includes('days ago')) return 'hace ' + txt.replace("days ago", "").trim() + ' dias';
    return txt;
                                                                                                                 }
                
