import {serve} from 'esbuild'

const entry_points = {
  openlayers: 'src/ol.js',
  leaflet: 'src/leaflet.js',
  openlayerstyle: 'src/ol.css',
  leafletstyle: 'src/ol.css'
}

serve({
  servedir: 'examples',
}, {
  entryPoints: entry_points,
  loader: {
    '.ttf': 'file',
    '.svg': 'file'
  },
  outdir: 'examples',
  bundle: true,
  splitting: true,
  format: 'esm'
}).then(server => {

  console.log(server)
  // Call "stop" on the web server to stop serving
  // server.stop()

})
