#! /usr/bin/env python
import csv
from xml.dom.minidom import Document

data = csv.DictReader (open("zipcode.csv",'U'))
#Create the XML doc
doc = Document()
#create the base element
docbase = doc.createElement("docbase")
doc.appendChild(docbase)

for row in data:
    #create the row element
	ZIP = doc.createElement('ZIP')

	ZIP.setAttribute('COUNTY', row['COUNTY'])
	ZIP.setAttribute('ZIP_CODE', row['ZIP'])
	ZIP.setAttribute('GAP', row['GAP'])
	ZIP.setAttribute('PRICE', row['PRICE'])
	ZIP.setAttribute('SALES', row['SALES'])
	docbase.appendChild(ZIP)

f = open('zips.xml', 'w')
doc.writexml(f, addindent=" ", newl="\n")
f.close()