/* DDS Web worker for GrandBridge. The vendored solver is licensed in ./LICENSE. */
"use strict";

let modulePromise = null;

function moduleUrl(name) {
  return new URL(name, self.location.href).href;
}

async function loadModule() {
  if (modulePromise) return modulePromise;
  if (!self.crossOriginIsolated || typeof SharedArrayBuffer === "undefined") {
    throw new Error("DDS richiede un contesto cross-origin isolato.");
  }
  importScripts(moduleUrl("./dds_web_wasm.js"));
  if (typeof createDdsModule !== "function") {
    throw new Error("Loader DDS non disponibile.");
  }
  modulePromise = createDdsModule({
    mainScriptUrlOrBlob: moduleUrl("./dds_web_wasm.js"),
    locateFile: (file) => file.endsWith(".wasm")
      ? moduleUrl("./dds_web_wasm.wasm")
      : moduleUrl(`./${file}`),
  });
  return modulePromise;
}

self.addEventListener("message", async (event) => {
  const message = event.data;
  if (!message || message.type !== "solve-leads") return;

  try {
    const module = await loadModule();
    const outPtr = module._malloc((1 + 13 * 3) * 4);
    try {
      const rc = module.ccall(
        "dds_web_solve_leads",
        "number",
        ["string", "number", "number", "number"],
        [message.pbn, message.trump, message.first, outPtr],
      );
      if (rc !== 1) throw new Error(`DDS ha restituito il codice ${rc}.`);

      const count = module.getValue(outPtr, "i32");
      if (count < 0 || count > 13) throw new Error("Numero di attacchi DDS non valido.");
      const leads = [];
      for (let index = 0; index < count; index += 1) {
        const base = outPtr + (1 + index * 3) * 4;
        leads.push({
          suit: module.getValue(base, "i32"),
          rank: module.getValue(base + 4, "i32"),
          score: module.getValue(base + 8, "i32"),
        });
      }
      self.postMessage({ type: "solve-leads-result", requestId: message.requestId, leads });
    } finally {
      module._free(outPtr);
    }
  } catch (error) {
    self.postMessage({
      type: "solve-leads-error",
      requestId: message.requestId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

