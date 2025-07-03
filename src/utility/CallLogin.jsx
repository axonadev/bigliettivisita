import { login } from "../store/storeLogin";

// Costanti per migliorare la leggibilità
const GUEST_USER = "GUEST";
const DEFAULT_AUTH_LEVEL = 0;

/**
 * Crea gli headers standard per le richieste HTTP
 * @returns {Headers} Headers configurati per JSON
 */
const createHeaders = () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return headers;
};

/**
 * Gestisce la risposta HTTP e lancia errori se necessario
 * @param {Response} response - Risposta HTTP
 * @returns {Promise<any>} JSON parsato dalla risposta
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Salva il token sia in sessionStorage che in localStorage
 * @param {string} token - Token da salvare
 */
const saveToken = (token) => {
  if (token) {
    sessionStorage.setItem("axo_token", token);
    localStorage.setItem("axo_token", token);
  }
};

/**
 * Crea l'oggetto di login standardizzato
 * @param {string} token - Token di autenticazione
 * @param {boolean} isGuest - Se l'utente è guest
 * @param {number} authLevel - Livello di autorizzazione
 * @param {string} nome - Nome utente
 * @param {string} cognome - Cognome utente
 * @returns {Object} Oggetto con i dati di login
 */
const createLoginObject = (token, isGuest, authLevel, nome, cognome) => ({
  logged: true,
  token,
  guest: isGuest,
  authLevel: authLevel || DEFAULT_AUTH_LEVEL,
  nomesoggetto: nome,
  cognomesoggetto: cognome,
});

/**
 * Effettua il login con credenziali utente
 * @param {Function} dispatch - Funzione dispatch di Redux
 * @param {string} azienda - Codice azienda
 * @param {string} user - Username
 * @param {string} password - Password
 * @returns {Promise<Object>} Dati di login
 */
const callLogin = async (dispatch, azienda = "", user = "", password = "") => {
  try {
    const SERVERAPI = import.meta.env.VITE_SERVERAPI;
    const urlLogin = `${SERVERAPI}/api/axo_login`;

    console.log("CallLogin - Tentativo di login per:", { azienda, user });

    const requestOptions = {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        AZIENDA: azienda,
        USER: user,
        PASSWORD: password,
      }),
      redirect: "follow",
    };

    const response = await fetch(urlLogin, requestOptions);
    const json = await handleResponse(response);

    console.log("CallLogin - Risposta ricevuta:", json);

    // Salva il token
    saveToken(json?.Token);

    // Invia i dati utente allo store Redux
    await dispatch(login(json));

    // Estrae i dati dell'utente dalla risposta
    const loginData = json?.Itemset?.LoginSoggetto?.[0];
    const authLevel = loginData?.SoggettiCredenziali_LivelloAutorizzazione;
    const isGuest = user === GUEST_USER;

    return createLoginObject(
      json?.Token,
      isGuest,
      authLevel,
      loginData?.Soggetti_Nome1,
      loginData?.Soggetti_Nome2
    );
  } catch (error) {
    console.error("Errore durante il login:", error);
    throw error;
  }
};

/**
 * Effettua il login utilizzando un token esistente
 * @param {Function} dispatch - Funzione dispatch di Redux
 * @param {string} token - Token di autenticazione
 * @returns {Promise<Object>} Dati di login
 */
export const loginByToken = async (dispatch, token = "") => {
  try {
    const SERVERAPI = import.meta.env.VITE_SERVERAPI;
    const urlLogin = `${SERVERAPI}/api/axo_login/${token}`;

    console.log("LoginByToken - Verifica token:", token);

    const requestOptions = {
      method: "GET",
      headers: createHeaders(),
    };

    const response = await fetch(urlLogin, requestOptions);
    const json = await handleResponse(response);

    console.log("LoginByToken - Risposta ricevuta:", json);

    // Invia i dati utente allo store Redux
    await dispatch(login(json));

    // Estrae i dati dell'utente dalla risposta
    const userData = json?.Item?.[0];
    const authLevel = userData?.SoggettiCredenziali_LivelloAutorizzazione;
    const isGuest = userData?.utente === GUEST_USER;

    return createLoginObject(
      token,
      isGuest,
      authLevel,
      userData?.Soggetti_Nome1,
      userData?.Soggetti_Nome2
    );
  } catch (error) {
    console.error("Errore durante la verifica del token:", error);
    throw error;
  }
};

export default callLogin;
