let handler = async (m, { conn, command }) => {
    let creador = 'Dioneibi';
    let texto = `🚩 *Instalación de Ruby-Hoshino*

⬡ Dudas: ${creador}
⬡ Tutoríal: *¡Pronto!*

*Comandos de instalación vía Termux ✏️*

\`\`\`
termux-setup-storage

apt-get update -y && apt-get upgrade -y

pkg install -y git nodejs ffmpeg imagemagick && pkg install yarn

git clone https://github.com/Dioneibi/Ruby-Hoshino && cd Ruby-Hoshino && yarn install && npm install

ls

npm start
\`\`\`

_Utilice "comandos" para enviarle los comandos uno por uno 🚩_`;

    await conn.reply(m.chat, texto, m, {
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: "Instalación de Ruby-Hoshino",
                body: "Comienza a instalar el bot",
                mediaType: 1,
                thumbnailUrl: 'https://path_to_image', // Puedes cambiar esta URL por la miniatura que prefieras
                sourceUrl: 'https://github.com/Dioneibi/Ruby-Hoshino'
            }
        }
    });
}

handler.command = /^(instalarbot|instalarRuby)$/i;
export default handler;
