// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract StartStopUpdate {
    address owner;
    bool paused;

    constructor () {
        owner = msg.sender ;
    }
    function setPaused (bool _setPaused) public {
        require(msg.sender == owner, "You are not the owner");
        paused = _setPaused;
    }
    function sendMoney () public payable {}
    function withdrawAllMoney (address payable _to) public {
        require(msg.sender == owner, "You are not the owner");
        require(!paused, "This contract is paused");
        _to.transfer(address(this).balance);
    }

    function destroySmartContruct(address payable _to) public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(_to);
    }
}