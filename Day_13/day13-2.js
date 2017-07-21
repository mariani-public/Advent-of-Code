function splitAndTranslate(input){
  let instructions = input.split('\n');
  let splitInstructions = [];
  
  instructions.forEach(instruction => {
    splitInstructions.push(instruction.split(" "));
  });
  
  let machineInstructions = {};
  
  splitInstructions.forEach(split => {
    let sign = split[2] === 'gain' ? 1 : -1;
    let signedValue = sign * split[3];
    
    let lastItem = split.length - 1;
    let pairing = split[lastItem];
    pairing = pairing.substring(0, pairing.length - 1);
    
    if(!machineInstructions[split[0]]){
      let instructionObj = {}; 
      instructionObj[pairing] = signedValue;
      machineInstructions[split[0]] = instructionObj;
    } else {
      let existingInstruction = machineInstructions[split[0]];
      existingInstruction[pairing] = signedValue;
    }
  });
  
  return machineInstructions;
}

function calculateInstructions(pickList, acc, instruction){
  let best = null;
  
  if(pickList.length === 0){
    let score = 0;
    
    acc.forEach((person, i) => {
      let personLeftIndex = i - 1;
      let personRightIndex = i + 1;
      
      if(i === 0){
        personLeftIndex = acc.length - 1;
      } else if(i === acc.length - 1){
        personRightIndex = 0;
      }
      
      let personRight = acc[personRightIndex];
      let personLeft = acc[personLeftIndex];
      
      let currentSum = instruction[person][personLeft] + instruction[person][personRight];
      score += currentSum;
    });
    
    return {score, table: acc};
  }
  
  pickList.forEach((pick, i) => {
    let newPickList = pickList.slice();
    newPickList.splice(i, 1);
    
    let newAcc = acc.slice();
    newAcc.push(pick);
    let total = calculateInstructions(newPickList, newAcc, instruction);
    
    if(best === null || best.score < total.score){
      best = total;
    }
  });
  
  return best;
}

function doEverything(input){
  let instructions = splitAndTranslate(input);
  
  //get picklist and accumulator
  let allKeys = Object.keys(instructions);
  
  let myInstructionSet = {};
  allKeys.forEach(key => {
    myInstructionSet[key] = 0;
    
    instructions[key]["Mariani"] = 0;
  });
  instructions["Mariani"] = myInstructionSet;
  
  let picklist = allKeys.slice(1);
  picklist.push('Mariani');
  const accumulator = allKeys.slice(0,1);
  
  return calculateInstructions(picklist, accumulator, instructions);
}

let instruction = `Alice would gain 2 happiness units by sitting next to Bob.
Alice would gain 26 happiness units by sitting next to Carol.
Alice would lose 82 happiness units by sitting next to David.
Alice would lose 75 happiness units by sitting next to Eric.
Alice would gain 42 happiness units by sitting next to Frank.
Alice would gain 38 happiness units by sitting next to George.
Alice would gain 39 happiness units by sitting next to Mallory.
Bob would gain 40 happiness units by sitting next to Alice.
Bob would lose 61 happiness units by sitting next to Carol.
Bob would lose 15 happiness units by sitting next to David.
Bob would gain 63 happiness units by sitting next to Eric.
Bob would gain 41 happiness units by sitting next to Frank.
Bob would gain 30 happiness units by sitting next to George.
Bob would gain 87 happiness units by sitting next to Mallory.
Carol would lose 35 happiness units by sitting next to Alice.
Carol would lose 99 happiness units by sitting next to Bob.
Carol would lose 51 happiness units by sitting next to David.
Carol would gain 95 happiness units by sitting next to Eric.
Carol would gain 90 happiness units by sitting next to Frank.
Carol would lose 16 happiness units by sitting next to George.
Carol would gain 94 happiness units by sitting next to Mallory.
David would gain 36 happiness units by sitting next to Alice.
David would lose 18 happiness units by sitting next to Bob.
David would lose 65 happiness units by sitting next to Carol.
David would lose 18 happiness units by sitting next to Eric.
David would lose 22 happiness units by sitting next to Frank.
David would gain 2 happiness units by sitting next to George.
David would gain 42 happiness units by sitting next to Mallory.
Eric would lose 65 happiness units by sitting next to Alice.
Eric would gain 24 happiness units by sitting next to Bob.
Eric would gain 100 happiness units by sitting next to Carol.
Eric would gain 51 happiness units by sitting next to David.
Eric would gain 21 happiness units by sitting next to Frank.
Eric would gain 55 happiness units by sitting next to George.
Eric would lose 44 happiness units by sitting next to Mallory.
Frank would lose 48 happiness units by sitting next to Alice.
Frank would gain 91 happiness units by sitting next to Bob.
Frank would gain 8 happiness units by sitting next to Carol.
Frank would lose 66 happiness units by sitting next to David.
Frank would gain 97 happiness units by sitting next to Eric.
Frank would lose 9 happiness units by sitting next to George.
Frank would lose 92 happiness units by sitting next to Mallory.
George would lose 44 happiness units by sitting next to Alice.
George would lose 25 happiness units by sitting next to Bob.
George would gain 17 happiness units by sitting next to Carol.
George would gain 92 happiness units by sitting next to David.
George would lose 92 happiness units by sitting next to Eric.
George would gain 18 happiness units by sitting next to Frank.
George would gain 97 happiness units by sitting next to Mallory.
Mallory would gain 92 happiness units by sitting next to Alice.
Mallory would lose 96 happiness units by sitting next to Bob.
Mallory would lose 51 happiness units by sitting next to Carol.
Mallory would lose 81 happiness units by sitting next to David.
Mallory would gain 31 happiness units by sitting next to Eric.
Mallory would lose 73 happiness units by sitting next to Frank.
Mallory would lose 89 happiness units by sitting next to George.`;

console.log(doEverything(instruction));
