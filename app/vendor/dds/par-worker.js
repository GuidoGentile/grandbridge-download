/* Local, single-thread DDS 3.1.0 analysis. Solver license: ./LICENSE. */
"use strict";
let modulePromise;
async function getSolver() {
  if (!modulePromise) {
    importScripts(new URL("dds-par.js", self.location.href).href);
    modulePromise = createGrandBridgePar({
      locateFile: (file) => new URL(file, self.location.href).href,
    });
  }
  return modulePromise;
}
self.addEventListener("message", async ({ data }) => {
  if (data?.type !== "calculate-par") return;
  try {
    const solver = await getSolver();
    const ptr = solver._malloc(52 * 4);
    try {
      const status = solver.ccall("gb_calc_par", "number", ["string", "number", "number", "number"],
        [data.pbn, data.dealer, data.vulnerability, ptr]);
      if (status !== 1) throw new Error(`DDS: ${status}`);
      const count = solver.getValue(ptr + 4, "i32");
      if (count < 0 || count > 10) throw new Error("Invalid PAR result");
      const values = Array.from({ length: 2 + count * 5 }, (_, i) => solver.getValue(ptr + i * 4, "i32"));
      self.postMessage({ values });
    } finally { solver._free(ptr); }
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : String(error) });
  }
});
