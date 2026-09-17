# GrandBridge — sito pubblico

Questo repository conserva la sorgente pubblicabile della landing page, della Web App e dei download di prova di GrandBridge.

GrandBridge è un’applicazione sperimentale di bridge online mobile-first. Il codice dell’applicazione e la relativa cronologia di sviluppo restano in un repository privato separato.

## Architettura pubblica

- `https://grandbridge.app/`: landing, guida, documentazione e Web App statica in `/app/`, distribuite tramite GitHub Pages;
- `https://server.grandbridge.app/`: unico ingresso dell’ambiente Server per autenticazione, API, Storage, video e gioco realtime;
- GitHub Pages: destinazione ufficiale della landing e della Web App statica; GitHub conserva anche sorgente e release Android;
- nessun indirizzo operativo precedente è supportato.

Robot, Didattica, Allenamento e replay già disponibili restano locali al dispositivo; account, sincronizzazione, funzioni sociali e gioco online richiedono il server.

## Stato

- landing page informativa a caratteri grandi, centrata sulle funzioni reali e sullo stato del prodotto;
- web app accessibile direttamente dalla landing page in `/app/`;
- app in sviluppo attivo con robot, account, multiplayer, sfide, tornei, circoli, replay e strumenti di integrità;
- guida video da due minuti servita da `server.grandbridge.app`, senza essere inclusa nel pacchetto GitHub Pages né nell’APK;
- guida completa all’utilizzo, con sommario e schermate dell’app;
- dossier tecnico aggiornato con architettura della webapp, servizi Supabase, server realtime e continuità locale;
- corso GrandBridge in 41 lezioni basato sulla guida didattica FIGB e integrato con il metodo WBF;
- APK Android Server 0.4.2-beta.12 disponibile dalla release collegata alla landing page;
- replay unificato per storico, allenamenti e partite dei campioni, con navigazione diretta fra board;
- tavoli avviabili con amici o Robot, tornei configurabili e sfide asincrone tra amici;
- Google configurato come accesso social; email e password restano disponibili;
- pagina autonoma Torneo FIGB, raggiungibile dal menu principale, con barra inferiore per Torneo, Curriculum e Classifica; Torneo raccoglie i principali dati dell’evento, mentre dal Curriculum ogni board apre distribuzione, par, analisi double-dummy, frequenze e replay con il Robot ufficiale appena FIGB acquisisce il risultato dell’utente su quella mano;
- La distribuzione tramite gli store e i pagamenti non fanno parte di questa pubblicazione.

L’APK 0.4.2-beta.12-server è una build firmata per il collaudo e richiede l’autorizzazione all’installazione manuale sul dispositivo Android. Usa l’identificativo `com.grandbridge.app.server` e aggiorna l’installazione Server precedente quando la firma coincide.

## Aggiornamento del 17 settembre 2026

La Web App beta 12 viene preparata nella configurazione Server per GitHub Pages. `server.grandbridge.app` resta l’ingresso dei servizi dinamici su PHD-SERVER; OVH resta responsabile della posta e dello spazio SFTP usato per i backup cifrati.

- [Landing page](https://grandbridge.app/)
- [Web App](https://grandbridge.app/app/)
- [Novità](https://grandbridge.app/novita.html)
- [Guida all’utilizzo](https://grandbridge.app/guida.html)
- [Documentazione tecnica](https://grandbridge.app/documentazione.html)
- [APK 0.4.2-beta.12-server](https://github.com/GuidoGentile/grandbridge-download/releases/download/v0.4.2-beta.12-server/GrandBridge-server-0.4.2-beta.12.apk)
- [Release](https://github.com/GuidoGentile/grandbridge-download/releases/tag/v0.4.2-beta.12-server)


