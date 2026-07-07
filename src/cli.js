#!/usr/bin/env node
import { load, save } from "./store.js";

const [, , cmd, ...args] = process.argv;

async function main() {
  const todos = await load();

  if (cmd === "add") {
    const title = args.join(" ").trim();
    if (!title) throw new Error("title required");
    todos.push({ id: Date.now(), title, done: false });
    await save(todos);
    console.log(`added: ${title}`);
  } else if (cmd === "list") {
    if (todos.length === 0) return console.log("(no todos)");
    for (const t of todos) console.log(`${t.done ? "x" : " "} ${t.id}  ${t.title}`);
  } else if (cmd === "done") {
    const id = Number(args[0]);
    const t = todos.find((t) => t.id === id);
    if (!t) throw new Error(`id ${id} not found`);
    t.done = true;
    await save(todos);
    console.log(`done: ${t.title}`);
  } else {
    console.log("usage: todo <add|list|done> ...");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
