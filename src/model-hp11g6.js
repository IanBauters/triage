/* ------------------------------------------------------------------ */
/* HP Chromebook 11 G6 Education Edition                               */
/* ------------------------------------------------------------------ */
const H11 = 'img/hp11g6/';
const H11_PREP = 'Shut down the Chromebook, disconnect all external devices, then unplug the power cord from the outlet and the power adapter from the Chromebook.';
const H11_SCREEN = [['screen', 'Screen', [['bv', 'Touchscreen, glossy (BrightView)'], ['ag', 'Touchscreen, anti-glare'], ['nt', 'No touchscreen']]]];
const H11_COLOUR = [['colour', 'Colour', [['gray', 'Chalkboard gray'], ['orange', 'Delicate orange']]]];

const HP_CHROMEBOOK_11_G6_EE = {
  id: 'hp-chromebook-11-g6-ee',
  name: 'HP Chromebook 11 G6 Education Edition',
  maker: 'HP',
  mts: [],
  form: 'Clamshell',
  photo: H11 + 'view-display.png',
  idHint: 'HP has no machine type. The model, serial number, product number and warranty are on the service label on the bottom.',
  manual: { title: 'HP Chromebook 11 G6 Education Edition Maintenance and Service Guide', edition: '', scope: '' },
  highlights: ['Opens from the top: the keyboard deck comes off after eight screws on the bottom', 'Two USB-C charging ports, one on each side', 'Wi-Fi is built into the main logic board', 'Battery light: white is charged, amber is charging, off is running on battery', 'The webcam module holds the single microphone', 'Fanless: cooled by a heat sink', 'Only the power adapter is customer-replaceable'],
  views: [
    [H11 + 'view-left.png', 'Left side: security cable slot, USB-C power and charging port, USB-A port'],
    [H11 + 'view-right.png', 'Right side: headphone and microphone jack, memory card reader, USB-A port, battery light, USB-C power and charging port'],
    [H11 + 'view-display.png', 'Display: wireless antennas (hidden), camera light, camera, microphone'],
    [H11 + 'view-bottom.png', 'Bottom: speakers'],
    [H11 + 'service-label.png', 'Service label: model, serial number, product number, warranty']
  ],
  exploded: [[H11 + 'exploded-major.png', 'Main parts'], [H11 + 'exploded-display.png', 'Display parts']],
  partsTable: [
    ['1', 'Display assembly (sold only as separate display parts)', 'Technician only', 'display-panel', '—'],
    ['2', 'Keyboard and top cover (Belgium)', 'Technician only', 'top-cover', 'L14921-A41'],
    ['3a', 'Touchpad', 'Technician only', 'touchpad', 'L14922-001'],
    ['3b', 'Touchpad bracket', 'Technician only', 'touchpad', 'L18300-001'],
    ['3c', 'Touchpad cable (Cable Kit)', 'Technician only', 'touchpad-cable', 'L14906-001'],
    ['4', 'Speakers', 'Technician only', 'speakers', 'L14920-001'],
    ['5', 'Battery, 2 cell, 47 watt-hours', 'Technician only', 'battery', '917725-855'],
    ['—', 'Battery connector tape', 'Technician only', 'battery', 'L14905-001'],
    ['6a', 'USB port board', 'Technician only', 'usb-board', 'L14923-001'],
    ['6b', 'USB port board cables (Cable Kit)', 'Technician only', 'usb-cables', 'L14906-001'],
    ['6c', 'USB port board bracket', 'Technician only', 'usb-board', 'L14359-001'],
    ['7', 'System board with Wi-Fi (see the procedure for every processor, memory and storage version)', 'Technician only', 'system-board', 'L15850-001 to L15856-001'],
    ['8', 'Heat sink', 'Technician only', 'heatsink', '928840-001'],
    ['9', 'Bottom cover, chalkboard gray', 'Technician only', 'bottom-cover', 'L14901-001'],
    ['9', 'Bottom cover, delicate orange', 'Technician only', 'bottom-cover', 'L14904-001'],
    ['—', 'Rubber Foot Kit', 'Technician only', 'bottom-cover', 'L20220-001'],
    ['Display 1', 'Display bezel', 'Technician only', 'display-bezel', 'L14912-001'],
    ['Display 2', 'Webcam and microphone module', 'Technician only', 'webcam', 'L07235-001'],
    ['Display 3', 'Display panel bracket', 'Technician only', 'display-panel', 'L14913-001'],
    ['Display 4', 'Display panel, glossy touchscreen', 'Technician only', 'display-panel', 'L14918-001'],
    ['Display 4', 'Display panel, anti-glare touchscreen', 'Technician only', 'display-panel', 'L22362-001'],
    ['Display 4', 'Display panel, no touchscreen', 'Technician only', 'display-panel', 'L14917-001'],
    ['Display 5', 'Display panel cable, glossy touchscreen', 'Technician only', 'display-cable', 'L14916-001'],
    ['Display 5', 'Display panel cable, anti-glare touchscreen', 'Technician only', 'display-cable', 'L14915-001'],
    ['Display 5', 'Display panel cable, no touchscreen', 'Technician only', 'display-cable', 'L14914-001'],
    ['Display 6', 'Display hinges', 'Technician only', 'hinges', 'L14907-001'],
    ['Display 7', 'Display back cover with antennas, chalkboard gray', 'Technician only', 'back-cover', 'L14908-001'],
    ['Display 7', 'Display back cover with antennas, delicate orange', 'Technician only', 'back-cover', 'L14911-001'],
    ['—', 'Power adapter, 45 watts, USB-C', 'Customer-replaceable', 'adapter', '934739-850'],
    ['—', 'Power cord, Europe', 'Customer-replaceable', 'adapter', 'L19361-001'],
    ['—', 'Cable Kit (touchpad cable, USB port board cables, webcam cable)', 'Technician only', 'usb-cables', 'L14906-001'],
    ['—', 'Screw Kit', 'Technician only', 'top-cover', 'L14919-001']
  ],
  procs: {
    adapter: { no: '—', name: 'Power adapter and power cord', cru: 'Customer-replaceable', partNo: 'Adapter 934739-850 · Power cord (Europe) L19361-001',
      steps: ['Use the 45-watt USB-C power adapter that came with the Chromebook.', 'Either USB-C port charges the Chromebook: one on the left side, one on the right.'],
      figs: [[H11 + 'view-right.png', 'Right side: battery light (4) and USB-C port (5)'], [H11 + 'view-left.png', 'Left side: USB-C port (2)']] },
    'top-cover': { no: '—', name: 'Keyboard and top cover', partNo: 'Belgium: L14921-A41 (includes the keyboard cable)',
      steps: [H11_PREP, 'Turn the Chromebook upside down. Remove the two Phillips M2.5 screws, 8.7 millimetres long, and the six Phillips M2.5 screws, 6.6 millimetres long.', 'Turn the Chromebook right side up with the front toward you and open it.', 'Separate the front edge of the keyboard and top cover from the bottom cover with a case utility tool or a thin plastic tool.', 'Release the latch on the connector and disconnect the keyboard cable from the system board.', 'Release the latch on the connector and disconnect the touchpad cable from the system board.', 'Remove the keyboard and top cover.'],
      screws: [['M2.5 screw, 8.7 millimetres long', 2], ['M2.5 screw, 6.6 millimetres long', 6]],
      figs: [[H11 + 'bottom-cover.png', 'Screws on the bottom'], [H11 + 'topcover.png', 'Lift the front edge and disconnect the keyboard and touchpad cables']] },
    'battery-disconnect': { no: '—', name: 'Disconnect the battery', access: ['top-cover'],
      steps: ['Peel back the tape over the battery cable connector.', 'Disconnect the battery cable from the system board.'],
      figs: [[H11 + 'battery-a.png', 'Battery connector tape and cable']] },
    'touchpad-cable': { no: '—', name: 'Touchpad cable', access: ['top-cover'], partNo: 'In the Cable Kit, L14906-001',
      steps: ['Peel the touchpad cable off the top cover (it is held with double-sided tape).', 'Release the latch on the connector and disconnect the cable from the touchpad.', 'Remove the touchpad cable.'],
      figs: [[H11 + 'touchpad-cable.png', 'Touchpad cable']] },
    touchpad: { no: '—', name: 'Touchpad', access: ['top-cover'], partNo: 'L14922-001 (bracket L18300-001)',
      steps: ['Release the shielding over the top edge of the touchpad.', 'Peel the touchpad cable off the top cover.', 'Remove the three Phillips M2 screws, 2.7 millimetres long, that hold the touchpad and bracket.', 'Remove the three Phillips M2 broad-head screws, 2.2 millimetres long.', 'Remove the touchpad bracket, then the touchpad.'],
      screws: [['M2 screw, 2.7 millimetres long', 3], ['M2 broad-head screw, 2.2 millimetres long', 3]],
      figs: [[H11 + 'touchpad.png', 'Touchpad screws, bracket and touchpad']] },
    battery: { no: '—', name: 'Battery', access: ['top-cover'], partNo: '917725-855 (connector tape L14905-001)',
      steps: ['Peel back the tape over the battery cable connector.', 'Disconnect the battery cable from the system board.', 'Remove the two Phillips M2 screws, 4.1 millimetres long.', 'Remove the battery.'],
      screws: [['M2 screw, 4.1 millimetres long', 2]],
      figs: [[H11 + 'battery-a.png', 'Tape and battery cable'], [H11 + 'battery-b.png', 'Battery screws and battery']] },
    speakers: { no: '—', name: 'Speakers', access: ['top-cover', 'battery-disconnect'], partNo: 'L14920-001',
      steps: ['Disconnect the speaker cable from the system board.', 'Free the speaker cable from its channel and clips in the bottom cover.', 'Remove the three Phillips M2 screws, 4.1 millimetres long.', 'Remove the speakers.'],
      screws: [['M2 screw, 4.1 millimetres long', 3]], figs: [[H11 + 'speakers.png', 'Speaker cable, screws and speakers']] },
    'usb-cables': { no: '—', name: 'USB port board cables', access: ['top-cover', 'battery-disconnect'], partNo: 'In the Cable Kit, L14906-001',
      steps: ['Release the two latch connectors and disconnect the cables from the system board.', 'Release the two latch connectors and disconnect the cables from the USB port board.', 'Peel the cables off the bottom cover (they are held with double-sided tape) and remove them.'],
      figs: [[H11 + 'usb-cables.png', 'The two USB port board cables']] },
    'usb-board': { no: '—', name: 'USB port board', access: ['top-cover', 'battery-disconnect'], partNo: 'L14923-001 (bracket L14359-001)',
      steps: ['Release the two latch connectors and disconnect the cables from the system board.', 'Peel the cables off the bottom cover.', 'Remove the Phillips M2 screw, 4.1 millimetres long.', 'Remove the USB port board bracket, then the USB port board.'],
      screws: [['M2 screw, 4.1 millimetres long', 1]], figs: [[H11 + 'usb-board.png', 'USB port board and bracket']] },
    'system-board': { no: '—', name: 'System board', display: 'Main logic board', access: ['top-cover', 'battery-disconnect'],
      variants: { note: 'The board includes the processor, memory, storage and Wi-Fi.', fields: [['cpu', 'Processor', [['N3350', 'Intel Celeron N3350'], ['N3450', 'Intel Celeron N3450']]], ['mem', 'Memory', [['4', '4 gigabytes'], ['8', '8 gigabytes']]], ['sto', 'Storage', [['16', '16 gigabytes'], ['32', '32 gigabytes'], ['64', '64 gigabytes']]]],
        items: [{ cpu: 'N3450', mem: '8', sto: '64', pn: 'L15856-001' }, { cpu: 'N3450', mem: '8', sto: '32', pn: 'L15855-001' }, { cpu: 'N3450', mem: '4', sto: '32', pn: 'L15854-001' }, { cpu: 'N3350', mem: '8', sto: '64', pn: 'L15853-001' }, { cpu: 'N3350', mem: '8', sto: '32', pn: 'L15852-001' }, { cpu: 'N3350', mem: '4', sto: '32', pn: 'L15851-001' }, { cpu: 'N3350', mem: '4', sto: '16', pn: 'L15850-001' }] },
      steps: ['Release the two latch connectors and disconnect the USB port board cables.', 'Disconnect the webcam and microphone cable.', 'Release the adhesive strip and disconnect the display panel cable.', 'Disconnect the speaker cable.', 'Remove the six Phillips M2 screws, 4.1 millimetres long, and the system board bracket.', 'Lift the left edge of the system board until it rests at an angle, then slide it up and to the left to remove it.'],
      screws: [['M2 screw, 4.1 millimetres long', 6]],
      attention: ['Static electricity can damage the system board. Ground yourself before touching it.', 'Memory, storage and Wi-Fi are on the board and cannot be moved to the new one. Data on the old board is lost.'],
      install: ['Move the heat sink from the old system board to the new one.', 'The replacement board includes new thermal material and ChromeOS.'],
      figs: [[H11 + 'systemboard-a.png', 'Disconnect the USB port board, webcam, display and speaker cables'], [H11 + 'systemboard-b.png', 'Remove the screws and bracket, then slide the board out']] },
    heatsink: { no: '—', name: 'Heat sink', access: ['top-cover', 'battery-disconnect', 'system-board'], partNo: '928840-001 (includes thermal material)',
      steps: ['Turn the system board upside down with the front toward you.', 'Remove the two Phillips M2 broad-head screws, 2.2 millimetres long.', 'Remove the heat sink.', 'Clean all old thermal paste off the processor and the heat sink, and apply new thermal material.'],
      screws: [['M2 broad-head screw, 2.2 millimetres long', 2]],
      figs: [[H11 + 'heatsink-a.png', 'Heat sink on the underside of the board'], [H11 + 'heatsink-b.png', 'Where the thermal paste goes']] },
    'display-free': { no: '—', name: 'Disconnect the display', access: ['top-cover', 'battery-disconnect'],
      steps: ['Disconnect the antenna cables from the Wi-Fi terminals on the system board.', 'Disconnect the webcam and microphone cable and free it from its clips and channels.', 'Release the adhesive strip, disconnect the display panel cable and free it from its clips and channels.', 'Open the Chromebook as far as it goes.'],
      install: ['The antenna cable labelled 1/MAIN goes to the Main terminal, 2/AUX to the Aux terminal.'],
      figs: [[H11 + 'display-a.png', 'Antenna, webcam and display cables at the system board']] },
    'display-bezel': { no: '—', name: 'Display bezel', access: ['top-cover', 'battery-disconnect', 'display-free'], partNo: 'L14912-001',
      steps: ['Release the top edge of the bezel, then the left and right edges.', 'Release the bottom edge, then remove the bezel.'],
      attention: ['The bottom edge of the bezel has double-sided adhesive on the inside. Release it carefully to avoid injury or damage.'],
      figs: [[H11 + 'display-bezel.png', 'Release the bezel edges in order']] },
    webcam: { no: '—', name: 'Webcam and microphone module', access: ['display-bezel'], partNo: 'L07235-001 (cable in the Cable Kit, L14906-001)',
      steps: ['Peel the webcam and microphone module off the display back cover (it is held with double-sided tape).', 'Disconnect the cable from the module.', 'Remove the module.'],
      figs: [[H11 + 'webcam.png', 'Webcam and microphone module']] },
    'display-panel': { no: '—', name: 'Display panel', access: ['display-bezel'],
      variants: { fields: H11_SCREEN, items: [{ screen: 'bv', pn: 'L14918-001' }, { screen: 'ag', pn: 'L22362-001' }, { screen: 'nt', pn: 'L14917-001' }] },
      steps: ['Remove the six Phillips M2 screws, 2.8 millimetres long, that hold the panel and its bracket.', 'Remove the display panel bracket (L14913-001).', 'Lift the top edge of the panel and swing it forward until it rests face down on the keyboard.', 'Release the adhesive support strip and disconnect the display panel cable.', 'Remove the display panel.'],
      screws: [['M2 screw, 2.8 millimetres long', 6]],
      attention: ['A complete display assembly is not sold. Order the separate display parts.'],
      figs: [[H11 + 'display-panel-a.png', 'Panel screws and bracket'], [H11 + 'display-panel-b.png', 'Disconnect the display panel cable']] },
    'back-cover': { no: '—', name: 'Display back cover with antennas', access: ['display-bezel', 'display-panel'],
      variants: { fields: H11_COLOUR, items: [{ colour: 'gray', pn: 'L14908-001' }, { colour: 'orange', pn: 'L14911-001' }] },
      steps: ['Remove the six Phillips M2 broad-head screws, 2.9 millimetres long, that hold the back cover to the hinges.', 'Remove the back cover. It includes the wireless antenna cables.'],
      screws: [['M2 broad-head screw, 2.9 millimetres long', 6]], figs: [[H11 + 'back-cover.png', 'Display back cover']] },
    'display-cable': { no: '—', name: 'Display panel cable', access: ['display-bezel', 'display-panel', 'back-cover'],
      variants: { fields: H11_SCREEN, items: [{ screen: 'bv', pn: 'L14916-001' }, { screen: 'ag', pn: 'L14915-001' }, { screen: 'nt', pn: 'L14914-001' }] },
      steps: ['Peel the display panel cable off the back cover (it is held with double-sided tape).', 'Free the cable from its clips and channel, then remove it.'],
      figs: [[H11 + 'display-cable.png', 'Display panel cable routing']] },
    hinges: { no: '—', name: 'Display hinges', access: ['display-bezel', 'display-panel', 'back-cover'], partNo: 'L14907-001',
      steps: ['Remove the four Phillips M2.5 screws, 4.9 millimetres long, that hold the hinges to the bottom cover.', 'Slide the hinges toward the inside of the Chromebook to release them, then remove them.'],
      screws: [['M2.5 screw, 4.9 millimetres long', 4]], figs: [[H11 + 'hinges.png', 'Display hinges']] },
    'bottom-cover': { no: '—', name: 'Bottom cover', access: ['top-cover', 'battery', 'speakers', 'usb-board', 'system-board', 'display-free', 'hinges'],
      variants: { note: 'Rubber Foot Kit: L20220-001.', fields: H11_COLOUR, items: [{ colour: 'gray', pn: 'L14901-001' }, { colour: 'orange', pn: 'L14904-001' }] },
      figs: [[H11 + 'exploded-major.png', 'Item 9 is the bottom cover']] }
  },
  fru: { MLB: 'system-board', BAT: 'battery', ADP: 'adapter', IOB: 'usb-board', DSP: 'display-panel', EDP: 'display-cable', KBD: 'top-cover', TPD: 'touchpad', WLN: 'system-board', SPK: 'speakers', CAM: 'webcam', MIC: 'webcam', HNG: 'hinges', FAN: 'heatsink' },
  codes: { W01: 'back-cover', H02: 'bottom-cover', K01: 'top-cover' },
  before: [
    'Shut down the Chromebook, disconnect external devices, then unplug the power cord and the power adapter.',
    'Tools: a flat-bladed screwdriver, a magnetic screwdriver and Phillips size 00 and 0 screwdrivers.',
    'Up to 44 screws come out on this model. Note each screw’s size and place as you go.',
    'Handle flat cables by the connector. They tear easily.'
  ],
  after: [
    'Route every cable back into its clips and channels. A pinched cable can damage the Chromebook.',
    'Clean and replace the thermal paste whenever the heat sink has been off.'
  ],
  returnForm: 'Look up current part numbers at partsurfer.hp.com.',
  sym: {
    nopower: {
      quick: [
        { t: 'Disconnect all peripherals.', b: 'Remove USB drives, the memory card, docks and hubs.' },
        { t: 'Check the power adapter.', b: 'Use the 45-watt USB-C power adapter that came with the Chromebook. Watch the battery light on the right side.', proc: 'adapter' },
        { test: true, t: 'Try the other USB-C port.', b: 'This Chromebook has a USB-C charging port on each side. Connect the adapter to the other one.', figs: [[H11 + 'view-left.png', 'Left USB-C port (2)'], [H11 + 'view-right.png', 'Right USB-C port (5)']], q: 'Does it charge or turn on from the other USB-C port?', yes: SYM('ports'), no: NEXT },
        { t: 'Charge for 30 minutes.', b: 'Leave it connected to a known-good outlet for 30 minutes before pressing power.' },
        { t: 'Perform a hard reset.', b: 'Turn the Chromebook off. Press and hold <kbd>Refresh</kbd> + <kbd>Power</kbd> and release <kbd>Refresh</kbd> when it starts.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Connect a known-good 45-watt USB-C power adapter to the USB-C port on the right side.', q: 'Does the battery light turn amber or white?', yes: GO(2), no: GO(3), figs: [[H11 + 'view-right.png', 'Battery light (4) next to the USB-C port (5)']] },
        { c: 'Press the power button above the keyboard briefly.', q: 'Does the Chromebook turn on?', yes: GO(6), no: GO(4) },
        { c: 'Inspect both USB-C ports for debris, bent pins or a loose fit. Use compressed air only.', q: 'Is a USB-C port damaged or loose?', yes: RP('P11', 'IOB', 'usb-board', 'Check in the pictures whether the damaged port sits on the USB port board. If it is on the main logic board, replace the main logic board instead.'), no: GO(4) },
        { c: 'Connect a known-good USB-C monitor and press power.', q: 'Does an image appear on the external monitor?', yes: SYM('display'), no: GO(5) },
        { c: 'Remove the keyboard and top cover: eight screws on the bottom, then lift the front edge. Peel back the connector tape, disconnect and reconnect the battery cable, refit the top cover, connect the adapter and press power.', q: 'Does the Chromebook turn on?', yes: RESOLVED, no: GO(7), proc: 'top-cover' },
        { c: 'Disconnect the adapter while the Chromebook is running.', q: 'Does it stay on running on battery?', yes: NODUP, no: SYM('battery') },
        { c: 'Connect a known-good battery and press power with the adapter connected.', q: 'Does the Chromebook turn on?', yes: RP('B01', 'BAT', 'battery'), no: RP('M01', 'MLB', 'system-board'), proc: 'battery' }
      ]
    },
    battery: {
      quick: [
        { t: 'Use the power adapter that came with the Chromebook.', b: 'This model uses a 45-watt USB-C adapter. A weaker adapter may charge slowly or not at all.', proc: 'adapter' },
        { test: true, t: 'Read the battery light.', b: 'The battery light is on the right side. White: connected and charged. Amber: connected and charging. Off: running on battery.', figs: [[H11 + 'view-right.png', 'Battery light (4)']], q: 'With the adapter connected, is the battery light amber or white?', yes: NEXT, no: NEXT },
        { test: true, t: 'Check battery health in Diagnostics.', b: 'Open the Diagnostics app (Launcher → search “Diagnostics”). The Battery card shows health, cycle count and charge status.', ref: 'diagnostics', q: 'Is battery health 80% or higher?', yes: NEXT, no: RP('B03', 'BAT', 'battery', 'Low battery health on its own may be normal wear. Check the warranty terms before ordering.') },
        { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates.' },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Check the bottom cover and the touchpad for bulging.', q: 'Is there any sign of a swollen battery?', yes: RP('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Connect a known-good 45-watt USB-C adapter to a battery below 90%. Try both USB-C ports.', q: 'Does the battery light turn amber on either port?', yes: GO(3), no: GO(4) },
        { c: 'Disconnect the adapter. In Diagnostics, run the Discharge test.', q: 'Does the Discharge test pass?', yes: NODUP, no: RP('B01', 'BAT', 'battery') },
        { c: 'Remove the keyboard and top cover. Peel back the connector tape, disconnect and reconnect the battery cable, refit the tape and the top cover, and retest.', q: 'Does the battery light turn amber now?', yes: RESOLVED, no: GO(5), proc: 'top-cover' },
        { c: 'Connect a known-good battery and retest.', q: 'Does the known-good battery charge?', yes: RP('B01', 'BAT', 'battery'), no: RP('M03', 'MLB', 'system-board') }
      ]
    },
    display: {
      deep: [
        { c: 'Inspect the display under good light for cracks, pressure marks, spots or liquid stains.', q: 'Is there visible damage to the display?', yes: RP('D01', 'DSP', 'display-panel', 'Choose the panel type below. It must match the original: glossy touchscreen, anti-glare touchscreen or no touchscreen.'), no: GO(2) },
        { c: 'Connect a known-good USB-C monitor to either USB-C port.', q: 'Is the image on the external monitor correct?', yes: GO(3), no: RP('M04', 'MLB', 'system-board') },
        { c: 'Slowly open and close the lid between 30° and 150° while watching the screen.', q: 'Does the symptom change with the lid angle?', yes: RP('D02', 'EDP', 'display-cable'), no: GO(4) },
        { c: 'Remove the keyboard and top cover and disconnect the battery. Release the adhesive strip, then disconnect and reconnect the display panel cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(5), proc: 'display-free' },
        { c: 'Remove the display bezel and connect a known-good display panel of the same type.', q: 'Does the known-good panel work correctly?', yes: RP('D01', 'DSP', 'display-panel'), no: GO(6), proc: 'display-panel' },
        { c: 'Install a known-good display panel cable of the same type.', q: 'Does the display work correctly now?', yes: RP('D02', 'EDP', 'display-cable'), no: RP('M04', 'MLB', 'system-board'), proc: 'display-cable' }
      ]
    },
    keyboard: {
      deep: [
        { c: 'Inspect every keycap for damage, missing caps or broken clips.', q: 'Is any keycap damaged or missing?', yes: RP('K01', 'KBD', 'top-cover', 'Keycaps are not sold separately; the keyboard comes with the top cover. Order the Belgian layout (L14921-A41) or the layout on the original.'), no: GO(2) },
        { c: 'Inspect the keyboard for liquid residue or sticky keys.', q: 'Are there signs of liquid contact?', yes: SYM('damage'), no: GO(3) },
        { c: 'Open the Diagnostics app → Input → Keyboard and press every key.', q: 'Does every key register correctly?', yes: SOFTWARE, no: GO(4) },
        { c: 'Remove the eight screws on the bottom and lift the front edge of the top cover. Release the latch and reconnect the keyboard cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('K02', 'KBD', 'top-cover'), proc: 'top-cover' }
      ]
    },
    touchpad: {
      deep: [
        { c: 'Look at the touchpad from the side and check the bottom cover. A swollen battery pushes the touchpad up.', q: 'Is the touchpad raised, or is the bottom cover bulging?', yes: RP('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'In the Diagnostics app → Input, run the touchpad tester or draw slow circles across the whole surface.', q: 'Does tracking work across the whole surface, with tap and click?', yes: SOFTWARE, no: GO(3) },
        { c: 'Lift the top cover. Release the latch and reconnect the touchpad cable at both ends: the main logic board and the touchpad.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(4), proc: 'touchpad-cable' },
        { c: 'Install a known-good touchpad cable from the Cable Kit.', q: 'Is the issue resolved?', yes: RP('T02', 'TPD', 'touchpad-cable'), no: RP('T01', 'TPD', 'touchpad'), proc: 'touchpad-cable' }
      ]
    },
    wireless: {
      deep: [
        { c: 'Open Settings → Network and Settings → Bluetooth.', q: 'Are Wi-Fi and Bluetooth listed, and can both be turned on?', yes: GO(2), no: RP('W02', 'WLN', 'system-board', 'Wi-Fi and Bluetooth are built into the main logic board on this model.') },
        { c: 'Connect to a known-good network and pair a known-good Bluetooth device.', q: 'Does the connection work and does pairing succeed?', yes: GO(3), no: GO(4) },
        { c: 'Compare signal strength with a known-good device at the same spot.', q: 'Is the signal comparable to the known-good device?', yes: NODUP, no: GO(4) },
        { c: 'Remove the keyboard and top cover and disconnect the battery. Inspect the antenna cables at the Wi-Fi terminals on the main logic board. The antennas are built into the display back cover.', q: 'Are the antenna cables or connectors damaged?', yes: RP('W01', 'WLN', 'back-cover', 'The antennas come with the display back cover. Choose the colour to match.'), no: GO(5), proc: 'display-free' },
        { c: 'Reconnect the antennas: the cable labelled 1/MAIN to the Main terminal, 2/AUX to the Aux terminal. Retest.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('W02', 'WLN', 'system-board', 'Wi-Fi and Bluetooth are built into the main logic board on this model.'), proc: 'display-free' }
      ]
    },
    audio: {
      quick: [
        { t: 'Unplug anything from the headphone jack.', b: 'The speakers turn off whenever something is connected to the headphone and microphone jack on the right side.', figs: [[H11 + 'view-right.png', 'Headphone and microphone jack (1)']] },
        { t: 'Check volume and output device.', b: 'Unmute and raise the volume. In Quick Settings, open the audio settings and check the selected output device.' },
        { t: 'Disconnect Bluetooth audio.', b: 'Turn Bluetooth off so audio cannot go to a paired speaker or headset.' },
        { t: 'Restart the Chromebook.', b: 'A restart resets the audio service.' }
      ],
      deep: [
        { c: 'Connect known-good wired headphones with a four-contact plug to the jack on the right side and play audio.', q: 'Does audio play clearly through the headphones?', yes: GO(2), no: GO(4) },
        { c: 'Remove the headphones and play audio at 50% volume. The speakers are on the bottom of the Chromebook.', q: 'Does audio play clearly from both speakers?', yes: NODUP, no: GO(3) },
        { c: 'Remove the keyboard and top cover, disconnect the battery, then disconnect and reconnect the speaker cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('S01', 'SPK', 'speakers'), proc: 'speakers' },
        { c: 'Inspect the jack for debris or damage. Then test with a known-good USB-C or Bluetooth headset.', q: 'Does audio play through the USB-C or Bluetooth headset?', yes: RP('S02', 'IOB', 'usb-board', 'Check in the pictures whether the headphone jack sits on the USB port board. If it is on the main logic board, replace the main logic board instead.'), no: ESCALATE }
      ]
    },
    camera: {
      quick: [
        { t: 'Check privacy controls.', b: 'Go to Settings → Security and privacy → Privacy controls and make sure camera and microphone access are on.' },
        { t: 'Check app permissions.', b: 'In the browser, select the icon left of the address bar and allow camera and microphone for the site.' },
        { test: true, t: 'Test with the Camera app.', b: 'Open the built-in Camera app. The camera light above the screen turns on when the camera is in use.', figs: [[H11 + 'view-display.png', 'Camera light (2), camera (3), microphone (4)']], q: 'Does the camera work in the Camera app?', yes: SOFTWARE, no: NEXT }
      ],
      deep: [
        { c: 'Open the Camera app.', q: 'Does the Camera app show a live image, and does the camera light turn on?', yes: GO(3), no: GO(2) },
        { c: 'Remove the keyboard and top cover and disconnect the battery. Disconnect and reconnect the webcam and microphone cable at the main logic board.', q: 'Does the camera work now?', yes: RESOLVED, no: RP('C01', 'CAM', 'webcam'), proc: 'display-free' },
        { c: 'Go to Settings → Device → Audio and watch the input level while you speak. The microphone is next to the camera.', q: 'Does the input level move?', yes: NODUP, no: GO(4) },
        { c: 'Connect a known-good headset with a microphone (four-contact plug) to the jack on the right side and watch the input level.', q: 'Does the headset microphone work?', yes: RP('C02', 'MIC', 'webcam', 'On this model the microphone is part of the webcam and microphone module.'), no: ESCALATE }
      ]
    },
    ports: {
      deep: [
        { c: 'Inspect the failing port. Insert a plug and check for movement.', q: 'Is the port damaged, deformed or loose?', yes: RP('P11', 'IOB', 'usb-board', 'Check in the pictures whether the port sits on the USB port board. If it is on the main logic board, replace the main logic board instead.'), no: GO(2) },
        { c: 'Insert a known-good USB drive into the failing port and open the Files app.', q: 'Does the drive appear in Files?', yes: GO(3), no: GO(4) },
        { c: 'For a USB-C port, test charging and a known-good USB-C monitor.', q: 'Do charging and video out work on this port?', yes: NODUP, no: GO(4) },
        { c: 'Remove the keyboard and top cover and disconnect the battery. Release the latches and reconnect both USB port board cables at each end. Retest the port.', q: 'Does the port work now?', yes: RESOLVED, no: RP('M05', 'MLB', 'system-board', 'If the failing port sits on the USB port board, replace the USB port board first.'), proc: 'usb-cables' }
      ]
    },
    stability: {
      likely: 'Main logic board, battery, heat sink and thermal paste (this model has no fan).',
      deep: [
        { c: 'Open the Diagnostics app and run the processor and memory tests.', q: 'Do both tests pass?', yes: GO(2), no: RP('M06', 'MLB', 'system-board', 'Memory is part of the main logic board on this model.') },
        { c: 'Use the Chromebook on mains power for 15 minutes, then on battery for 15 minutes.', q: 'Does the issue happen only on battery?', yes: SYM('battery'), no: GO(3) },
        { c: 'Sign out and use Guest mode for 15 minutes with the same workload.', q: 'Does the issue also happen in Guest mode?', yes: GO(4), no: SOFTWARE },
        { c: 'Recover ChromeOS with recovery media (<kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd>), then retest before signing in.', q: 'Does the issue still happen after recovery?', yes: GO(5), no: RESOLVED, ref: 'recovery', warn: 'Recovery deletes all local files and saved networks.', managed: true },
        { c: 'This Chromebook has no fan; a heat sink cools the processor. Feel the keyboard deck during the workload.', q: 'Is it unusually hot?', yes: RP('F01', 'FAN', 'heatsink', 'First clean and replace the thermal paste between the heat sink and the processor.'), no: RP('M07', 'MLB', 'system-board') }
      ]
    },
    damage: {
      quick: [
        { test: true, t: 'Turn the Chromebook off and disconnect the power adapter.', b: 'After a spill, do not turn it on or charge it until it has been inspected.', q: 'Is the Chromebook turned off and the power adapter disconnected?', yes: NEXT, no: { out: 'hold', head: 'Turn it off first', msg: 'Turn the Chromebook off and disconnect the power adapter before you go on.', more: ['After a spill, do not turn it on or charge it until it has been inspected. Then restart this symptom.'] } },
        { test: true, t: 'Document the damage.', b: 'Photograph every side before you open anything. The service label on the bottom shows the warranty period.', q: 'Have you photographed every side of the Chromebook?', yes: NEXT, no: { out: 'hold', head: 'Photograph the damage first', msg: 'Take photos of every side before you open anything.', more: ['You need them for warranty and insurance claims. Then restart this symptom.'] } },
        { test: true, t: 'Check the coverage.', b: 'Accidental damage is usually not covered by the standard warranty. Check whether the device has an accidental damage plan.', q: 'Is the damage covered by a warranty or an accidental damage plan?', yes: NEXT, no: NEXT }
      ],
      deep: [
        { c: 'Check for a swollen battery: a raised touchpad, a bulging bottom cover, or a gap between the top cover and the bottom cover.', q: 'Is the battery swollen?', yes: RP('B02', 'BAT', 'battery', 'Safety: do not charge. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Remove the keyboard and top cover. Look for liquid residue, stains or corrosion on the main logic board, the connectors and the underside of the top cover.', q: 'Are there signs of liquid contact?', yes: RP('L01', 'OTH', ['top-cover', 'system-board'], 'Liquid damage is usually not covered. The keyboard and top cover and the main logic board often both need replacing.'), no: GO(3), proc: 'top-cover' },
        { c: 'Open and close the lid through its full range.', q: 'Is a hinge broken, loose or grinding?', yes: RP('H01', 'HNG', 'hinges'), no: GO(4) },
        { c: 'Inspect the bottom cover and the display back cover for cracks, bent corners and broken screw posts.', q: 'Is the bottom cover cracked or deformed?', yes: RP('H02', 'HNG', 'bottom-cover', 'For a cracked display back cover, replace the display back cover instead. Choose the colour to match.'), no: SYM('roadmap') }
      ]
    }
  }
};
