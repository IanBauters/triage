// Model profiles. Each profile maps the generic charts onto one Lenovo Hardware Maintenance Manual (manual):
// part procedures (access order, screws, figures), manual-specific checks, and per-symptom chart overrides.
// Step/outcome fields used here: src (manual page), proc (procedure key), figs ([file, caption]).

const RP = (code, com, proc, extra) => ({ out: 'replace', code, com, proc, extra });
const ESC = extra => ({ out: 'escalate', extra });

const WARRANTY_EXCLUSIONS = [
  'screen panel cracked by excessive force or a drop',
  'Scratched (cosmetic) parts',
  'Distortion, deformation or discoloration of cosmetic parts',
  'Plastic parts, latches, pins or connectors cracked or broken by excessive force',
  'Damage caused by liquid spilled into the system',
  'Sticky keys caused by liquid spilled on the keyboard',
  'Use of an incorrect power adapter'
];

/* ------------------------------------------------------------------ */
/* Lenovo 14e Chromebook Gen 2                                         */
/* ------------------------------------------------------------------ */
const L = 'img/l14e/';
const SHIM14 = (component, extraQ) => ({
  c: 'Run the factory component test from the Lenovo USB repair shim: press <kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd> and follow the on-screen steps to enter developer mode. Remove the base cover, disconnect the built-in battery and attach the power adapter. Insert the shim, press <kbd>Ctrl</kbd> + <kbd>U</kbd> at the verification screen and type <kbd>I</kbd> to install. Then detach the adapter, reconnect the battery, reattach the adapter, remove the shim and start the test.',
  q: extraQ || `Does the factory component test fail on the ${component}?`, proc: 'shim',
  warn: 'Entering developer mode erases local data. A Lenovo service credential is needed to download the shim image from support.lenovo.com.'
});

