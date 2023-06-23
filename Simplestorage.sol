//SPDX-License_Identifier: MIT;
pragma solidity ^0.8.0;

contract Simplestorage{
    uint a;

    function set(uint _a) public {
        a = _a;
    }

    function get()public view returns(uint){
        return a;
    }
}