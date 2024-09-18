import { ytmp4, ytmp3 } from "ruhend-scraper";

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🚩 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Distancia - Kimberly Contreraxx`, m, rcanal);
    
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

        // Respuesta para descargar audio o video
        if (command === '1') {
            let videoUrl = await ytDownload(yt_play[0].videoId, 'video');
            conn.sendFile(m.chat, videoUrl, `${yt_play[0].title}.mp4`, `Aquí está tu video`, m);
        } else if (command === '2') {
            let audioUrl = await ytDownload(yt_play[0].videoId, 'audio');
            conn.sendFile(m.chat, audioUrl, `${yt_play[0].title}.mp3`, `Aquí está tu audio`, m);
        }

    } catch {
        await m.reply(`✘ Ocurrío un error`);
    }
};

handler.help = ['play *<búsqueda>*', 'play2 *<busqueda>*'];
handler.tags = ['descargas', 'youtube'];
handler.command = ['play', 'play2'];
handler.register = true;
export default handler;
               
