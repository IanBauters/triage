// Chromebook troubleshooting content, structured like Apple's service-manual symptom charts:
// Symptoms -> Likely/Unlikely causes -> Quick Check (ordered steps) -> Deep Dive (numbered Yes/No checks).
// Outcome types: go (next deep-dive step), replace, resolved, nodup, software, escalate, symptom (jump to another chart).

const PARTS = {
  MLB: 'Main logic board',
  BAT: 'Battery',
  ADP: 'Power adapter / USB-C cable',
  IOB: 'Port board (USB / audio jack)',
  DSP: 'Display assembly',
  EDP: 'Display cable',
  KBD: 'Keyboard / top cover',
  TPD: 'Touchpad',
  WLN: 'Wireless card / antennas',
  SPK: 'Speakers',
  CAM: 'Camera module',
  MIC: 'Internal microphone',
  HNG: 'Hinges / housing',
  FAN: 'Fan / cooling',
  OTH: 'Other / multiple'
};

const R = (code, com, part, extra) => ({ out: 'replace', code, com, part, extra });
const GO = n => ({ go: n });
const SYM = id => ({ out: 'symptom', id });
const RESOLVED = { out: 'resolved' };
const NODUP = { out: 'nodup' };
const SOFTWARE = { out: 'software' };
const ESCALATE = { out: 'escalate' };
const NEXT = { next: true };        // test step: continue with the Quick Check
const EXTERNAL = { out: 'external' }; // the fault is in the user's own accessory
const BACKUP = { out: 'hold' };       // stop until data is backed up

