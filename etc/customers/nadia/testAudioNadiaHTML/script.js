document.addEventListener('DOMContentLoaded', () => {
    // Riferimento al container della griglia
    const gridContainer = document.getElementById('audio-grid');
    
    // Array per tenere traccia degli elementi audio
    const audioElements = [];
    
    // Carica la configurazione
    loadConfiguration();
    
    /**
     * Carica la configurazione dal file JSON con gestione fallback
     */
    function loadConfiguration() {
        // Prima prova con fetch (potrebbe fallire con file:// a causa di CORS)
        fetch('config.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nel caricamento del file di configurazione');
                }
                return response.json();
            })
            .then(config => {
                generateGrid(config);
            })
            .catch(error => {
                console.warn('Fetch fallito, provo con XMLHttpRequest:', error);
                
                // Fallback a XMLHttpRequest che potrebbe funzionare con file://
                const xhr = new XMLHttpRequest();
                xhr.overrideMimeType('application/json');
                xhr.open('GET', 'config.json', true);
                xhr.responseType = 'json';
                
                xhr.onload = function() {
                    if (xhr.status === 200 || (xhr.status === 0 && xhr.response)) {
                        generateGrid(xhr.response);
                    } else {
                        useDefaultConfig();
                    }
                };
                
                xhr.onerror = function() {
                    console.error('Anche XMLHttpRequest è fallito, uso configurazione predefinita');
                    useDefaultConfig();
                };
                
                xhr.send();
            });
    }
    
    /**
     * Usa una configurazione predefinita se il caricamento del file fallisce
     */
    function useDefaultConfig() {
        console.info('Utilizzo configurazione predefinita');
        
        // Configurazione predefinita incorporata
        const defaultConfig = {
            "grid": [
                {
                    "sounds": [
                        { "name": "Suono 1-1", "url": "./suoniNadia/01_G_01.wav" },
                        { "name": "Suono 1-2", "url": "./suoniNadia/01_G_02.wav" },
                        { "name": "Suono 1-3", "url": "./suoniNadia/01_G_03.wav" }
                    ]
                },
                {
                    "sounds": [
                        { "name": "Suono 2-1", "url": "./suoniNadia/02_B_01.wav" },
                        { "name": "Suono 2-2", "url": "./suoniNadia/02_B_02.wav" }
                    ]
                }
            ]
        };
        
        generateGrid(defaultConfig);
    }
    
    /**
     * Genera la griglia in base alla configurazione
     * @param {Object} config - La configurazione della griglia
     */
    function generateGrid(config) {
        // Svuota il container
        gridContainer.innerHTML = '';
        
        // Verifica che la configurazione sia valida
        if (!config.grid || !Array.isArray(config.grid)) {
            gridContainer.innerHTML = '<p class="error">Configurazione non valida</p>';
            return;
        }
        
        // Determina il numero di colonne dalla configurazione
        const columns = config.grid.length;
        
        // Trova il numero massimo di righe per colonna
        let maxRows = 0;
        config.grid.forEach(column => {
            if (column.sounds && Array.isArray(column.sounds)) {
                maxRows = Math.max(maxRows, column.sounds.length);
            }
        });
        
        // Imposta dinamicamente il CSS per la griglia
        gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${maxRows}, 1fr)`;
        
        // Crea un array bidimensionale per la griglia con dimensioni dinamiche
        const gridArray = Array(columns).fill().map(() => Array(maxRows).fill(null));
        
        // Popola l'array con i dati dalla configurazione
        config.grid.forEach((column, columnIndex) => {
            if (column.sounds && Array.isArray(column.sounds)) {
                column.sounds.forEach((sound, rowIndex) => {
                    if (rowIndex < maxRows) {
                        // Usa l'indice della colonna invece del valore column.column
                        gridArray[columnIndex][rowIndex] = sound;
                    }
                });
            }
        });
        
        // Genera i pulsanti della griglia
        for (let row = 0; row < maxRows; row++) {
            for (let col = 0; col < columns; col++) {
                const soundData = gridArray[col][row];
                const button = document.createElement('button');
                button.className = 'grid-button';
                
                // Aggiungi l'indicatore di stato
                const statusIndicator = document.createElement('span');
                statusIndicator.className = 'status-indicator';
                button.appendChild(statusIndicator);
                
                if (soundData) {
                    // Imposta il testo del pulsante
                    button.textContent = soundData.name || 'Suono';
                    
                    // Crea l'elemento audio
                    const audio = new Audio(soundData.url);
                    
                    // Aggiungi l'audio all'array
                    const audioIndex = audioElements.length;
                    audioElements.push({
                        element: audio,
                        playing: false,
                        paused: false
                    });
                    
                    // Aggiungi l'evento click
                    button.addEventListener('click', () => {
                        toggleAudio(audioIndex, button);
                    });
                    
                    // Gestisci l'evento di fine riproduzione
                    audio.addEventListener('ended', () => {
                        resetButtonState(button);
                        audioElements[audioIndex].playing = false;
                        audioElements[audioIndex].paused = false;
                    });
                } else {
                    // Cella vuota
                    button.textContent = '';
                    button.disabled = true;
                    button.classList.add('empty');
                }
                
                gridContainer.appendChild(button);
            }
        }
    }
    
    /**
     * Attiva/disattiva la riproduzione audio
     * @param {number} index - Indice dell'elemento audio
     * @param {HTMLElement} button - Il pulsante associato
     */
    function toggleAudio(index, button) {
        const audioData = audioElements[index];
        
        // Resetta tutti gli altri pulsanti se necessario
        // audioElements.forEach((data, i) => {
        //     if (i !== index && data.playing) {
        //         data.element.pause();
        //         data.playing = false;
        //         data.paused = false;
        //         resetButtonState(document.querySelectorAll('.grid-button')[i]);
        //     }
        // });
        
        if (!audioData.playing && !audioData.paused) {
            // Aggiorna immediatamente lo stato del pulsante
            button.classList.add('playing');
            button.classList.remove('paused', 'error');
            
            // Inizia la riproduzione
            audioData.element.play()
                .then(() => {
                    audioData.playing = true;
                })
                .catch(error => {
                    console.error('Errore nella riproduzione:', error);
                    // Mantieni lo stato di riproduzione per la demo
                    audioData.playing = true;
                    
                    // Aggiungi classe di errore ma mantieni lo stato di riproduzione
                    button.classList.add('error');
                    
                    // Mostra un messaggio di errore nel pulsante
                    const originalText = button.textContent;
                    const errorIndicator = document.createElement('div');
                    errorIndicator.className = 'error-message';
                    errorIndicator.textContent = '⚠️';
                    button.appendChild(errorIndicator);
                    
                    // Ripristina il testo originale dopo un po'
                    setTimeout(() => {
                        if (button.contains(errorIndicator)) {
                            button.removeChild(errorIndicator);
                        }
                    }, 3000);
                });
        } else if (audioData.playing) {
            // Metti in pausa
            try {
                audioData.element.pause();
            } catch (e) {
                console.warn('Errore nel mettere in pausa:', e);
            }
            
            audioData.playing = false;
            audioData.paused = true;
            button.classList.remove('playing', 'error');
            button.classList.add('paused');
        } else if (audioData.paused) {
            // Aggiorna immediatamente lo stato del pulsante
            button.classList.add('playing');
            button.classList.remove('paused', 'error');
            
            // Riprendi la riproduzione
            audioData.element.play()
                .then(() => {
                    audioData.playing = true;
                    audioData.paused = false;
                })
                .catch(error => {
                    console.error('Errore nella riproduzione:', error);
                    // Mantieni lo stato di riproduzione per la demo
                    audioData.playing = true;
                    audioData.paused = false;
                    
                    // Aggiungi classe di errore ma mantieni lo stato di riproduzione
                    button.classList.add('error');
                });
        }
    }
    
    /**
     * Resetta lo stato del pulsante
     * @param {HTMLElement} button - Il pulsante da resettare
     */
    function resetButtonState(button) {
        button.classList.remove('playing', 'paused', 'error');
    }
});
