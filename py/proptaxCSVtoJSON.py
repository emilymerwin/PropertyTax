#! /usr/bin/env python
import csv
import json
import decimal

f = open( '../data/zips2013.csv', 'rU' )
reader = csv.DictReader( f, dialect='excel') #doing it this way will put row 1 into your data - exclude fieldnames to use row 1 as fieldnames
fixed = []

def gapFixer(n):
    if "NA" == n:
        return n
    else:
        dec = int(round(decimal.Decimal(n), 2)*100)
        return str(dec)

for row in reader:
    row2 = {}
    row2['COUNTY'] = row['County'].strip()
    row2['ZIP_CODE'] = row['ZIP'].strip()
    row2['GAP'] = gapFixer(row['GAP'])
    row2['PRICE'] = row['MEDIAN SALE PRICE']
    row2['SALES'] = row['1ST QUARTER SALES']
    fixed.append(row2)

# Parse the CSV into JSON
out = json.dumps( fixed, indent=4)
print "JSON parsed!"
# Save the JSON
f = open( '../data/zips2013.json', 'w')
f.write(out)
print "JSON saved!"