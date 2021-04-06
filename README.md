# Product Feed Exercise

- Unzips commerce-feed.csv.gz
- Iterates over the rows
  - Removes all rows where the availability column equals "out of stock"
  - Removes all rows where the brand contains "Collier"
  - Wraps all prices with "$ USD"
  - Outputs a short summary when complete
- Writes out processed.csv
- Gzips processed.csv