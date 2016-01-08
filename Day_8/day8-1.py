#!/usr/bin/python
stringList = open('./day8.txt', 'r')
totalCode = 0
totalString = 0
totalChars = 0
extraChars = 0
skipNextChar = False

def convertStringToOrd(stringArray):
	charArray = []
	for i in range(0, len(stringArray)):
		if ord(stringArray[i]) != 10:
			charArray.append(ord(stringArray[i]))
	
	return charArray

def parseOffQuotes(charArray):
	charArray.pop(len(charArray) - 1)
	charArray.pop(0)

def findSpecialChars(subArray):
	chars = 0

	if subArray[0] == 92:
		chars += 1
	elif subArray[0] == 34:
		chars += 1
	elif subArray[0] == 120:
		chars += 3
		
	global skipNextChar
	skipNextChar = True
		
	return chars

for string in stringList:
	#Change over to ASCII char vals and count total characters in memory
	entry = convertStringToOrd(string)
	totalCode = totalCode + len(entry)
	#Remove extraneous quotes
	parseOffQuotes(entry)
	
	for i in range(0, len(entry)):
		if entry[i] == 92 and not skipNextChar:
			startIndex = i + 1
			endIndex = i + 2
			extraChars += findSpecialChars(entry[startIndex:endIndex])
		else:
			skipNextChar = False
	
	totalString = totalString + len(entry) - extraChars
	extraChars = 0

totalChars = totalCode - totalString
print totalChars