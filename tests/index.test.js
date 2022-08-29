const {demoDB} = require('../demoDB');
const {Pokemon, Trainer} = require('../models/index');

describe("One to Many Association", () => {
    test("Trainer can HAVE MANY Pokemon", async () => {
        // Sync Model to DB
        await demoDB.sync({force:true});
        // I need to create many pokemon and one trainer

        let trainer1 = {
            id: 1, 
            first_name: "Ash", 
            last_name: "Katchem",
        }

        let pokemon1 = {
            id: 1,
            type: "Electric",
            pokemon_name: "Pikachu"
        }
        
        let pokemon2 = {
            id: 2,
            type: "Fire",
            pokemon_name: "Charizard"
        }

        let pokemon3 = {
            id: 3,
            type: "Water",
            pokemon_name: "Greninja"
        }

        // Create the entries for them in their Models
        let pokemonEntries = await Pokemon.bulkCreate([pokemon1, pokemon2, pokemon3]);
        let trainerEntry = await Trainer.create(trainer1);

        // Get Individual Pokemon Entries
        let firstPokemon = await pokemonEntries[0];
        let secondPokemon = await pokemonEntries[1];
        let thirdPokemon = await pokemonEntries[2];

        // Add Pokemon to Trainer
        await trainerEntry.addPokemon(firstPokemon);
        await trainerEntry.addPokemon(secondPokemon);
        await trainerEntry.addPokemon(thirdPokemon);

        // Get Trainer Pokemon List
        let trainerPokemons = await trainerEntry.getPokemons();

        expect(trainerPokemons.length).toBe(3);
    });
});