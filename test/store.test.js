import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The store reads/writes ./todos.json — chdir into a fresh temp dir per test.
async function inTmp(fn) {
  const dir = mkdtempSync(join(tmpdir(), "todo-"));
  const orig = process.cwd();
  process.chdir(dir);
  try {
    await fn();
  } finally {
    process.chdir(orig);
    rmSync(dir, { recursive: true, force: true });
  }
}

test("load returns [] when file is missing", async () => {
  await inTmp(async () => {
    const { load } = await import("../src/store.js");
    assert.deepEqual(await load(), []);
  });
});

test("save then load roundtrips todos", async () => {
  await inTmp(async () => {
    const { load, save } = await import("../src/store.js");
    const todos = [{ id: 1, title: "buy milk", done: false }];
    await save(todos);
    assert.deepEqual(await load(), todos);
  });
});
