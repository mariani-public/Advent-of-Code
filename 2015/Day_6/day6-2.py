#!/usr/bin/python
lightGrid = [[0 for x in range(1000)] for x in range(1000)]
instructionList = open('./day6.txt', 'r')
totalLightsLit = 0

def getRange(string):
	instructions = string.split(' ')
	startIndex = len(instructions) - 3
	endIndex = len(instructions) - 1
	startRange = instructions[startIndex].split(',')
	endRange = instructions[endIndex].split(',')
	rangeValues = {'start_x': int(startRange[0]), 'start_y': int(startRange[1]), 'end_x': int(endRange[0]), 'end_y': int(endRange[1])}
	
	return rangeValues

def getInstruction(string):
	instruction = ''
	
	instructions = string.split(' ')
	if instructions[0] == 'turn':
		if instructions[1] == 'off':
			instruction = 'off'
		elif instructions[1] == 'on':
			instruction = 'on'
	elif instructions[0] == 'toggle':
		instruction = 'toggle'
		
	return instruction

def switchLights(instruction, lights):
	for i in range(lights['start_x'], lights['end_x'] + 1):
		for j in range(lights['start_y'], lights['end_y'] + 1):
			if instruction == 'off':
				if lightGrid[i][j] > 0:
					lightGrid[i][j] -= 1
			elif instruction == 'on':
				lightGrid[i][j] += 1
			elif instruction == 'toggle':
				lightGrid[i][j] += 2

for instruction in instructionList:
	lights = getRange(instruction)
	instructions = getInstruction(instruction)
	switchLights(instructions, lights)
	
for row in lightGrid:
	for col in row:
		totalLightsLit += col

print "The number of lights on is:", totalLightsLit