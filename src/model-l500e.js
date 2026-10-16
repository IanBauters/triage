/* ------------------------------------------------------------------ */
/* Lenovo 500e Chromebook Gen 3                                        */
/* ------------------------------------------------------------------ */
const L5 = 'img/l500e/';
const L5_KEYBOARD_ACCESS = ['1010', '1020', '1030', '1040', '1050', '1060', '1070', '1080', '1090', '1100', '1110', '1120', '1130', '1140'];
const L5_HEALTH = { test: true, t: 'Check battery health in Diagnostics.', b: 'Open the Diagnostics app (Launcher → search “Diagnostics”). The Battery card shows health, cycle count and charge status.', ref: 'diagnostics', q: 'Is battery health 80% or higher?', yes: NEXT, no: RP('B03', 'BAT', '1030', 'Low battery health on its own may be normal wear. Check the warranty terms before ordering.') };
const L5_SHIM = (component, q) => ({
  c: 'Run the factory component test from the Lenovo USB repair shim: press <kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd> and follow the on-screen steps to enter developer mode. Remove the pen, the base cover, disconnect the built-in battery and attach the power adapter. Insert the shim, press <kbd>Ctrl</kbd> + <kbd>U</kbd> at the verification screen and type <kbd>I</kbd> to install. Then detach the adapter, reconnect the battery, reattach the adapter, remove the shim and start the test.',
  q: q || `Does the factory component test fail on the ${component}?`, proc: 'shim',
  warn: 'Entering developer mode erases local data. A Lenovo service credential is needed to download the shim image from support.lenovo.com.'
});

