#!/usr/bin/python
stringList = open('./day5.txt', 'r')
niceStrings = 0
letterPairFound = False
splitLetterFound = False

for string in stringList:
	for i in range(2, len(string)):
		substring = string[i -2:i]
		substringCount = string.count(substring)
		
		if substringCount > 1:
			letterPairFound = True
			break
			
	for i in range(2, len(string)):
		if string[i - 2] == string[i]:
			splitLetterFound = True
			break
			
	if letterPairFound and splitLetterFound:
		niceStrings += 1
		
	letterPairFound = False
	splitLetterFound = False

print "The number of nice strings is", niceStrings