const LENOVO_14E_G2 = {
  id: 'lenovo-14e-g2',
  name: 'Lenovo 14e Chromebook Gen 2',
  maker: 'Lenovo',
  mts: ['82M1', '82M2'],
  form: 'Clamshell',
  photo: L + 'view-front.png',
  manual: {
    title: 'Lenovo 14e Chromebook Gen 2 and IdeaPad 3 Chrome 14APO6 Hardware Maintenance Manual',
    edition: 'First Edition, May 2021',
    scope: 'Linked to the Lenovo 14e Chromebook Gen 2 (machine types 82M1 and 82M2) only.'
  },
  highlights: ['Fanless: heatsink only', 'Battery-disable mode for service', 'USB repair shim with factory component test', 'Touch screen on selected models'],
  views: [
    [L + 'view-front.png', 'Front: microphones, camera, webcam privacy shutter, touch screen (selected models)'],
    [L + 'view-base.png', 'Base: speakers, power button, touchpad'],
    [L + 'view-left.png', 'Left: USB-C (3.2 Gen 1) power connector, USB 3.2 Gen 1, audio connector, memory card slot'],
    [L + 'view-right.png', 'Right: USB 3.2 Gen 1, HDMI connector, security-lock slot']
  ],
  exploded: [
    [L + 'exploded-major.png', 'Main parts'],
    [L + 'exploded-lcd.png', 'Display parts']
  ],
  partsTable: [
    ['1', 'Display unit', 'Technician only', '1090'], ['2', 'C cover with keyboard assembly', 'Technician only', '1130'],
    ['3', 'Port board cable 22-pin flat cable', 'Technician only', '1050'], ['4', 'Port board cable 30-pin flat cable', 'Technician only', '1050'],
    ['5', 'Port board', 'Technician only', '1050'], ['6', 'Right port board bracket', 'Customer or technician', '1060'],
    ['7', 'Wireless card', 'Technician only', '1030'], ['8', 'Speaker assembly', 'Technician only', '1040'],
    ['9', 'Base cover assembly', 'Customer or technician', '1010'], ['10', 'Built-in battery', 'Technician only', '1020'],
    ['11', 'Wireless antenna kits', 'Technician only', '1080'], ['12', 'System board', 'Technician only', '1110'],
    ['13', 'Heatsink', 'Technician only', '1120'], ['14', 'Left USB board bracket', 'Customer or technician', '1050'],
    ['b', 'Power cord', 'Customer-replaceable', 'adapter'], ['c', 'Power adapter', 'Customer-replaceable', 'adapter'],
    ['Display 1', 'Screen bezel', 'Technician only', '2010'], ['Display 2', 'Screen panel', 'Technician only', '2020'],
    ['Display 3', 'Display and camera cable', 'Technician only', '2040'], ['Display 5', 'Camera privacy shutter', 'Technician only', '2030'],
    ['Display 7', 'Camera board', 'Technician only', '2030'], ['Display 8', 'Display rear cover assembly', 'Technician only', '2060'],
    ['Display 9', 'Display hinge', 'Technician only', '2050']
  ],
  procs: {
    shim: {
      no: 'Ch. 3', name: 'USB repair shim', page: '25–26',
      steps: [
        'Create the shim: write the latest repair shim image from support.lenovo.com (service credential required) to a USB drive of at least 8 gigabytes with a disk imaging tool.',
        'Press the power button together with <kbd>Esc</kbd> and <kbd>Refresh</kbd>. Follow the on-screen instructions to enter developer mode.',
        'Remove the base cover, disconnect the built-in battery from the system board, then attach the power adapter.',
        'Connect the shim. When the verification screen appears, press <kbd>Ctrl</kbd> + <kbd>U</kbd>.',
        'Type <kbd>I</kbd> to install the shim image. The Chromebook enters the factory-test-image environment.',
        'Detach the power adapter, reconnect the battery, then reattach the adapter. Remove the shim.',
        'Start the factory component test: display, audio, camera, keyboard and other components. Some items need an HDMI monitor or memory card; bypassed items mark the overall test as failed.',
        'Optional: run the stress test of about 10 minutes.',
        'Run the final factory test. When it passes, all data is deleted and the Chromebook turns off. Press <kbd>F</kbd> to end the final factory test if tests cannot be performed.'
      ],
      attention: [
        'If the factory component test finds a defective component: turn off the Chromebook, detach the power adapter and replace the component.',
        'A final factory test failure usually means a hardware identity mismatch (unauthorized or missing parts, or write-protect not turned off before recovery) or a write-protect malfunction.'
      ]
    },
    disable: {
      no: '—', name: 'Disabling the built-in battery', page: '34',
      steps: ['Press <kbd>Refresh</kbd> together with the power button, and at the same time detach the power adapter from the Chromebook.', 'Battery power resumes when you reconnect the power adapter.'],
      attention: ['Do this before replacing any part.']
    },
    adapter: { no: '—', name: 'Power adapter and power cord', page: '22', cru: 'Customer-replaceable',
      steps: ['Measure the output voltage across the plug of the power adapter cable.', 'If the system status indicator does not light with mains power connected, check the power cord for continuity and correct installation.'],
      attention: ['Use the power adapter shipped with the computer. Another adapter may cause a message that the computer will charge slowly or not at all.', 'Noise from the power adapter does not always indicate a defect.'] },
    '1010': { no: '1010', name: 'Base cover assembly', page: '34–35', cru: 'Customer or technician', access: ['disable'],
      figs: [[L + '1010-base-cover.png', 'Removal steps of the base cover assembly']],
      install: ['Reapply all labels that come with the replacement base cover. Move any missing labels from the old cover.'] },
    '1020': { no: '1020', name: 'Built-in battery', page: '35–36', access: ['1010'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 4, 'Black']],
      figs: [[L + '1020-battery.png', 'Removal steps of the built-in battery']],
      attention: ['DANGER: Use only the authorized battery specified for this computer. Any other battery could ignite or explode.', 'The system only charges Lenovo-authorized batteries designed for this model.'],
      install: ['Ensure that the connectors are attached firmly.', 'Ensure that the base cover assembly is attached firmly; otherwise, battery connection might fail.'] },
    '1030': { no: '1030', name: 'Wireless card', page: '36–37', access: ['1010'],
      screws: [['M2 screw, 3 millimetres long, flat-head, nylon-coated', 1, 'Black']],
      figs: [[L + '1030-wlan-card.png', 'Removal steps of the wireless card']],
      install: ['Plug the black cable into the main connector, and the gray cable into the auxiliary connector on the card.'] },
    '1040': { no: '1040', name: 'Speaker assembly', page: '37', access: ['1010'],
      figs: [[L + '1040-speaker.png', 'Removal steps of the speaker assembly']],
      install: ['Ensure that the connector is attached firmly.'] },
    '1050': { no: '1050', name: 'Left port board, port bracket and port cables', page: '37–38', access: ['1010'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 3, 'Black']],
      figs: [[L + '1050-left-io.png', 'Removal steps of the left port board, port bracket and port cables (22-pin and 30-pin flat cables)']],
      install: ['Ensure that the connector is attached firmly.'] },
    '1060': { no: '1060', name: 'Right port bracket', page: '39', cru: 'Customer or technician', access: ['1010'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 4, 'Black']],
      figs: [[L + '1060-right-io.png', 'Removal steps of the right port bracket']],
      install: ['Ensure that the connector is attached firmly.'] },
    '1070': { no: '1070', name: 'Clickpad and clickpad cable', page: '39–40', access: ['1010', '1020'],
      screws: [['M1.6 screw, 1.8 millimetres long, flat-head, nylon-coated', 3, 'Black']],
      figs: [[L + '1070-clickpad-a.png', 'Disconnect the clickpad cable'], [L + '1070-clickpad-b.png', 'Remove the screws'], [L + '1070-clickpad-c.png', 'Remove the clickpad']] },
    '1080': { no: '1080', name: 'Wireless antenna', page: '40–41', access: ['1010', '1020'],
      figs: [[L + '1080-antenna.png', 'Release the antenna cables'], [L + '1080-antenna-b.png', 'Lift the cables out'], [L + '1080-antenna-location.png', 'Antenna location: a = main antenna, b = auxiliary antenna']] },
    '1090': { no: '1090', name: 'Display unit', page: '41–42', access: ['1010'],
      screws: [['M2.5 screw, 5 millimetres long, flat-head, nylon-coated', 6, 'Silver']],
      figs: [[L + '1090-lcd-unit-a.png', 'Disconnect the display cable and remove the hinge screws'], [L + '1090-lcd-unit-b.png', 'Lift the display unit off']] },
    '1110': { no: '1110', name: 'System board', display: 'Main logic board', page: '43', access: ['1010', '1020', '1030', '1060'],
      screws: [['M2 screw, 4 millimetres long, flat-head, nylon-coated', 5, 'Black']],
      figs: [[L + '1110-system-board-a.png', 'Disconnect all cables from the system board'], [L + '1110-system-board-b.png', 'Remove the screws and lift the system board']],
      attention: ['The system board is easily damaged by static electricity. Ground yourself by touching a ground point or wear an anti-static wrist strap (Lenovo part number 6405959).'],
      install: ['Ensure that the connectors are attached firmly.', 'Run the final factory test from the USB repair shim afterwards. An hardware identity mismatch appears if write-protect was not turned off before recovery.'] },
    '1120': { no: '1120', name: 'Heatsink', page: '44', access: ['1010', '1020', '1030', '1060', '1110'],
      screws: [['M2 screw, 3 millimetres long, flat-head, nylon-coated', 2, 'Black']],
      figs: [[L + '1120-heatsink.png', 'Removal steps of the heatsink']],
      install: ['Ensure that the connectors are attached firmly.'] },
    '1130': { no: '1130', name: 'C cover with keyboard assembly', page: '44–45', access: ['1010', '1020', '1030', '1040', '1050', '1060', '1070', '1080', '1090', '1110'],
      figs: [[L + 'exploded-major.png', 'Item 2 in the exploded view is the C cover with keyboard. It remains after all other parts are removed.']] },
    '2010': { no: '2010', name: 'Screen bezel', page: '45', access: ['1090'],
      figs: [[L + '2010-bezel.png', 'Removal steps of the screen bezel']] },
    '2020': { no: '2020', name: 'Screen panel', page: '45–46', access: ['1090', '2010'],
      figs: [[L + '2020-panel-a.png', 'Pull out each adhesive tape slowly'], [L + '2020-panel-b.png', 'Turn over the panel and detach the display cable'], [L + '2020-panel-c.png', 'Installation: apply new elastic tapes, attach the display cable']],
      attention: ['Do not pull the tapes too fast, otherwise the tapes might snap.'],
      install: ['Peel the liners from one side of the new elastic tapes, apply them, then peel the other side. Attach the display cable, turn over the panel and secure it with the tapes.'] },
    '2030': { no: '2030', name: 'Camera privacy shutter and camera board', page: '47', access: ['1090', '2010', '2020'],
      figs: [[L + '2030-camera.png', 'Removal steps of the camera privacy shutter and camera board']] },
    '2040': { no: '2040', name: 'Display and camera cable', page: '48', access: ['1090', '2010', '2020'],
      figs: [[L + '2040-lcd-cable.png', 'Removal steps of the display and camera cable']],
      attention: ['Remove the left hinge cap before removing the display and camera cable.'] },
    '2050': { no: '2050', name: 'Display hinges', page: '48–49', access: ['1090', '2010', '2020'],
      screws: [['M2 screw, 2.5 millimetres long, flat-head, nylon-coated', 8, 'Black']],
      figs: [[L + '2050-hinges.png', 'Removal steps of the display hinges']] },
    '2060': { no: '2060', name: 'Display rear cover assembly', page: '49', access: ['2010', '2020', '2030', '2040', '2050'],
      figs: [[L + 'exploded-lcd.png', 'Item 8 in the display exploded view is the display rear cover assembly']] }
  },
  fru: { MLB: '1110', BAT: '1020', ADP: 'adapter', IOB: '1050', DSP: '2020', EDP: '2040', KBD: '1130', TPD: '1070', WLN: '1030', SPK: '1040', CAM: '2030', MIC: '2030', HNG: '2050', FAN: '1120' },
  codes: { W01: '1080', H02: '1010', K01: '1130' },
  before: [
    'Before replacing any part, use the USB repair shim to diagnose and identify the problem.',
    'Do not replace a part because of a single, unreproducible failure. Clear the error, run the test again, and replace only if it recurs.',
    'Disable the built-in battery first: press Refresh + power while detaching the power adapter.'
  ],
  after: [
    'Before powering on, shake the Chromebook gently and listen for loose screws or parts.',
    'Finish with the final factory test from the USB repair shim to reset to factory settings.'
  ],
  returnForm: 'Parts return form needs: technician name and phone, service date, failure date, purchase date, symptoms and error codes, part name and part number, machine type, model and serial, customer name and address.',
  sym: {
    nopower: {
      quick: [
        { t: 'Disconnect all peripherals.', b: 'Remove USB drives, the memory card, docks and hubs.' },
        { t: 'Re-enable the built-in battery.', b: 'For service, this Chromebook can cut battery power: pressing <kbd>Refresh</kbd> + power while detaching the power adapter disables the battery. Connect the power adapter to restore battery power, then press power.', proc: 'disable' },
        { t: 'Check the power adapter.', b: 'Use the power adapter shipped with the Chromebook. If the system status indicator does not light with mains power connected, check the power cord for continuity and correct installation.', proc: 'adapter' },
        { t: 'Charge for 30 minutes.', b: 'Connect the power adapter to the USB-C power connector on the left side and to a known-good outlet. Leave it for 30 minutes before pressing power.', figs: [[L + 'view-left.png', 'The USB-C power connector is the first port on the left side']] },
        { t: 'Perform a hard reset.', b: 'Turn the Chromebook off. Press and hold <kbd>Refresh</kbd> + <kbd>Power</kbd> and release <kbd>Refresh</kbd> when it starts.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Connect the power adapter that shipped with the Chromebook to the USB-C power connector on the left side.', q: 'Does the system status indicator light up?', yes: GO(2), no: GO(3), figs: [[L + 'view-left.png', 'Left side: USB-C power connector']] },
        { c: 'With the adapter connected, press the power button for 1–2 seconds.', q: 'Does the Chromebook turn on?', yes: GO(6), no: GO(4) },
        { c: 'Measure the output voltage across the plug of the power adapter cable. This is a USB-C adapter, so use a USB-C power meter.', q: 'Is the output voltage correct?', yes: GO(4), no: RP('A01', 'ADP', 'adapter', 'The power adapter and power cord can be replaced by the customer.'), proc: 'adapter' },
        { c: 'Disable the built-in battery, remove the base cover, then disconnect and reconnect the battery connector. Reattach the base cover firmly, because a loose cover can break the battery connection. Connect the adapter and press power.', q: 'Does the Chromebook turn on?', yes: RESOLVED, no: GO(5), proc: '1020' },
        { c: 'With the base cover off, reseat both port board cables (22-pin and 30-pin flat cables) between the left port board and the main logic board.', q: 'Does the Chromebook turn on now?', yes: RESOLVED, no: GO(7), proc: '1050' },
        { c: 'Disconnect the power adapter while the Chromebook is running.', q: 'Does it stay on running on battery?', yes: NODUP, no: SYM('battery') },
        { c: 'Install a known-good built-in battery of the authorized type for this model and press power with the adapter connected.', q: 'Does the Chromebook turn on?', yes: RP('B01', 'BAT', '1020'), no: RP('M01', 'MLB', '1110'), proc: '1020' }
      ]
    },
    battery: {
      quick: [
        { t: 'Use the power adapter shipped with the Chromebook.', b: 'With another adapter a message may say the Chromebook will not charge or will charge slowly.', proc: 'adapter' },
        { test: true, t: 'Check battery health in Diagnostics.', b: 'Open the Diagnostics app (Launcher → search “Diagnostics”). The Battery card shows health, cycle count and charge status.', ref: 'diagnostics', q: 'Is battery health 80% or higher?', yes: NEXT, no: RP('B03', 'BAT', '1020', 'Low battery health on its own may be normal wear. Check the warranty terms before ordering.') },
        { t: 'Check what is using power.', b: 'Go to Settings → Device → Power and look at battery usage.' },
        { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates. Retest after updating.' },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Check the bottom cover and the clickpad for bulging. A swollen battery pushes the clickpad up so it no longer clicks.', q: 'Is there any sign of a swollen battery?', yes: RP('B02', 'BAT', '1020', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Discharge the battery until less than 50% remains. Then connect the Chromebook to mains power to charge the battery.', q: 'Does the battery status icon show that the battery is charging?', yes: GO(5), no: GO(3) },
        { c: 'Remove the base cover and the built-in battery, and let the battery return to room temperature. Reinstall the battery and attach the base cover firmly.', q: 'Is the battery charging now?', yes: RESOLVED, no: GO(4), proc: '1020' },
        { c: 'Replace the battery with a new one of the authorized type, then check the battery status icon again.', q: 'Does the new battery charge?', yes: RP('B01', 'BAT', '1020', 'Lenovo’s battery check: if the battery still does not charge after reinstalling, replace the battery.'), no: RP('M03', 'MLB', '1110', 'Lenovo’s battery check: if the same error still exists after a new battery, replace the main logic board.'), proc: '1020' },
        { c: 'Disconnect the adapter. In Diagnostics, run the Discharge test.', q: 'Does the Discharge test pass?', yes: NODUP, no: RP('B01', 'BAT', '1020') }
      ]
    },
    display: {
      deep: [
        { c: 'Inspect the display under good light for cracks, pressure marks, spots or liquid stains.', q: 'Is there visible damage to the display?', yes: RP('D01', 'DSP', '2020', 'An screen panel cracked by excessive force or a drop is not covered under warranty.'), no: GO(2) },
        { c: 'Connect a known-good monitor to the HDMI connector on the right side.', q: 'Is the image on the external monitor correct?', yes: GO(3), no: RP('M04', 'MLB', '1110'), figs: [[L + 'view-right.png', 'Right side: USB-A, HDMI, security-lock slot']] },
        { c: 'Slowly open and close the lid between 30° and 150° while watching the screen.', q: 'Does the symptom change with the lid angle?', yes: RP('D02', 'EDP', '2040'), no: GO(4) },
        { c: 'Remove the base cover. Disconnect and reconnect the display cable at the main logic board, as in step 1–2 of the display unit removal.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(5), proc: '1090' },
        { ...SHIM14('display'), yes: GO(6), no: ESCALATE },
        { c: 'Remove the screen bezel and connect a known-good screen panel to the existing display cable.', q: 'Does the known-good panel work correctly?', yes: RP('D01', 'DSP', '2020'), no: GO(7), proc: '2020' },
        { c: 'Install a known-good display and camera cable. Remove the left hinge cap first.', q: 'Does the display work correctly now?', yes: RP('D02', 'EDP', '2040'), no: RP('M04', 'MLB', '1110'), proc: '2040' }
      ]
    },
    keyboard: {
      deep: [
        { c: 'Inspect every keycap for damage, missing caps or broken clips.', q: 'Is any keycap damaged or missing?', yes: RP('K01', 'KBD', '1130', 'Lenovo lists no separate keycap part. The keyboard is part of the C cover with keyboard assembly.'), no: GO(2) },
        { c: 'Inspect the keyboard for liquid residue or sticky keys.', q: 'Are there signs of liquid contact?', yes: SYM('damage'), no: GO(3) },
        { c: 'Open the Diagnostics app → Input → Keyboard and press every key.', q: 'Does every key register correctly?', yes: SOFTWARE, no: GO(4) },
        { ...SHIM14('keyboard'), yes: GO(5), no: SOFTWARE },
        { c: 'Remove the base cover, disable the battery, and reseat the keyboard cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('K02', 'KBD', '1130', 'Replacing the C cover with keyboard means removing ten other parts first. Plan the time accordingly.'), proc: '1110' }
      ]
    },
    touchpad: {
      deep: [
        { c: 'Look at the clickpad from the side and check the base cover. A swollen battery pushes the clickpad up.', q: 'Is the clickpad raised, or is the base cover bulging?', yes: RP('B02', 'BAT', '1020', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'In the Diagnostics app → Input, run the touchpad tester or draw slow circles across the whole surface.', q: 'Does tracking work across the whole surface, with tap and click?', yes: SOFTWARE, no: GO(3) },
        { c: 'Remove the base cover and the built-in battery. Disconnect and reconnect the clickpad cable.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('T01', 'TPD', '1070'), proc: '1070' }
      ]
    },
    wireless: {
      deep: [
        { c: 'Open Settings → Network and Settings → Bluetooth.', q: 'Are Wi-Fi and Bluetooth listed, and can both be turned on?', yes: GO(2), no: GO(4) },
        { c: 'Connect to a known-good network and run all Connectivity tests in Diagnostics. For Bluetooth, pair with a known-good device.', q: 'Do the tests pass and does pairing succeed?', yes: GO(3), no: GO(4) },
        { c: 'Compare signal strength with a known-good device at the same spot.', q: 'Is the signal comparable to the known-good device?', yes: NODUP, no: GO(4) },
        { c: 'Remove the base cover and the battery. Follow the main (a) and auxiliary (b) antenna cables from the display hinges to the wireless card and inspect them and their connectors.', q: 'Are the antenna cables or connectors damaged?', yes: RP('W01', 'WLN', '1080'), no: GO(5), proc: '1080', figs: [[L + '1080-antenna-location.png', 'A = main antenna, b = auxiliary antenna']] },
        { c: 'Reseat the antennas on the wireless card: black cable to the main connector, gray cable to the auxiliary connector. Retest.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('W02', 'WLN', '1030'), proc: '1030' }
      ]
    },
    audio: {
      deep: [
        { c: 'Connect known-good wired headphones to the audio connector on the left side and play audio.', q: 'Does audio play clearly through the headphones?', yes: GO(2), no: GO(4), figs: [[L + 'view-left.png', 'Left side: audio connector is the third port']] },
        { c: 'Remove the headphones and play audio at 50% volume.', q: 'Does audio play clearly from both speakers?', yes: NODUP, no: GO(3) },
        { c: 'Remove the base cover and reseat the speaker connector.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(5), proc: '1040' },
        { c: 'Inspect the audio connector for debris or damage. Then test with a known-good USB-C or Bluetooth headset.', q: 'Does audio play through the USB-C or Bluetooth headset?', yes: RP('S02', 'IOB', '1050', 'Check in the picture whether the audio connector sits on the left port board. If it is on the main logic board, replace the main logic board instead.'), no: ESCALATE },
        { ...SHIM14('audio', 'Does the factory component test fail the audio test?'), yes: RP('S01', 'SPK', '1040'), no: ESCALATE }
      ]
    },
    camera: {
      quick: [
        { t: 'Open the webcam privacy shutter.', b: 'Slide the webcam privacy shutter to uncover the camera lens.', figs: [[L + 'view-front.png', 'Front: microphones either side of the camera and privacy shutter']] },
        { t: 'Check privacy controls.', b: 'Go to Settings → Security and privacy → Privacy controls and make sure camera and microphone access are on.' },
        { t: 'Check app permissions.', b: 'In the browser, select the icon left of the address bar and allow camera and microphone for the site.' },
        { test: true, t: 'Test with the Camera app.', b: 'If the built-in Camera app works, the problem is with the other app or site.', q: 'Does the camera work in the Camera app?', yes: SOFTWARE, no: NEXT }
      ],
      deep: [
        { c: 'Open the Camera app with the privacy shutter open.', q: 'Does the Camera app show a live image?', yes: GO(3), no: GO(2) },
        { ...SHIM14('camera'), yes: GO(4), no: SOFTWARE },
        { c: 'Go to Settings → Device → Audio and watch the input level while you speak.', q: 'Does the input level move?', yes: NODUP, no: GO(5) },
        { c: 'Remove the display unit, bezel and panel. Reseat the display and camera cable at the camera board.', q: 'Does the camera work now?', yes: RESOLVED, no: RP('C01', 'CAM', '2030'), proc: '2030' },
        { c: 'Connect a known-good USB or headset microphone and watch the input level again.', q: 'Does the external microphone work?', yes: ESC('The microphones sit either side of the camera in the display, but Lenovo lists no separate microphone part, only microphone rubbers. Check Lenovo parts lookup (support.lenovo.com/partslookup) before ordering.'), no: ESCALATE }
      ]
    },
    ports: {
      deep: [
        { c: 'Inspect the failing port. Insert a plug and check for movement.', q: 'Is the port damaged, deformed or loose?', yes: GO(2), no: GO(3) },
        { c: 'Left side: USB-C power, USB-A, audio, memory card. Right side: USB-A, HDMI.', q: 'Is the failing port on the left side?', yes: RP('P11', 'IOB', '1050', 'Check in the picture that the port sits on the left port board. If it is soldered to the main logic board, replace the main logic board.'), no: RP('P14', 'MLB', '1110', 'Lenovo lists no right port board, only the right port bracket, so right-side ports are serviced with the main logic board.'), figs: [[L + 'view-left.png', 'Left side'], [L + 'view-right.png', 'Right side']] },
        { c: 'Insert a known-good USB drive into the failing port and open the Files app.', q: 'Does the drive appear in Files?', yes: GO(4), no: GO(5) },
        { c: 'For the USB-C port, test charging. For HDMI, test a known-good monitor.', q: 'Do charging and video out both work?', yes: NODUP, no: GO(5) },
        { c: 'Remove the base cover and reseat both port board cables (22-pin and 30-pin flat cables). Test the same device on every port.', q: 'Does it work on another port, or after reseating?', yes: GO(2), no: RP('M05', 'MLB', '1110'), proc: '1050' }
      ]
    },
    stability: {
      likely: 'Main logic board, battery, heat sink (this model has no fan).',
      deep: [
        { c: 'Open the Diagnostics app and run the processor and Memory tests.', q: 'Do both tests pass?', yes: GO(2), no: RP('M06', 'MLB', '1110', 'Memory is part of the main logic board.') },
        { c: 'Use the Chromebook on mains power for 15 minutes, then on battery for 15 minutes.', q: 'Does the issue happen only on battery?', yes: SYM('battery'), no: GO(3) },
        { c: 'Sign out and use Guest mode for 15 minutes with the same workload.', q: 'Does the issue also happen in Guest mode?', yes: GO(4), no: SOFTWARE },
        { c: 'Recover ChromeOS with a recovery USB (<kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd>), then retest before signing in.', q: 'Does the issue still happen after recovery?', yes: GO(5), no: RESOLVED, ref: 'recovery', warn: 'Recovery erases all local data on the Chromebook.', managed: true },
        { ...SHIM14('stress', 'Does the 10-minute stress test fail?'), yes: GO(6), no: NODUP },
        { c: 'This Chromebook is fanless and cools through the heatsink. Feel the base cover near the heatsink during the workload.', q: 'Is it unusually hot?', yes: RP('F01', 'FAN', '1120', 'The heatsink is under the main logic board, so the main logic board must come out first.'), no: RP('M07', 'MLB', '1110') }
      ]
    },
    damage: {
      quick: [
        { test: true, t: 'Turn the Chromebook off and disconnect the power adapter.', b: 'After a spill, do not turn it on or charge it until it has been inspected. Disable the built-in battery before opening it.', proc: 'disable', q: 'Is the Chromebook turned off and the power adapter disconnected?', yes: NEXT, no: { out: 'hold', head: 'Turn it off first', msg: 'Turn the Chromebook off and disconnect the power adapter before you go on.', more: ['After a spill, do not turn it on or charge it until it has been inspected. Then restart this symptom.'] } },
        { test: true, t: 'Document the damage.', b: 'Photograph every side before you open anything.', q: 'Have you photographed every side of the Chromebook?', yes: NEXT, no: { out: 'hold', head: 'Photograph the damage first', msg: 'Take photos of every side before you open anything.', more: ['You need them for warranty and insurance claims. Then restart this symptom.'] } },
        { test: true, t: 'Check what the warranty covers.', b: 'Not covered under warranty: ' + WARRANTY_EXCLUSIONS.join('; ') + '.', q: 'Is the damage covered by a warranty or an accidental damage plan?', yes: NEXT, no: NEXT }
      ],
      deep: [
        { c: 'Check for a swollen battery: a raised clickpad, a bulging base cover, or a gap between the case halves.', q: 'Is the battery swollen?', yes: RP('B02', 'BAT', '1020', 'Safety: do not charge. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Remove the base cover. Look for liquid residue, stains or corrosion on the main logic board, connectors and the underside of the keyboard.', q: 'Are there signs of liquid contact?', yes: RP('l01', 'OTH', ['1130', '1110'], 'Liquid damage is not covered under warranty. Usually the C cover with keyboard and the main logic board both need replacing.'), no: GO(3), proc: '1010' },
        { c: 'Open and close the lid through its full range.', q: 'Is a hinge broken, loose or grinding?', yes: RP('H01', 'HNG', '2050'), no: GO(4) },
        { c: 'Inspect the base cover and the display rear cover for cracks, bent corners and broken screw posts.', q: 'Is the base cover cracked or deformed?', yes: RP('H02', 'HNG', '1010', 'The base cover can be replaced by the customer or a technician. For a cracked display rear cover, replace the display rear cover instead.'), no: SYM('roadmap') }
      ]
    }
  }
};

/* ------------------------------------------------------------------ */
/* Lenovo 300e Yoga Chromebook Gen 4                                   */
/* ------------------------------------------------------------------ */
const Y = 'img/y300e/';
const NAIL = 'Use your fingernail to pull the connector to unplug it. Do not pull the cable.';

const LENOVO_300E_YOGA_G4 = {
  id: 'lenovo-300e-yoga-g4',
  name: 'Lenovo 300e Yoga Chromebook Gen 4',
  maker: 'Lenovo',
  mts: ['82W2', '82W3'],
  form: 'Convertible (360°)',
  photo: null,
  manual: {
    title: 'Lenovo 100e Chromebook Gen 4 and Lenovo 300e Yoga Chromebook Gen 4 Hardware Maintenance Manual',
    edition: 'First Edition, January 2023',
    scope: 'Only the 300e Yoga Chromebook Gen 4 procedures are used here. Steps marked “for Lenovo 100e” are left out.'
  },
  highlights: ['Keyboard comes out from the top (customer-replaceable)', 'Garaged electronic pen (selected models)', 'World-facing camera (selected models)', 'Motion sensor for tablet mode and rotation'],
  views: [],
  exploded: [
    [Y + 'fig01-exploded-system.png', 'System exploded view'],
    [Y + 'fig03-exploded-lcd.png', '300e Yoga display exploded view']
  ],
  partsTable: [
    ['1', 'Display module', 'Technician only', 'lcd-module'], ['2', 'Keyboard', 'Customer or technician', 'keyboard'], ['3', 'Upper case', 'Technician only', 'upper-case'],
    ['5', 'Wi-Fi card', 'Technician only', 'wifi-card'], ['6', 'Rear camera*', 'Technician only', 'wfc'], ['8', 'Port board bracket', 'Technician only', 'io-bracket'],
    ['10', 'Port board', 'Technician only', 'io-board'], ['12', 'Battery pack', 'Technician only', 'battery'], ['13', 'Lower case', 'Customer or technician', 'lower-case'],
    ['16', 'Speakers', 'Technician only', 'speakers'], ['17', 'Touchpad cable', 'Technician only', 'touchpad-cable'], ['18', 'Port board cable', 'Technician only', 'io-cable'],
    ['19', 'Electronic pen*', 'Customer-replaceable', 'pen'], ['20', 'Electronic pen cable*', 'Technician only', 'pen-cable'], ['21', 'Electronic pen board*', 'Technician only', 'pen-cable'],
    ['22', 'Dummy pen cap*', 'Customer-replaceable', 'pen-cap'], ['23', 'System board', 'Technician only', 'system-board'], ['25', 'Type-C bracket', 'Technician only', 'typec'],
    ['b', 'Power adapter', 'Customer-replaceable', 'adapter'], ['c', 'Power cord', 'Customer-replaceable', 'adapter'],
    ['Display 1', 'Screen panel', 'Technician only', 'lcd-panel'], ['Display 2', 'Screen bezel', 'Technician only', 'lcd-bezel'], ['Display 3', 'Camera board', 'Technician only', 'camera-board'],
    ['Display 4', 'Wi-Fi antennas', 'Technician only', 'wifi-antennas'], ['Display 5', 'Display cable', 'Technician only', 'hinges-edp'], ['Display 7', 'Hinges', 'Technician only', 'hinges-edp'],
    ['Display 8', 'Motion sensor', 'Technician only', 'g-sensor']
  ],
  procs: {
    adapter: { no: '—', name: 'Power adapter and power cord', page: '22', cru: 'Customer-replaceable',
      attention: ['Use of an incorrect power adapter is not covered under warranty.'] },
    pen: { no: 'page 30', name: 'Electronic pen', page: '30', cru: 'Customer-replaceable, selected models',
      steps: ['Place the Chromebook upside down on a flat surface.', 'Remove the electronic pen.'], figs: [[Y + 'fig04-pen.jpg', 'Remove the electronic pen']] },
    'pen-cap': { no: 'page 31', name: 'Dummy pen cap', page: '31', cru: 'Customer-replaceable, selected models',
      steps: ['Place the Chromebook upside down on a flat surface.', 'Remove the dummy pen cap.'], figs: [[Y + 'fig05-pen-cap.jpg', 'Remove the dummy pen cap']] },
    'lower-case': { no: 'page 31', name: 'Lower case', page: '31', cru: 'Customer or technician',
      steps: ['Make sure the Chromebook is shut down.', 'Place the Chromebook upside down on a flat surface.', 'Remove ten screws. Then pry up the latches and remove the lower case.'],
      screws: [['M2.5 screw, 6 millimetres long', 10]], figs: [[Y + 'fig06-lower-case.jpg', 'Remove ten screws']],
      install: ['Labels on the lower case are country specific. Apply the matching labels to a replacement lower case.'] },
    battery: { no: 'page 32', name: 'Battery pack', page: '32', access: ['lower-case'],
      steps: ['Disconnect the battery pack cable from the system board.', 'Remove four screws. Then remove the battery pack.'],
      screws: [['M2 screw, 3.5 millimetres long', 4]], attention: [NAIL], figs: [[Y + 'fig07-battery.jpg', 'Remove screws and the battery pack']] },
    keyboard: { no: 'page 33', name: 'Keyboard', page: '33', cru: 'Customer or technician',
      steps: ['Turn off the Chromebook. Pry the latches and remove the keyboard.', 'Remove the golden tape. Then disconnect the keyboard cable.'],
      figs: [[Y + 'fig08-keyboard-a.jpg', 'Pry the latches and remove the keyboard'], [Y + 'fig09-keyboard-b.jpg', 'Remove the golden tape and disconnect the keyboard cable']],
      install: ['Order the golden tape for the keyboard connector together with the keyboard.'] },
    'pen-cable': { no: 'page 34', name: 'Electronic pen cable (and pen board)', page: '34', access: ['lower-case', 'battery'],
      steps: ['Disconnect the electronic pen cable.', 'Remove the electronic pen cable.'],
      figs: [[Y + 'fig10-pen-cable-a.jpg', 'Disconnect the electronic pen cable'], [Y + 'fig11-pen-cable-b.jpg', 'Remove the electronic pen cable']] },
    speakers: { no: 'page 35', name: 'Speakers', page: '35', access: ['lower-case'],
      steps: ['Disconnect the battery pack cable from the system board.', 'Disconnect the speaker cables from the system board. Then carefully remove the speakers.'],
      attention: [NAIL], figs: [[Y + 'fig12-speakers-a.jpg', 'Disconnect the battery pack cable'], [Y + 'fig13-speakers-b.jpg', 'Remove the speakers']] },
    'io-bracket': { no: 'page 38', name: 'Port board bracket', page: '38', access: ['lower-case'],
      steps: ['Disconnect the battery pack cable from the system board. Then remove the port board aluminium foil.', 'Remove three screws. Then remove the port board bracket.'],
      screws: [['M2 screw, 3.5 millimetres long', 3]], attention: [NAIL],
      figs: [[Y + 'fig16-io-bracket-a.jpg', 'Disconnect the battery cable and remove the aluminium foil'], [Y + 'fig17-io-bracket-b.jpg', 'Remove screws and the port board bracket']] },
    'io-board': { no: 'page 39', name: 'Port board', page: '39', access: ['lower-case', 'io-bracket'],
      steps: ['Disconnect the battery pack cable and the cables of the port board from the system board. Then remove two screws and the port board.'],
      screws: [['M2 screw, 3.5 millimetres long', 2]], attention: [NAIL], figs: [[Y + 'fig18-io-board.jpg', 'Remove the port board']] },
    'io-cable': { no: 'page 39', name: 'Port board cable', page: '39', access: ['lower-case', 'battery', 'io-bracket'],
      steps: ['Disconnect the port board cable. Then remove the port board cable.'], figs: [[Y + 'fig19-io-cable.jpg', 'Disconnect and remove the port board cable']] },
    wfc: { no: 'page 40', name: 'Rear camera (world-facing camera)', page: '40', access: ['lower-case'], cru: 'Selected models',
      steps: ['Disconnect the battery pack cable and the rear camera cable from the system board. Then remove the rear camera module.', 'Remove the rear camera cable.', 'Remove the rear camera copper foil.'],
      attention: [NAIL],
      figs: [[Y + 'fig20-wfc-a.jpg', 'Disconnect cables and remove the rear camera module'], [Y + 'fig21-wfc-b.jpg', 'Remove the rear camera cable'], [Y + 'fig22-wfc-c.jpg', 'Remove the rear camera copper foil']] },
    typec: { no: 'page 43', name: 'Type-C bracket', page: '43', access: ['lower-case'],
      steps: ['Disconnect the battery pack cable from the system board. Then remove the system board aluminium foil.', 'Remove three screws. Then remove the type-C bracket.'],
      screws: [['M2 screw, 3.5 millimetres long', 3]], attention: [NAIL],
      figs: [[Y + 'fig25-typec-a.jpg', 'Disconnect the battery cable and remove the system board aluminium foil'], [Y + 'fig26-typec-b.jpg', 'Remove three screws and the type-C bracket']] },
    'touchpad-cable': { no: 'page 45', name: 'Touchpad cable', page: '45', access: ['lower-case', 'battery'],
      steps: ['Disconnect the touchpad cable from the system board. Then remove the touchpad cable.'], figs: [[Y + 'fig27-touchpad-cable.jpg', 'Disconnect and remove the touchpad cable']] },
    'wifi-card': { no: 'page 45', name: 'Wi-Fi card', page: '45', access: ['lower-case'],
      steps: ['Disconnect the battery pack cable from the system board. Then remove the Wi-Fi card clear plastic tape.', 'Disconnect the Wi-Fi antennas and remove one screw. Then remove the Wi-Fi card.'],
      screws: [['M1.6 screw, 1.7 millimetres long', 1]], attention: [NAIL],
      figs: [[Y + 'fig28-wifi-a.jpg', 'Disconnect the battery pack cable and remove the clear plastic tape'], [Y + 'fig29-wifi-b.jpg', 'Disconnect antennas and remove the Wi-Fi card']] },
    'system-board': { no: 'page 52', name: 'System board', display: 'Main logic board', page: '52', access: ['lower-case', 'wifi-card', 'typec'],
      steps: ['Disconnect the battery pack cable. Then disconnect the cables connected to the system board.', 'Remove two screws and remove the system board.'],
      screws: [['M2 screw, 3.5 millimetres long', 2]], attention: ['The system board is easily damaged by static electricity. Ground yourself or wear an anti-static wrist strap (Lenovo part number 6405959).'],
      figs: [[Y + 'fig39-system-board-a.jpg', 'Disconnect cables'], [Y + 'fig40-system-board-b.jpg', 'Remove two screws and the system board']] },
    'lcd-module': { no: 'page 53', name: 'Display module', page: '53', access: ['lower-case'],
      steps: ['Disconnect the battery pack cable from the system board.', 'Remove the Wi-Fi card clear plastic tape. Then disconnect the Wi-Fi antennas and the display cable.', 'Remove six screws and open two hinges.', 'Rotate the display module to more than 90 degrees, place the Chromebook flat as shown, then remove the display module.'],
      screws: [['M2.5 screw, 4.5 millimetres long', 6]], attention: [NAIL],
      figs: [[Y + 'fig41-lcd-module-a.jpg', 'Disconnect the battery pack cable'], [Y + 'fig42-lcd-module-b.jpg', 'Disconnect antennas and cables'], [Y + 'fig43-lcd-module-c.jpg', 'Remove six screws and open two hinges'], [Y + 'fig44-lcd-module-d.jpg', 'Remove the display module']] },
    'upper-case': { no: 'page 56', name: 'Upper case', page: '56', access: ['lower-case', 'battery', 'speakers', 'io-bracket', 'io-board', 'lcd-module', 'system-board'],
      figs: [[Y + 'fig01-exploded-system.png', 'Item 3 in the system exploded view is the upper case']] },
    'lcd-bezel': { no: 'page 57', name: 'Screen bezel', page: '57',
      steps: ['Remove the screen bezel screw mylar.', 'Remove two screws. Then remove the screen bezel.'],
      screws: [['M2 screw, 2.5 millimetres long', 2]],
      attention: ['Do not pull the screen bezel from its outer sides, or the hooks may break. The lower side of the bezel is fixed to the screen panel with adhesive tape. Detach it with care.'],
      figs: [[Y + 'fig46-bezel-a.jpg', 'Remove the screen bezel screw mylar'], [Y + 'fig47-bezel-b.jpg', 'Remove two screws and the screen bezel']] },
    'lcd-panel': { no: 'page 60', name: 'Screen panel', page: '60', access: ['lcd-bezel'],
      steps: ['Remove two screws. Then, with the bottom edge as an axis, lift the top edge of the screen panel.', 'Remove the camera board conductive tape and display cable conductive tape.', 'Remove the camera board.', 'Unplug the display cables from the back of the panel. Then remove the screen panel.'],
      screws: [['M2 screw, 2.5 millimetres long', 2]], attention: ['Do not remove the screen panel at step 1. It is still connected by a cable on the back.'],
      figs: [[Y + 'fig50-panel-a.jpg', 'Remove two screws and lift up the screen panel'], [Y + 'fig51-panel-b.jpg', 'Remove the conductive tapes'], [Y + 'fig52-panel-c.jpg', 'Remove the camera board'], [Y + 'fig53-panel-d.jpg', 'Disconnect the display cable and remove the screen panel']] },
    'camera-board': { no: 'page 60', name: 'Camera board', page: '60', access: ['lcd-bezel'],
      steps: ['Remove two screws and lift the top edge of the screen panel (do not remove the panel yet).', 'Remove the camera board conductive tape and display cable conductive tape.', 'Remove the camera board.'],
      screws: [['M2 screw, 2.5 millimetres long', 2]], figs: [[Y + 'fig51-panel-b.jpg', 'Remove the conductive tapes'], [Y + 'fig52-panel-c.jpg', 'Remove the camera board']],
      install: ['Order the camera board conductive tape with the camera board.'] },
    'hinges-edp': { no: 'page 64', name: 'Hinges and display cable', page: '64', access: ['lcd-bezel', 'lcd-panel'],
      steps: ['Remove eight screws. Then remove two hinges.', 'Remove the display cable.'], screws: [['M2 screw, 2.5 millimetres long', 8]],
      figs: [[Y + 'fig57-hinges.jpg', 'Remove screws and hinges'], [Y + 'fig58-edp.jpg', 'Remove the display cable']] },
    'wifi-antennas': { no: 'page 68', name: 'Wi-Fi antennas', page: '68', access: ['lcd-bezel', 'lcd-panel', 'hinges-edp'],
      steps: ['Remove the Wi-Fi antenna aluminium foil.', 'Remove the Wi-Fi antennas.'],
      figs: [[Y + 'fig63-antennas-a.jpg', 'Remove the Wi-Fi antenna aluminium foil'], [Y + 'fig64-antennas-b.jpg', 'Remove the Wi-Fi antennas']] },
    'g-sensor': { no: 'page 69', name: 'Motion sensor', page: '69', access: ['lcd-bezel', 'lcd-panel'],
      steps: ['Remove the motion sensor.'], figs: [[Y + 'fig65-g-sensor.jpg', 'Remove the motion sensor']] }
  },
  fru: { MLB: 'system-board', BAT: 'battery', ADP: 'adapter', IOB: 'io-board', DSP: 'lcd-panel', EDP: 'hinges-edp', KBD: 'keyboard', TPD: 'upper-case', WLN: 'wifi-card', SPK: 'speakers', CAM: 'camera-board', HNG: 'hinges-edp', FAN: 'system-board' },
  codes: { W01: 'wifi-antennas', H02: 'lower-case' },
  before: [
    'Shut down the Chromebook and unplug all power before removing any part.',
    'Almost every procedure starts by disconnecting the battery pack cable. Use your fingernail on the connector, never pull the cable.',
    'Tools listed for this model: Phillips size 1 and size 0 and Torx T5 screwdrivers, pry tool, conductive tweezers, silicone grease, acetate tape.'
  ],
  after: [
    'Retain and reuse all screws.',
    'Before powering on, shake the Chromebook gently and listen for loose screws or parts.'
  ],
  returnForm: 'Parts return form needs: technician name and phone, service date, failure date, purchase date, symptoms and error codes, part name and part number, machine type, model and serial, customer name and address.',
  sym: {
    nopower: {
      quick: [
        { t: 'Disconnect all peripherals.', b: 'Remove USB drives, docks and hubs.' },
        { t: 'Wake the battery from cutoff mode.', b: 'Connect the power adapter for at least 30 seconds, then press the power button.' },
        { t: 'Check the power adapter.', b: 'Use the power adapter for this model. An incorrect power adapter is not covered under warranty.', proc: 'adapter' },
        { t: 'Charge for 30 minutes.', b: 'Connect a known-good outlet and leave it for 30 minutes before pressing power.' },
        { t: 'Perform a hard reset.', b: 'Turn the Chromebook off. Press and hold <kbd>Refresh</kbd> + <kbd>Power</kbd> and release <kbd>Refresh</kbd> when it starts.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Connect a known-good power adapter to a known-good outlet.', q: 'Does the charging light light up?', yes: GO(2), no: GO(3) },
        { c: 'With the adapter connected, press the power button for 1–2 seconds.', q: 'Does the Chromebook turn on?', yes: GO(6), no: GO(4) },
        { c: 'Inspect all ports for debris, corrosion or bent pins. Use compressed air only.', q: 'Is a charging port damaged or deformed?', yes: RP('P11', 'IOB', 'io-board', 'Check whether the damaged port is on the port board (pictured) or on the main logic board, and replace that board.'), no: GO(4) },
        { c: 'Connect a known-good external display over USB-C, then press power.', q: 'Does an image appear on the external display?', yes: SYM('display'), no: GO(5) },
        { c: 'Remove the lower case: ten M2.5 × L6.0 screws, then pry up the latches. Disconnect the battery pack cable, wait 30 seconds and reconnect it. Refit the lower case, connect the adapter and press power.', q: 'Does the Chromebook turn on?', yes: RESOLVED, no: GO(7), proc: 'battery' },
        { c: 'Disconnect the adapter while the Chromebook is running.', q: 'Does it stay on running on battery?', yes: NODUP, no: SYM('battery') },
        { c: 'Install a known-good battery pack and press power with the adapter connected.', q: 'Does the Chromebook turn on?', yes: RP('B01', 'BAT', 'battery'), no: RP('M01', 'MLB', 'system-board'), proc: 'battery' }
      ]
    },
    battery: {
      deep: [
        { c: 'Check the lower case and touchpad for bulging. Check for cracked or bulging batteries as part of the safety inspection.', q: 'Is there any sign of a swollen battery?', yes: RP('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Connect a known-good adapter. In Diagnostics, run the Charge test.', q: 'Does the battery show “Charging” and pass the Charge test?', yes: GO(3), no: GO(4) },
        { c: 'Disconnect the adapter. In Diagnostics, run the Discharge test.', q: 'Does the Discharge test pass?', yes: NODUP, no: RP('B01', 'BAT', 'battery') },
        { c: 'Remove the lower case. Disconnect the battery pack cable with your fingernail and reconnect it firmly. Retest charging.', q: 'Does the battery charge now?', yes: RESOLVED, no: GO(5), proc: 'battery' },
        { c: 'Install a known-good battery pack and retest charging.', q: 'Does the known-good battery charge?', yes: RP('B01', 'BAT', 'battery'), no: RP('M03', 'MLB', 'system-board') }
      ]
    },
    display: {
      quick: [
        { t: 'Check brightness.', b: 'Press the brightness-up key several times.' },
        { test: true, t: 'Check for a backlight fault.', b: 'Shine a flashlight at an angle on the screen. A faint image means the panel works and the backlight does not.', q: 'Is the screen dark, but a faint image visible under the flashlight?', yes: RP('D04', 'DSP', 'lcd-panel', 'The image is there but the backlight is off. The backlight is part of the screen panel.'), no: NEXT },
        { t: 'Reset rotation.', b: 'Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Refresh</kbd> to rotate. If the screen rotates on its own or stays rotated in laptop mode, see Touchscreen, pen and rotation.' },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Inspect the display under good light for cracks, pressure marks, spots or liquid stains.', q: 'Is there visible damage to the display?', yes: RP('D01', 'DSP', 'lcd-panel', 'An screen panel cracked by excessive force or a drop is not covered under warranty.'), no: GO(2) },
        { c: 'Connect a known-good external display over USB-C.', q: 'Is the image on the external display correct?', yes: GO(3), no: RP('M04', 'MLB', 'system-board') },
        { c: 'Slowly rotate the display through its range, including tent and tablet positions, while watching the screen.', q: 'Does the symptom change with the hinge angle?', yes: RP('D02', 'EDP', 'hinges-edp', 'The display cable runs through the hinges and is replaced in the same procedure.'), no: GO(4) },
        { c: 'Remove the lower case. Disconnect the battery pack cable, then disconnect and reconnect the display cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(5), proc: 'lcd-module', figs: [[Y + 'fig42-lcd-module-b.jpg', 'Antennas and display cable at the main logic board']] },
        { c: 'Remove the screen bezel and lift the panel. Connect a known-good screen panel to the existing cables.', q: 'Does the known-good panel work correctly?', yes: RP('D01', 'DSP', 'lcd-panel'), no: GO(6), proc: 'lcd-panel' },
        { c: 'Install a known-good display cable.', q: 'Does the display work correctly now?', yes: RP('D02', 'EDP', 'hinges-edp'), no: RP('M04', 'MLB', 'system-board'), proc: 'hinges-edp' }
      ]
    },
    keyboard: {
      deep: [
        { c: 'Inspect every keycap for damage, missing caps or broken clips.', q: 'Is any keycap damaged or missing?', yes: RP('K01', 'KBD', 'keyboard', 'The keyboard can be replaced by the customer or a technician and comes out from the top. The lower case stays on.'), no: GO(2) },
        { c: 'Inspect the keyboard for liquid residue or sticky keys.', q: 'Are there signs of liquid contact?', yes: SYM('damage'), no: GO(3) },
        { c: 'Open the Diagnostics app → Input → Keyboard and press every key.', q: 'Does every key register correctly?', yes: SOFTWARE, no: GO(4) },
        { c: 'Turn off the Chromebook. Pry the latches and lift out the keyboard. Remove the golden tape, disconnect and reconnect the keyboard cable, and refit the golden tape.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('K02', 'KBD', 'keyboard', 'Replace the golden tape for the keyboard connector too.'), proc: 'keyboard' }
      ]
    },
    touchpad: {
      deep: [
        { c: 'Look at the touchpad from the side and check the lower case. A swollen battery pushes the touchpad up.', q: 'Is the touchpad raised, or is the lower case bulging?', yes: RP('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'In the Diagnostics app → Input, run the touchpad tester or draw slow circles across the whole surface.', q: 'Does tracking work across the whole surface, with tap and click?', yes: SOFTWARE, no: GO(3) },
        { c: 'Remove the lower case and battery pack. Disconnect and reconnect the touchpad cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(4), proc: 'touchpad-cable' },
        { c: 'Install a known-good touchpad cable.', q: 'Is the issue resolved?', yes: RP('T02', 'TPD', 'touchpad-cable'), no: RP('T03', 'TPD', 'upper-case', 'Lenovo lists no separate touchpad part, only the touchpad cable, so the touchpad is replaced with the upper case. That means removing nearly every other part first.'), proc: 'touchpad-cable' }
      ]
    },
    touchscreen: {
      symptoms: ['The screen does not respond to touch.', 'Parts of the screen do not respond.', 'Ghost touches.', 'The screen does not rotate, or tablet mode does not turn on when folded.', 'The garaged electronic pen does not write or is not detected (selected models).'],
      likely: 'screen panel, motion sensor, electronic pen, pen cable or pen board, power adapter (ghost touches).',
      quick: [
        { t: 'Clean the screen and remove protectors.', b: 'Wipe the screen and remove any screen protector or case.' },
        { test: true, t: 'Test without the power adapter.', b: 'An ungrounded or poor-quality adapter can cause ghost touches.', q: 'Do the ghost touches stop when the power adapter is unplugged?', yes: RP('A01', 'ADP', 'adapter', 'Try a known-good power adapter before ordering.'), no: NEXT },
        { t: 'Dock and charge the electronic pen.', b: 'On models with the garaged pen, remove the pen from the base and dock it again. Leave it docked for at least 15 seconds.', proc: 'pen', figs: [[Y + 'fig04-pen.jpg', 'The pen garage on the base']] },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Inspect the glass for cracks, especially at the edges and corners.', q: 'Is the glass cracked?', yes: RP('D03', 'DSP', 'lcd-panel', 'An screen panel cracked by excessive force or a drop is not covered under warranty.'), no: GO(2) },
        { c: 'Open the Diagnostics app → Input and run the touchscreen tester, or draw across the whole screen.', q: 'Does touch register across the whole screen?', yes: GO(3), no: GO(6) },
        { c: 'Connect the user’s power adapter and test touch again.', q: 'Do ghost touches appear only while the adapter is connected?', yes: RP('A01', 'ADP', 'adapter'), no: GO(4) },
        { c: 'Fold the Chromebook into tablet mode, then turn it to portrait and back.', q: 'Does the screen rotate, and does the keyboard turn off in tablet mode?', yes: GO(5), no: RP('G01', 'OTH', 'g-sensor', 'The motion sensor sits behind the screen panel.') },
        { c: 'On models with the garaged electronic pen, write in a notes app.', q: 'Does the pen write and get detected? (Answer Yes if the model has no pen.)', yes: NODUP, no: GO(7) },
        { c: 'Remove the screen bezel and lift the panel. Disconnect and reconnect the display cables on the back of the panel.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('D03', 'DSP', 'lcd-panel'), proc: 'lcd-panel' },
        { c: 'Try a known-good electronic pen.', q: 'Does the known-good pen work?', yes: RP('E01', 'OTH', 'pen', 'The electronic pen can be replaced by the customer.'), no: GO(8) },
        { c: 'Remove the lower case and battery pack. Disconnect and reconnect the electronic pen cable.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('E02', 'OTH', 'pen-cable', 'If a new pen cable does not fix it, replace the electronic pen board.'), proc: 'pen-cable' }
      ]
    },
    wireless: {
      deep: [
        { c: 'Open Settings → Network and Settings → Bluetooth.', q: 'Are Wi-Fi and Bluetooth listed, and can both be turned on?', yes: GO(2), no: GO(4) },
        { c: 'Connect to a known-good network and run all Connectivity tests in Diagnostics. For Bluetooth, pair with a known-good device.', q: 'Do the tests pass and does pairing succeed?', yes: GO(3), no: GO(4) },
        { c: 'Compare signal strength with a known-good device at the same spot.', q: 'Is the signal comparable to the known-good device?', yes: NODUP, no: GO(4) },
        { c: 'Remove the lower case, disconnect the battery pack cable and remove the Wi-Fi card clear plastic tape. Inspect the antenna cables and their connectors on the Wi-Fi card. The antennas run through the hinges into the display.', q: 'Are the antenna cables or connectors damaged?', yes: RP('W01', 'WLN', 'wifi-antennas', 'The Wi-Fi antennas are in the display. Remove the screen bezel, the screen panel, and the hinges and display cable first.'), no: GO(5), proc: 'wifi-card' },
        { c: 'Reseat both antenna connectors on the Wi-Fi card and refit the clear plastic tape. Retest.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('W02', 'WLN', 'wifi-card'), proc: 'wifi-card' }
      ]
    },
    audio: {
      deep: [
        { c: 'Connect known-good wired headphones and play audio.', q: 'Does audio play clearly through the headphones?', yes: GO(2), no: GO(4) },
        { c: 'Remove the headphones and play audio at 50% volume in laptop and tablet mode.', q: 'Does audio play clearly from both speakers?', yes: NODUP, no: GO(3) },
        { c: 'Remove the lower case, disconnect the battery pack cable, then disconnect and reconnect the speaker cables at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('S01', 'SPK', 'speakers'), proc: 'speakers' },
        { c: 'Inspect the headphone jack for debris or damage. Then test with a known-good USB-C or Bluetooth headset.', q: 'Does audio play through the USB-C or Bluetooth headset?', yes: RP('S02', 'IOB', 'io-board', 'Check whether the audio jack is on the port board (pictured) before ordering. If it is on the main logic board, replace the main logic board.'), no: ESCALATE }
      ]
    },
    camera: {
      symptoms: ['The front camera shows a black image or is not found.', 'The world-facing camera does not work (selected models).', 'Others cannot hear the user in calls.', 'The microphone level does not move.'],
      likely: 'Camera board, rear camera and cable, microphone.',
      deep: [
        { c: 'Open the Camera app with the privacy shutter open, using the front camera.', q: 'Does the front camera show a live image?', yes: GO(3), no: GO(2) },
        { c: 'Remove the screen bezel: screw mylar, two screws, and lift from the inner edges. Remove the two panel screws and lift the top of the panel (do not remove it yet). Reseat the camera board.', q: 'Does the front camera work now?', yes: RESOLVED, no: RP('C01', 'CAM', 'camera-board'), proc: 'camera-board' },
        { c: 'On models with a world-facing camera, switch cameras in the Camera app.', q: 'Does the world-facing camera show an image? (Answer Yes if the model has none.)', yes: GO(5), no: GO(4) },
        { c: 'Remove the lower case. Disconnect the battery pack cable, then disconnect and reconnect the rear camera cable at the main logic board.', q: 'Does the world-facing camera work now?', yes: RESOLVED, no: RP('C03', 'CAM', 'wfc'), proc: 'wfc' },
        { c: 'Go to Settings → Device → Audio and watch the input level while you speak.', q: 'Does the input level move?', yes: NODUP, no: GO(6) },
        { c: 'Connect a known-good USB or headset microphone and watch the input level again.', q: 'Does the external microphone work?', yes: ESC('Lenovo does not list a microphone part. Check Lenovo parts lookup (support.lenovo.com/partslookup) for the microphone location before ordering.'), no: ESCALATE }
      ]
    },
    ports: {
      deep: [
        { c: 'Inspect the failing port. Insert a plug and check for movement.', q: 'Is the port damaged, deformed or loose?', yes: RP('P11', 'IOB', 'io-board', 'Check whether the port is on the port board (pictured) or the main logic board and replace that board.'), no: GO(2) },
        { c: 'Insert a known-good USB drive into the failing port and open the Files app.', q: 'Does the drive appear in Files?', yes: GO(3), no: GO(4) },
        { c: 'On USB-C ports, test charging and a known-good external display.', q: 'Do charging and video out both work on this port?', yes: NODUP, no: GO(4) },
        { c: 'Test the same known-good device on every other port.', q: 'Does it work on another port?', yes: GO(5), no: RP('M05', 'MLB', 'system-board') },
        { c: 'Remove the lower case and port board bracket. Disconnect and reconnect the port board cable at both ends.', q: 'Does the failing port work now?', yes: RESOLVED, no: RP('P13', 'IOB', 'io-board', 'Check whether the failing port is on the port board (pictured). If it is on the main logic board, replace the main logic board.'), proc: 'io-cable' }
      ]
    },
    stability: {
      likely: 'Main logic board, battery (this model has no fan).',
      deep: [
        { c: 'Open the Diagnostics app and run the processor and Memory tests.', q: 'Do both tests pass?', yes: GO(2), no: RP('M06', 'MLB', 'system-board', 'Memory is part of the main logic board.') },
        { c: 'Use the Chromebook on mains power for 15 minutes, then on battery for 15 minutes.', q: 'Does the issue happen only on battery?', yes: SYM('battery'), no: GO(3) },
        { c: 'Sign out and use Guest mode for 15 minutes with the same workload.', q: 'Does the issue also happen in Guest mode?', yes: GO(4), no: SOFTWARE },
        { c: 'Recover ChromeOS with a recovery USB (<kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd>), then retest before signing in.', q: 'Does the issue still happen after recovery?', yes: RP('M07', 'MLB', 'system-board', 'Lenovo lists no fan or heatsink part, only microprocessor shielding.'), no: RESOLVED, ref: 'recovery', warn: 'Recovery erases all local data on the Chromebook.', managed: true }
      ]
    },
    damage: {
      quick: [
        { test: true, t: 'Turn the Chromebook off and disconnect the power adapter.', b: 'After a spill, do not turn it on or charge it until it has been inspected.', q: 'Is the Chromebook turned off and the power adapter disconnected?', yes: NEXT, no: { out: 'hold', head: 'Turn it off first', msg: 'Turn the Chromebook off and disconnect the power adapter before you go on.', more: ['After a spill, do not turn it on or charge it until it has been inspected. Then restart this symptom.'] } },
        { test: true, t: 'Document the damage.', b: 'Photograph every side before you open anything.', q: 'Have you photographed every side of the Chromebook?', yes: NEXT, no: { out: 'hold', head: 'Photograph the damage first', msg: 'Take photos of every side before you open anything.', more: ['You need them for warranty and insurance claims. Then restart this symptom.'] } },
        { test: true, t: 'Check what the warranty covers.', b: 'Not covered under warranty: ' + WARRANTY_EXCLUSIONS.join('; ') + '.', q: 'Is the damage covered by a warranty or an accidental damage plan?', yes: NEXT, no: NEXT }
      ],
      deep: [
        { c: 'Check for a swollen battery: a raised touchpad, a bulging lower case, or a gap between the case halves.', q: 'Is the battery swollen?', yes: RP('B02', 'BAT', 'battery', 'Safety: do not charge. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Lift out the keyboard from the top, then remove the lower case. Look for liquid residue, stains or corrosion on the main logic board, connectors and keyboard.', q: 'Are there signs of liquid contact?', yes: RP('l01', 'OTH', ['keyboard', 'system-board'], 'Liquid damage is not covered under warranty. Also check the upper case and port board.'), no: GO(3), proc: 'keyboard' },
        { c: 'Rotate the display through its full 360° range.', q: 'Is a hinge broken, loose or grinding?', yes: RP('H01', 'HNG', 'hinges-edp'), no: GO(4) },
        { c: 'Inspect the lower case and the display cover for cracks, bent corners and broken latches.', q: 'Is the lower case cracked or deformed?', yes: RP('H02', 'HNG', 'lower-case', 'The lower case can be replaced by the customer or a technician.'), no: SYM('roadmap') }
      ]
    }
  }
};

