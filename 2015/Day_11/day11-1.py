def checkPassword(pwd):
    isGood = False
    iolNotInPwd = False
    trioInPwd = False
    pairsInPwd = False

    if 'i' not in pwd and 'o' not in pwd and 'l' not in pwd:
        iolNotInPwd = True

    for i in range(2, len(pwd)):
        if ord(pwd[i - 2]) == (ord(pwd[i - 1]) - 1) and ord(pwd[i - 1]) == (ord(pwd[i]) - 1):
            trioInPwd = True
            break

    i = 1
    counter = 0
    while i < len(pwd):
        if ord(pwd[i - 1]) == ord(pwd[i]):
            counter = counter + 1
            i = i + 2
            if counter == 2:
                pairsInPwd = True
                break
        else:
            i = i + 1

    isGood = iolNotInPwd and trioInPwd and pairsInPwd
    return isGood


def incrementPassword(pwd):
    rolledOver = False
    password = list(map(lambda x: ord(x), pwd))
    if password[-1] == 122:
        password[-1] = 97
        password[-2] = password[-2] + 1
        rolledOver = True
    else:
        password[-1] = password[-1] + 1

    counter = len(password) - 2
    while rolledOver or counter < 0:
        if password[counter] > 122:
            password[counter] = 97
            password[counter - 1] = password[counter - 1] + 1
            rolledOver = True
        else:
            rolledOver = False

        counter = counter - 1

    password = map(lambda x: chr(x), password)
    return ''.join(password)


password = 'cqjxjnds'
isGoodPassword = False
while not isGoodPassword:
    password = incrementPassword(password)
    isGoodPassword = checkPassword(password)

print password
