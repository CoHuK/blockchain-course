// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Mappings {
    mapping(uint => bool) public myMapping;

    function setMapping (uint index) public {
        myMapping[index] = true;
    }
}