// 1. Crea uno script js da utilizzare con Node.js che effettua una chiamata ad https://api.themoviedb.org/3/movie/popular (TMDB), che ritorna una lista di film popolari. Stampa il titolo del primo film in console.
// Attenzione: avrai bisogno di installare il pacchetto 'dotenv', come visto a lezione, e configurare la tua API Key in un file .env.

// 2. Salva la lista di film in un file movies.json, usando il modulo 'fs' di Node.js. Mi raccomando, ricordati di usare correttamente il modulo 'path' per gestire i percorsi ed evitare problema di compatibilità tra sistemi operativi diversi.

// 3. Aggiungi una logica per cui, se il file è già presente nel server, non viene effettuata la chiamata a TMDB. In alternativa, viene letto il file usando il modulo 'fs'.

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.TMTB_API_KEY;

const filePath = path.resolve("movies.json");

const createFileMovies = () => {
    if (!fs.existsSync(filePath)) {
        const fetchTbmd = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
                );
                const obj = await response.json();
                const objString = JSON.stringify(obj);
                const titleFirstMovie = obj.results[0].original_title;
                console.log("titleFirstMovie " + titleFirstMovie);
                fs.writeFile(path.resolve("movies.json"), objString, (err) => {
                    if (err) {
                        throw new Error(err);
                    }
                    console.log("file created ");
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchTbmd();
    } else {
        const fileContent = fs.readFileSync(
            path.resolve("movies.json"),
            "utf-8"
        );
        console.log("fileContent " + fileContent);
    }
};

createFileMovies();
