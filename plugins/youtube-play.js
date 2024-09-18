import ytdl from 'ytdl-core';
import yts from 'yt-search';

let handler = async (m, { conn, command, args, text }) => {
    if (!text) return conn.reply(m.chat, '🚩 Ingrese el nombre de un video de YouTube', m);

    let searchResults = await yts(args.join(' '));
    let video = searchResults.videos[0];

    if (!video) return conn.reply(m.chat, 'No se encontró ningún video.', m);

    let txt = `Título: ${video.title}\nDuración: ${video.timestamp}\nEnlace: ${video.url}\n\nResponde con *1* para video o *2* para audio.`;
    conn.reply(m.chat, txt, m);

    if (command === '1') {
        let videoStream = ytdl(video.url, { quality: 'highestvideo' });
        conn.sendFile(m.chat, videoStream, `${video.title}.mp4`, 'Aquí está tu video', m);
    } else if (command === '2') {
        let audioStream = ytdl(video.url, { quality: 'highestaudio' });
        conn.sendFile(m.chat, audioStream, `${video.title}.mp3`, 'Aquí está tu audio', m);
    }
};

handler.help = ['play <búsqueda>'];
handler.tags = ['descargas'];
handler.command = ['play'];
export default handler;
