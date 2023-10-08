// SPDX-License-Identifier: MIT
pragma solidity =0.8.19;

/**
 * @author wankhede04 [github]
 * @dev read and write state variable
 */
contract Swisstronik {
    uint256 private value;

    /**
     * @dev Constructor is used to set the initial value for the contract
     * @param _value the value to associate with the value variable.
     */
    constructor(uint256 _value) payable{
        value = _value;
    }

    /**
     * @dev setValue() updates the stored value in the contract
     * @param _value the new value to replace the existing one
     */
    function setValue(uint256 _value) public {
        value = _value;
    }

    /**
     * @dev getValue() retrieves the currently stored value in the contract
     * @return The value associated with the contract
     */
    function getValue() public view returns(uint256) {
        return value;
    }
}
