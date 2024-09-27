let handler = async (m, { conn }) => {
    // Array con los comandos de instalación que se enviarán uno por uno
    let comandos = [
        'termux-setup-storage',
        'apt-get update -y && apt-get upgrade -y',
        'pkg install -y git nodejs ffmpeg imagemagick && pkg install yarn',
        'git clone https://github.com/Dioneibi/Ruby-Hoshino && cd Ruby-Hoshino && yarn install && npm install',
        'ls',
        'npm start'
    ];

    let textoInicial = `🚩 *Comandos de Instalación de Ruby-Hoshino*\n\nComenzaré a enviarte los comandos uno por uno.\n\n_Se enviará un comando cada 5 segundos._`;
    
    // Enviar mensaje inicial
    await conn.reply(m.chat, textoInicial, m);

    // Función para enviar los comandos uno por uno con un intervalo de 5 segundos
    for (let i = 0; i < comandos.length; i++) {
        setTimeout(() => {
            conn.reply(m.chat, `${i + 1}:\n${comandos[i]}`, m);
        }, i * 5000); // Intervalo de 5 segundos entre cada comando (5000 milisegundos)
    }
}

handler.command = /^(comandos)$/i;
export default handler;
