const fs = require('fs')
const path = require('path')
const merge = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')

async function run() {
    const dir = path.join(process.cwd(), 'cypress', 'reports')
    if (!fs.existsSync(dir)) {
        console.log('Nenhum diretório de relatórios encontrado, ignorando mesclagem.')
        return
    }

    const files = fs.readdirSync(dir).filter(f => /^mochawesome.*\.json$/.test(f)).map(f => path.join(dir, f))
    if (!files || files.length === 0) {
        console.log('Nenhum arquivo JSON do Mochawesome encontrado, ignorando mesclagem.')
        return
    }

    console.log('Mesclando arquivos:', files)
    try {
        const merged = await merge.merge({ files })
        const outPath = path.join(dir, 'mochawesome.json')
        fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8')
        // validar JSON
        JSON.parse(fs.readFileSync(outPath, 'utf8'))
        console.log('Arquivo JSON mesclado gravado em', outPath)

        // gerar relatório HTML usando mochawesome-report-generator
        const options = { reportDir: dir, reportFilename: 'report', inline: true }
        await marge.create(outPath, options)
        console.log('Relatório HTML criado em', dir)
    } catch (err) {
        console.error('ERRO: Falha ao mesclar/gerar relatórios', err)
        process.exit(1)
    }
}

run()
