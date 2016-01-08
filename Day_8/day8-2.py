#!/usr/bin/python
stringList = open('./day8.txt', 'r')
totalCode = 0
totalString = 0
totalChars = 0

def convertStringToOrd(stringArray):
	charArray = []
	for i in range(0, len(stringArray)):
		if ord(stringArray[i]) != 10:
			charArray.append(ord(stringArray[i]))
	
	return charArray

for string in stringList:
	#Change over to ASCII char vals and count total characters in memory
	entry = convertStringToOrd(string)
	totalCode = totalCode + len(entry)
	
	#Create new string and open it with quotes
	modifiedEntry = []
	modifiedEntry.append(34)
	
	for i in range(0, len(entry)):
		if entry[i] == 34 or entry[i] == 92:
			modifiedEntry.append(92)

		modifiedEntry.append(entry[i])
	
	#close new string with quotes
	modifiedEntry.append(34)
	
	totalString = totalString + len(modifiedEntry)

totalChars = totalString - totalCode
print totalChars