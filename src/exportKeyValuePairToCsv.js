import { writeFileWithName } from "../utils/writeCsvFile.js";

function getKvMap(response) {
  const blocks = response["Blocks"];
  const key_map = {};
  const value_map = {};
  const block_map = {};

  for (let block of blocks) {
    const block_id = block["Id"];
    block_map[block_id] = block;
    if (block["BlockType"] === "KEY_VALUE_SET") {
      if (block["EntityTypes"].includes("KEY")) {
        key_map[block_id] = block;
      } else {
        value_map[block_id] = block;
      }
    }
  }
  return { key_map, value_map, block_map };
}

function getKvRelationship(key_map, value_map, block_map) {
  let kvs = {};
  for (const [block_id, key_block] of Object.entries(key_map)) {
    const value_block = findValueBlock(key_block, value_map);
    const key = getText(key_block, block_map);
    const val = getText(value_block, block_map);
    kvs[key] = val;
  }

  return kvs;
}

function findValueBlock(key_block, value_map) {
  let value_block;
  for (let relationship of key_block["Relationships"]) {
    if (relationship["Type"] === "VALUE") {
      for (let value_id of relationship["Ids"]) {
        value_block = value_map[value_id];
      }
    }
  }
  return value_block;
}

function getText(result, blocks_map) {
  let text = "";

  if ("Relationships" in result) {
    for (let relationship of result["Relationships"]) {
      if (relationship["Type"] === "CHILD") {
        for (let child_id of relationship["Ids"]) {
          const word = blocks_map[child_id];
          if (word["BlockType"] === "WORD") text += word["Text"] + " ";
          if (word["BlockType"] === "SELECTION_ELEMENT") {
            if (word["SelectionStatus"] === "SELECTED") text += "X ";
          }
        }
      }
    }
  }

  return text;
}

export function getKeyValue(response) {
  const { key_map, value_map, block_map } = getKvMap(response);
  return getKvRelationship(key_map, value_map, block_map);
}

export async function writeKeyValuePairToCsv(
  amazon_textract_response,
  relative_path = new URL("key_value_output.csv", import.meta.url)
) {
  if (!amazon_textract_response || !amazon_textract_response["Blocks"].length)
    return;
  const output = getKeyValue(amazon_textract_response);
  const writeTable = writeFileWithName(JSON.stringify(output));
  // console.log(output);
  await writeTable(relative_path);
}
