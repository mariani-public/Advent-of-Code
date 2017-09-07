function calculateTime(clock, flyTime, restTime, isFlying, totalFlights){
  if((clock <= flyTime && isFlying) || (clock <= restTime && !isFlying)){
    let flightSeconds = (flyTime * totalFlights);
    if(isFlying){
      flightSeconds += clock;
      return flightSeconds;      
    } else {
      return flightSeconds;
    }
  } else {
    let newTime;
    if(isFlying){
      newTime = clock - flyTime;
      totalFlights++;
      return calculateTime(newTime, flyTime, restTime, false, totalFlights);
    } else {
      newTime = clock - restTime;
      return calculateTime(newTime, flyTime, restTime, true, totalFlights);
    }
  }
}

function calculateDistance(instructionSet, totalClock){
  const flightTime = calculateTime(totalClock,
                                   instructionSet.flyTime,
                                   instructionSet.restTime,
                                   true,
                                   0);
  return {flyer: instructionSet.flyer,
          distance: flightTime * instructionSet.flightDistance};
}

//iterate on clock tick
//calculate each distance
//toggle flight status based on inner clock counting the status

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

function calculateAll(input, totalClock){
  const instructionSet = translateInstructions(input);
  instructionSet.forEach(instSet => {
    console.log(calculateDistance(instSet, totalClock));
  });
}

const input = `Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.
Cupid can fly 22 km/s for 2 seconds, but then must rest for 41 seconds.
Rudolph can fly 11 km/s for 5 seconds, but then must rest for 48 seconds.
Donner can fly 28 km/s for 5 seconds, but then must rest for 134 seconds.
Dasher can fly 4 km/s for 16 seconds, but then must rest for 55 seconds.
Blitzen can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Prancer can fly 3 km/s for 21 seconds, but then must rest for 40 seconds.
Comet can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.
Vixen can fly 18 km/s for 5 seconds, but then must rest for 84 seconds.`

calculateAll(input, 2503)
