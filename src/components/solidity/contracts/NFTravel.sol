// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTravel is Ownable {

    struct Ticket {
        uint256 ticketNumber;
        string ticketSource;
        string ticketDestination;
        string ticketDate;
        string ticketTime;
        string[] ticketOwnershipHistory;
        bool isTicketAvailable;
        bool isTicketForSale;
        uint256 salePrice;
    }

    mapping (uint256 => Ticket) public AllTickets;
    mapping (string=>Person) public People;

    uint256[] public TicketsForSale;

    uint256 public numTickets = 0;

    event TicketCreated(uint256 id);

    struct Person {
        uint256 personID;
        string personFlowAddress;
        uint256[] personOwnedCollection;
    }

       function CreateTicket(string memory source, string memory destination, string memory date, string memory time, string memory owneraddress) public {
            Ticket memory newTicket = Ticket({
            ticketNumber: numTickets,
            ticketSource: source,
            ticketDestination: destination,
            ticketDate: date,
            ticketTime: time,
            ticketOwnershipHistory: new string[](1),
            isTicketAvailable: true,
            isTicketForSale: false,
            salePrice: 0
            });

            newTicket.ticketOwnershipHistory[0] = owneraddress;

            AllTickets[numTickets] = newTicket;
            emit TicketCreated(numTickets);
            numTickets++;
        }



        function GetTicketDetails(uint256 id) public view returns(uint256,string memory,string memory,string memory,string memory,string[] memory,bool,bool,uint256){
            Ticket memory myTicket = AllTickets[id];
            return(myTicket.ticketNumber,myTicket.ticketSource,myTicket.ticketDestination,myTicket.ticketDate,myTicket.ticketTime,myTicket.ticketOwnershipHistory,myTicket.isTicketAvailable,myTicket.isTicketForSale,myTicket.salePrice);
            
        }

        function GetPersonDetails(string memory addr) public view returns (uint256,string memory, uint256[] memory){
            Person memory myPerson = People[addr];
            return(myPerson.personID,myPerson.personFlowAddress,myPerson.personOwnedCollection);

        }

        function GetTicketsOnSale() public view returns (uint256[] memory){
            return TicketsForSale;
        }
        

        function TransferTicket(string memory sourceAddr, string memory destinationAddr, uint256 id) public returns (bool) {
            Person storage sourcePerson = People[sourceAddr];
            Person storage destinationPerson = People[destinationAddr];

            uint256 len = sourcePerson.personOwnedCollection.length;
            bool flag = true;

            for (uint256 i = 0; i < len && flag; i++) {
                if (sourcePerson.personOwnedCollection[i] == id) {
                    Ticket storage foundTicket = AllTickets[id];
                    foundTicket.ticketOwnershipHistory.push(destinationAddr);
                    AllTickets[id] = foundTicket;
                    destinationPerson.personOwnedCollection.push(id);
                    delete sourcePerson.personOwnedCollection[i];
                    flag = false;
                }
            }

            return flag;
        }

        function ListTicketforSale(uint256 id,uint256 saleprice) public {
            TicketsForSale.push(id);
            Ticket storage myTicket = AllTickets[id];
            myTicket.isTicketForSale = true;
            myTicket.salePrice = saleprice;
            AllTickets[id]= myTicket;
        }

        function unListTicketforSale(uint256 id) public {

            uint256 len = TicketsForSale.length;
            bool flag = true;

            for (uint256 i=0; i<len && flag;i++){
                if(TicketsForSale[i]==id){
                    delete TicketsForSale[i];
                    Ticket storage myTicket = AllTickets[id];
                    myTicket.isTicketForSale = false;
                    myTicket.salePrice = 0;
                    AllTickets[id]= myTicket;
                    flag = false;
                }
            }        
            
        }


        // function getMyTickets(string addr)public view returns ([Ticket]){
        //     Person memory person = People[addr];
        //     uint256 len = person.personOwnedCollection.length;
        //     Ticket[] myTickets = new Ticket[](0);
        //     for(let uint256=0;i<len;i++){


        //     }


        //}





}
