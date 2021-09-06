pragma solidity >=0.4.22 <0.8.0;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(address => bool ) public voters;
    
    mapping(uint => Candidate) public candidates;

    uint public candidateCount;
    
    constructor() public {
        addCandidate("John");
        addCandidate("Mike");
    }

    function addCandidate(string memory _name) private {
        candidateCount ++;
        candidates[candidateCount] = Candidate(candidateCount,_name,0);
    }

    function vote(uint _candidateId) public {
        
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidateCount);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount ++;
    }

   


}
