// Funzioni API simulate come specificato nel task

/**
 * Simula una chiamata API GET.
 * @param {string} endpoint - L'endpoint da chiamare.
 * @param {object} params - I parametri per la richiesta.
 * @returns {Promise<object>} - Una promessa che risolve con i dati della risposta.
 */
export const Leggi = async (endpoint, params = {}) => {
  console.log(`[API SIMULATA] Leggi chiamata a ${endpoint} con params:`, params);
  // Simula un ritardo di rete
  await new Promise(resolve => setTimeout(resolve, 500));

  // Esempi di risposte simulate basate sull'endpoint
  if (endpoint === 'DatiCliente' && params.codcliente) {
    return {
      data: {
        nome: 'Mario',
        cognome: 'Rossi',
        telefono: '3331234567',
        email: `mario.rossi@example.com`,
        codcliente: params.codcliente,
      },
    };
  }
  if (endpoint === 'ListaBiglietti' && params.codcliente) {
    // Simula che i dati dei biglietti possano cambiare in base alle azioni
    // Questo è un mock semplice, in un backend reale i dati sarebbero persistiti.
    // Per questa simulazione, non manteniamo uno stato globale qui, quindi la lista sarà sempre la stessa
    // a meno che non si introduca una logica di caching/stato a livello client più complessa.
    return {
      data: [
        { idbvisita: 'b1', nome: 'Biglietto Lavoro', fronteUrl: 'https://via.placeholder.com/300x200/0000FF/808080?Text=FronteLavoro', retroUrl: 'https://via.placeholder.com/300x200/FF0000/FFFFFF?Text=RetroLavoro', sitoWeb: 'https://miosito.com' },
        { idbvisita: 'b2', nome: 'Biglietto Personale', fronteUrl: 'https://via.placeholder.com/300x200/00FF00/808080?Text=FrontePersonale', retroUrl: 'https://via.placeholder.com/300x200/FFFF00/FFFFFF?Text=RetroPersonale', sitoWeb: null },
      ],
    };
  }
  if (endpoint === 'DettaglioBiglietto' && params.idcliente && params.idbvisita) {
     return {
      data: {
        idbvisita: params.idbvisita,
        nome: `Biglietto ${params.idbvisita}`,
        fronteUrl: `https://via.placeholder.com/400x250/0088cc/ffffff?Text=Fronte-${params.idbvisita}`,
        retroUrl: `https://via.placeholder.com/400x250/cc8800/ffffff?Text=Retro-${params.idbvisita}`,
        sitoWeb: 'https://sitodinamico.com',
        idcliente: params.idcliente,
      },
    };
  }

  // Risposta di default se l'endpoint non è gestito specificamente
  return { data: { message: `Dati da ${endpoint}`, params } };
};

/**
 * Simula una chiamata API POST.
 * @param {string} endpoint - L'endpoint da chiamare.
 * @param {object} body - Il corpo della richiesta.
 * @returns {Promise<object>} - Una promessa che risolve con i dati della risposta.
 */
export const Scrivi = async (endpoint, body = {}) => {
  console.log(`[API SIMULATA] Scrivi chiamata a ${endpoint} con body:`, body);
  await new Promise(resolve => setTimeout(resolve, 700));

  if (endpoint === 'RegistraCliente') {
    // Simula la creazione di un codice cliente
    const codcliente = `CLT${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    return {
      data: {
        success: true,
        message: 'Cliente registrato con successo!',
        codcliente: codcliente,
        linkAmministrazione: `/admin/${codcliente}`,
      },
    };
  }
   if (endpoint === 'SalvaBiglietto') {
    // Se c'è idbvisita, è una modifica (es. cambio nome o associazione sito)
    // Se non c'è idbvisita, è una creazione
    const idbvisita = body.idbvisita || `BVS${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    let message = body.idbvisita ? 'Biglietto aggiornato con successo!' : 'Biglietto creato con successo!';
    if (body.hasOwnProperty('sitoWeb')) {
        message = `Sito web per biglietto ${idbvisita} aggiornato/associato con successo!`;
    } else if (body.hasOwnProperty('nome') && body.idbvisita) {
        message = `Nome del biglietto ${idbvisita} aggiornato con successo!`;
    }

    return {
      data: {
        success: true,
        message: message,
        idbvisita: idbvisita,
        // Restituisce l'intero body per confermare cosa è stato "salvato"
        // In un'API reale, restituirebbe l'oggetto biglietto aggiornato/creato.
        savedData: { ...body, idbvisita }
      },
    };
  }

  return { data: { success: true, message: `Operazione ${endpoint} completata`, receivedBody: body } };
};

/**
 * Simula un'operazione generica (es. upload file, invio WhatsApp).
 * @param {string} azione - L'azione da eseguire.
 * @param {object} params - I parametri per l'azione.
 * @returns {Promise<object>} - Una promessa che risolve con il risultato dell'azione.
 */
export const Fai = async (azione, params = {}) => {
  console.log(`[API SIMULATA] Fai chiamata per azione ${azione} con params:`, params);
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (azione === 'UploadImmagine') {
    // Simula l'upload di un file e restituisce un URL fittizio
    const { tipo, nomeFile } = params; // es. tipo: 'fronte', nomeFile: 'biglietto.jpg'
    return {
      data: {
        success: true,
        message: `Immagine ${nomeFile} (${tipo}) caricata con successo.`,
        urlImmagine: `https://cdn.example.com/uploads/${Date.now()}_${nomeFile}`,
      },
    };
  }
  if (azione === 'InviaWhatsApp') {
    const { numero, idbvisita, idcliente } = params;
    return {
      data: {
        success: true,
        message: `Biglietto ${idbvisita} inviato a ${numero} via WhatsApp. Link: /visit/${idcliente}/${idbvisita}`,
      },
    };
  }
  if (azione === 'TreeFolder' && params.codcliente) {
    return {
      data: {
        success: true,
        tree: [
          { name: 'Documenti', type: 'folder', children: [
            { name: 'Contratto.pdf', type: 'file', size: '120KB' },
            { name: 'Preventivo.docx', type: 'file', size: '80KB' },
          ]},
          { name: 'Immagini Biglietti', type: 'folder', children: [
            { name: `biglietto_lavoro_fronte.jpg`, type: 'file', size: '350KB' },
            { name: `biglietto_lavoro_retro.jpg`, type: 'file', size: '380KB' },
          ]},
          { name: 'README.md', type: 'file', size: '1KB'}
        ]
      }
    };
  }

  return { data: { success: true, message: `Azione ${azione} eseguita`, details: params } };
};
