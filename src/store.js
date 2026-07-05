import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const FILE = "todos.json";

export async function load() {
  if (!existsSync(FILE)) return [];
  const raw = await readFile(FILE, "utf8");
  return JSON.parse(raw);
}

export async function save(todos) {
  await writeFile(FILE, JSON.stringify(todos, null, 2));
}
