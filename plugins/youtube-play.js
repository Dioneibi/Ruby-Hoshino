import fetch from "node-fetch";
import yts from "yt-search";
import { igdl } from "ruhend-scraper"; // Importa el scraper que te permite descargar

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🚩 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Distancia - Kimberly Contreraxx`,  m, rcanal, );

    conn.reply(m.chat, global.wait, m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,
                body: wm,
                previewType: 0,
                thumbnail: icons,
                sourceUrl: channel
            }
        }
    });

    try {
        await m.react(rwait);
        let yt_play = await search(args.join(" "));
        let img = await (await fetch(`${yt_play[0].image}`)).buffer();

        let txt = `*乂  Y O U T U B E  -  P L A Y  乂*\n\n`;
        txt += `✩ *𝐓𝐢𝐭𝐮𝐥𝐨:*\n${yt_play[0].title}\n\n`;
        txt += `✩ *𝐃𝐮𝐫𝐚𝐜𝐢𝐨𝐧:*\n${secondString(yt_play[0].duration.seconds)}\n\n`;
        txt += `✩ *𝐏𝐮𝐛𝐥𝐢𝐜𝐚𝐝𝐨 𝐄𝐧:*\n${yt_play[0].ago}\n\n`;
        txt += `✩ *𝐄𝐧𝐥𝐚𝐜𝐞:*\n${'https://youtu.be/' + yt_play[0].videoId}\n\n`;
        txt += `✨️ *Nota:* Para descargar responde a este mensaje con *1* o *2*.\n\n`;
        txt += `*1:* Video\n*2:* Audio`;

        await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: { 
                forwardingScore: 9999, 
                isForwarded: true, 
                externalAdReply: {
                    title: `${yt_play[0].title}`,
                    body: dev,
                    thumbnailUrl: img,
                    thumbnail: img,
                    sourceUrl: `${yt_play[0].url}`,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: fkontak });

        await m.react(done);

        // Aquí es donde se manejará la descarga
        const userResponse = await m.response; // Captura la respuesta del usuario (si responde 1 o 2)

        if (userResponse == '1') {
            // Descargar Video
            let videoUrl = `https://youtu.be/${yt_play[0].videoId}`;
            let videoInfo = await igdl(videoUrl); // Utiliza la dependencia ruhend-scraper para descargar el video
            await conn.sendMessage(m.chat, { video: { url: videoInfo.url }, caption: `Aquí está tu video: ${yt_play[0].title}` });
        } else if (userResponse == '2') {
            // Descargar Audio
            let videoUrl = `https://youtu.be/${yt_play[0].videoId}`;
            let videoInfo = await igdl(videoUrl); // Utiliza ruhend-scraper
            await conn.sendMessage(m.chat, { audio: { url: videoInfo.url }, mimetype: 'audio/mpeg', caption: `Aquí está tu audio: ${yt_play[0].title}` });
        }

    } catch (error) {
        await m.reply(`✘ Ocurrió un error: ${error.message}`);
    }
};

handler.help = ['play *<búsqueda>*', 'play2 *<busqueda>*'];
handler.tags = ['descargas', 'youtube'];
handler.command = ['play', 'play2'];
handler.register = true;
export default handler;

async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

function secondString(seconds) {
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 0 ? m + ":" : "";
    var sDisplay = s > 0 ? s : "";
    return hDisplay + mDisplay + sDisplay;
    }
            
