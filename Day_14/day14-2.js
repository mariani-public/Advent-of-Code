const input = `Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.
Cupid can fly 22 km/s for 2 seconds, but then must rest for 41 seconds.
Rudolph can fly 11 km/s for 5 seconds, but then must rest for 48 seconds.
Donner can fly 28 km/s for 5 seconds, but then must rest for 134 seconds.
Dasher can fly 4 km/s for 16 seconds, but then must rest for 55 seconds.
Blitzen can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Prancer can fly 3 km/s for 21 seconds, but then must rest for 40 seconds.
Comet can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.
Vixen can fly 18 km/s for 5 seconds, but then must rest for 84 seconds.`;

let clock = 0;
const instructionSet = translateInstructions(input);
const baseObj = {reindeer: '', totalDistance: 0, inFlight: true, score: 0, internalClock: 0};
let reindeerList = instructionSet.map(instruction => {
  let reindeerObj = Object.assign({}, baseObj);
  reindeerObj.reindeer = instruction.flyer;
  reindeerObj.internalClock = instruction.flyTime;
  
  return reindeerObj;
});

while(clock < 2504){
  clock++;

  reindeerList.forEach(reindeer => {
    let instruction = instructionSet.find(instruction => instruction.flyer === reindeer.reindeer);
    
    //update distance
    if(reindeer.inFlight){
      reindeer.totalDistance += instruction.flightDistance;
    }
    
    //update internal clock
    reindeer.internalClock--;
    if(reindeer.internalClock === 0){
      reindeer.inFlight = !reindeer.inFlight;
      if(reindeer.inFlight){
        reindeer.internalClock = instruction.flyTime;
      } else {
        reindeer.internalClock = instruction.restTime;
      }
    }
  });
  
  reindeerList.sort((reindeerA, reindeerB) => {
    if(reindeerA.totalDistance < reindeerB.totalDistance){
      return -1;
    }
    if(reindeerA.totalDistance > reindeerB.totalDistance){
      return 1;
    }
    return 0;
  });
  
  //change sort to have furthest in first place
  reindeerList.reverse();
  
  for(let i = 1; i < reindeerList.length; i++){
    if(reindeerList[i - 1].totalDistance === reindeerList[i].totalDistance){
      reindeerList[i - 1].score++;
    } else if(reindeerList[i - 1].totalDistance > reindeerList[i].totalDistance){
      reindeerList[i - 1].score++;
      break;
    }
  }
}

reindeerList.sort((reindeerA, reindeerB) => {
  if(reindeerA.score < reindeerB.score){
    return -1;
  }
  if(reindeerA.score > reindeerB.score){
    return 1;
  }
  return 0;
});

console.log(reindeerList);

function translateInstructions(input){
  const spacedInstructions = input.split('\n');
  let individualInstructions = [];
  spacedInstructions.forEach(inst => {
    individualInstructions.push(inst.split(' '));
  });
  
  return individualInstructions.map(instSet => {
    let instObj = {
      flyer: instSet[0],
      flightDistance: parseInt(instSet[3]),
      flyTime: parseInt(instSet[6]),
      restTime: parseInt(instSet[13])
    };
    return instObj;
  });
}
