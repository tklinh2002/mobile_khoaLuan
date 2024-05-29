export const abi = [
	{
		"type": "constructor",
		"name": "",
		"inputs": [],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "event",
		"name": "ContractCanceled",
		"inputs": [
			{
				"type": "uint256",
				"name": "jobId",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "FundsCancelForClient",
		"inputs": [
			{
				"type": "uint256",
				"name": "amount",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "FundsCancelForFreelancer",
		"inputs": [
			{
				"type": "uint256",
				"name": "amount",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "FundsCompleted",
		"inputs": [
			{
				"type": "uint256",
				"name": "amount",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "FundsDeposited",
		"inputs": [
			{
				"type": "uint256",
				"name": "amount",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "FundsDepositedofFreelancer",
		"inputs": [
			{
				"type": "uint256",
				"name": "amount",
				"indexed": false,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "JobAccepted",
		"inputs": [
			{
				"type": "uint256",
				"name": "jobId",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "JobApproved",
		"inputs": [
			{
				"type": "uint256",
				"name": "jobId",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "JobCompleted",
		"inputs": [
			{
				"type": "uint256",
				"name": "jobId",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "JobCreated",
		"inputs": [
			{
				"type": "uint256",
				"name": "jobId",
				"indexed": true,
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"anonymous": false
	},
	{
		"type": "function",
		"name": "FreelancerNoSign",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			},
			{
				"type": "string",
				"name": "reason",
				"internalType": "string"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "acceptContract",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			},
			{
				"type": "string",
				"name": "signature",
				"internalType": "string"
			}
		],
		"outputs": [],
		"stateMutability": "payable"
	},
	{
		"type": "function",
		"name": "acceptPolicyContract",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "cancelContract",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			},
			{
				"type": "string",
				"name": "reason",
				"internalType": "string"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "createContract",
		"inputs": [
			{
				"type": "string",
				"name": "_title",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "_description",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "_signature",
				"internalType": "string"
			},
			{
				"type": "uint256",
				"name": "_bids",
				"internalType": "uint256"
			},
			{
				"type": "uint256",
				"name": "_jobId",
				"internalType": "uint256"
			},
			{
				"type": "uint256",
				"name": "_freelancerId",
				"internalType": "uint256"
			},
			{
				"type": "uint256",
				"name": "_clientId",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"stateMutability": "payable"
	},
	{
		"type": "function",
		"name": "finalizeContract",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "getAllContractsByJobId",
		"inputs": [
			{
				"type": "uint256",
				"name": "jobIdInput",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "tuple[]",
				"name": "",
				"components": [
					{
						"type": "uint256",
						"name": "id",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "jobIdcurent",
						"internalType": "uint256"
					},
					{
						"type": "string",
						"name": "title",
						"internalType": "string"
					},
					{
						"type": "uint8",
						"name": "status",
						"internalType": "uint8"
					},
					{
						"type": "uint256",
						"name": "clientId",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "freelancerId",
						"internalType": "uint256"
					}
				],
				"internalType": "struct ContractInfo[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContractById",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "tuple",
				"name": "",
				"components": [
					{
						"type": "string",
						"name": "title",
						"internalType": "string"
					},
					{
						"type": "string",
						"name": "description",
						"internalType": "string"
					},
					{
						"type": "string",
						"name": "signatureC",
						"internalType": "string"
					},
					{
						"type": "string",
						"name": "signatureF",
						"internalType": "string"
					},
					{
						"type": "uint256",
						"name": "bids",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "jobIdcurent",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "clientId",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "freelancerId",
						"internalType": "uint256"
					},
					{
						"type": "uint8",
						"name": "status",
						"internalType": "uint8"
					},
					{
						"type": "address",
						"name": "client",
						"internalType": "address"
					},
					{
						"type": "address",
						"name": "freelancer",
						"internalType": "address"
					},
					{
						"type": "string",
						"name": "cancelReason",
						"internalType": "string"
					},
					{
						"type": "tuple[]",
						"name": "history",
						"components": [
							{
								"internalType": "uint8",
								"name": "typeUser",
								"type": "uint8"
							},
							{
								"internalType": "string",
								"name": "description",
								"type": "string"
							},
							{
								"internalType": "uint8",
								"name": "accepted",
								"type": "uint8"
							}
						],
						"internalType": "struct SmartContract.historyEditPolicy[]"
					}
				],
				"internalType": "struct SmartContract.Job"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContractDetailByIndex",
		"inputs": [
			{
				"type": "uint256",
				"name": "index",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "tuple",
				"name": "",
				"components": [
					{
						"type": "string",
						"name": "title",
						"internalType": "string"
					},
					{
						"type": "string",
						"name": "description",
						"internalType": "string"
					},
					{
						"type": "string",
						"name": "signatureC",
						"internalType": "string"
					},
					{
						"type": "string",
						"name": "signatureF",
						"internalType": "string"
					},
					{
						"type": "uint256",
						"name": "bids",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "jobIdcurent",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "clientId",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "freelancerId",
						"internalType": "uint256"
					},
					{
						"type": "uint8",
						"name": "status",
						"internalType": "uint8"
					},
					{
						"type": "address",
						"name": "client",
						"internalType": "address"
					},
					{
						"type": "address",
						"name": "freelancer",
						"internalType": "address"
					},
					{
						"type": "string",
						"name": "cancelReason",
						"internalType": "string"
					},
					{
						"type": "tuple[]",
						"name": "history",
						"components": [
							{
								"internalType": "uint8",
								"name": "typeUser",
								"type": "uint8"
							},
							{
								"internalType": "string",
								"name": "description",
								"type": "string"
							},
							{
								"internalType": "uint8",
								"name": "accepted",
								"type": "uint8"
							}
						],
						"internalType": "struct SmartContract.historyEditPolicy[]"
					}
				],
				"internalType": "struct SmartContract.Job"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContractsByClient",
		"inputs": [
			{
				"type": "address",
				"name": "clientAddress",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"type": "tuple[]",
				"name": "",
				"components": [
					{
						"type": "uint256",
						"name": "id",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "jobIdcurent",
						"internalType": "uint256"
					},
					{
						"type": "string",
						"name": "title",
						"internalType": "string"
					},
					{
						"type": "uint8",
						"name": "status",
						"internalType": "uint8"
					},
					{
						"type": "uint256",
						"name": "clientId",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "freelancerId",
						"internalType": "uint256"
					}
				],
				"internalType": "struct ContractInfo[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContractsByClientId",
		"inputs": [
			{
				"type": "uint256",
				"name": "clientId",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "tuple[]",
				"name": "",
				"components": [
					{
						"type": "uint256",
						"name": "id",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "jobIdcurent",
						"internalType": "uint256"
					},
					{
						"type": "string",
						"name": "title",
						"internalType": "string"
					},
					{
						"type": "uint8",
						"name": "status",
						"internalType": "uint8"
					},
					{
						"type": "uint256",
						"name": "clientId",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "freelancerId",
						"internalType": "uint256"
					}
				],
				"internalType": "struct ContractInfo[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContractsByFreelancer",
		"inputs": [
			{
				"type": "address",
				"name": "freelancerAddress",
				"internalType": "address"
			}
		],
		"outputs": [
			{
				"type": "tuple[]",
				"name": "",
				"components": [
					{
						"type": "uint256",
						"name": "id",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "jobIdcurent",
						"internalType": "uint256"
					},
					{
						"type": "string",
						"name": "title",
						"internalType": "string"
					},
					{
						"type": "uint8",
						"name": "status",
						"internalType": "uint8"
					},
					{
						"type": "uint256",
						"name": "clientId",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "freelancerId",
						"internalType": "uint256"
					}
				],
				"internalType": "struct ContractInfo[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getContractsByFreelancerId",
		"inputs": [
			{
				"type": "uint256",
				"name": "freelancerId",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "tuple[]",
				"name": "",
				"components": [
					{
						"type": "uint256",
						"name": "id",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "jobIdcurent",
						"internalType": "uint256"
					},
					{
						"type": "string",
						"name": "title",
						"internalType": "string"
					},
					{
						"type": "uint8",
						"name": "status",
						"internalType": "uint8"
					},
					{
						"type": "uint256",
						"name": "clientId",
						"internalType": "uint256"
					},
					{
						"type": "uint256",
						"name": "freelancerId",
						"internalType": "uint256"
					}
				],
				"internalType": "struct ContractInfo[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "getJobInfoByCurrentJobId",
		"inputs": [
			{
				"type": "uint256",
				"name": "currentJobId",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			},
			{
				"type": "string",
				"name": "",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "",
				"internalType": "string"
			},
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			},
			{
				"type": "uint8",
				"name": "",
				"internalType": "uint8"
			},
			{
				"type": "address",
				"name": "",
				"internalType": "address"
			},
			{
				"type": "address",
				"name": "",
				"internalType": "address"
			},
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			},
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			},
			{
				"type": "tuple[]",
				"name": "history",
				"components": [
					{
						"type": "uint8",
						"name": "typeUser",
						"internalType": "uint8"
					},
					{
						"type": "string",
						"name": "description",
						"internalType": "string"
					},
					{
						"type": "uint8",
						"name": "accepted",
						"internalType": "uint8"
					}
				],
				"internalType": "struct SmartContract.historyEditPolicy[]"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "jobId",
		"inputs": [],
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "jobs",
		"inputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"outputs": [
			{
				"type": "string",
				"name": "title",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "description",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "signatureC",
				"internalType": "string"
			},
			{
				"type": "string",
				"name": "signatureF",
				"internalType": "string"
			},
			{
				"type": "uint256",
				"name": "bids",
				"internalType": "uint256"
			},
			{
				"type": "uint256",
				"name": "jobIdcurent",
				"internalType": "uint256"
			},
			{
				"type": "uint256",
				"name": "clientId",
				"internalType": "uint256"
			},
			{
				"type": "uint256",
				"name": "freelancerId",
				"internalType": "uint256"
			},
			{
				"type": "uint8",
				"name": "status",
				"internalType": "uint8"
			},
			{
				"type": "address",
				"name": "client",
				"internalType": "address"
			},
			{
				"type": "address",
				"name": "freelancer",
				"internalType": "address"
			},
			{
				"type": "string",
				"name": "cancelReason",
				"internalType": "string"
			}
		],
		"stateMutability": "view"
	},
	{
		"type": "function",
		"name": "rejectCompletion",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "reportCompletion",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	},
	{
		"type": "function",
		"name": "updatePolicyContract",
		"inputs": [
			{
				"type": "uint256",
				"name": "id",
				"internalType": "uint256"
			},
			{
				"type": "string",
				"name": "_description",
				"internalType": "string"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable"
	}
]