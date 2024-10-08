const { WAMessageProto } = require('@whiskeysockets/baileys');
const Database = require('./database.js'); // Asegúrate de cargar tu base de datos si es necesario

async function handleNewParticipant(chat, newParticipants) {
    for (const participant of newParticipants) {
        const participantId = participant.split('@')[0]; // Obtener el ID sin el dominio
        const welcomeMessage = `
╭───────┈♡┈──────
  ¡Bienvenido/a @${participantId}! 🎉
  Nos alegra que te unas al grupo.
  
  Asegúrate de leer las reglas y diviértete.
  
  📸 Aquí tienes una imagen de bienvenida: 
  [Link de la imagen]
╰───────┈♢┈──────
        `;
        
        // Enviar el mensaje de bienvenida al grupo
        await chat.sendMessage(participant, { text: welcomeMessage, mentions: [participant] });
    }
}

// Detectar cuando un nuevo miembro se une
client.ev.on('group-participants.update', async (update) => {
    const { id, participants, action } = update;
    
    if (action === 'add') { // Si alguien es añadido al grupo
        const chat = await client.groupMetadata(id); // Obtener los metadatos del grupo
        await handleNewParticipant(chat, participants);
    }
});

// Añade el link de tu imagen aquí
const imageLink = 'https://link-a-tu-imagen.jpg';
