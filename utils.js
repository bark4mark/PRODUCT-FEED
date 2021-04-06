const fs = require('fs')
const zlib = require('zlib')
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)
const readFile = util.promisify(fs.readFile)
const neatCsv = require("neat-csv")

/**
 * Unzips file in the gzip format
 * @param {String} inputFilename The gzip file 
 * @param {String} outputFilename The name of the unzipped file
 */
const unzipCsv = async (inputFilename, outputFilename) => {
    await pipeline(fs.createReadStream(`${__dirname}/${inputFilename}`), zlib.createGunzip(), fs.createWriteStream(`${__dirname}/${outputFilename}`))
}

/**
 * Zips file in the gzip format
 * @param {String} inputFilename The original file 
 * @param {String} outputFilename The name of the zipped file
 */
const zipCsv = async (inputFilename, outputFilename) => {
    await pipeline(fs.createReadStream(`${__dirname}/${inputFilename}`), zlib.createGzip(), fs.createWriteStream(`${__dirname}/${outputFilename}`))
}

/**
 * Writes rows to a text file
 * @param {String} outputFilename The name of the file to write
 * @param {Array} rows The array of rows to write to the file 
 */
const writeRowsToFile = (outputFilename, rows) => {
    const file = fs.createWriteStream(`${__dirname}/${outputFilename}`)
    rows.forEach(row => file.write(`${row}\n`))
    file.end()
}

/**
 * Creates an array of headers from a row
 * @param {Object} row A row of data to extract the headers 
 * @returns An array of headers
 */
const createHeaders = (row) => {
    const headers = []
    for(const property in row) {
        headers.push(property)
    }
    return headers
}

/**
 * Reads a csv file and returns an array of objects
 * @param {*} inputFilename The csv file name
 * @returns An array of objects that correspond to the csv
 */
const parseCsv = async (inputFilename) => {
    const fileContents = await readFile(`${__dirname}/${inputFilename}`, 'utf-8')
    return await neatCsv(fileContents)
}

module.exports = {unzipCsv, zipCsv, writeRowsToFile, createHeaders, parseCsv}

