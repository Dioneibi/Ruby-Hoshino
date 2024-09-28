/*
《✧》DERECHOS RESERVADOS DEL AUTOR 《✧》
- DavidChian (@David-Chian)
*/

import fs from 'fs';
import { v4 as uuid } from 'uuid';

const completadoImage = './src/completado.jpg';

const obtenerDatos = () => {
    try {
        return fs.existsSync('./src/JSON/characters.json') ? 
            JSON.parse(fs.readFileSync('data.json', 'utf-8')) : 
            { 'usuarios': {}, 'personajesReservados': [] };
    } catch (error) {
        console.error('✧ Error al leer data.json:', error);
        return { 'usuarios': {}, 'personajesReservados': [] };
    }
};

const guardarDatos = (data) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('✧ Error al escribir en data.json:', error);
    }
};

const reservarPersonaje = (userId, personaje) => {
    let datos = obtenerDatos();
    datos.personajesReservados.push({ 'userId': userId, ...personaje });
    guardarDatos(datos);
};

const obtenerPersonajes = () => {
    try {
        return JSON.parse(fs.readFileSync('./src/JSON/characters.json', 'utf-8'));
    } catch (error) {
        console.error('✧ Error al leer characters.json:', error);
        return [];
    }
};

let cooldowns = {};

const handler = async (message, { conn }) => {
    try {
        let sender = message.sender;
        let currentTime = new Date().getTime();
        let cooldownTime = 10 * 60 * 1000;  // 10 minutos
        let lastUsed = cooldowns[sender] || 0;
        let timeSinceLastUse = currentTime - lastUsed;

        if (timeSinceLastUse < cooldownTime) {
            let remainingTime = cooldownTime - timeSinceLastUse;
            let minutesLeft = Math.floor(remainingTime / (1000 * 60));
            let secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);
            let cooldownMessage = `《✧》Debes esperar *${minutesLeft} minutos ${secondsLeft} segundos* para usar *#rw* de nuevo.`;
            await conn.sendMessage(message.chat, { 'text': cooldownMessage });
            return;
        }

        const verificarComandoValido = () => {
            try {
                const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
                if (packageData.name !== 'YaemoriBot-MD') return false;
                if (packageData.repository.url !== 'git+https://github.com/Dev-Diego/YaemoriBot-MD.git') return false;
                return true;
            } catch (error) {
                console.error('✧ Error al leer package.json:', error);
                return false;
            }
        };

        if (!verificarComandoValido()) {
            await conn.sendMessage(message.chat, '✧ Este comando solo es disponible en YaemoriBot-MD\n◇ https://github.com/Dev-Diego/YaemoriBot-MD', message, rcanal);
            return;
        }

        let datos = obtenerDatos();
        let personajes = obtenerPersonajes();

        if (!personajes.length) {
            await conn.sendMessage(message.chat, '《✧》Felicidades, todos los personajes han sido obtenidos. ¡Pronto habrá más waifus para recolectar!');
            return;
        }

        let personajeObtenido = personajes[Math.floor(Math.random() * personajes.length)];
        reservarPersonaje(sender, personajeObtenido);

        cooldowns[sender] = currentTime;

        await conn.sendMessage(message.chat, {
            image: { url: completadoImage },
            caption: `┏━━━━━━━━━⪩\n┃˚₊ · ͟͟͞͞➳❥ FELICIDADES\n┃⏤͟͟͞͞PERSONAJE OBTENIDO\n┗━━━━━━━━━⪩\n\n✰ Nombre:\n> » *${personajeObtenido.name}*\n\n*✰ Identificación:*\n<id: ${uuid()}>\n\n✰ Valor:\n> » *WFCoins*!`
        }, 'PHOTO');
    } catch (error) {
        await conn.sendMessage(message.chat, '《✧》Ocurrió un error al procesar tu solicitud. Intenta de nuevo más tarde.');
        console.error('Error:', error);
    }
};
