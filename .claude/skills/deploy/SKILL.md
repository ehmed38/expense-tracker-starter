---
name: deploy
description: Use when the user asks to deploy the app, ship a release, or push a build to staging. Runs the test/verification suite, builds the production bundle, and copies it to the local staging folder.
---

Deploy the app to the local staging area. Follow these steps in order and stop immediately if any step fails — do not proceed to the next step or report success.

## Step 1: Verify

This repo has no test framework configured yet (`package.json` has no `test` script). Check `package.json` each run in case that has changed:

- If a `test` script now exists, run `npm test` and require it to pass.
- If it still doesn't exist, run `npm run lint` instead as the verification gate, and tell the user tests are being skipped because no test suite is configured (mention this once per run, don't belabor it).

If verification fails, stop, show the failing output, and do not build or deploy.

## Step 2: Build

Run `npm run build`. This produces the production bundle in `dist/` (Vite's default output dir, already in `.gitignore`).

If the build fails, stop and show the error — do not deploy a stale or partial `dist/`.

## Step 3: Push to staging

Staging target is a local folder, default `./staging` at the project root (sibling to `dist/`). Accept an optional path argument to override the default (e.g. `/deploy ../other-staging-dir`).

- If `staging/` doesn't exist yet, create it, and add `staging` to `.gitignore` (it's a build artifact like `dist`, not source).
- Clear the existing contents of the staging folder, then copy everything from `dist/` into it, so staging always reflects exactly the build that was just verified — never a merge of old and new files.

## Step 4: Report

Summarize what happened: verification method used (tests or lint fallback) and result, build output size/file count, and the staging path deployed to. Keep it short.

## Notes

- This is a local, reversible operation (copying files into a gitignored folder) — no confirmation needed before Step 3.
- Never skip Step 1 to save time, even if the user seems in a hurry — a broken build should never reach staging.
