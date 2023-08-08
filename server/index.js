const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot(); //ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name, proof} = req.body;
  console.log(name);
  console.log(proof);

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT)
  console.log(isInTheList);
  if(isInTheList) {
    res.status(200).send({gift: "You got a toy robot!"});
  }
  else {
    res.status(200).send({gift: "No gift for you!"});
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
