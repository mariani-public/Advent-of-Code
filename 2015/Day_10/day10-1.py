def lookAndSay(thread, timesToRun):
    if timesToRun == 0:
    	print len(thread)
    else:
        parts = parseThread(thread)
        thread = translator(parts)
        print timesToRun
        lookAndSay(thread, timesToRun - 1)


def parseThread(thread):
    thread = str(thread)
    substrings = []
    sub = [thread[0]]
    if len(thread) > 1:
        for i in range(1, len(thread)):
            if thread[i - 1] == thread[i]:
                sub.append(thread[i])
            else:
                substrings.append(sub)
                sub = []
                sub.append(thread[i])
        substrings.append(sub)
    else:
        substrings.append(sub)
    return substrings


def translator(parts):
    newInput = ""
    for part in parts:
        newInput = newInput + str(len(part))
        newInput = newInput + part[0]
    return newInput


lookAndSay(1321131112, 40)
