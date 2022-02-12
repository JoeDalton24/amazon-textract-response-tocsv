import path from "path";
import { writeFileWithName } from "../utils/writeCsvFile.js";

function getRowsColumnsMap(table_result, blocks_map) {
  const rows = {};

  for (let relationship of table_result["Relationships"]) {
    if (relationship["Type"] === "CHILD") {
      for (let child_id of relationship["Ids"]) {
        const cell = blocks_map[child_id];
        if (cell["BlockType"] === "CELL") {
          const row_index = cell["RowIndex"];
          const col_index = cell["ColumnIndex"];
          if (!(row_index in rows)) {
            rows[row_index] = {};
          }
          rows[row_index][col_index] = getText(cell, blocks_map);
        }
      }
    }
  }

  return rows;
}

function getText(result, blocks_map) {
  let text = "";
  if (result["Relationships"]) {
    for (let relationship of result["Relationships"]) {
      if (relationship["Type"] === "CHILD") {
        for (let child_id of relationship["Ids"]) {
          const word = blocks_map[child_id];
          if (word["BlockType"] === "WORD") text += word["Text"] + " ";
          if (word["BlockType"] == "SELECTION_ELEMENT") {
            if (word["SelectionStatus"] === "SELECTED") text += "X ";
          }
        }
      }
    }
  }

  return text;
}

function generateTableCsv(table_result, blocks_map, table_index) {
  const rows = getRowsColumnsMap(table_result, blocks_map);
  const table_id = "Table_".concat("", table_index);

  let csv = `Table: ${table_id}\n\n`;
  //   let csvname = `${table_id}.csv`;

  for (const [row_index, cols] of Object.entries(rows)) {
    for (const [col_index, text] of Object.entries(cols)) {
      csv += `${text};`;
    }
    csv += "\n";
  }

  csv += "\n\n\n";
  //   fs.writeFileSync(new URL(`csv/${csvname}`, import.meta.url), csv);
  return csv;
}

function getTableCsvResults(response) {
  const blocks = response["Blocks"];

  const blocks_map = {};
  const table_blocks = [];

  for (let block of blocks) {
    blocks_map[block["Id"]] = block;
    if (block["BlockType"] === "TABLE") table_blocks.push(block);
  }

  const LENGTH_OF_TABLE_BLOCKS = table_blocks.length;

  if (LENGTH_OF_TABLE_BLOCKS <= 0) return "<b> NO Table FOUND </b>";

  let csv = "";

  for (let index = 0; index < LENGTH_OF_TABLE_BLOCKS; index += 1) {
    csv += generateTableCsv(table_blocks[index], blocks_map, index + 1);
    csv += "\n\n";
  }

  return csv;
}

export async function writeTablesToCsv(amazon_textract_response) {
  if (!amazon_textract_response || !amazon_textract_response["Blocks"].length)
    return;

  const output = getTableCsvResults(amazon_textract_response);
  const writeTable = writeFileWithName(output);
  await writeTable(path.resolve("./").concat("/tables_output.csv"));
}
