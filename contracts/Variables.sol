// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Variables {
    uint256 public myUInt;

    function setMyUInt (uint _myUInt) public {
        myUInt = _myUInt;
    }

    bool public myBool;

    function setMyBool (bool _myBool) public {
        myBool = _myBool;
    }

    uint8 public myUInt8;

    function increment () public {
        unchecked {
            myUInt8++;
        }
    }

    function decrement () public {
        unchecked {
            myUInt8--;
        }
    }

    address public myAddress;

    function setMyAddress (address _myAddress) public {
        myAddress = _myAddress;
    }

    function getBalanceOfAddress () public view returns (uint) {
        return myAddress.balance;
    }

    string public myString = "Hello World!";

    function setMyString (string memory _myString) public {
        myString = _myString;
    }
}