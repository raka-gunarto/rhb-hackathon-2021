pragma solidity >=0.4.21;

pragma experimental ABIEncoderV2;

contract RHBChain {
	uint32 private consortiumAccs;
	uint32 private FIVotingThreshold = 1;

    enum PaymentInterval {
        MONTHLY,
        YEARLY
    }
    enum PaymentType {
        ON_TIME,
        LATE,
        MISSED
    }
	struct CreditAccount {
        address FI;
		uint256 dateOpen; // date of account opening, in UNIX epoch time
		uint256 dateClosed; // date of account closing, in UNIX epoch time
		uint64 balance; // balance of account
		uint64 maxBalance; // 
        PaymentInterval interval;
        PaymentType[] payments;
		string terms;
	}
	struct Inquiry {
		uint256 date; // date of request
		address inquirer;
	}
    struct Profile {
        string name;
		string addr;
		string phone;
		string icNumber;
		uint64 dob; // date of birth, in UNIX epoch time
        
		CreditAccount[] accounts;
		Inquiry[] inquiries;
		bool isValid;
    }
	struct FinancialInstitution {
		string name;
		string addr;
		string phone;
		bool isValid;
		bool isConsortium;
	}
	struct FIRequest {
        string name;
        string addr;
        string phone;
		mapping(address => bool) approvers;
        uint approvals;
		bool isValid;
	}
	struct ConsortiumRequest {
		mapping(address => bool) approvers;
        uint approvals;
		bool isValid;
	}

	mapping(address => Profile) profiles;
    mapping(string => bool) icLookupTbl;

	mapping(address => FinancialInstitution) financialInstitutions;
	mapping(address => FIRequest) FIRequests;

	mapping(address => ConsortiumRequest) consortiumRequests;

	event FIRequestVote (
		address requester, 
        string name, 
        string addr,
        string phone
	);
	event NewFI (
		address approvedFI
	);
	event ConsortiumMemberRequestVote (
		address requester
	);
	event NewConsortiumMember (
		address approvedMember
	);

    modifier isFinancialInstitution () {
        require(financialInstitutions[msg.sender].isValid == true);
        _;
    }
	modifier isFinancialInstitutionOrSelf(address profile) {
		require(financialInstitutions[msg.sender].isValid == true || profile == msg.sender);
		_;
	}
	modifier isConsortium() {
		require(financialInstitutions[msg.sender].isConsortium == true);
		_;
	}

	constructor() public {
		financialInstitutions[msg.sender].isValid = true;
		financialInstitutions[msg.sender].isConsortium = true;
		consortiumAccs = 1;
	}

    function icLookup(string memory icNumber) public view returns (bool) {
        return icLookupTbl[icNumber];
    }

	function getOwnProfile() public view returns (string memory, string memory, string memory, string memory, uint64) {
		Profile memory target = profiles[msg.sender];
		require(target.isValid == true);

		return (target.name, target.addr, target.phone, target.icNumber, target.dob);
	}

	function setOwnProfile(string memory name, string memory addr, string memory phone, string memory icNumber, uint64 dob) public {
        require(icLookupTbl[icNumber] == false);
		Profile storage target = profiles[msg.sender];
        icLookupTbl[icNumber] = true;
		target.isValid = true;
		target.name = name;
		target.addr = addr;
		target.phone = phone;
		target.icNumber = icNumber;
		target.dob = dob;
	}

    function getCreditReportVariables(address profile) public isFinancialInstitutionOrSelf(profile) returns (Profile memory)  {
        Profile storage target = profiles[profile];
        require(target.isValid == true);
        if (msg.sender != profile) {
            target.inquiries.push(Inquiry(block.timestamp, msg.sender));
        }
        return target;
    }

    function openCreditAccount(address profile, string memory terms, uint64 balance, uint paymentInterval) public isFinancialInstitution returns (uint)  {
        CreditAccount memory newCA;
        newCA.FI = msg.sender;
        newCA.dateOpen = block.timestamp;
        newCA.balance = balance;
        newCA.interval = PaymentInterval(paymentInterval);
        newCA.terms = terms;

        Profile storage target = profiles[profile];
        target.accounts.push(newCA);

        return target.accounts.length - 1;
    }
    function closeCreditAccount(address profile, uint UID) public isFinancialInstitution {
        Profile storage target = profiles[profile];
        require(target.accounts[UID].dateClosed == 0);
        CreditAccount storage CA = target.accounts[UID];

        CA.dateClosed = block.timestamp;
    }
    function updateCreditAccountBal(address profile, uint UID, uint64 balance) public isFinancialInstitution {
        Profile storage target = profiles[profile];
        CreditAccount storage CA = target.accounts[UID];

        CA.balance = balance;
    }
    function updateCreditAccountPayment(address profile, uint UID, uint payment) public isFinancialInstitution {
        Profile storage target = profiles[profile];
        CreditAccount storage CA = target.accounts[UID];

        CA.payments.push(PaymentType(payment));
    }

	function getOwnFIProfile() public view returns (string memory, string memory, string memory, bool) {
        FinancialInstitution memory target = financialInstitutions[msg.sender];
        require(target.isValid == true);

        return (target.name, target.addr, target.phone, target.isConsortium);
    }

    function getFIProfile(address profile) public view returns (string memory, string memory, string memory, bool) {
        FinancialInstitution memory target = financialInstitutions[profile];
        require(target.isValid == true);

        return (target.name, target.addr, target.phone, target.isConsortium);
    }

    function setOwnFIProfile(string memory name, string memory addr, string memory phone) public {
        FinancialInstitution storage target = financialInstitutions[msg.sender];
        require(target.isValid == true);

        target.name = name;
        target.addr = addr;
        target.phone = phone; 
    }

    function startFIApplication(string memory name, string memory addr, string memory phone) public {
        FIRequest storage newFI = FIRequests[msg.sender];
        require(newFI.isValid == false);

        newFI.isValid = true;
        newFI.name = name;
        newFI.addr = addr;
        newFI.phone = phone;

        emit FIRequestVote(msg.sender, name, addr, phone);
    }

    function getFIApplicationDetails(address target) public view returns(string memory, string memory, string memory) {
        FIRequest storage newFI = FIRequests[target];
        require(newFI.isValid == true);

        return (newFI.name, newFI.addr, newFI.phone);
    }

    function voteFIApplication(address target) public isFinancialInstitution {
        FIRequest storage newFI = FIRequests[target];
        require(newFI.isValid == true);
        require(newFI.approvers[msg.sender] == false);

        newFI.approvers[msg.sender] = true;
        newFI.approvals += 1;

        if (newFI.approvals >= FIVotingThreshold) {
            newFI.isValid = false;
            
            FinancialInstitution storage approvedFI = financialInstitutions[target];
            approvedFI.name = newFI.name;
            approvedFI.addr = newFI.addr;
            approvedFI.phone = newFI.phone;
            approvedFI.isValid = true;
            approvedFI.isConsortium = false;

            emit NewFI(target);
        }
    }

    function startConsortiumApplication() public isFinancialInstitution{
        ConsortiumRequest storage newConsortium = consortiumRequests[msg.sender];
        require(newConsortium.isValid == false);

        newConsortium.isValid = true;

        emit ConsortiumMemberRequestVote(msg.sender);
    }

    function voteConsortiumApplication(address target) public isConsortium {
        ConsortiumRequest storage newConsortium = consortiumRequests[target];
        require(newConsortium.isValid == true);
        require(newConsortium.approvers[msg.sender] == false);

        newConsortium.approvers[msg.sender] = true;
        newConsortium.approvals += 1;

        if (newConsortium.approvals == consortiumAccs) { // unanimous voting
            newConsortium.isValid = false;
            
            FinancialInstitution storage approved = financialInstitutions[target];
            approved.isConsortium = true;
            consortiumAccs += 1; 

            emit NewConsortiumMember(target);
        }
    }
}
