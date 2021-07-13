function traverse(tree){
  let total = 0;
  
  for(let node in tree){
    if(typeof tree[node] === 'object'){
      total += traverse(tree[node]);
    } else if(typeof tree[node] === 'number'){
      total += tree[node];
    } else if(tree[node] === "red" && tree.constructor === Object) {
      return 0;
    }
  }
  
  return total;
}
