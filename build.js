require('./validate.js');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const srcDir = path.join(dir, 'src');
const css = fs.readFileSync(path.join(dir, 'node_modules/bootstrap/dist/css/bootstrap.min.css'), 'utf8').replace(/\/\*# sourceMappingURL=.*?\*\//g, '');
const names = ['tools','search','laptop','journal-text','wrench-adjustable','list-check','upc-scan','chevron-left','chevron-right','signpost-split','power','arrow-repeat','battery-half','display','keyboard','hand-index','tablet','wifi','volume-up','camera-video','usb-c','activity','droplet','check2','x-lg','building','box-arrow-up-right','exclamation-octagon','check2-circle','exclamation-triangle','clipboard','arrow-counterclockwise','plus-lg','book','box-seam','usb-drive','cpu'];
const icons = {};
for (const n of names) {
  let svg = fs.readFileSync(path.join(dir, 'node_modules/bootstrap-icons/icons', n + '.svg'), 'utf8');
  icons[n] = svg.replace(/\s*class="[^"]*"/, '').replace(/width="16" height="16"/, '').replace(/\n\s*/g, '');
}
let html = fs.readFileSync(path.join(srcDir, 'src.html'), 'utf8');
html = html.replace('/*BOOTSTRAP_CSS*/', () => css)
  .replace('/*DATA_JS*/', () => '')
  .replace('/*MODELS_JS*/', () => require('./src/files.json').map(f => fs.readFileSync(path.join(srcDir, f), 'utf8')).join('\n'))
  .replace('/*ICONS_JSON*/', () => JSON.stringify(icons))
  .replace('/*APP_JS*/', () => fs.readFileSync(path.join(srcDir, 'app.js'), 'utf8'));
// The built page is self-contained apart from the pictures in img/.
fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('ok', html.length);
