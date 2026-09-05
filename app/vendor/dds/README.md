# DDS Web vendorizzato

GrandBridge include una copia fissata degli artefatti WebAssembly pubblicati dal progetto ufficiale [dds-bridge/dds](https://github.com/dds-bridge/dds).

- Download: 26 agosto 2026
- Release ufficiale corrente al download: 3.1.0
- Origine artefatti: https://dds-bridge.github.io/dds/
- Licenza: file `LICENSE`
- `dds_web_wasm.js` SHA-256: `3E3A9C8EEDDF8CD4AC023780400285B48275D9D2426EB53EAD4C8E02F9CCD435`
- `dds_web_wasm.wasm` SHA-256: `EE6D5B222581507E226DBE44D0DC2DE0702F5F9A0F5111A554071962C0F26666`

Il wrapper pubblico espone la tabella double-dummy e l’analisi degli attacchi iniziali. GrandBridge usa quest’ultima nel worker dedicato e conserva il motore locale come fallback.

## Requisiti del runtime

Il build ufficiale usa pthread e richiede `SharedArrayBuffer`: sul web l’host deve quindi inviare gli header
`Cross-Origin-Opener-Policy: same-origin` e `Cross-Origin-Embedder-Policy: require-corp`. GrandBridge attiva DDS
soltanto quando il browser conferma `crossOriginIsolated`.

Android non esegue questo artefatto nel WebView: GrandBridge compila il sorgente ufficiale DDS 3.1.0 con NDK e
lo richiama direttamente tramite il plugin nativo `GrandBridgeDds` e JNI. Il motore ibrido locale resta il fallback
automatico quando DDS non è disponibile, supera il tempo concesso o non può valutare la posizione corrente.

