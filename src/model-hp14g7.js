/* ------------------------------------------------------------------ */
/* HP Chromebook 14 G7                                                 */
/* ------------------------------------------------------------------ */
const H = 'img/hp14g7/';
const HP_PREP = 'Shut down the Chromebook and disconnect the power adapter before you start.';

const HP_CHROMEBOOK_14_G7 = {
  id: 'hp-chromebook-14-g7',
  name: 'HP Chromebook 14 G7',
  maker: 'HP',
  mts: [],
  form: 'Clamshell',
  photo: H + 'view-display.png',
  idHint: 'HP has no machine type. The model, serial number and warranty are on the service tag on the bottom.',
  manual: { title: 'HP Chromebook 14 G7 Maintenance and Service Guide', edition: 'First Edition, March 2021', scope: '' },
  highlights: ['Opens from the top: the keyboard deck comes off first', 'Battery light: white is full, amber is charging, off is not charging', 'Microphones are in the webcam module', 'Fanless: cooled by a heat sink', 'Only the power adapter is customer-replaceable'],
  views: [
    [H + 'view-right.png', 'Right side: headphone and microphone jack, memory card reader, USB-A port, battery light, USB-C power and data port'],
    [H + 'view-left.png', 'Left side: security cable slot, HDMI port, USB-A port'],
    [H + 'view-display.png', 'Display: wireless antennas (hidden), two microphones, camera, camera privacy cover, camera light'],
    [H + 'view-speakers-power.png', 'Speakers and power key']
  ],
  exploded: [
    [H + 'exploded-major.png', 'Main parts'],
    [H + 'exploded-display.png', 'Display parts'],
    [H + 'cables.png', 'Cables (all in the Cable Kit, L90412-001)']
  ],
  partsTable: [
    ['1', 'Display assembly (sold only as separate display parts)', 'Technician only', 'display-panel', '—'],
    ['2', 'Top cover with keyboard, backlit (Belgium)', 'Technician only', 'top-cover', 'M47208-A41'],
    ['2', 'Top cover with keyboard, not backlit (Belgium)', 'Technician only', 'top-cover', 'M47207-A41'],
    ['3a', 'Touchpad', 'Technician only', 'touchpad', 'M47198-001'],
    ['3b', 'Touchpad bracket (Bracket Kit)', 'Technician only', 'touchpad', 'L90436-001'],
    ['3c', 'Touchpad cable (Cable Kit)', 'Technician only', 'touchpad-cable', 'L90412-001'],
    ['4', 'Speakers, left and right', 'Technician only', 'speakers', 'L90434-001'],
    ['5a', 'Connector board (HDMI and USB port)', 'Technician only', 'connector-board', 'M47195-001'],
    ['5b', 'Connector board cables (Cable Kit)', 'Technician only', 'connector-cables', 'L90412-001'],
    ['6a', 'Sensor board', 'Technician only', 'sensor-board', 'M47194-001'],
    ['6b', 'Sensor board cable (Cable Kit)', 'Technician only', 'sensor-cable', 'L90412-001'],
    ['7a', 'Wireless card, Wi-Fi 6 and Bluetooth', 'Technician only', 'wlan', 'L92724-005'],
    ['7b', 'Wireless card bracket', 'Technician only', 'wlan', 'M00451-001'],
    ['8', 'System board (see the procedure for every processor, memory and storage version)', 'Technician only', 'system-board', 'M47179-001 to M47188-001'],
    ['9', 'Heat sink', 'Technician only', 'heatsink', 'M47196-001'],
    ['10a', 'Battery shield', 'Technician only', 'battery', 'M00450-001'],
    ['10b', 'Battery, 2 cell, 47 watt-hours', 'Technician only', 'battery', 'L75783-005'],
    ['11', 'Base enclosure', 'Technician only', 'base', 'M47197-001'],
    ['Display 1', 'Display bezel', 'Technician only', 'display-bezel', 'M01026-001'],
    ['Display 2', 'Display hinge cover', 'Technician only', 'display-bezel', 'M47203-001'],
    ['Display 3', 'Display bracket', 'Technician only', 'display-panel', 'L90417-001'],
    ['Display 4', 'Display panel, touchscreen, 1920 × 1080', 'Technician only', 'display-panel', 'M47191-001'],
    ['Display 4', 'Display panel, no touchscreen, 1920 × 1080', 'Technician only', 'display-panel', 'M47190-001'],
    ['Display 4', 'Display panel, touchscreen, 1366 × 768', 'Technician only', 'display-panel', 'M47193-001'],
    ['Display 4', 'Display panel, no touchscreen, 1366 × 768', 'Technician only', 'display-panel', 'M47192-001'],
    ['Display 5', 'Display panel cable, touchscreen models', 'Technician only', 'display-cable', 'M47201-001'],
    ['Display 5', 'Display panel cable, models without touchscreen', 'Technician only', 'display-cable', 'M47202-001'],
    ['Display 6', 'Display hinges, left and right', 'Technician only', 'hinges', 'L90143-001'],
    ['Display 7', 'Webcam and microphone module', 'Technician only', 'webcam', 'M47204-001'],
    ['Display 9', 'Display back cover with wireless antennas', 'Technician only', 'back-cover', 'M47199-001'],
    ['—', 'Power adapter, 45 watts, USB-C', 'Customer-replaceable', 'adapter', 'L43407-001'],
    ['—', 'Power cord, Europe', 'Customer-replaceable', 'adapter', 'L19361-001'],
    ['—', 'Cable Kit (all internal cables and display bezel tape)', 'Technician only', 'connector-cables', 'L90412-001'],
    ['—', 'Thermal Material Kit', 'Technician only', 'heatsink', 'M47379-001'],
    ['—', 'Screw Kit', 'Technician only', 'top-cover', 'M47206-001']
  ],
  procs: {
    adapter: { no: '—', name: 'Power adapter and power cord', cru: 'Customer-replaceable',
      steps: ['Use the 45-watt USB-C power adapter that came with the Chromebook (part number L43407-001).', 'Connect it to the USB-C power port on the right side.'],
      figs: [[H + 'view-right.png', 'The USB-C power port is the rightmost port; the battery light is next to it']] },
    'top-cover': { no: '—', name: 'Top cover with keyboard', variants: { note: 'Belgian keyboard layout. Other countries: see the parts list.', fields: [['light', 'Backlit keyboard', [['yes', 'Yes'], ['no', 'No']]]], items: [{ light: 'yes', pn: 'M47208-A41' }, { light: 'no', pn: 'M47207-A41' }] },
      steps: [
        HP_PREP,
        'Turn the Chromebook upside down with the front toward you.',
        'Remove the two Phillips M2.5 screws, 8.6 millimetres long, and the six Phillips M2.5 screws, 7.2 millimetres long, that hold the top cover to the base enclosure.',
        'Open the Chromebook and rest it on the display back cover.',
        'Insert a keyboard removal tool into the rear screw holes and press until the rear edge of the top cover comes loose from the base enclosure.',
        'Set the Chromebook flat on its base again. Swing the rear edge of the top cover up and away as far as the cables allow.',
        'Release the latch on each connector, then disconnect the touchpad cable, the keyboard cable and the keyboard backlight cable from the system board.',
        'Remove the top cover with keyboard.',
        'Each time the top cover comes off, check the thermal material on the system board and on the underside of the top cover, and replace it if needed.'
      ],
      screws: [['M2.5 screw, 8.6 millimetres long', 2], ['M2.5 screw, 7.2 millimetres long', 6]],
      install: ['Reverse the steps. The replacement top cover and system board come with new thermal material.'],
      figs: [[H + 'topcover-a.png', 'Screws on the bottom'], [H + 'topcover-b.png', 'Keyboard removal tool in the rear screw holes'], [H + 'topcover-c.png', 'Swing the top cover up and disconnect the three cables'], [H + 'topcover-d.png', 'Thermal material on the system board and on the top cover']] },
    'battery-disconnect': { no: '—', name: 'Disconnect the battery', access: ['top-cover'],
      steps: ['Disconnect the battery cable from the system board.'], figs: [[H + 'battery.png', 'The battery cable connector is marked 1']] },
    'touchpad-cable': { no: '—', name: 'Touchpad cable', access: ['top-cover'], partNo: 'In the Cable Kit, L90412-001',
      steps: ['Place the top cover upside down with the front toward you.', 'Peel the touchpad cable off the top cover (it is held with double-sided tape).', 'Peel off the clear shield over the touchpad connector.', 'Release the latch on the connector and disconnect the touchpad cable from the touchpad.', 'Remove the touchpad cable.'],
      figs: [[H + 'touchpad-cable.png', 'Touchpad cable on the underside of the top cover']] },
    touchpad: { no: '—', name: 'Touchpad', access: ['top-cover'], partNo: 'M47198-001 (bracket: L90436-001, cable: L90412-001)',
      steps: ['Place the top cover upside down with the front toward you.', 'Peel the touchpad cable off the top cover.', 'Peel off the clear shield over the touchpad screws.', 'Remove the three Phillips M2 broad-head screws, 2.2 millimetres long.', 'Remove the four Phillips M2 screws, 2.5 millimetres long, that hold the touchpad bracket.', 'Remove the touchpad bracket, then the touchpad.'],
      screws: [['M2 broad-head screw, 2.2 millimetres long', 3], ['M2 screw, 2.5 millimetres long', 4]],
      figs: [[H + 'touchpad.png', 'Touchpad screws, bracket and touchpad']] },
    battery: { no: '—', name: 'Battery', access: ['top-cover'], partNo: 'L75783-005 (shield: M00450-001)',
      steps: ['Disconnect the battery cable from the system board.', 'Remove the four Phillips M2 screws, 4.2 millimetres long.', 'Remove the battery shield.', 'Remove the battery.'],
      screws: [['M2 screw, 4.2 millimetres long', 4]], figs: [[H + 'battery.png', 'Battery cable, screws, shield and battery']] },
    wlan: { no: '—', name: 'Wireless card', access: ['top-cover', 'battery-disconnect'], partNo: 'L92724-005 (bracket: M00451-001)',
      steps: ['Remove the Phillips M2 broad-head screw, 2.3 millimetres long, that holds the wireless card bracket.', 'Remove the wireless card bracket.', 'Carefully disconnect the antenna cables from the wireless card.', 'Remove the Phillips M2 screw, 2.9 millimetres long, then remove the wireless card.', 'If an antenna cable stays disconnected, put a protective sleeve over its connector.'],
      screws: [['M2 broad-head screw, 2.3 millimetres long', 1], ['M2 screw, 2.9 millimetres long', 1]],
      attention: ['Only use a wireless card approved for this Chromebook in your country. An unapproved card can stop the Chromebook from working; remove it and contact support if a warning appears.'],
      install: ['On models with two antennas: the white cable (number 1) goes to the Main terminal, the black cable (number 2) to the Aux terminal.'],
      figs: [[H + 'wlan.png', 'Wireless card bracket, antenna cables and card'], [H + 'wlan-sleeve.png', 'Protective sleeve on an unused antenna connector']] },
    speakers: { no: '—', name: 'Speakers', access: ['top-cover', 'battery-disconnect'], partNo: 'L90434-001',
      steps: ['Disconnect the speaker cable from the system board.', 'Remove the three Phillips M2 screws, 4.2 millimetres long.', 'Remove the speakers.'],
      screws: [['M2 screw, 4.2 millimetres long', 3]], figs: [[H + 'speakers.png', 'Speaker cable, screws and speakers']] },
    'connector-cables': { no: '—', name: 'Connector board cables', access: ['top-cover', 'battery-disconnect'], partNo: 'In the Cable Kit, L90412-001',
      steps: ['Release the latches and disconnect both connector board cables from the system board.', 'Release the latches and disconnect both cables from the connector board.', 'Remove the cables.'],
      figs: [[H + 'connector-cables.png', 'The two connector board cables']] },
    'connector-board': { no: '—', name: 'Connector board (HDMI and USB port)', access: ['top-cover', 'battery-disconnect'], partNo: 'M47195-001',
      steps: ['Release the latch and disconnect the connector board cables from the system board.', 'Release the latch and disconnect the sensor board cable from the connector board.', 'Remove the two Phillips M2 screws, 4.2 millimetres long.', 'Remove the connector board.'],
      screws: [['M2 screw, 4.2 millimetres long', 2]], figs: [[H + 'connector-board.png', 'Connector board on the left side']] },
    'sensor-cable': { no: '—', name: 'Sensor board cable', access: ['top-cover', 'battery-disconnect'], partNo: 'In the Cable Kit, L90412-001',
      steps: ['Release the latch and disconnect the sensor board cable from the connector board.', 'Release the latch and disconnect it from the sensor board.', 'Remove the cable.'],
      figs: [[H + 'sensor-cable.png', 'Sensor board cable']] },
    'sensor-board': { no: '—', name: 'Sensor board', access: ['top-cover', 'battery-disconnect'], partNo: 'M47194-001',
      steps: ['Release the latch and disconnect the sensor board cable from the connector board.', 'Remove the sensor board.'],
      figs: [[H + 'sensor-board.png', 'Sensor board']] },
    'system-board': { no: '—', name: 'System board', display: 'Main logic board', access: ['top-cover', 'battery-disconnect', 'wlan', 'speakers'],
      variants: { fields: [['cpu', 'Processor', [['N4500', 'Intel Celeron N4500'], ['N5100', 'Intel Celeron N5100']]], ['mem', 'Memory', [['4', '4 gigabytes'], ['8', '8 gigabytes']]], ['sto', 'Storage', [['32', '32 gigabytes'], ['64', '64 gigabytes'], ['128', '128 gigabytes']]]], items: [{ cpu: 'N5100', mem: '8', sto: '64', pn: 'M47188-001' }, { cpu: 'N5100', mem: '8', sto: '32', pn: 'M47186-001' }, { cpu: 'N5100', mem: '4', sto: '32', pn: 'M47185-001' }, { cpu: 'N5100', mem: '4', sto: '64', pn: 'M47184-001' }, { cpu: 'N4500', mem: '8', sto: '128', pn: 'M47181-001' }, { cpu: 'N4500', mem: '8', sto: '64', pn: 'M47183-001' }, { cpu: 'N4500', mem: '8', sto: '32', pn: 'M47182-001' }, { cpu: 'N4500', mem: '4', sto: '64', pn: 'M47180-001' }, { cpu: 'N4500', mem: '4', sto: '32', pn: 'M47179-001' }] },
      steps: ['Disconnect the webcam and microphone cable from the system board.', 'Disconnect the display panel cable from the system board.', 'Release the latches and disconnect both connector board cables from the system board.', 'Remove the six Phillips M2 screws, 4.2 millimetres long. Note where the port bracket sits.', 'Lift the left side of the system board until it rests at an angle.', 'Slide the system board up and to the left to remove it.'],
      screws: [['M2 screw, 4.2 millimetres long', 6]],
      attention: ['Static electricity can damage the system board. Ground yourself before touching it.', 'Memory and storage are soldered on and cannot be moved to the new board. Data on the old board is lost.'],
      install: ['The replacement system board includes new thermal material and ChromeOS.'],
      figs: [[H + 'systemboard-a.png', 'Disconnect the webcam, display and connector board cables'], [H + 'systemboard-b.png', 'Remove the six screws'], [H + 'systemboard-c.png', 'Lift the left side and slide the board out']] },
    heatsink: { no: '—', name: 'Heat sink', access: ['top-cover', 'battery-disconnect', 'wlan', 'speakers', 'system-board'], partNo: 'M47196-001 (Thermal Material Kit: M47379-001)',
      steps: ['Remove the two Phillips M2 screws, 4 millimetres long, in the order marked on the heat sink.', 'Remove the heat sink.', 'Clean all old thermal paste off the heat sink and the system board chips, and apply new thermal material.'],
      screws: [['M2 screw, 4 millimetres long', 2]], figs: [[H + 'heatsink-a.png', 'Heat sink on the system board'], [H + 'heatsink-b.png', 'Where the thermal paste goes']] },
    'display-bezel': { no: '—', name: 'Display bezel and hinge cover', access: ['top-cover', 'battery-disconnect', 'speakers', 'sensor-board'], partNo: 'Bezel M01026-001, hinge cover M47203-001',
      steps: ['Release the inside edges of the bezel: top, left and right sides, then bottom.', 'Remove the display bezel.', 'Remove the hinge cover from the bezel.'],
      install: ['New display bezel tape is in the Cable Kit (L90412-001).'],
      figs: [[H + 'display-bezel.png', 'Release the bezel from the inside edges'], [H + 'display-hingecover.png', 'Hinge cover']] },
    'display-panel': { no: '—', name: 'Display panel', access: ['top-cover', 'battery-disconnect', 'speakers', 'sensor-board', 'display-bezel'],
      variants: { fields: [['touch', 'Touchscreen', [['yes', 'Yes'], ['no', 'No']]], ['res', 'Resolution', [['1920', '1920 × 1080'], ['1366', '1366 × 768']]]], items: [{ touch: 'yes', res: '1920', pn: 'M47191-001' }, { touch: 'no', res: '1920', pn: 'M47190-001' }, { touch: 'yes', res: '1366', pn: 'M47193-001' }, { touch: 'no', res: '1366', pn: 'M47192-001' }] },
      steps: [
        'Remove the wireless card bracket and disconnect the antenna cables from the wireless card.',
        'Disconnect the webcam and microphone cable and the display panel cable from the system board, and free them and the antenna cables from their clips.',
        'Remove the two Phillips M2 screws, 2.8 millimetres long, at the top edge of the panel, and the eight hinge screws: six M2.5, 3 millimetres long, and two M2.5, 3.9 millimetres long.',
        'Free the cables from the hinge areas. Lift the base to release the hinges, slide it forward and take it off the display. Make sure the hinge brackets come fully free.',
        'Free the display panel cable from its clips in the back cover.',
        'Find the pull-to-release adhesive tabs in the lower left and right corners. Grip them with tweezers, roll them up, and pull them slowly away as far as they go.',
        'Remove the display panel.',
        'Turn the panel face down. Peel off the grounding tape and the adhesive strip, then disconnect the display panel cable.'
      ],
      screws: [['M2 screw, 2.8 millimetres long', 2], ['M2.5 screw, 3 millimetres long', 6], ['M2.5 screw, 3.9 millimetres long', 2]],
      attention: ['A complete display assembly is not sold. Order the separate display parts.'],
      figs: [[H + 'display-a.png', 'Disconnect the antenna, webcam and display cables'], [H + 'display-b.png', 'Panel and hinge screws'], [H + 'display-c.png', 'Lift the base off the display'], [H + 'display-panel.png', 'Pull-to-release tabs and panel'], [H + 'display-panel-cable.png', 'Display panel cable on the back of the panel']] },
    'display-cable': { no: '—', name: 'Display panel cable', access: ['display-panel'], variants: { fields: [['touch', 'Touchscreen', [['yes', 'Yes'], ['no', 'No']]]], items: [{ touch: 'yes', pn: 'M47201-001' }, { touch: 'no', pn: 'M47202-001' }] },
      steps: ['With the panel face down, peel off the grounding tape and the adhesive strip.', 'Disconnect the display panel cable from the panel.'],
      figs: [[H + 'display-panel-cable.png', 'Display panel cable']] },
    webcam: { no: '—', name: 'Webcam and microphone module', access: ['display-panel'], partNo: 'M47204-001 (cable in the Cable Kit, L90412-001)',
      steps: ['Unhook the tabs at the top edge of the back cover from the display bracket and remove the bracket.', 'Free the webcam cable from its clip and channel at the bottom edge of the back cover.', 'Peel the webcam cable and the webcam module off the back cover (both are held with double-sided tape).', 'Release the latch and disconnect the cable from the module.'],
      figs: [[H + 'display-bracket.png', 'Display bracket'], [H + 'webcam-a.png', 'Webcam cable routing'], [H + 'webcam-b.png', 'Webcam and microphone module']] },
    hinges: { no: '—', name: 'Display hinges', access: ['display-panel'], partNo: 'L90143-001 (left and right)',
      steps: ['Remove the four Phillips M2.5 screws, 4.7 millimetres long.', 'Slide the hinges forward to release them, then lift them out.'],
      screws: [['M2.5 screw, 4.7 millimetres long', 4]], figs: [[H + 'hinges.png', 'Display hinges']] },
    'back-cover': { no: '—', name: 'Display back cover with wireless antennas', access: ['display-panel', 'webcam', 'hinges'], partNo: 'M47199-001',
      steps: ['After the panel, webcam module and hinges are out, the back cover with its built-in antennas remains.'],
      figs: [[H + 'exploded-display.png', 'Item 9 is the display back cover with the antennas']] },
    base: { no: '—', name: 'Base enclosure', access: ['top-cover', 'battery', 'wlan', 'speakers', 'connector-board', 'sensor-board', 'system-board', 'display-panel', 'hinges'], partNo: 'M47197-001',
      figs: [[H + 'exploded-major.png', 'Item 11 is the base enclosure']] }
  },
  fru: { MLB: 'system-board', BAT: 'battery', ADP: 'adapter', IOB: 'connector-board', DSP: 'display-panel', EDP: 'display-cable', KBD: 'top-cover', TPD: 'touchpad', WLN: 'wlan', SPK: 'speakers', CAM: 'webcam', MIC: 'webcam', HNG: 'hinges', FAN: 'heatsink' },
  codes: { W01: 'back-cover', H02: 'base', K01: 'top-cover' },
  before: [
    'Shut down the Chromebook and disconnect the power adapter.',
    'Tools: tweezers, a keyboard removal tool, a magnetic Phillips size 0 screwdriver and a non-conductive pry tool.',
    'Up to 48 screws come out on this model. Note each screw’s size and place as you go.',
    'Handle flat cables by the connector. They tear easily.'
  ],
  after: [
    'Route every cable back into its clips and channels. A pinched cable can damage the Chromebook.',
    'Check the thermal material whenever the top cover or the system board has been off.'
  ],
  returnForm: 'Look up current part numbers at partsurfer.hp.com.',
  sym: {
    nopower: {
      quick: [
        { t: 'Disconnect all peripherals.', b: 'Remove USB drives, the memory card, docks and hubs.' },
        { t: 'Force the Chromebook off.', b: 'Press and hold the power key for at least 10 seconds, then press it briefly to turn the Chromebook on.' },
        { t: 'Check the power adapter.', b: 'Use the 45-watt USB-C power adapter that came with the Chromebook and connect it to the USB-C port on the right side. Watch the battery light next to it.', proc: 'adapter' },
        { t: 'Charge for 30 minutes.', b: 'Leave it connected to a known-good outlet for 30 minutes before pressing power.' },
        { t: 'Perform a hard reset.', b: 'Turn the Chromebook off. Press and hold <kbd>Refresh</kbd> + <kbd>Power</kbd> and release <kbd>Refresh</kbd> when it starts.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Connect a known-good 45-watt USB-C power adapter to the USB-C port on the right side.', q: 'Does the battery light turn amber or white?', yes: GO(2), no: GO(3), figs: [[H + 'view-right.png', 'Battery light (4) and USB-C power port (5)']] },
        { c: 'Press the power key briefly.', q: 'Does the Chromebook turn on?', yes: GO(6), no: GO(4) },
        { c: 'Inspect the USB-C port for debris, bent pins or a loose fit. Use compressed air only.', q: 'Is the USB-C port damaged or loose?', yes: RP('P15', 'MLB', 'system-board', 'The USB-C power port is not on the connector board (which only carries HDMI and USB-A), so it is serviced with the main logic board.'), no: GO(4) },
        { c: 'Connect a known-good monitor to the HDMI port on the left side and press power.', q: 'Does an image appear on the external monitor?', yes: SYM('display'), no: GO(5), figs: [[H + 'view-left.png', 'HDMI port (2)']] },
        { c: 'Remove the top cover with keyboard: eight screws on the bottom, then lift the rear edge with the keyboard removal tool. Disconnect and reconnect the battery cable, refit the top cover, connect the adapter and press power.', q: 'Does the Chromebook turn on?', yes: RESOLVED, no: GO(7), proc: 'top-cover' },
        { c: 'Disconnect the adapter while the Chromebook is running.', q: 'Does it stay on running on battery?', yes: NODUP, no: SYM('battery') },
        { c: 'Connect a known-good battery and press power with the adapter connected.', q: 'Does the Chromebook turn on?', yes: RP('B01', 'BAT', 'battery'), no: RP('M01', 'MLB', 'system-board'), proc: 'battery' }
      ]
    },
    startup: {
      quick: [
        { t: 'Force the Chromebook off and on.', b: 'Press and hold the power key for at least 10 seconds, then turn it on again.' },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd> and release <kbd>Refresh</kbd> when it starts.', ref: 'hardreset' },
        { t: 'Disconnect all USB devices and memory cards.', b: 'A connected drive can be picked up as a recovery device.' },
        { test: true, t: 'Back up local data if the user can still sign in.', b: 'A recovery deletes all files saved on the Chromebook, including the Downloads folder, and saved networks. Google Drive is not affected.', q: 'Is all local data the user needs backed up, or is there none?', yes: NEXT, no: BACKUP },
        { test: true, t: 'Check the enrollment status.', b: 'An enrolled Chromebook re-enrolls automatically after recovery if forced re-enrollment is on.', managed: true, q: 'Is the Chromebook enrolled in a school or company domain?', yes: NEXT, no: NEXT, set: 'managed' }
      ],
      deep: [
        { c: 'Start the Chromebook and read the screen.', q: 'Does it show “ChromeOS is missing or damaged”?', yes: GO(2), no: GO(4) },
        { c: 'On another computer with internet access and administrator rights, install the Chromebook Recovery Utility from the Chrome Web Store and create recovery media on a USB drive or memory card of 4 gigabytes or more. Keep the Chromebook connected to its power adapter, then insert the recovery media.', q: 'Does the recovery complete without errors?', yes: GO(3), no: GO(5), ref: 'recovery', warn: 'Recovery deletes all local files and saved networks on the Chromebook.', managed: true },
        { c: 'Remove the recovery media and let the Chromebook restart.', q: 'Does it reach the ChromeOS welcome screen?', yes: RESOLVED, no: RP('M02', 'MLB', 'system-board', 'Storage is soldered to the main logic board on this model.') },
        { c: 'Press and hold <kbd>Esc</kbd> + <kbd>Refresh</kbd>, then press the power key. The Chromebook restarts into the recovery screen.', q: 'Does the “ChromeOS is missing or damaged” or recovery screen appear?', yes: GO(2), no: RP('M02', 'MLB', 'system-board', 'If the Chromebook cannot reach the recovery screen at all, the main logic board is the likely cause.') },
        { c: 'Create the recovery media again on a different USB drive or memory card, and try another port.', q: 'Does the recovery complete now?', yes: GO(3), no: RP('M02', 'MLB', 'system-board', 'Storage is soldered to the main logic board on this model.') }
      ]
    },
    battery: {
      quick: [
        { t: 'Use the power adapter that came with the Chromebook.', b: 'This model uses a 45-watt USB-C adapter. A weaker adapter may charge slowly or not at all.', proc: 'adapter' },
        { test: true, t: 'Read the battery light.', b: 'The battery light is next to the USB-C port on the right. White: connected and fully charged. Amber: connected and charging. Off: not charging.', figs: [[H + 'view-right.png', 'Battery light (4)']], q: 'With the adapter connected, is the battery light amber or white?', yes: NEXT, no: NEXT },
        { test: true, t: 'Check battery health in Diagnostics.', b: 'Open the Diagnostics app (Launcher → search “Diagnostics”). The Battery card shows health, cycle count and charge status.', ref: 'diagnostics', q: 'Is battery health 80% or higher?', yes: NEXT, no: RP('B03', 'BAT', 'battery', 'Low battery health on its own may be normal wear. Check the warranty terms before ordering.') },
        { t: 'Update ChromeOS.', b: 'Settings → About ChromeOS → Check for updates.' },
        { t: 'Perform a hard reset.', b: 'Hold <kbd>Refresh</kbd> + <kbd>Power</kbd>.', ref: 'hardreset' }
      ],
      deep: [
        { c: 'Check the base enclosure and the touchpad for bulging.', q: 'Is there any sign of a swollen battery?', yes: RP('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Connect a known-good 45-watt USB-C adapter to a battery below 90%.', q: 'Does the battery light turn amber?', yes: GO(3), no: GO(4) },
        { c: 'Disconnect the adapter. In Diagnostics, run the Discharge test.', q: 'Does the Discharge test pass?', yes: NODUP, no: RP('B01', 'BAT', 'battery') },
        { c: 'Remove the top cover with keyboard. Disconnect and reconnect the battery cable, refit the top cover and retest.', q: 'Does the battery light turn amber now?', yes: RESOLVED, no: GO(5), proc: 'top-cover' },
        { c: 'Connect a known-good battery and retest.', q: 'Does the known-good battery charge?', yes: RP('B01', 'BAT', 'battery'), no: RP('M03', 'MLB', 'system-board') }
      ]
    },
    display: {
      deep: [
        { c: 'Inspect the display under good light for cracks, pressure marks, spots or liquid stains.', q: 'Is there visible damage to the display?', yes: RP('D01', 'DSP', 'display-panel', 'Order the panel matching the resolution and touch option on the service tag.'), no: GO(2) },
        { c: 'Connect a known-good monitor to the HDMI port on the left side.', q: 'Is the image on the external monitor correct?', yes: GO(3), no: RP('M04', 'MLB', 'system-board'), figs: [[H + 'view-left.png', 'HDMI port (2)']] },
        { c: 'Slowly open and close the lid between 30° and 150° while watching the screen.', q: 'Does the symptom change with the lid angle?', yes: RP('D02', 'EDP', 'display-cable'), no: GO(4) },
        { c: 'Remove the top cover with keyboard and the battery cable. Disconnect and reconnect the display panel cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(5), proc: 'top-cover', figs: [[H + 'systemboard-a.png', 'Display panel cable connector (2)']] },
        { c: 'Remove the display bezel and connect a known-good display panel.', q: 'Does the known-good panel work correctly?', yes: RP('D01', 'DSP', 'display-panel'), no: GO(6), proc: 'display-panel' },
        { c: 'Install a known-good display panel cable.', q: 'Does the display work correctly now?', yes: RP('D02', 'EDP', 'display-cable'), no: RP('M04', 'MLB', 'system-board'), proc: 'display-cable' }
      ]
    },
    keyboard: {
      deep: [
        { c: 'Inspect every keycap for damage, missing caps or broken clips.', q: 'Is any keycap damaged or missing?', yes: RP('K01', 'KBD', 'top-cover', 'Keycaps are not sold separately; the keyboard comes with the top cover. Order the Belgian layout (M47208-A41 backlit, M47207-A41 not backlit) or the layout on the original.'), no: GO(2) },
        { c: 'Inspect the keyboard for liquid residue or sticky keys. The keyboard is spill-resistant, but not waterproof.', q: 'Are there signs of liquid contact?', yes: SYM('damage'), no: GO(3) },
        { c: 'Open the Diagnostics app → Input → Keyboard and press every key.', q: 'Does every key register correctly?', yes: SOFTWARE, no: GO(4) },
        { c: 'Remove the top cover: eight screws on the bottom, then lift the rear edge with the keyboard removal tool. Release the latches and reconnect the keyboard cable and the backlight cable.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('K02', 'KBD', 'top-cover', 'Clean and replace the thermal material when you swap the top cover.'), proc: 'top-cover' }
      ]
    },
    touchpad: {
      deep: [
        { c: 'Look at the touchpad from the side and check the base enclosure. A swollen battery pushes the touchpad up.', q: 'Is the touchpad raised, or is the base bulging?', yes: RP('B02', 'BAT', 'battery', 'Safety: stop charging immediately. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'In the Diagnostics app → Input, run the touchpad tester or draw slow circles across the whole surface.', q: 'Does tracking work across the whole surface, with tap and click?', yes: SOFTWARE, no: GO(3) },
        { c: 'Remove the top cover. Release the latch and reconnect the touchpad cable at both ends: the main logic board and the touchpad.', q: 'Is the issue resolved?', yes: RESOLVED, no: GO(4), proc: 'touchpad-cable' },
        { c: 'Install a known-good touchpad cable from the Cable Kit.', q: 'Is the issue resolved?', yes: RP('T02', 'TPD', 'touchpad-cable'), no: RP('T01', 'TPD', 'touchpad'), proc: 'touchpad-cable' }
      ]
    },
    wireless: {
      deep: [
        { c: 'Open Settings → Network and Settings → Bluetooth.', q: 'Are Wi-Fi and Bluetooth listed, and can both be turned on?', yes: GO(2), no: GO(4) },
        { c: 'Connect to a known-good network and run all Connectivity tests in Diagnostics. For Bluetooth, pair with a known-good device.', q: 'Do the tests pass and does pairing succeed?', yes: GO(3), no: GO(4) },
        { c: 'Compare signal strength with a known-good device at the same spot.', q: 'Is the signal comparable to the known-good device?', yes: NODUP, no: GO(4) },
        { c: 'Remove the top cover and disconnect the battery. Remove the wireless card bracket and inspect the antenna cables and their connectors. The antennas are built into the display back cover.', q: 'Are the antenna cables or connectors damaged?', yes: RP('W01', 'WLN', 'back-cover', 'The antennas are part of the display back cover.'), no: GO(5), proc: 'wlan' },
        { c: 'Reconnect the antennas: white cable (number 1) to Main, black cable (number 2) to Aux. Retest.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('W02', 'WLN', 'wlan'), proc: 'wlan' }
      ]
    },
    audio: {
      quick: [
        { t: 'Unplug anything from the headphone jack.', b: 'The speakers turn off whenever something is connected to the headphone and microphone jack on the right side.', figs: [[H + 'view-right.png', 'Headphone and microphone jack (1)']] },
        { t: 'Check volume and output device.', b: 'Unmute and raise the volume. In Quick Settings, open the audio settings and check the selected output device.' },
        { t: 'Disconnect Bluetooth audio.', b: 'Turn Bluetooth off so audio cannot go to a paired speaker or headset.' },
        { t: 'Restart the Chromebook.', b: 'A restart resets the audio service.' }
      ],
      deep: [
        { c: 'Connect known-good wired headphones to the jack on the right side and play audio.', q: 'Does audio play clearly through the headphones?', yes: GO(2), no: GO(4) },
        { c: 'Remove the headphones and play audio at 50% volume.', q: 'Does audio play clearly from both speakers?', yes: NODUP, no: GO(3) },
        { c: 'Remove the top cover, disconnect the battery, then disconnect and reconnect the speaker cable at the main logic board.', q: 'Is the issue resolved?', yes: RESOLVED, no: RP('S01', 'SPK', 'speakers'), proc: 'speakers' },
        { c: 'Inspect the jack for debris or damage. Then test with a known-good USB-C or Bluetooth headset.', q: 'Does audio play through the USB-C or Bluetooth headset?', yes: RP('S03', 'MLB', 'system-board', 'The headphone jack is on the right side, which has no separate port board on this model, so it is serviced with the main logic board.'), no: ESCALATE }
      ]
    },
    camera: {
      quick: [
        { t: 'Open the camera privacy cover.', b: 'Slide the privacy cover above the screen to uncover the lens. When the camera is in use, the camera light next to it is on.', figs: [[H + 'view-display.png', 'Camera (3), privacy cover (4) and camera light (5)']] },
        { t: 'Check privacy controls.', b: 'Go to Settings → Security and privacy → Privacy controls and make sure camera and microphone access are on.' },
        { t: 'Check app permissions.', b: 'In the browser, select the icon left of the address bar and allow camera and microphone for the site.' },
        { test: true, t: 'Test with the Camera app.', b: 'If the built-in Camera app works, the problem is with the other app or site.', q: 'Does the camera work in the Camera app?', yes: SOFTWARE, no: NEXT }
      ],
      deep: [
        { c: 'Open the Camera app with the privacy cover open.', q: 'Does the Camera app show a live image, and does the camera light turn on?', yes: GO(3), no: GO(2) },
        { c: 'Remove the top cover and disconnect the battery. Disconnect and reconnect the webcam and microphone cable at the main logic board.', q: 'Does the camera work now?', yes: RESOLVED, no: RP('C01', 'CAM', 'webcam'), proc: 'top-cover', figs: [[H + 'systemboard-a.png', 'Webcam and microphone cable connector (1)']] },
        { c: 'Go to Settings → Device → Audio and watch the input level while you speak. The two microphones are in the display, either side of the camera.', q: 'Does the input level move?', yes: NODUP, no: GO(4) },
        { c: 'Connect a known-good headset with a microphone to the jack on the right side and watch the input level. (The jack does not support standalone microphones.)', q: 'Does the headset microphone work?', yes: RP('C02', 'MIC', 'webcam', 'On this model the microphones are part of the webcam and microphone module.'), no: ESCALATE }
      ]
    },
    ports: {
      deep: [
        { c: 'Inspect the failing port. Insert a plug and check for movement.', q: 'Is the port damaged, deformed or loose?', yes: GO(2), no: GO(3) },
        { c: 'Left side: HDMI and USB-A (on the connector board). Right side: headphone jack, memory card reader, USB-A and USB-C.', q: 'Is the failing port the HDMI port or the USB-A port on the left side?', yes: RP('P11', 'IOB', 'connector-board'), no: RP('P14', 'MLB', 'system-board', 'The connector board only carries the left HDMI and USB-A ports, so right-side ports are serviced with the main logic board.'), figs: [[H + 'view-left.png', 'Left side'], [H + 'view-right.png', 'Right side']] },
        { c: 'Insert a known-good USB drive into the failing port and open the Files app.', q: 'Does the drive appear in Files?', yes: GO(4), no: GO(5) },
        { c: 'For the USB-C port, test charging and a known-good USB-C monitor. For HDMI, test a known-good monitor.', q: 'Do charging and video out work?', yes: NODUP, no: GO(5) },
        { c: 'Remove the top cover and disconnect the battery. Release the latches and reconnect both connector board cables at each end. Retest the port.', q: 'Does the port work now?', yes: RESOLVED, no: GO(2), proc: 'connector-cables' }
      ]
    },
    stability: {
      likely: 'Main logic board, battery, heat sink and thermal paste (this model has no fan).',
      deep: [
        { c: 'Open the Diagnostics app and run the processor and memory tests.', q: 'Do both tests pass?', yes: GO(2), no: RP('M06', 'MLB', 'system-board', 'Memory is soldered to the main logic board on this model.') },
        { c: 'Use the Chromebook on mains power for 15 minutes, then on battery for 15 minutes.', q: 'Does the issue happen only on battery?', yes: SYM('battery'), no: GO(3) },
        { c: 'Sign out and use Guest mode for 15 minutes with the same workload.', q: 'Does the issue also happen in Guest mode?', yes: GO(4), no: SOFTWARE },
        { c: 'Recover ChromeOS with recovery media (<kbd>Esc</kbd> + <kbd>Refresh</kbd> + <kbd>Power</kbd>), then retest before signing in.', q: 'Does the issue still happen after recovery?', yes: GO(5), no: RESOLVED, ref: 'recovery', warn: 'Recovery deletes all local files and saved networks.', managed: true },
        { c: 'This Chromebook has no fan; a heat sink cools the processor. Feel the keyboard deck during the workload.', q: 'Is it unusually hot?', yes: RP('F01', 'FAN', 'heatsink', 'First clean and replace the thermal paste between the heat sink and the chips (Thermal Material Kit M47379-001).'), no: RP('M07', 'MLB', 'system-board') }
      ]
    },
    damage: {
      quick: [
        { test: true, t: 'Turn the Chromebook off and disconnect the power adapter.', b: 'After a spill, do not turn it on or charge it until it has been inspected.', q: 'Is the Chromebook turned off and the power adapter disconnected?', yes: NEXT, no: { out: 'hold', head: 'Turn it off first', msg: 'Turn the Chromebook off and disconnect the power adapter before you go on.', more: ['After a spill, do not turn it on or charge it until it has been inspected. Then restart this symptom.'] } },
        { test: true, t: 'Document the damage.', b: 'Photograph every side before you open anything. The service tag on the bottom shows the warranty length.', q: 'Have you photographed every side of the Chromebook?', yes: NEXT, no: { out: 'hold', head: 'Photograph the damage first', msg: 'Take photos of every side before you open anything.', more: ['You need them for warranty and insurance claims. Then restart this symptom.'] } },
        { test: true, t: 'Check the coverage.', b: 'Accidental damage is usually not covered by the standard warranty. Check whether the device has an accidental damage plan.', q: 'Is the damage covered by a warranty or an accidental damage plan?', yes: NEXT, no: NEXT }
      ],
      deep: [
        { c: 'Check for a swollen battery: a raised touchpad, a bulging base, or a gap between the top cover and the base.', q: 'Is the battery swollen?', yes: RP('B02', 'BAT', 'battery', 'Safety: do not charge. Do not puncture or press on the battery.'), no: GO(2) },
        { c: 'Remove the top cover with keyboard. Look for liquid residue, stains or corrosion on the main logic board, the connectors and the underside of the top cover.', q: 'Are there signs of liquid contact?', yes: RP('L01', 'OTH', ['top-cover', 'system-board'], 'Liquid damage is usually not covered. The top cover with keyboard and the main logic board often both need replacing.'), no: GO(3), proc: 'top-cover' },
        { c: 'Open and close the lid through its full range.', q: 'Is a hinge broken, loose or grinding?', yes: RP('H01', 'HNG', 'hinges'), no: GO(4) },
        { c: 'Inspect the base enclosure and the display back cover for cracks, bent corners and broken screw posts.', q: 'Is the base enclosure cracked or deformed?', yes: RP('H02', 'HNG', 'base', 'For a cracked display back cover, order M47199-001 instead.'), no: SYM('roadmap') }
      ]
    }
  }
};
