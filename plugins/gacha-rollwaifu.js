/*
《✧》DERECHOS RESERVADOS DEL AUTOR 《✧》
- DavidChian (@David-Chian)
*/

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const completadoImage = './src/completado.jpg';

const obtenerDatos = () => {
    try {
        if (fs.existsSync('./src/JSON/characters.json')) {
            return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        } else {
            return {
                'usuarios': {},
                'personajesReservados': []
            };
        }
    } catch (error) {
        console.error('✧ Error al leer data.json:', error);
        return {
            'usuarios': {},
            'personajesReservados': []
        };
    }
};

const guardarDatos = (datos) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(datos, null, 2));
    } catch (error) {
        console.error('✧ Error al escribir en data.json:', error);
    }
};

const reservarPersonaje = (userId, personaje) => {
    let datos = obtenerDatos();
    datos['personajesReservados'].push({
        'userId': userId,
        ...personaje
    });
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

let handler = async (message, { conn }) => {
    try {
        let userId = message.sender;
        let currentTime = new Date().getTime();
        let cooldownTime = 10 * 60 * 1000; // 10 minutos en milisegundos
        let lastUseTime = cooldowns[userId] || 0;
        let timeSinceLastUse = currentTime - lastUseTime;

        if (timeSinceLastUse < cooldownTime) {
            let remainingTime = cooldownTime - timeSinceLastUse;
            let minutes = Math.floor(remainingTime / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            let cooldownMessage = `《✧》Debes esperar *${minutes} minutos ${seconds} segundos* para usar *#rw* de nuevo.`;
            await conn.sendMessage(message.chat, { 'text': cooldownMessage });
            return;
        }

        const verificarBot = () => {
            try {
                const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
                if (packageJson.name !== 'Ruby-Hoshino') return false;
                if (packageJson.repository.url !== 'git+https://github.com/Dioneibi/Ruby-Hoshino.git') return false;
                return true;
            } catch (error) {
                console.error('✧ Error al leer package.json:', error);
                return false;
            }
        };

        if (!verificarBot()) {
            await conn.sendMessage(message.chat, '✧ Este comando solo es disponible en Ruby-Hoshino\n◇ https://github.com/Dioneibi/Ruby-Hoshino', message, rcanal);
            return;
        }

        let datos = obtenerDatos();
        let personajes = obtenerPersonajes();

        // Resto del código...
    } catch (error) {
        console.error('Error:', error);
    }
    };
}

        let personajeDisponible = personajes.find(p => !datos.personajesReservados.some(reservado => reservado.nombre === p.nombre));

        if (!personajeDisponible) {
            await conn.sendMessage(message.chat, { text: '《✧》Lo siento, ya no hay personajes disponibles.' });
            return;
        }

        let nombrePersonaje = personajeDisponible.nombre;
        let imagenPersonaje = personajeDisponible.imagen;
        let descripcionPersonaje = personajeDisponible.descripcion;

        let mensaje = `
《✧》*Personaje Reservado*:
◇ Nombre: ${nombrePersonaje}
◇ Descripción: ${descripcionPersonaje}

《✧》Has reservado este personaje. ¡Disfruta!`;

        reservarPersonaje(userId, personajeDisponible);

        await conn.sendMessage(message.chat, { image: { url: imagenPersonaje }, caption: mensaje });

        cooldowns[userId] = currentTime; // Registrar el tiempo de uso del comando para el usuario

        // Enviar imagen de "completado"
        await conn.sendMessage(message.chat, { image: { url: completadoImage }, caption: '《✧》Tu reserva ha sido completada.' });

    } catch (error) {
        console.error('✧ Error:', error);
        await conn.sendMessage(message.chat, { text: '《✧》Ha ocurrido un error, por favor intenta nuevamente más tarde.' });
    }
};

handler.command = /^rw$/i;

export default handler;


        
