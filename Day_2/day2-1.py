#!/usr/bin/python

totalPaper = 0
LENGTH, WIDTH, HEIGHT = 0, 1, 2
packageList = open('./day2.txt', 'r')

for package in packageList:
	dims = package.split('x')
	dims = map(int, dims)
	surfaceArea = (2 * dims[LENGTH] * dims[WIDTH]) + (2 * dims[WIDTH] * dims[HEIGHT]) + (2 * dims[HEIGHT] * dims[LENGTH])
	
	dims = sorted(dims)
	slackArea = dims[LENGTH] * dims[WIDTH]
	surfaceArea += slackArea
	
	totalPaper += surfaceArea

print "\nThe total square footage of paper needed is:", totalPaper