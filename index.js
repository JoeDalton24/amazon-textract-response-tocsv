import { readFile } from "fs/promises";
import { writeTableToCsv } from "./src/extractTableTocsv.js";
import { writeKeyValuePairToCsv } from "./src/exportKeyValuePairToCsv.js";

(async function () {
  const files = await readFile(
    new URL("tests/data/invoice.json", import.meta.url),
    "utf-8"
  );

  const data = JSON.parse(files);

  await writeTableToCsv(data);
  await writeKeyValuePairToCsv(data);
})();
