import axios from 'axios';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    
    const pokemonName = m.text.split(' ')[1];  

    if (!pokemonName) {
      return conn.reply(m.chat, '🌸 *Por favor, proporciona el nombre de un Pokémon para buscar*.', m, { contextInfo: { 'forwardingScore': 0, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: packname, body: `👋 Hola ` + nombre, mediaType: 3, sourceUrl: redes, thumbnail: icons}}});
    }

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = res.data;

    const nombrePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const tipos = data.types.map(type => type.type.name).join(', ');
    const altura = (data.height / 10).toFixed(2);  // Convertir altura a metros
    const peso = (data.weight / 10).toFixed(2);    // Convertir peso a kilogramos
    const habilidades = data.abilities.map(ability => ability.ability.name).join(', ');
    const movimientos = data.moves.map(move => move.move.name).slice(0, 5).join(', ');  // Mostrar los primeros 5 movimientos
    const imagen = data.sprites.other['official-artwork'].front_default;  // Imagen HD

    const speciesRes = await axios.get(data.species.url);
    const speciesData = speciesRes.data;
    const regiones = speciesData.habitat ? speciesData.habitat.name : 'Desconocido';
    const biografia = speciesData.flavor_text_entries
      .find(entry => entry.language.name === 'es')
      ?.flavor_text || 'Biografía no disponible';

    const evolutionChainRes = await axios.get(speciesData.evolution_chain.url);
    const evolutionChainData = evolutionChainRes.data;
    const evoluciones = extractEvolutions(evolutionChainData.chain);

    function extractEvolutions(chain, evolutions = []) {
      if (chain.evolves_to.length > 0) {
        evolutions.push(chain.species.name);
        chain.evolves_to.forEach(evo => extractEvolutions(evo, evolutions));
      } else {
        evolutions.push(chain.species.name);
      }
      return evolutions;
    }

    const caption = `✨ *Información del Pokémon*:
🦠 *Nombre*: ${nombrePokemon}
🔮 *Tipo*: ${tipos}
📏 *Altura*: ${altura} m
⚖️ *Peso*: ${peso} kg
💪 *Habilidades*: ${habilidades}
⚔️ *Movimientos*: ${movimientos}
🌍 *Hábitat*: ${regiones}

📜 *Biografía*: ${biografia}
🔄 *Evoluciones*: ${evoluciones.join(' -> ')}`;

    await conn.sendMessage(m.chat, { image: { url: imagen }, caption }, { quoted: m });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '*Lo siento, no se pudo obtener la información del Pokémon. Asegúrate de que el nombre sea correcto*.', m, { contextInfo: { 'forwardingScore': 0, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: packname, body: `👋 Hola ` + nombre, mediaType: 3, sourceUrl: redes, thumbnail: icons}}});
  }
};

// Configuración del comando
handler.command = ['pokedex', 'findpokemon'];
handler.tags = ['pokemon'];
handler.help = ['pokedex (pokemon)'];
handler.limit = true;

export default handler;
  
