#!/usr/bin/python

totalRibbon = 0
LENGTH, WIDTH, HEIGHT = 0, 1, 2
packageList = open('./day2.txt', 'r')

for package in packageList:
	dims = package.split('x')
	dims = map(int, dims)
	
	bow = dims[LENGTH] * dims[WIDTH] * dims[HEIGHT]
	
	perimeters = [ 2 * (dims[LENGTH] + dims[WIDTH]), 2 * (dims[WIDTH] + dims[HEIGHT]), 2 * (dims[HEIGHT] + dims[LENGTH])]
	perimeters = sorted(perimeters)
	
	totalRibbon = totalRibbon + perimeters[0] + bow

print "\nThe total square footage of ribbon needed is:", totalRibbon