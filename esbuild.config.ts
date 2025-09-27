import esbuild from 'esbuild'
import fs from 'node:fs'

// Dummy-Loader, der einfach leeren Inhalt zurückgibt
const noopLoader = {
  name: 'noop-loader',
  setup(build: esbuild.PluginBuild) {
    // SCSS ignorieren
    build.onLoad({ filter: /\.scss$/ }, async (args) => ({
      contents: '',
      loader: 'css', // css ist nötig, sonst meckert esbuild
    }))
    // LESS ignorieren
    build.onLoad({ filter: /\.less$/ }, async (args) => ({
      contents: '',
      loader: 'css',
    }))
  },
}


let result = await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  metafile: true,
  outfile: 'dist/main.js',
  minify: true,
  plugins: [noopLoader],
})

fs.writeFileSync('build/meta.json', JSON.stringify(result.metafile))
