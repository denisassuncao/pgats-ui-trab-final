const fs = require('fs')
const path = require('path')
const merge = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')

async function run() {
    const dir = path.join(process.cwd(), 'cypress', 'reports')
    if (!fs.existsSync(dir)) {
        console.log('No reports directory, skipping merge.')
        return
    }

    const files = fs.readdirSync(dir).filter(f => /^mochawesome.*\.json$/.test(f)).map(f => path.join(dir, f))
    if (!files || files.length === 0) {
        console.log('No mochawesome JSON files found, skipping merge.')
        return
    }

    console.log('Merging files:', files)
    try {
        const merged = await merge.merge({ files })
        const outPath = path.join(dir, 'mochawesome.json')
        fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8')
        // validate JSON
        JSON.parse(fs.readFileSync(outPath, 'utf8'))
        console.log('Merged JSON written to', outPath)

        // generate HTML report using mochawesome-report-generator
        const options = { reportDir: dir, reportFilename: 'report', inline: true }
        await marge.create(outPath, options)
        console.log('HTML report created in', dir)
    } catch (err) {
        console.error('ERROR: Failed to merge/generate reports', err)
        process.exit(1)
    }
}

run()
