# generate list of cities to visit
# create permutation of list
# create table of waypoint pairs and their distance
import itertools

fileToRead = open('./coordinates.txt', 'r')
waypoints = []

for line in fileToRead:
    currentWaypoint = line.split(' ')
    waypoint = []
    waypoint.append(currentWaypoint[0])
    waypoint.append(currentWaypoint[2])
    waypoint.append(currentWaypoint[4].strip())
    waypoints.append(waypoint)

locations = set()
for wp in waypoints:
    locations.add(wp[0])
    locations.add(wp[1])

permutations = list(itertools.permutations(list(locations), len(list(locations))))


def findPairInList(point1, point2, wpList):
    distance = 0
    for l in wpList:
        if(all(x in l for x in [point1, point2])):
            distance = int(l[2])

    return distance


def createPairs(wpList):
    pairList = []
    for i in range(1, 8):
        pair = [wpList[i - 1], wpList[i]]
        pairList.append(pair)

    return pairList


distances = []
for permutation in permutations:
    routeLength = 0
    pairs = createPairs(permutation)
    for pair in pairs:
        distance = findPairInList(pair[0], pair[1], waypoints)
        routeLength = routeLength + distance
    distances.append(routeLength)

distances.sort()
print distances[0]
