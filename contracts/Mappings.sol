// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Mappings {
    mapping(uint => bool) public myMapping;
    mapping(address => bool) public myAddressMapping;

    function setMapping (uint index) public {
        myMapping[index] = true;
    }

    function setAddressMapping() public {
        myAddressMapping[msg.sender] = true;
    }
}