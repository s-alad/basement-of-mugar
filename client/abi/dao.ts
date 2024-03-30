export const DAOABI = [
    {
      "type": "function",
      "name": "addBoardMember",
      "inputs": [
        { "name": "_newMember", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "addEntry",
      "inputs": [
        {
          "name": "_newEntry",
          "type": "tuple",
          "internalType": "struct IDatabase.Entry",
          "components": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "author", "type": "string", "internalType": "string" },
            { "name": "medium", "type": "string", "internalType": "string" },
            {
              "name": "yearReleased",
              "type": "uint256",
              "internalType": "uint256"
            },
            { "name": "language", "type": "string", "internalType": "string" },
            { "name": "cid", "type": "string", "internalType": "string" }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "bulkAddEntries",
      "inputs": [
        {
          "name": "_newEntries",
          "type": "tuple[]",
          "internalType": "struct IDatabase.Entry[]",
          "components": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "author", "type": "string", "internalType": "string" },
            { "name": "medium", "type": "string", "internalType": "string" },
            {
              "name": "yearReleased",
              "type": "uint256",
              "internalType": "uint256"
            },
            { "name": "language", "type": "string", "internalType": "string" },
            { "name": "cid", "type": "string", "internalType": "string" }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "donate",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getEntryProposals",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct IAlexandriaDAO.DAOEntry[]",
          "components": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "author", "type": "string", "internalType": "string" },
            { "name": "medium", "type": "string", "internalType": "string" },
            {
              "name": "yearReleased",
              "type": "uint256",
              "internalType": "uint256"
            },
            { "name": "language", "type": "string", "internalType": "string" },
            { "name": "cid", "type": "string", "internalType": "string" },
            { "name": "creator", "type": "address", "internalType": "address" },
            { "name": "votes", "type": "uint256", "internalType": "uint256" }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getExecutedEntryProposals",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct IAlexandriaDAO.DAOEntry[]",
          "components": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "author", "type": "string", "internalType": "string" },
            { "name": "medium", "type": "string", "internalType": "string" },
            {
              "name": "yearReleased",
              "type": "uint256",
              "internalType": "uint256"
            },
            { "name": "language", "type": "string", "internalType": "string" },
            { "name": "cid", "type": "string", "internalType": "string" },
            { "name": "creator", "type": "address", "internalType": "address" },
            { "name": "votes", "type": "uint256", "internalType": "uint256" }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getExecutedSpendMoneyProposals",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct IAlexandriaDAO.SpendMoney[]",
          "components": [
            { "name": "reason", "type": "string", "internalType": "string" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "value", "type": "uint256", "internalType": "uint256" },
            { "name": "creator", "type": "address", "internalType": "address" },
            { "name": "votes", "type": "uint256", "internalType": "uint256" }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getSpendMoneyProposals",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct IAlexandriaDAO.SpendMoney[]",
          "components": [
            { "name": "reason", "type": "string", "internalType": "string" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "value", "type": "uint256", "internalType": "uint256" },
            { "name": "creator", "type": "address", "internalType": "address" },
            { "name": "votes", "type": "uint256", "internalType": "uint256" }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "spendMoneyProposal",
      "inputs": [
        { "name": "_reason", "type": "string", "internalType": "string" },
        { "name": "_to", "type": "address", "internalType": "address" },
        { "name": "_value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "voteAddEntry",
      "inputs": [
        {
          "name": "_proposalIndex",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "voteBulkAddEntries",
      "inputs": [
        {
          "name": "_arrayRangeStart",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_arrayRangeEnd",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_exclusionsInRange",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "voteMoneySpend",
      "inputs": [
        { "name": "_arrayIndex", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ]