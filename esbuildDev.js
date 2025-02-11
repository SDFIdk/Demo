import * as esbuild from 'esbuild'

const entry_points = {
  openlayers: 'src/ol.js',
  leaflet: 'src/leaflet.js',
  openlayerstyle: 'src/ol.css',
  leafletstyle: 'src/ol.css'
}

let ctx = await esbuild.context({
  entryPoints: entry_points,
  loader: {
    '.ttf': 'file',
    '.svg': 'file'
  },
  outdir: 'examples',
  bundle: true,
  format: 'esm'
})

// Serve the HTML demos on localhost:8000
let { host, port } = await ctx.serve({
  servedir: 'examples',
})
console.info('--- Serving at http://localhost:8000 ---')
console.info('--- Stop with CTRL + C ---')
