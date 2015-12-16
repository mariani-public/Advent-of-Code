#!/usr/bin/python
import hashlib

hashKey = "iwrupvqb"
hashNum = 1
hashVal = hashKey + str(hashNum)
finalHash = hashlib.md5(hashVal).hexdigest().find('00000', 0)

while finalHash != 0:
	hashNum += 1
	hashVal = hashKey + str(hashNum)
	finalHash = hashlib.md5(hashVal).hexdigest().find('00000', 0)

print hashNum