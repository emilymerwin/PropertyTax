#Property Tax Series
 - This is an anual series that compares property tax assesments with actual home sale prices, for the Atlanta metro counties. When we started the series assesments were coming in way above sale prices, but in response to our reporting a new law was passed that prevented recently sold properties from being assessed above the sale price, which helped bring assesments back in line with actual values. It appears that in 2012 home prices have gained enough ground that they are now beating assesments.
 - 2012 version ran <a href="http://www.ajc.com/propertytax2012/" target="_blank">here</a>
 
##Setup
- Reporter should send XLS or CSV file with county, number of sales (1st quarter), gap value (difference between appraisals and sale prices) and median sale price
- proptaxCSVtoXML.py will generate an XML file from the CSV

  