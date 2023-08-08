const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:8080';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = "Anna Stehr";

  // TODO: prove that a name is in the list 
  const merkleTree = new MerkleTree(niceList);

  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof
  }).then( function (response){
    console.log(response.data.gift);
  }).catch(function (error){
    console.log(error);
  });
}

main();