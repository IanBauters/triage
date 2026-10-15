# Triage

A Yes/No diagnostic tool for Chromebooks, built with Bootstrap and modelled on the way Apple's service tools walk a technician through a repair: pick a symptom, run the Quick Checks, then a numbered Deep Dive that ends in a repair code.

## What it does

- **Symptom charts** for power, startup, battery, display, keyboard, touchpad, touchscreen, Wi-Fi and Bluetooth, audio, camera and microphone, ports, freezes, and liquid or physical damage, plus a general road map.
- **Every step is a Yes/No question.** A step only offers multiple choice when it needs a fact, such as how much memory the device has.
- **Model profiles** that replace the generic steps with the manufacturer's own repair steps, part names and pictures:
  - Lenovo 14e Chromebook Gen 2
  - Lenovo 300e Yoga Chromebook Gen 4
  - HP Chromebook 14 G7 (with part-number pickers)
- **Repair results** with a code, the part to replace, its removal steps, screws and pictures, and repair notes you can copy.
- Works on phones and in light and dark mode. Nothing is sent anywhere; the device details are only kept in your own browser.

## Using it

Open `index.html` in a browser. The `img/` folder must sit next to it.

## Building

```sh
npm install
npm run build   # checks the data, then writes index.html
npm test        # builds, then walks every Yes/No path in every model
```

`npm test` needs the Playwright browser (`npx playwright install chromium`).

## Project layout

| Path | What it holds |
|---|---|
| `src/data.js` | Generic symptom charts and repair categories |
| `src/models.js` | Lenovo model profiles |
| `src/model-hp14g7.js` | HP Chromebook 14 G7 profile |
| `src/models-index.js` | The list of models shown in the picker |
| `src/app.js` | The page logic |
| `src/src.html` | Page layout and styles |
| `img/` | Pictures for each model |
| `validate.js` | Refuses to build if any answer leads nowhere, a part or picture is missing, or a step is not a Yes/No question |
| `tests/paths.js` | Clicks through every possible path |

## Adding a model

1. Add a profile file in `src/` with its parts, removal steps, pictures and symptom charts. Copy the structure of `model-hp14g7.js`.
2. Add it to `src/models-index.js` and to the file list in `build.js` and `validate.js`.
3. Put its pictures in `img/<model>/`.
4. Run `npm test`.

## Pictures

The pictures in `img/` come from the manufacturers' service manuals (Lenovo and HP) and remain their property.