const SYMPTOMS = [
  {
    id: 'roadmap', icon: 'signpost-split', title: 'General road map',
    blurb: 'Not sure where to start? Work through power, video, boot and inputs in order.',
    symptoms: ['The user’s description is vague (“it doesn’t work”, “it’s broken”).', 'More than one symptom is reported at once.', 'You want to confirm basic function before a check-in.'],
    likely: 'Determined by the road map.', unlikely: '—',
    quick: [
      { test: true, t: 'Reproduce the issue with the user.', b: 'Ask the user to show you the issue, then try to reproduce it yourself. Note exactly what happens and when.', q: 'Can you reproduce the issue?', yes: NEXT, no: NODUP },
      { t: 'Disconnect all peripherals.', b: 'Remove USB drives, memory cards, docks, hubs and headphones before testing.' }
    ],
    deep: [
      { c: 'Connect a known-good charger to a known-good outlet and press the power button.', q: 'Does the Chromebook power on? (Charging light, keyboard backlight, a sound, or any screen activity.)', yes: GO(2), no: SYM('nopower') },
      { c: 'Look at the built-in display while the Chromebook starts.', q: 'Is an image clearly visible on the built-in display?', yes: GO(3), no: SYM('display') },
      { c: 'Wait for startup to finish.', q: 'Does the Chromebook reach the ChromeOS sign-in or setup screen?', yes: GO(4), no: SYM('startup') },
      { c: 'Sign in (or use Guest mode) and use the Chromebook for at least 5 minutes: open tabs, play a video.', q: 'Does it run without freezing, restarting or shutting down?', yes: GO(5), no: SYM('stability') },
      { c: 'Open the Diagnostics app (Launcher → search “Diagnostics”) and go to Input → Keyboard. Press every key.', q: 'Does every key register correctly?', yes: GO(6), no: SYM('keyboard') },
      { c: 'Move the pointer across the full touchpad surface, then tap and click.', q: 'Do tracking, tap and click all work?', yes: GO(7), no: SYM('touchpad') },
      { c: 'Connect to a known-good Wi-Fi network and load a web page.', q: 'Does Wi-Fi connect and load pages normally?', yes: GO(8), no: SYM('wireless') },
      { c: 'Play a video with sound at 50% volume.', q: 'Does audio play clearly from the speakers?', yes: NODUP, no: SYM('audio') }
    ]
  },
  {
    id: 'nopower', icon: 'power', title: 'No power',
    blurb: 'Won’t turn on with the power button, lid or charger.',
    symptoms: ['The Chromebook does not turn on when the power button is pressed.', 'The Chromebook does not turn on when the lid is opened.', 'No charging light when the power adapter is connected.', 'No keyboard backlight, sound or screen activity.'],
    likely: 'Battery, power adapter or cable, port board, main logic board, keyboard / top cover (power button).', unlikely: 'Display assembly.',
    quick: [
      { t: 'Disconnect all peripherals.', b: 'Remove USB drives, memory cards, docks and hubs. A shorted accessory can stop the Chromebook from starting.' },
      { t: 'Wake the battery from cutoff mode.', b: 'New Chromebooks ship in battery cutoff mode, and a fully drained battery can enter it too. Connect the charger for at least 30 seconds, then press the power button.' },
      { t: 'Verify the charger.', b: 'Use the charger that came with the model, or a USB-C Power Delivery charger with at least the same wattage (often 45 watts). Inspect the adapter and cable for kinks, burn marks or bent connectors.' },
      { t: 'Charge for 30 minutes.', b: 'Connect a known-good charger to a known-good outlet and leave it for 30 minutes before pressing power. A deeply discharged battery can need time before it allows startup.' },
      { t: 'Perform a hard reset.', b: 'Turn the Chromebook off. Press and hold <kbd>Refresh</kbd> + <kbd>Power</kbd>, and release <kbd>Refresh</kbd> when the Chromebook starts.<br>Tablets and detachables: hold <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.<br>Some models use a reset pinhole on the bottom case or require disconnecting power and battery.', ref: 'hardreset' },
      { test: true, t: 'Try every charging port.', b: 'Connect the charger to each USB-C port in turn and retest. This isolates a single faulty port.', q: 'Does it charge or turn on with the charger in a different port?', yes: SYM('ports'), no: NEXT }
    ],
    deep: [
      { c: 'Connect a known-good charger and cable to a known-good outlet.', q: 'Does the charging light light up?', yes: GO(2), no: GO(3) },
      { c: 'With the charger connected, press and hold the power button for 1–2 seconds.', q: 'Does the Chromebook turn on?', yes: GO(7), no: GO(4) },
      { c: 'Inspect all charging ports for debris, corrosion, bent pins or a loose fit. Use compressed air only. <strong>Do not</strong> use metal objects to clear debris.', q: 'Is a charging port damaged or deformed?', yes: R('P11', 'IOB', 'port board', 'On models where the USB-C port is soldered to the main logic board, replace the main logic board instead.'), no: GO(4) },
      { c: 'Connect a known-good external display over USB-C or HDMI, then press power.', q: 'Does an image appear on the external display?', yes: SYM('display'), no: GO(5) },
      { c: 'Remove the bottom cover. Disconnect the battery, wait 30 seconds, reconnect it, then connect the charger and press power.', q: 'Does the Chromebook turn on?', yes: RESOLVED, no: GO(6) },
      { c: 'Install a known-good battery of the same part number, connect the charger and press power.', q: 'Does the Chromebook turn on?', yes: R('B01', 'BAT', 'battery'), no: GO(8) },
      { c: 'Disconnect the charger while the Chromebook is running.', q: 'Does it stay on running on battery?', yes: NODUP, no: SYM('battery') },
      { c: 'Inspect and reseat the keyboard / power-button flex cable on the main logic board. Press power again.', q: 'Does the Chromebook turn on?', yes: RESOLVED, no: R('M01', 'MLB', 'main logic board') }
    ]
  },
  {
    id: 'startup', icon: 'arrow-repeat', title: 'Startup issues',
    blurb: '“ChromeOS is missing or damaged”, stuck on the logo, or boot loops.',
    symptoms: ['“ChromeOS is missing or damaged” appears.', '“Please insert a recovery USB stick” appears.', 'The Chromebook stays on the logo or restarts in a loop.', 'A screen saying operating system verification is off appears at every start.', 'The screen goes black after the logo.'],
    likely: 'Main logic board (built-in storage), ChromeOS software.', unlikely: 'Display assembly, battery.',
    quick: [
      { t: 'Perform a hard reset.', b: 'Turn the Chromebook off, then hold <kbd>Refresh</kbd> + <kbd>Power</kbd> and release <kbd>Refresh</kbd> when it starts. Tablets: <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.', ref: 'hardreset' },
      { t: 'Check for Developer mode.', b: 'If a screen says operating system verification is off, the Chromebook is in Developer mode. Press <kbd>Space</kbd> (or follow the on-screen prompt) to turn verification back on.', warn: 'Turning verification back on erases all local data on the Chromebook.' },
      { t: 'Disconnect all USB devices and memory cards.', b: 'A connected drive can be picked up as a boot or recovery device.' },
      { test: true, t: 'Back up local data if the user can still sign in.', b: 'Files in the Downloads folder are stored only on the Chromebook. Anything in Google Drive is safe.', q: 'Is all local data the user needs backed up, or is there none?', yes: NEXT, no: BACKUP },
      { test: true, t: 'Check the enrollment status.', b: 'Confirm whether the device is enrolled in a school or company domain. After recovery or Powerwash, an enrolled device re-enrolls automatically if forced re-enrollment is on.', managed: true, q: 'Is the Chromebook enrolled in a school or company domain?', yes: NEXT, no: NEXT, set: 'managed' }
    ],
    deep: [
      { c: 'Start the Chromebook and read the screen.', q: 'Does it show “ChromeOS is missing or damaged” or ask for a recovery USB?', yes: GO(2), no: GO(4) },
      { c: 'On another computer, use the Chromebook Recovery Utility to create recovery media on a USB drive of 8 gigabytes or more. On the Chromebook press <kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd>, then insert the drive.', q: 'Does the recovery complete without errors?', yes: GO(3), no: GO(5), ref: 'recovery', warn: 'Recovery erases all local data on the Chromebook.', managed: true },
      { c: 'Remove the USB drive and let the Chromebook restart.', q: 'Does it reach the ChromeOS welcome screen?', yes: RESOLVED, no: R('M02', 'MLB', 'main logic board', 'Most Chromebooks have the storage soldered to the main logic board. On models with a removable storage drive, replace that drive first.') },
      { c: 'Perform a hard reset, then let the Chromebook sit on the startup screen for 5 minutes.', q: 'Does it reach the sign-in screen?', yes: RESOLVED, no: GO(2) },
      { c: 'Create the recovery media again with a different USB drive, and try a different USB port on the Chromebook.', q: 'Does the recovery complete now?', yes: GO(3), no: R('M02', 'MLB', 'main logic board', 'Most Chromebooks have the storage soldered to the main logic board. On models with a removable storage drive, replace that drive first.') }
    ]
  },
  {
    id: 'battery', icon: 'battery-half', title: 'Battery and charging',
    blurb: 'Won’t charge, charges slowly, drains fast or shuts off early.',
    symptoms: ['The battery does not charge.', 'Charging is very slow, or “Low-power charger connected” appears.', 'The battery drains much faster than expected.', 'The percentage jumps, or the Chromebook shuts off with charge left.'],
    likely: 'Battery, power adapter or cable, port board, main logic board.', unlikely: 'Display assembly, keyboard.',
    quick: [
      { t: 'Verify the charger and cable.', b: 'Use the original charger or a USB-C Power Delivery charger with at least the same wattage. “Low-power charger connected” means the charger delivers too little power for this model.' },
      { test: true, t: 'Check battery health in Diagnostics.', b: 'Open the Diagnostics app (Launcher → search “Diagnostics”). The Battery card shows health, cycle count and charge status.', ref: 'diagnostics', q: 'Is battery health 80% or higher?', yes: NEXT, no: R('B03', 'BAT', 'battery', 'Low battery health on its own may be normal wear. Check the warranty terms before ordering.') },
      { t: 'Check what is using power.', b: 'Go to Settings → Device → Power and look at battery usage. A runaway app or tab can make normal battery life look like a fault.' },
      { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates. Retest after updating before you continue.' },
      { t: 'Perform a hard reset.', b: 'This resets the embedded controller, which manages charging. Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>; tablets <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.', ref: 'hardreset' }
    ],
    deep: [
      { c: 'Check the bottom case and touchpad for bulging. A swollen battery can push the touchpad up so it no longer clicks.', q: 'Is there any sign of a swollen battery?', yes: R('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery. Store it in a fire-safe container until it is disposed of.'), no: GO(2) },
      { c: 'Connect a known-good charger. In Diagnostics, run the Charge test.', q: 'Does the battery show “Charging” and pass the Charge test?', yes: GO(3), no: GO(4) },
      { c: 'Disconnect the charger. In Diagnostics, run the Discharge test.', q: 'Does the Discharge test pass?', yes: NODUP, no: R('B01', 'BAT', 'battery') },
      { c: 'Connect the known-good charger to each USB-C port in turn.', q: 'Does the Chromebook charge on at least one port?', yes: R('P12', 'IOB', 'port board', 'Replace the board that carries the failing port. If that port is on the main logic board, replace the main logic board.'), no: GO(5) },
      { c: 'Open the Chromebook. Disconnect and reseat the battery connector, then retest charging.', q: 'Does the battery charge now?', yes: RESOLVED, no: GO(6) },
      { c: 'Install a known-good battery and retest charging.', q: 'Does the known-good battery charge?', yes: R('B01', 'BAT', 'battery'), no: R('M03', 'MLB', 'main logic board') }
    ]
  },
  {
    id: 'display', icon: 'display', title: 'Display',
    blurb: 'No image, dim, lines, flicker, cracks or dead pixels.',
    symptoms: ['No image on the built-in display while the Chromebook is on.', 'The image is very dim or only visible with a flashlight.', 'Vertical or horizontal lines.', 'The image flickers or cuts out when the lid moves.', 'Cracked glass, pressure marks or dead pixels.', 'The image is rotated or the wrong resolution.'],
    likely: 'Display assembly, display cable, main logic board.', unlikely: 'Battery, keyboard.',
    quick: [
      { t: 'Check brightness.', b: 'Press the brightness-up key several times. A display at zero brightness looks like a dead screen.' },
      { test: true, t: 'Check for a backlight fault.', b: 'Shine a flashlight at an angle on the screen. If you can see a faint image, the panel works and the backlight does not.', q: 'Is the screen dark, but a faint image visible under the flashlight?', yes: R('D04', 'DSP', 'display assembly', 'The image is there but the backlight is off. On most Chromebooks the backlight is part of the display panel.'), no: NEXT },
      { t: 'Reset rotation and resolution.', b: 'Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Refresh</kbd> to rotate the screen. Check Settings → Device → Displays for resolution, scaling and Night Light.' },
      { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>; tablets <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.', ref: 'hardreset' },
      { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates. Retest after updating.' }
    ],
    deep: [
      { c: 'Inspect the display under good light for cracks, pressure marks, spots or liquid stains.', q: 'Is there visible damage to the display?', yes: R('D01', 'DSP', 'display assembly', 'Physical damage is usually not covered by the manufacturer’s warranty.'), no: GO(2) },
      { c: 'Connect a known-good external display over USB-C or HDMI.', q: 'Is the image on the external display correct?', yes: GO(3), no: R('M04', 'MLB', 'main logic board') },
      { c: 'Slowly open and close the lid between 30° and 150° while watching the screen.', q: 'Does the symptom change with the lid angle?', yes: R('D02', 'EDP', 'display cable'), no: GO(4) },
      { c: 'Open the Chromebook. Disconnect and reseat the display cable at the main logic board and, if accessible, at the panel.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(5) },
      { c: 'Connect a known-good display panel to the existing cable.', q: 'Does the known-good panel work correctly?', yes: R('D01', 'DSP', 'display assembly'), no: GO(6) },
      { c: 'Connect a known-good display cable and the known-good panel.', q: 'Does the display work correctly now?', yes: R('D02', 'EDP', 'display cable'), no: R('M04', 'MLB', 'main logic board') }
    ]
  },
  {
    id: 'keyboard', icon: 'keyboard', title: 'Keyboard',
    blurb: 'Keys don’t respond, repeat, stick or type the wrong character.',
    symptoms: ['One or more keys do not respond.', 'A key types repeatedly.', 'Keys type the wrong character.', 'Keys feel sticky or are missing.'],
    likely: 'Keyboard / top cover, keycaps.', unlikely: 'Main logic board.',
    quick: [
      { t: 'Check the input language and layout.', b: 'Wrong characters usually mean the wrong layout. Go to Settings → Device → Keyboard and inputs → Input settings, and press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> to cycle input methods.' },
      { t: 'Check accessibility settings.', b: 'Go to Settings → Accessibility → Keyboard and text input. Turn off sticky keys and the on-screen keyboard if they are not needed.' },
      { t: 'Clean the keyboard.', b: 'Hold the Chromebook at an angle and use compressed air between the keys.' },
      { test: true, t: 'Test in Guest mode.', b: 'Sign out and choose Browse as Guest. If the keys work there, an extension or setting on the user’s profile is the cause.', q: 'Do all keys work correctly in Guest mode?', yes: SOFTWARE, no: NEXT },
      { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>. The keyboard is read by the embedded controller, which this resets.', ref: 'hardreset' }
    ],
    deep: [
      { c: 'Inspect every keycap for damage, missing caps or broken clips.', q: 'Is any keycap damaged or missing?', yes: R('K01', 'KBD', 'keycap', 'Replace only the keycap where the manufacturer sells them. Otherwise replace the keyboard / top cover.'), no: GO(2) },
      { c: 'Inspect the keyboard for liquid residue, sticky spots or corrosion.', q: 'Are there signs of liquid contact?', yes: SYM('damage'), no: GO(3) },
      { c: 'Open the Diagnostics app → Input → Keyboard and press every key.', q: 'Does every key register correctly in the tester?', yes: SOFTWARE, no: GO(4) },
      { c: 'Open the Chromebook. Disconnect and reseat the keyboard flex cable on the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: R('K02', 'KBD', 'keyboard / top cover') }
    ]
  },
  {
    id: 'touchpad', icon: 'hand-index', title: 'Touchpad',
    blurb: 'Pointer doesn’t move, jumps around, or clicks don’t register.',
    symptoms: ['The pointer does not move.', 'The pointer jumps or moves by itself.', 'The touchpad does not click, or clicks constantly.', 'Two-finger scroll or gestures do not work.'],
    likely: 'Touchpad, touchpad flex cable, battery (swelling).', unlikely: 'Keyboard, display.',
    quick: [
      { t: 'Check touchpad settings.', b: 'Go to Settings → Device → Touchpad. Check tap-to-click, speed and scrolling direction.' },
      { t: 'Clean the touchpad.', b: 'Wipe it with a slightly damp, lint-free cloth. Moisture or grease causes erratic tracking.' },
      { test: true, t: 'Test with an external mouse.', b: 'If a USB mouse works normally, ChromeOS itself is responding.', q: 'Does an external USB mouse work normally?', yes: NEXT, no: SYM('stability') },
      { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>; tablets <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.', ref: 'hardreset' }
    ],
    deep: [
      { c: 'Look at the touchpad from the side and check the bottom case. A swollen battery pushes the touchpad up so it sits proud or will not click.', q: 'Is the touchpad raised, or is the bottom case bulging?', yes: R('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
      { c: 'In the Diagnostics app → Input, run the touchpad tester (or draw slow circles across the whole surface).', q: 'Does tracking work across the whole surface, with tap and click?', yes: SOFTWARE, no: GO(3) },
      { c: 'Open the Chromebook. Disconnect and reseat the touchpad flex cable.', q: 'Is the issue resolved?', yes: RESOLVED, no: R('T01', 'TPD', 'touchpad') }
    ]
  },
  {
    id: 'touchscreen', icon: 'tablet', title: 'Touchscreen and stylus',
    blurb: 'Convertibles and tablets: no touch, ghost touches or stylus issues.',
    symptoms: ['The screen does not respond to touch.', 'Parts of the screen do not respond.', 'Touches register by themselves (ghost touches).', 'The stylus does not write or is not detected.'],
    likely: 'Display / touch assembly, display cable, power adapter (ghost touches), stylus.', unlikely: 'Keyboard, battery.',
    quick: [
      { t: 'Clean the screen and remove protectors.', b: 'Wipe the screen and remove any screen protector or case that covers the edges.' },
      { test: true, t: 'Test without the charger.', b: 'An ungrounded or poor-quality charger can cause ghost touches. Disconnect it and retest.', q: 'Do the ghost touches stop when the charger is unplugged?', yes: R('A01', 'ADP', 'power adapter', 'Try a known-good charger before ordering.'), no: NEXT },
      { t: 'Charge the stylus.', b: 'Garaged styluses charge in their slot. Leave the stylus docked for at least 15 seconds, then try again.' },
      { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>; tablets <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.', ref: 'hardreset' }
    ],
    deep: [
      { c: 'Inspect the glass for cracks, especially at the edges and corners.', q: 'Is the glass cracked?', yes: R('D03', 'DSP', 'display / touch assembly'), no: GO(2) },
      { c: 'Open the Diagnostics app → Input and run the touchscreen tester, or draw across the whole screen in a drawing app.', q: 'Does touch register across the whole screen?', yes: GO(3), no: GO(4) },
      { c: 'Connect the user’s charger and test touch again.', q: 'Do ghost touches appear only while the charger is connected?', yes: R('A01', 'ADP', 'power adapter'), no: SOFTWARE },
      { c: 'Open the Chromebook. Reseat the touch and display cables.', q: 'Is the issue resolved?', yes: RESOLVED, no: R('D03', 'DSP', 'display / touch assembly') }
    ]
  },
  {
    id: 'wireless', icon: 'wifi', title: 'Wi-Fi or Bluetooth',
    blurb: 'Can’t turn on, can’t connect, drops out or weak signal.',
    symptoms: ['Wi-Fi or Bluetooth cannot be turned on.', 'Wi-Fi is on but cannot connect to a known-good network.', 'Bluetooth cannot pair with a known-good device.', 'The connection drops intermittently.', 'Signal is weaker than on other devices in the same spot.'],
    likely: 'Wireless card, antenna cables, main logic board.', unlikely: 'Display assembly, battery.',
    quick: [
      { t: 'Check Quick Settings.', b: 'Make sure Wi-Fi and Bluetooth are on and Airplane mode is off.' },
      { t: 'Forget and rejoin the network.', b: 'Settings → Network → Wi-Fi → select the network → Forget. Then reconnect.' },
      { t: 'Check for managed network policies.', b: 'On an enrolled Chromebook, the admin may push or restrict networks. Check the user’s network against the admin console.', managed: true },
      { test: true, t: 'Run connectivity tests.', b: 'Open the Diagnostics app → Connectivity and run the network tests.', ref: 'diagnostics', q: 'Do all Connectivity tests pass on a known-good network?', yes: { out: 'nodup', extra: 'The Chromebook connects normally. Check the user’s own network or router.' }, no: NEXT },
      { t: 'Check for interference.', b: 'Fast USB devices near the hinge, microwaves and cordless phones can interfere with the 2.4 gigahertz band. Move away and retest.' },
      { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates. You may need a wired USB Ethernet adapter.' }
    ],
    deep: [
      { c: 'Open Settings → Network and Settings → Bluetooth.', q: 'Are Wi-Fi and Bluetooth listed, and can both be turned on?', yes: GO(2), no: GO(4) },
      { c: 'Connect to a known-good network and run all Connectivity tests in Diagnostics. For Bluetooth, pair with a known-good device.', q: 'Do the tests pass and does pairing succeed?', yes: GO(3), no: GO(4) },
      { c: 'Compare signal strength with a known-good device at the same spot, close to and far from the access point.', q: 'Is the signal comparable to the known-good device?', yes: NODUP, no: GO(4) },
      { c: 'Open the Chromebook. Inspect the antenna cables along their route through the hinge and their connectors.', q: 'Are the antenna cables or connectors damaged?', yes: R('W01', 'WLN', 'antenna cables', 'On many models the antennas are part of the display assembly.'), no: GO(5) },
      { c: 'Reseat the antenna connectors and, if removable, the wireless card. Retest.', q: 'Is the issue resolved?', yes: RESOLVED, no: R('W02', 'WLN', 'wireless card', 'If the wireless chip is soldered to the main logic board, replace the main logic board.') }
    ]
  },
  {
    id: 'audio', icon: 'volume-up', title: 'Speakers and headphones',
    blurb: 'No sound, distorted sound, or the headphone jack doesn’t work.',
    symptoms: ['No sound from the built-in speakers.', 'Sound is distorted, rattles or comes from one side only.', 'No sound through wired headphones.', 'Headphones are not detected.'],
    likely: 'Speakers, port board (audio jack), main logic board.', unlikely: 'Display assembly.',
    quick: [
      { t: 'Check volume and output device.', b: 'Unmute and raise the volume. In Quick Settings, open the audio settings and check the selected output device.' },
      { t: 'Disconnect Bluetooth audio.', b: 'Turn Bluetooth off so audio cannot be routed to a paired speaker or headset.' },
      { test: true, t: 'Test in a different app and in Guest mode.', b: 'Play audio in the browser and in another app. If it only fails in one app or one profile, it is a software issue.', q: 'Does audio play normally in another app or in Guest mode?', yes: SOFTWARE, no: NEXT },
      { t: 'Restart the Chromebook.', b: 'A restart resets the audio service.' }
    ],
    deep: [
      { c: 'Connect known-good wired headphones and play audio.', q: 'Does audio play clearly through the headphones?', yes: GO(2), no: GO(4) },
      { c: 'Remove the headphones and play audio at 50% volume.', q: 'Does audio play clearly from both speakers?', yes: NODUP, no: GO(3) },
      { c: 'Open the Chromebook. Reseat the speaker cable and inspect the speaker grilles for damage.', q: 'Is the issue resolved?', yes: RESOLVED, no: R('S01', 'SPK', 'speakers') },
      { c: 'Inspect the headphone jack for debris or damage. Then test with a known-good USB-C or Bluetooth headset.', q: 'Does audio play through the USB-C or Bluetooth headset?', yes: R('S02', 'IOB', 'port board (audio jack)', 'If the jack is soldered to the main logic board, replace the main logic board.'), no: ESCALATE }
    ]
  },
  {
    id: 'camera', icon: 'camera-video', title: 'Camera and microphone',
    blurb: 'Black camera image, camera not found, or the mic doesn’t pick up.',
    symptoms: ['The camera shows a black image.', '“No camera found” or the camera is not detected.', 'Others cannot hear the user in calls.', 'The microphone level does not move.'],
    likely: 'Camera module, camera cable, internal microphone.', unlikely: 'Battery, keyboard.',
    quick: [
      { t: 'Check the privacy shutter.', b: 'Many school and business models have a sliding shutter over the camera. Make sure it is open.' },
      { t: 'Check privacy controls.', b: 'Go to Settings → Security and privacy → Privacy controls and make sure camera and microphone access are on. Check the mic mute in Quick Settings.' },
      { t: 'Check app permissions.', b: 'In the browser, select the icon to the left of the address bar and allow the camera and microphone for the site.' },
      { test: true, t: 'Test with the Camera app.', b: 'Open the built-in Camera app. If it works there, the problem is with the other app or site.', q: 'Does the camera work in the Camera app?', yes: SOFTWARE, no: NEXT }
    ],
    deep: [
      { c: 'Open the Camera app with the shutter open.', q: 'Does the Camera app show a live image?', yes: GO(3), no: GO(2) },
      { c: 'Open the Chromebook and reseat the camera cable (usually routed through the display hinge).', q: 'Does the Camera app show a live image now?', yes: RESOLVED, no: R('C01', 'CAM', 'camera module', 'On many models the camera sits in the display assembly. Check with the manufacturer which part to order.') },
      { c: 'Go to Settings → Device → Audio and watch the input level while you speak.', q: 'Does the input level move?', yes: NODUP, no: GO(4) },
      { c: 'Connect a known-good USB or headset microphone and watch the input level again.', q: 'Does the external microphone work?', yes: R('C02', 'MIC', 'internal microphone', 'The microphone is often part of the camera module or display assembly.'), no: ESCALATE }
    ]
  },
  {
    id: 'ports', icon: 'usb-c', title: 'USB and ports',
    blurb: 'USB devices not detected, loose ports or no video out.',
    symptoms: ['A USB drive or device is not detected.', 'A port feels loose or the plug falls out.', 'No external display through USB-C.', 'Charging works on one port but not another.'],
    likely: 'port board, main logic board.', unlikely: 'Display assembly, battery.',
    quick: [
      { test: true, t: 'Test with a known-good device and cable.', b: 'Try another USB drive and cable. For external displays, use a USB-C cable that supports video output.', q: 'Does a known-good device and cable work in this port?', yes: EXTERNAL, no: NEXT },
      { test: true, t: 'Check the device on another computer.', b: 'Confirm the user’s accessory actually works.', q: 'Does the user’s device work on another computer?', yes: NEXT, no: EXTERNAL },
      { t: 'Inspect and clean the ports.', b: 'Check for lint, debris and bent pins. Use compressed air only. <strong>Do not</strong> use metal objects.' },
      { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>; tablets <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.', ref: 'hardreset' }
    ],
    deep: [
      { c: 'Inspect the failing port. Insert a plug and check for movement.', q: 'Is the port damaged, deformed or loose?', yes: R('P11', 'IOB', 'port board', 'If the port is soldered to the main logic board, replace the main logic board.'), no: GO(2) },
      { c: 'Insert a known-good USB drive into the failing port and open the Files app.', q: 'Does the drive appear in Files?', yes: GO(3), no: GO(4) },
      { c: 'On USB-C ports, test charging and a known-good external display.', q: 'Do charging and video out both work on this port?', yes: NODUP, no: GO(4) },
      { c: 'Test the same known-good device on every other port of the Chromebook.', q: 'Does it work on another port?', yes: R('P13', 'IOB', 'port board', 'Replace the board that carries the failing port.'), no: R('M05', 'MLB', 'main logic board') }
    ]
  },
  {
    id: 'stability', icon: 'activity', title: 'Freezes, restarts, shutdowns',
    blurb: 'Unexpected shutdowns, freezes, slowness or random restarts.',
    symptoms: ['The Chromebook freezes and needs a hard reset.', 'It restarts or shuts down without warning.', '“Your Chromebook restarted because of a problem” appears.', 'It runs hot or very slowly.'],
    likely: 'Main logic board, battery, fan / thermal (fan models only).', unlikely: 'Display assembly, keyboard.',
    quick: [
      { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates. Retest after updating.' },
      { t: 'Check the Task Manager.', b: 'Press <kbd>Search</kbd> + <kbd>Esc</kbd> to open the Task Manager. Look for tabs, extensions or Android apps using a lot of memory or processor.' },
      { test: true, t: 'Test in Guest mode.', b: 'If the issue does not happen in Guest mode, the cause is in the user’s profile: extensions, apps or settings.', q: 'Does the issue go away in Guest mode?', yes: SOFTWARE, no: NEXT },
      { t: 'Check free storage.', b: 'Settings → Device → Storage management. Very low free space slows ChromeOS down.' },
      { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>; tablets <kbd>Volume Up</kbd> + <kbd>Power</kbd> for 10 seconds.', ref: 'hardreset' },
      { t: 'Powerwash the Chromebook.', b: 'Settings → Advanced → Reset settings → Powerwash, or press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> on the sign-in screen.', warn: 'Powerwash erases all local data and accounts on the Chromebook.', ref: 'powerwash', managed: true }
    ],
    deep: [
      { c: 'Open the Diagnostics app and run the processor and Memory tests.', q: 'Do both tests pass?', yes: GO(2), no: R('M06', 'MLB', 'main logic board', 'Memory is soldered to the main logic board on almost all Chromebooks.') },
      { c: 'Use the Chromebook with the charger connected for 15 minutes, then on battery only for 15 minutes.', q: 'Does the issue happen only on battery?', yes: SYM('battery'), no: GO(3) },
      { c: 'Sign out and use Guest mode for 15 minutes with the same kind of workload.', q: 'Does the issue also happen in Guest mode?', yes: GO(4), no: SOFTWARE },
      { c: 'Recover ChromeOS with a recovery USB (<kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd>), then retest before signing in to the user’s account.', q: 'Does the issue still happen after recovery?', yes: GO(5), no: RESOLVED, ref: 'recovery', warn: 'Recovery erases all local data on the Chromebook.', managed: true },
      { c: 'Feel the bottom case near the processor during the workload. On fan models, listen to the fan.', q: 'Is it unusually hot, or is the fan silent or grinding?', yes: R('F01', 'FAN', 'fan / thermal module', 'Clean the vents and heatsink first. Most Chromebooks are fanless; if there is no fan, replace the main logic board.'), no: R('M07', 'MLB', 'main logic board') }
    ]
  },
  {
    id: 'damage', icon: 'droplet', title: 'Liquid and physical damage',
    blurb: 'Spills, drops, broken hinges, cracked housing, swollen battery.',
    symptoms: ['Liquid was spilled on the Chromebook.', 'The Chromebook was dropped.', 'A hinge is broken, loose or stiff.', 'The housing is cracked or bent.'],
    likely: 'Main logic board, keyboard / top cover, hinges / housing, battery.', unlikely: '—',
    quick: [
      { test: true, t: 'Turn the Chromebook off and disconnect the charger.', b: 'After a spill, do not turn it back on or charge it until it has been inspected.', q: 'Is the Chromebook turned off and the charger disconnected?', yes: NEXT, no: { out: 'hold', head: 'Turn it off first', msg: 'Turn the Chromebook off and disconnect the charger before you go on.', more: ['After a spill, do not turn it on or charge it until it has been inspected. Then restart this symptom.'] } },
      { test: true, t: 'Document the damage.', b: 'Take photos of every side before you open anything. You need these for warranty and insurance claims.', q: 'Have you photographed every side of the Chromebook?', yes: NEXT, no: { out: 'hold', head: 'Photograph the damage first', msg: 'Take photos of every side before you open anything.', more: ['You need them for warranty and insurance claims. Then restart this symptom.'] } },
      { test: true, t: 'Check the coverage.', b: 'Accidental damage is usually not covered by standard warranty. Check whether the device has an accidental damage plan.', q: 'Is the damage covered by a warranty or an accidental damage plan?', yes: NEXT, no: NEXT }
    ],
    deep: [
      { c: 'Check for a swollen battery: a raised touchpad, a bulging bottom case, or a gap between the case halves.', q: 'Is the battery swollen?', yes: R('B02', 'BAT', 'battery', 'Safety: do not charge. Do not puncture or press on the battery. Store it in a fire-safe container.'), no: GO(2) },
      { c: 'Open the Chromebook. Look for liquid residue, stains or corrosion on the keyboard back, main logic board and connectors.', q: 'Are there signs of liquid contact?', yes: R('L01', 'OTH', 'liquid-damaged parts', 'Liquid damage is not a manufacturing defect. Usually the keyboard / top cover and main logic board both need replacing.'), no: GO(3) },
      { c: 'Open and close the lid through its full range.', q: 'Is a hinge broken, loose or grinding?', yes: R('H01', 'HNG', 'hinges', 'Check the display cable for damage while the hinges are out.'), no: GO(4) },
      { c: 'Inspect the housing for cracks, bent corners and broken screw posts.', q: 'Is the housing cracked or deformed?', yes: R('H02', 'HNG', 'housing (cover)'), no: SYM('roadmap') }
    ]
  }
];

const REFS = {
  hardreset: { label: 'Reset your Chromebook hardware', url: 'https://support.google.com/chromebook/answer/3227606' },
  recovery: { label: 'Recover your Chromebook', url: 'https://support.google.com/chromebook/answer/1080595' },
  powerwash: { label: 'Reset your Chromebook to factory settings', url: 'https://support.google.com/chromebook/answer/183084' },
  diagnostics: { label: 'Use Diagnostics to troubleshoot', url: 'https://support.google.com/chromebook/answer/10566784' },
  hardware: { label: 'Fix hardware and system problems', url: 'https://support.google.com/chromebook/answer/6309225' }
};
