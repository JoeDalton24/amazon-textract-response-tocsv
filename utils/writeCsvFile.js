import { writeFile } from "fs/promises";

export function writeFileWithName(output) {
  return async function (relative_path) {
    try {
      await writeFile(relative_path, output);
    } catch (error) {
      console.log("error", error);
    }
  };
}
