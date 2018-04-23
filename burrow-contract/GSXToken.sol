/** Token contract written for Gov Canada GC-Blockchain Hackathon. 
 *  This contract is NOT production ready!
 */ 

pragma solidity ^0.4.14;


contract GSXToken {
    
    mapping (address => uint256) public balanceOf;                              //Create the array of client balances
    
    address gsxBank = msg.sender;                                                    //The GSX bank address for redeeming tokens
    
    event Mint(address indexed to, uint256 value);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    function GSXToken() public {
        //address gsxBank = owner;
        balanceOf[gsxBank] = 0;
    }
    
    /**
     * Token creation function in clients' accounts
     *
     * Create `value` tokens to `to` account address
     *
     * @param to the account address to create tokens to
     * @param value the amount of tokens to create
     */
    function mint(address to, uint256 value) public returns (bool success) {
        require (msg.sender == gsxBank);                                        // Check GSX calls the function
        require (to !=0);                                                      // Prevent transfer to 0x0 address(prob unecessary, should instead verify if address exists)
        balanceOf[to] += value;                                               // Increment recipients token balance
        Mint(to, value);
        return true;       
    }
    
    /**
     * Token transfer function between clients
     *
     * Transfer `value` tokens from `from` client account to `_to` client account
     *
     * @param from the account address to send tokens from
     * @param to the account address to send tokens to
     * @param value the amount of tokens to send
     */
    function transfer(address from, address to, uint value) public {
        require(msg.sender == gsxBank);                                         // Check GSX calls the function
        require (to != 0x0);                                                   // Prevent transfer to 0x0 address(see above)
        require (balanceOf[from] >= value);                                   // Check if the sender has enough
        require (balanceOf[to] + value > balanceOf[to]);                     // Check for overflows
        balanceOf[from] -= value;                                             // Subtract from the sender
        balanceOf[to] += value;                                               // Add the same to the recipient
        Transfer(from, to, value);
    }
    
   
    /**
     * Get the token balance of a client account
     * Will be called from the server for now
     *
     * Lookup the token balance of `account` in the balanceOf array     * 
     *
     * @param account the address of the client account 
     */
    function getBalance(address account) public view returns (uint256 balance) {
        require(msg.sender == gsxBank);                                      // Check GSX calls the function
        balance = balanceOf[account];                                        
        return balance;                                           
    }
    
}
