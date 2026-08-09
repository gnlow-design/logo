import { Resvg, initWasm } from "https://esm.sh/@resvg/resvg-wasm@2.6.2"
import wasm from "https://esm.sh/@resvg/resvg-wasm@2.6.2/index_bg.wasm" with { type: "bytes" }
await initWasm(wasm)

import * as oklch from "https://gnlow.dev/oklch@0.1.1"
import faculty from "https://github.com/google/fonts/raw/9a17b49/ofl/facultyglyphic/FacultyGlyphic-Regular.ttf" with { type: "bytes" }

const svg = (await Deno.readTextFile("src/260809_disty.svg"))
    .replaceAll(/oklch\(([^()]+)\)/g,
        (_, o) => {
            const [l, c, h] = o.split(/\s+/).map(Number)
            return oklch.hex(l, c, h)
        }
    )

const resvg = new Resvg(svg, {
    fitTo: {
        mode: "width",
        value: 1000,
    },
    font: {
        fontBuffers: [faculty],
        //loadSystemFonts: true,
        //defaultFontFamily: "sans-serif"
    },
})

await Deno.writeFile(
    "dist/260809_disty.png",
    resvg.render().asPng(),
)
