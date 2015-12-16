#!/usr/bin/python
stringList = open('./day5.txt', 'r')
niceStrings = 0
vowelCount = 0
concurrentLetters = False
badString = False
vowels = ['a', 'e', 'i', 'o', 'u']
badStrings = ['ab', 'cd', 'pq', 'xy']

for string in stringList:
	for bad in badStrings:
		if string.find(bad) >= 0:
			badString = True
	
	for char in string:
		if char in vowels:
			vowelCount += 1
			
	for i in range(1, len(string)):
		if string[i] == string[i - 1]:
			concurrentLetters = True
			
	if not(badString) and vowelCount >= 3 and concurrentLetters:
		niceStrings += 1
		
	vowelCount = 0
	concurrentLetters = False
	badString = False
		
print "The number of nice strings is", niceStrings