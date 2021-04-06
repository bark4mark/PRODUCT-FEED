const { unzipCsv, zipCsv, writeRowsToFile, createHeaders, parseCsv } = require("./utils");

const start = async () => {
    await unzipCsv("commerce-feed.csv.gz", "commerce-feed.csv");
    const data = await parseCsv('commerce-feed.csv')
    const totalRows = data.length
    const firstRow = data[0]
    const headers = createHeaders(firstRow)

    let maxPrice = firstRow.price, minPrice = firstRow.price, itemsRemoved = 0

    const result = []
    result.push(headers.join())
    for(let index = 0; index < totalRows; index++) {
        const row = data[index]
        if(row.brand.includes('Collier') || row.availability === 'out of stock') {
            itemsRemoved++
            continue
        }

        const price = Number(row.price)

        if(price > maxPrice) maxPrice = price
        if(price < minPrice) minPrice = price
        row.price = `$${row.price} USD`
        result.push(headers.map(header => row[header]).join())
    }

    console.log(`
        Total Row Count: ${totalRows}
        Removed Row Count: ${itemsRemoved}
        Max Price: ${maxPrice}
        Min Price: ${minPrice}
    `)
    
    writeRowsToFile('processed.csv', result)
    zipCsv('processed.csv', 'processed.csv.gz')
}

start()