const LENOVO_500E_G3 = {
  id: 'lenovo-500e-g3',
  name: 'Lenovo 500e Chromebook Gen 3',
  maker: 'Lenovo',
  mts: ['82JB', '82JC'],
  form: 'Convertible (360°)',
  photo: null,
  manual: { title: 'Lenovo 100e/300e/500e Chromebook Gen 3 Hardware Maintenance Manual', edition: 'Second Edition, April 2022', scope: '' },
  highlights: ['Garaged electronic pen (selected models)', 'World-facing camera (selected models)', 'Mobile data with SIM tray (selected models)', 'Battery-disable mode for service', 'USB repair shim with factory component test', 'The display only comes off after the keyboard assembly procedure', 'Fanless: cooled by a heat sink'],
  views: [[L5 + 'views.png', 'Left side: USB-C power, USB-A, headphone jack, memory card slot, pen garage. Right side: power button, volume buttons, USB-A, HDMI, security slot. Back: SIM tray (selected models).']],
  exploded: [[L5 + 'exploded-major.png', 'Main parts'], [L5 + 'exploded-lcd.png', 'Display parts']],
  partsTable: [
    ['1', 'Display unit', 'Technician only', '2020'], ['2', 'Keyboard assembly', 'Technician only', '1150'],
    ['3', 'Heatsink', 'Technician only', '1110'], ['4', 'System board', 'Technician only', '1100'],
    ['5', 'USB-C bracket', 'Technician only', '1090'], ['6', 'Speaker assembly', 'Technician only', '1060'],
    ['7', 'Built-in battery', 'Technician only', '1030'], ['8', 'Base cover assembly', 'Customer or technician', '1020'],
    ['9', 'Electronic pen cable', 'Technician only', '1140'], ['10', 'Electronic pen board', 'Technician only', '1140'],
    ['11', 'Electronic pen*', 'Customer-replaceable', '1010'], ['12', 'Pen dummy*', 'Customer-replaceable', '1010'],
    ['13', 'Nano-SIM card cable*', 'Technician only', '1120'], ['14', 'Nano-SIM card tray*', 'Customer-replaceable', 'sim'],
    ['15', 'Nano-SIM card board*', 'Technician only', '1120'], ['16', 'World-facing camera cable*', 'Technician only', '1130'],
    ['17', 'World-facing camera board*', 'Technician only', '1130'], ['18', 'Wireless card*', 'Technician only', '1040'],
    ['19', 'Mobile data card*', 'Technician only', '1050'], ['20', 'Daughter board cable, 22-pin flat cable', 'Technician only', '1080'],
    ['21', 'Daughter board cable, 30-pin flat cable', 'Technician only', '1080'], ['22', 'Daughter board', 'Technician only', '1080'],
    ['23', 'Daughter board bracket', 'Technician only', '1070'], ['b', 'Power adapter', 'Customer-replaceable', 'adapter'],
    ['c', 'Power cord', 'Customer-replaceable', 'adapter'],
    ['Display 1', 'Strip cover', 'Technician only', '2010'], ['Display 2', 'Screen panel', 'Technician only', '2020'],
    ['Display 3', 'Camera board', 'Technician only', '2030'], ['Display 4', 'Camera and display cable', 'Technician only', '2040'],
    ['Display 5', 'Sensor board', 'Technician only', '2050'], ['Display 6', 'Display hinges', 'Technician only', '2060'],
    ['Display 7', 'Hinge rubbers', 'Technician only', '2010'], ['Display 8', 'Display rear cover assembly', 'Technician only', 'display-cover']
  ],
  procs: {
    shim: {
      no: '—', name: 'USB repair shim',
      steps: [
        'Create the shim: write the latest repair shim image from support.lenovo.com (service credential required) to a USB drive of at least 8 gigabytes with a disk imaging tool.',
        'Press the power button together with <kbd>Esc</kbd> and <kbd>Refresh</kbd>. Follow the on-screen instructions to enter developer mode.',
        'Remove the base cover, disconnect the built-in battery from the system board, then attach the power adapter.',
        'Connect the shim. When the verification screen appears, press <kbd>Ctrl</kbd> + <kbd>U</kbd>.',
        'Type <kbd>I</kbd> to install the shim image. The Chromebook enters the factory test environment.',
        'Detach the power adapter, reconnect the battery, then reattach the adapter. Remove the shim.',
        'Start the factory component test: display, audio, camera, keyboard and other components. Some items need an HDMI monitor or memory card; bypassed items mark the overall test as failed.',
        'Optional: run the stress test of about 10 minutes.',
        'Run the final factory test. When it passes, all data is deleted and the Chromebook turns off. Press <kbd>F</kbd> to end it if tests cannot be performed.'
      ],
      attention: ['If the component test finds a defective part: turn off the Chromebook, detach the power adapter and replace that part.', 'A final factory test failure usually means a hardware identity mismatch (unauthorized or missing parts, or write-protect not turned off before recovery) or a write-protect malfunction.', 'Self-repair of a product under warranty can affect the warranty. Customers who want the shim must call Lenovo support.'] },
    disable: { no: '—', name: 'Disabling the built-in battery',
      steps: ['Press <kbd>Refresh</kbd> together with the power button for about five seconds, and at the same time detach the power adapter.', 'Battery power resumes when you reconnect the power adapter.'],
      attention: ['Do this before replacing any part.'] },
    adapter: { no: '—', name: 'Power adapter and power cord', cru: 'Customer-replaceable',
      steps: ['Measure the output voltage across the plug of the power adapter cable. This is a USB-C adapter, so use a USB-C power meter.', 'If the system status indicator does not light with the adapter connected, check the power cord for continuity and correct installation.'],
      attention: ['Use the power adapter shipped with the Chromebook. Another adapter may cause a message that it will charge slowly or not at all.', 'Noise from the power adapter does not always mean it is faulty.'] },
    sim: { no: '—', name: 'SIM card and SIM tray', cru: 'Customer-replaceable, selected models',
      steps: ['On models with mobile data, remove the SIM card and the SIM tray before servicing.', 'After servicing, put the card and the tray back firmly.'],
      figs: [[L5 + 'nanosim-tray.png', 'SIM tray on the back edge']] },
    '1010': { no: '1010', name: 'Electronic pen and pen dummy', cru: 'Customer-replaceable, selected models',
      figs: [[L5 + 'pen.png', 'Pull the electronic pen out of its garage'], [L5 + 'pen-dummy.png', 'Remove the pen dummy']] },
    '1020': { no: '1020', name: 'Base cover assembly', cru: 'Customer or technician', access: ['disable', 'sim', '1010'],
      figs: [[L5 + 'base-cover.png', 'Loosen the screws, then release the edges in the order shown']],
      install: ['Reapply the rating and country labels. Move labels that do not come with the new cover from the old one.'] },
    '1030': { no: '1030', name: 'Built-in battery', access: ['1010', '1020'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 4, 'Black']],
      attention: ['Use only the authorized battery specified for this Chromebook. Any other battery could ignite or explode.', 'The Chromebook only charges Lenovo-authorized batteries designed for this model.'],
      install: ['Ensure that the connectors are attached firmly.', 'Ensure that the base cover is attached firmly; otherwise the battery connection might fail.'],
      figs: [[L5 + 'battery.png', 'Disconnect the cables and remove the battery']] },
    '1040': { no: '1040', name: 'Wireless card', access: ['1010', '1020'],
      steps: ['Unplug the antenna connectors with an antenna connector removal tool, or gently with your fingers.', 'Remove the screw and the wireless card.'],
      screws: [['M2 screw, 3 millimetres long, flat-head, nylon-coated', 1, 'Black']],
      install: ['Plug the black cable into the main connector and the white cable into the auxiliary connector.'],
      figs: [[L5 + 'wlan.png', 'Wireless card']] },
    '1050': { no: '1050', name: 'Mobile data card', cru: 'Selected models', access: ['1010', '1020'],
      steps: ['Unplug the antenna connectors with an antenna connector removal tool, or gently with your fingers.', 'Remove the screw and the mobile data card.'],
      screws: [['M2 screw, 3 millimetres long, flat-head, nylon-coated', 1, 'Black']],
      install: ['Plug the orange cable into the main connector and the blue cable into the auxiliary connector.', 'Ensure that the connectors are attached firmly.'],
      figs: [[L5 + 'wwan-a.png', 'Mobile data card'], [L5 + 'wwan-b.png', 'Antenna connectors and card']] },
    '1060': { no: '1060', name: 'Speaker assembly', access: ['1010', '1020', '1030'],
      install: ['Ensure that the connectors are attached firmly.'],
      figs: [[L5 + 'speaker-a.png', 'Disconnect and free the speaker cables'], [L5 + 'speaker-b.png', 'Lift out the speakers']] },
    '1070': { no: '1070', name: 'Daughter board bracket', access: ['1010', '1020', '1030'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 2, 'Black']],
      figs: [[L5 + 'daughter-bracket.png', 'Daughter board bracket']] },
    '1080': { no: '1080', name: 'Daughter board', access: ['1010', '1020', '1030', '1070'],
      steps: ['Disconnect the 22-pin and the 30-pin flat cables.', 'Remove the screws and the daughter board.'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 2, 'Black']],
      install: ['Ensure that the connectors are attached firmly.'],
      figs: [[L5 + 'daughter-board.png', 'Daughter board and its two flat cables']] },
    '1090': { no: '1090', name: 'USB-C bracket', access: ['1010', '1020'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 3, 'Black']],
      figs: [[L5 + 'usbc-bracket.png', 'USB-C bracket']] },
    '1100': { no: '1100', name: 'System board', display: 'Main logic board', access: ['1010', '1020', '1030', '1040', '1050', '1090'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 5, 'Black']],
      attention: ['The system board is easily damaged by static electricity. Ground yourself or wear an anti-static wrist strap (Lenovo part number 6405959).'],
      install: ['Ensure that the connectors are attached firmly.', 'Run the final factory test from the USB repair shim afterwards. A hardware identity mismatch appears if write-protect was not turned off before recovery.'],
      figs: [[L5 + 'systemboard-a.png', 'Disconnect every cable from the system board'], [L5 + 'systemboard-b.png', 'Remove the five screws'], [L5 + 'systemboard-c.png', 'Lift out the system board']] },
    '1110': { no: '1110', name: 'Heatsink', access: ['1010', '1020', '1030', '1040', '1050', '1090', '1100'],
      figs: [[L5 + 'heatsink.png', 'Heatsink on the system board']] },
    '1120': { no: '1120', name: 'SIM card cable and board', cru: 'Selected models', access: ['1010', '1020', '1040', '1050', '1090', '1100', '1110'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 2, 'Black']],
      figs: [[L5 + 'nanosim-board.png', 'SIM card cable'], [L5 + 'nanosim-board-b.png', 'SIM card board']] },
    '1130': { no: '1130', name: 'World-facing camera', cru: 'Selected models', access: ['1010', '1020', '1040', '1050', '1090', '1100', '1110', '1120'],
      install: ['Ensure that the connector is attached firmly.'],
      figs: [[L5 + 'wfc.png', 'World-facing camera and cable']] },
    '1140': { no: '1140', name: 'Electronic pen board and cable', access: ['1010', '1020', '1030', '1060'],
      figs: [[L5 + 'pen-board.png', 'Pen board and cable']] },
    '1150': { no: '1150', name: 'Keyboard assembly', access: L5_KEYBOARD_ACCESS,
      steps: ['Disconnect the remaining cables, then remove the six screws that hold the display hinges.', 'Separate the display module from the keyboard assembly.'],
      screws: [['M2.5 screw, 5 millimetres long, big-head, nylon-coated', 6, 'Silver']],
      figs: [[L5 + 'keyboard.png', 'Disconnect the cables and remove the hinge screws']] },
    '2010': { no: '2010', name: 'Strip cover and rubber caps', access: ['1150'],
      screws: [['M2 screw, 3 millimetres long, flat-head, nylon-coated', 2, 'Black']],
      figs: [[L5 + 'strip-cover-a.png', 'Remove the rubber caps'], [L5 + 'strip-cover-b.png', 'Remove the screws and the strip cover']] },
    '2020': { no: '2020', name: 'Screen panel', access: ['1150', '2010'],
      screws: [['M2 screw, 3 millimetres long, flat-head, nylon-coated', 3, 'Black']],
      figs: [[L5 + 'lcd-panel.png', 'Disconnect and lift off the screen panel']] },
    '2030': { no: '2030', name: 'Camera board', access: ['1150', '2010', '2020'],
      figs: [[L5 + 'camera-board.png', 'Camera board']] },
    '2040': { no: '2040', name: 'Camera and display cable', access: ['1150', '2010', '2020', '2030'],
      install: ['Ensure that the connectors are attached firmly.'],
      figs: [[L5 + 'lcd-cable.png', 'Camera and display cable']] },
    '2050': { no: '2050', name: 'Sensor board', access: ['1150', '2010', '2020', '2030', '2040'],
      figs: [[L5 + 'sensor-board.png', 'Sensor board']] },
    '2060': { no: '2060', name: 'Display hinges', access: ['1150', '2010', '2020', '2030', '2040'],
      screws: [['M2 screw, 2.5 millimetres long, flat-head, nylon-coated', 6, 'Black'], ['M2 screw, 3 millimetres long, flat-head, nylon-coated', 2, 'Black']],
      figs: [[L5 + 'hinges.png', 'Display hinges']] },
    'display-cover': { no: '—', name: 'Display rear cover assembly', access: ['1150', '2010', '2020', '2030', '2040', '2050', '2060'],
      figs: [[L5 + 'exploded-lcd.png', 'Item 8 in the display exploded view is the display rear cover assembly']] }
  },
  fru: { MLB: '1100', BAT: '1030', ADP: 'adapter', IOB: '1080', DSP: '2020', EDP: '2040', KBD: '1150', TPD: '1150', WLN: '1040', SPK: '1060', CAM: '2030', HNG: '2060', FAN: '1110' },
  codes: { H02: '1020', K01: '1150', D03: '2020' },
  before: [
    'Before replacing any part, use the USB repair shim to diagnose and identify the problem.',
    'Do not replace a part because of a single failure you cannot reproduce. Run the test again and replace only if it recurs.',
    'Disable the built-in battery first: press Refresh + power for about five seconds while detaching the power adapter.',
    'On models with mobile data, remove the SIM card and tray before you start.'
  ],
  after: [
    'Before powering on, shake the Chromebook gently and listen for loose screws or parts.',
    'Finish with the final factory test from the USB repair shim.'
  ],
  returnForm: 'Parts return form needs: technician name and phone, service date, failure date, purchase date, symptoms and error codes, part name and part number, machine type, model and serial, customer name and address.',
  sym: {
    nopower: {
      quick: [
        { t: 'Disconnect all peripherals.', b: 'Remove USB drives, the memory card, docks and hubs.' },
        { t: 'Re-enable the built-in battery.', b: 'For service, this Chromebook can cut battery power: pressing <kbd>Refresh</kbd> + power for about five seconds while detaching the adapter disables the battery. Connect the power adapter to restore battery power, then press power.', proc: 'disable' },
        { t: 'Check the power adapter.', b: 'Use the power adapter shipped with the Chromebook. If the system status indicator does not light with the adapter connected, check the power cord for continuity and correct installation.', proc: 'adapter' },
        { t: 'Charge for 30 minutes.', b: 'Connect the adapter to the USB-C power port on the left side and to a known-good outlet. Leave it for 30 minutes before pressing power.', figs: [[L5 + 'views.png', 'The USB-C power port is the first port on the left side']] },
        { t: 'Perform a hard reset.', b: 'Turn the Chromebook off. Press and hold <kbd>Refresh</kbd> + <kbd>Power</kbd> and release <kbd>Refresh</kbd> when it starts.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Connect the power adapter that shipped with the Chromebook to the USB-C power port on the left side.', q: 'Does the system status indicator light up?', yes: GO(2), no: GO(3) },
        { c: 'With the adapter connected, press the power button on the right side for 1–2 seconds.', q: 'Does the Chromebook turn on?', yes: GO(6), no: GO(4) },
        { c: 'Measure the output voltage across the plug of the power adapter cable with a USB-C power meter.', q: 'Is the output voltage correct?', yes: GO(4), no: RP('A01', 'ADP', 'adapter', 'The power adapter and power cord can be replaced by the customer.'), proc: 'adapter' },
        { c: 'Disable the built-in battery, remove the pen and the base cover, then disconnect and reconnect the battery connector. Reattach the base cover firmly, because a loose cover can break the battery connection. Connect the adapter and press power.', q: 'Does the Chromebook turn on?', yes: RESOLVED, no: GO(5), proc: '1030' },
        { c: 'With the base cover off, reseat both daughter board cables (the 22-pin and the 30-pin flat cable) at each end.', q: 'Does the Chromebook turn on now?', yes: RESOLVED, no: GO(7), proc: '1080' },
        { c: 'Disconnect the power adapter while the Chromebook is running.', q: 'Does it stay on running on battery?', yes: NODUP, no: SYM('battery') },
        { c: 'Install a known-good built-in battery of the authorized type for this model and press power with the adapter connected.', q: 'Does the Chromebook turn on?', yes: RP('B01', 'BAT', '1030'), no: RP('M01', 'MLB', '1100'), proc: '1030' }
      ]
    },
    battery: {
      quick: [
        { t: 'Use the power adapter shipped with the Chromebook.', b: 'With another adapter a message may say the Chromebook will not charge or will charge slowly.', proc: 'adapter' },
        L5_HEALTH,
        { t: 'Check what is using power.', b: 'Go to Settings → Device → Power and look at battery usage.' },
        { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates. Retest after updating.' },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Check the base cover and the touchpad for bulging.', q: 'Is there any sign of a swollen battery?', yes: RP('B02', 'BAT', '1030', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Discharge the battery until less than 50% remains. Then connect the Chromebook to the power adapter.', q: 'Does the battery status icon show that the battery is charging?', yes: GO(5), no: GO(3) },
        { c: 'Remove the pen, the base cover and the built-in battery, and let the battery return to room temperature. Reinstall the battery and attach the base cover firmly.', q: 'Is the battery charging now?', yes: RESOLVED, no: GO(4), proc: '1030' },
        { c: 'Replace the battery with a new one of the authorized type, then check the battery status icon again.', q: 'Does the new battery charge?', yes: RP('B01', 'BAT', '1030', 'Lenovo’s battery check: if the battery still does not charge after reinstalling, replace the battery.'), no: RP('M03', 'MLB', '1100', 'Lenovo’s battery check: if the same error still exists with a new battery, replace the main logic board.'), proc: '1030' },
        { c: 'Disconnect the adapter. In Diagnostics, run the Discharge test.', q: 'Does the Discharge test pass?', yes: NODUP, no: RP('B01', 'BAT', '1030') }
      ]
    },
    display: {
      deep: [
        { c: 'Inspect the display under good light for cracks, pressure marks, spots or liquid stains.', q: 'Is there visible damage to the display?', yes: RP('D01', 'DSP', '2020', 'A screen panel cracked by excessive force or a drop is not covered under warranty.'), no: GO(2) },
        { c: 'Connect a known-good monitor to the HDMI port on the right side.', q: 'Is the image on the external monitor correct?', yes: GO(3), no: RP('M04', 'MLB', '1100') },
        { c: 'Slowly rotate the display through its range, including tent and tablet positions, while watching the screen.', q: 'Does the symptom change with the hinge angle?', yes: RP('D02', 'EDP', '2040'), no: GO(4) },
        { c: 'Remove the pen and the base cover. Disconnect and reconnect the display cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(5), proc: '1100', figs: [[L5 + 'systemboard-a.png', 'Cable connectors on the main logic board']] },
        { ...L5_SHIM('display'), yes: GO(6), no: ESCALATE },
        { c: 'The display only comes off after the keyboard assembly procedure. Then remove the strip cover and connect a known-good screen panel.', q: 'Does the known-good panel work correctly?', yes: RP('D01', 'DSP', '2020'), no: RP('D02', 'EDP', '2040', 'If a new camera and display cable does not fix it, replace the main logic board.'), proc: '2020' }
      ]
    },
    keyboard: {
      deep: [
        { c: 'Inspect every keycap for damage, missing caps or broken clips.', q: 'Is any keycap damaged or missing?', yes: RP('K01', 'KBD', '1150', 'Lenovo lists no separate keycap part. The keyboard comes as the keyboard assembly.'), no: GO(2) },
        { c: 'Inspect the keyboard for liquid residue or sticky keys.', q: 'Are there signs of liquid contact?', yes: SYM('damage'), no: GO(3) },
        { c: 'Open the Diagnostics app → Input → Keyboard and press every key.', q: 'Does every key register correctly?', yes: SOFTWARE, no: GO(4) },
        { ...L5_SHIM('keyboard'), yes: GO(5), no: SOFTWARE },
        { c: 'Remove the pen and the base cover, disable the battery, and reseat the keyboard cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('K02', 'KBD', '1150', 'The keyboard assembly is what remains after every other part is removed. Plan the time accordingly.'), proc: '1100', figs: [[L5 + 'systemboard-a.png', 'Cable connectors on the main logic board']] }
      ]
    },
    touchpad: {
      deep: [
        { c: 'Look at the touchpad from the side and check the base cover. A swollen battery pushes the touchpad up.', q: 'Is the touchpad raised, or is the base cover bulging?', yes: RP('B02', 'BAT', '1030', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'In the Diagnostics app → Input, run the touchpad tester or draw slow circles across the whole surface.', q: 'Does tracking work across the whole surface, with tap and click?', yes: SOFTWARE, no: GO(3) },
        { c: 'Remove the pen and the base cover, disable the battery, and reseat the touchpad cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('T01', 'TPD', '1150', 'Lenovo lists no separate touchpad part for this model, so it comes with the keyboard assembly.'), proc: '1100', figs: [[L5 + 'systemboard-a.png', 'Cable connectors on the main logic board']] }
      ]
    },
    touchscreen: {
      symptoms: ['The screen does not respond to touch.', 'Parts of the screen do not respond.', 'Ghost touches.', 'The screen does not rotate, or tablet mode does not turn on when folded.', 'The garaged electronic pen does not write or is not detected (selected models).'],
      likely: 'Screen panel, camera and display cable, sensor board, electronic pen, pen board and cable, power adapter (ghost touches).',
      quick: [
        { t: 'Clean the screen and remove protectors.', b: 'Wipe the screen and remove any screen protector or case.' },
        { test: true, t: 'Test without the power adapter.', b: 'An ungrounded or poor-quality adapter can cause ghost touches.', q: 'Do the ghost touches stop when the power adapter is unplugged?', yes: RP('A01', 'ADP', 'adapter', 'Try a known-good power adapter before ordering.'), no: NEXT },
        { t: 'Dock and charge the electronic pen.', b: 'On models with the garaged pen, slide the pen out of its garage at the end of the left side and dock it again. Leave it docked for at least 15 seconds.', proc: '1010' },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Inspect the glass for cracks, especially at the edges and corners.', q: 'Is the glass cracked?', yes: RP('D03', 'DSP', '2020', 'A screen panel cracked by excessive force or a drop is not covered under warranty.'), no: GO(2) },
        { c: 'Open the Diagnostics app → Input and run the touchscreen tester, or draw across the whole screen.', q: 'Does touch register across the whole screen?', yes: GO(3), no: GO(5) },
        { c: 'Fold the Chromebook into tablet mode, then turn it to portrait and back.', q: 'Does the screen rotate, and does the keyboard turn off in tablet mode?', yes: GO(4), no: RP('G01', 'OTH', '2050', 'Lenovo does not describe what the sensor board does. Replace it only after reseating the camera and display cable.') },
        { c: 'On models with the garaged electronic pen, write in a notes app.', q: 'Does the pen write and get detected? (Answer Yes if the model has no pen.)', yes: NODUP, no: GO(6) },
        { c: 'After the keyboard assembly procedure, remove the strip cover and reseat the camera and display cable at the screen panel.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('D03', 'DSP', '2020'), proc: '2040' },
        { c: 'Try a known-good electronic pen.', q: 'Does the known-good pen work?', yes: RP('E01', 'OTH', '1010', 'The electronic pen can be replaced by the customer.'), no: GO(7) },
        { c: 'Remove the pen, the base cover, the battery and the speakers. Reseat the electronic pen cable at the pen board and the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('E02', 'OTH', '1140'), proc: '1140' }
      ]
    },
    wireless: {
      quick: [
        { t: 'Check Quick Settings.', b: 'Make sure Wi-Fi and Bluetooth are on and Airplane mode is off. On models with mobile data, check that mobile data is on and a SIM card is in the tray on the back edge.' },
        { t: 'Forget and rejoin the network.', b: 'Settings → Network → Wi-Fi → select the network → Forget. Then reconnect.' },
        { t: 'Check for managed network policies.', b: 'On an enrolled Chromebook, the admin may push or restrict networks.', managed: true },
        { test: true, t: 'Run connectivity tests.', b: 'Open the Diagnostics app → Connectivity and run the network tests.', ref: 'diagnostics', q: 'Do all Connectivity tests pass on a known-good network?', yes: { out: 'nodup', extra: 'The Chromebook connects normally. Check the user’s own network or router.' }, no: NEXT },
        { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates.' }
      ],
      deep: [
        { c: 'Open Settings → Network and Settings → Bluetooth.', q: 'Are Wi-Fi and Bluetooth listed, and can both be turned on?', yes: GO(2), no: GO(4) },
        { c: 'Connect to a known-good network and pair a known-good Bluetooth device.', q: 'Does the connection work and does pairing succeed?', yes: GO(3), no: GO(4) },
        { c: 'Compare signal strength with a known-good device at the same spot.', q: 'Is the signal comparable to the known-good device?', yes: NODUP, no: GO(4) },
        { c: 'Remove the pen and the base cover. Inspect the antenna cables and their connectors on the wireless card.', q: 'Are the antenna cables or connectors damaged?', yes: ESC('Lenovo lists no separate antenna part for this model. Check Lenovo parts lookup (support.lenovo.com/partslookup) before ordering.'), no: GO(5), proc: '1040' },
        { c: 'Reseat the antennas on the wireless card: black cable to the main connector, white cable to the auxiliary connector. Retest.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('W02', 'WLN', '1040'), proc: '1040' }
      ]
    },
    audio: {
      deep: [
        { c: 'Connect known-good wired headphones to the headphone jack on the left side and play audio.', q: 'Does audio play clearly through the headphones?', yes: GO(2), no: GO(4), figs: [[L5 + 'views.png', 'The headphone jack is on the left side']] },
        { c: 'Remove the headphones and play audio at 50% volume in laptop and tablet mode.', q: 'Does audio play clearly from both speakers?', yes: NODUP, no: GO(3) },
        { c: 'Remove the pen, the base cover and the battery, then reseat the speaker connectors.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('S01', 'SPK', '1060'), proc: '1060' },
        { c: 'Inspect the jack for debris or damage. Then test with a known-good USB-C or Bluetooth headset.', q: 'Does audio play through the USB-C or Bluetooth headset?', yes: RP('S02', 'IOB', '1080', 'Check in the pictures whether the headphone jack sits on the daughter board. If it is on the main logic board, replace the main logic board instead.'), no: ESCALATE }
      ]
    },
    camera: {
      symptoms: ['The front camera shows a black image or is not found.', 'The world-facing camera does not work (selected models).', 'Others cannot hear the user in calls.', 'The microphone level does not move.'],
      likely: 'Camera board, camera and display cable, world-facing camera, microphone.',
      quick: [
        { t: 'Open the webcam privacy shutter.', b: 'Slide the privacy shutter above the screen to uncover the camera lens.' },
        { t: 'Check privacy controls.', b: 'Go to Settings → Security and privacy → Privacy controls and make sure camera and microphone access are on.' },
        { t: 'Check app permissions.', b: 'In the browser, select the icon left of the address bar and allow camera and microphone for the site.' },
        { test: true, t: 'Test with the Camera app.', b: 'Open the built-in Camera app.', q: 'Does the camera work in the Camera app?', yes: SOFTWARE, no: NEXT }
      ],
      deep: [
        { c: 'Open the Camera app with the privacy shutter open, using the front camera.', q: 'Does the front camera show a live image?', yes: GO(3), no: GO(2) },
        { ...L5_SHIM('camera'), yes: RP('C01', 'CAM', '2030', 'The camera board is in the display, which only comes off after the keyboard assembly procedure.'), no: SOFTWARE },
        { c: 'On models with a world-facing camera, switch cameras in the Camera app.', q: 'Does the world-facing camera show an image? (Answer Yes if the model has none.)', yes: GO(5), no: GO(4) },
        { c: 'Remove the pen and the base cover. Reseat the world-facing camera cable.', q: 'Does the world-facing camera work now?', yes: RESOLVED, no: RP('C03', 'CAM', '1130'), proc: '1130' },
        { c: 'Go to Settings → Device → Audio and watch the input level while you speak.', q: 'Does the input level move?', yes: NODUP, no: GO(6) },
        { c: 'Connect a known-good headset with a microphone and watch the input level again.', q: 'Does the headset microphone work?', yes: ESC('Lenovo lists no separate microphone part for this model. Check Lenovo parts lookup (support.lenovo.com/partslookup) before ordering.'), no: ESCALATE }
      ]
    },
    ports: {
      deep: [
        { c: 'Inspect the failing port. Insert a plug and check for movement.', q: 'Is the port damaged, deformed or loose?', yes: RP('P11', 'IOB', '1080', 'Check in the pictures whether the port sits on the daughter board. If it is soldered to the main logic board, replace the main logic board.'), no: GO(2) },
        { c: 'Insert a known-good USB drive into the failing port and open the Files app.', q: 'Does the drive appear in Files?', yes: GO(3), no: GO(4) },
        { c: 'For the USB-C port, test charging. For HDMI, test a known-good monitor.', q: 'Do charging and video out both work?', yes: NODUP, no: GO(4) },
        { c: 'Remove the pen, the base cover and the battery. Reseat both daughter board cables (the 22-pin and 30-pin flat cables) at each end, then test the same device on every port.', q: 'Does the port work now?', yes: RESOLVED, no: RP('M05', 'MLB', '1100', 'If the failing port sits on the daughter board, replace the daughter board first.'), proc: '1080' }
      ]
    },
    stability: {
      likely: 'Main logic board, battery, heatsink (this model has no fan).',
      deep: [
        { c: 'Open the Diagnostics app and run the processor and memory tests.', q: 'Do both tests pass?', yes: GO(2), no: RP('M06', 'MLB', '1100', 'Memory is part of the main logic board.') },
        { c: 'Use the Chromebook on mains power for 15 minutes, then on battery for 15 minutes.', q: 'Does the issue happen only on battery?', yes: SYM('battery'), no: GO(3) },
        { c: 'Sign out and use Guest mode for 15 minutes with the same workload.', q: 'Does the issue also happen in Guest mode?', yes: GO(4), no: SOFTWARE },
        { c: 'Recover ChromeOS with a recovery USB (<kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd>), then retest before signing in.', q: 'Does the issue still happen after recovery?', yes: GO(5), no: RESOLVED, ref: 'recovery', warn: 'Recovery erases all local data on the Chromebook.', managed: true },
        { ...L5_SHIM('stress', 'Does the 10-minute stress test fail?'), yes: GO(6), no: NODUP },
        { c: 'This Chromebook is fanless and cools through the heatsink. Feel the base cover during the workload.', q: 'Is it unusually hot?', yes: RP('F01', 'FAN', '1110', 'The heatsink sits under the main logic board, so the board must come out first.'), no: RP('M07', 'MLB', '1100') }
      ]
    },
    damage: {
      quick: [
        { test: true, t: 'Turn the Chromebook off and disconnect the power adapter.', b: 'After a spill, do not turn it on or charge it until it has been inspected.', proc: 'disable', q: 'Is the Chromebook turned off and the power adapter disconnected?', yes: NEXT, no: { out: 'hold', head: 'Turn it off first', msg: 'Turn the Chromebook off and disconnect the power adapter before you go on.', more: ['After a spill, do not turn it on or charge it until it has been inspected. Then restart this symptom.'] } },
        { test: true, t: 'Document the damage.', b: 'Photograph every side before you open anything.', q: 'Have you photographed every side of the Chromebook?', yes: NEXT, no: { out: 'hold', head: 'Photograph the damage first', msg: 'Take photos of every side before you open anything.', more: ['You need them for warranty and insurance claims. Then restart this symptom.'] } },
        { test: true, t: 'Check what the warranty covers.', b: 'Not covered under warranty: ' + WARRANTY_EXCLUSIONS.join('; ') + '.', q: 'Is the damage covered by a warranty or an accidental damage plan?', yes: NEXT, no: NEXT }
      ],
      deep: [
        { c: 'Check for a swollen battery: a raised touchpad, a bulging base cover, or a gap between the case halves.', q: 'Is the battery swollen?', yes: RP('B02', 'BAT', '1030', 'Safety: do not charge. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Remove the pen and the base cover. Look for liquid residue, stains or corrosion on the main logic board, connectors and the underside of the keyboard.', q: 'Are there signs of liquid contact?', yes: RP('L01', 'OTH', ['1150', '1100'], 'Liquid damage is not covered under warranty. Usually the keyboard assembly and the main logic board both need replacing.'), no: GO(3), proc: '1020' },
        { c: 'Rotate the display through its full 360° range.', q: 'Is a hinge broken, loose or grinding?', yes: RP('H01', 'HNG', '2060'), no: GO(4) },
        { c: 'Inspect the base cover and the display rear cover for cracks, bent corners and broken screw posts.', q: 'Is the base cover cracked or deformed?', yes: RP('H02', 'HNG', '1020', 'The base cover can be replaced by the customer or a technician. For a cracked display rear cover, replace the display rear cover assembly instead.'), no: SYM('roadmap') }
      ]
    }
  }
};
