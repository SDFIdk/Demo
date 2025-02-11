
import { build } from 'esbuild'

const entry_points = {
  openlayers: 'src/ol.js',
  leaflet: 'src/leaflet.js',
  openlayerstyle: 'src/ol.css',
  leafletstyle: 'src/ol.css'
}

// Production build
build({
  entryPoints: entry_points,
  outdir: 'examples/lib/',
  bundle: true,
  minify: true,
  format: 'esm'
})
.then(() => {
  console.log('Build finished 👍')
})
.catch(() => process.exit(1))
