// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.7;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

interface IBEP20 {
    
  /**
   * @dev Returns the amount of tokens in existence.
   */
  function totalSupply() external view returns (uint256);

  /**
   * @dev Returns the token decimals.
   */
  function decimals() external view returns (uint8);

  /**
   * @dev Returns the token symbol.
   */
  function symbol() external view returns (string memory);

  /**
  * @dev Returns the token name.
  */
  function name() external view returns (string memory);

  /**
   * @dev Returns the bep token owner.
   */
  function getOwner() external view returns (address);

  /**
   * @dev Returns the amount of tokens owned by `account`.
   */
  function balanceOf(address account) external view returns (uint256);

  /**
   * @dev Moves `amount` tokens from the caller's account to `recipient`.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transfer(address recipient, uint256 amount) external returns (bool);

  /**
   * @dev Returns the remaining number of tokens that `spender` will be
   * allowed to spend on behalf of `owner` through {transferFrom}. This is
   * zero by default.
   *
   * This value changes when {approve} or {transferFrom} are called.
   */
  function allowance(address _owner, address spender) external view returns (uint256);

  /**
   * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * IMPORTANT: Beware that changing an allowance with this method brings the risk
   * that someone may use both the old and the new allowance by unfortunate
   * transaction ordering. One possible solution to mitigate this race
   * condition is to first reduce the spender's allowance to 0 and set the
   * desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   *
   * Emits an {Approval} event.
   */
  function approve(address spender, uint256 amount) external returns (bool);

  /**
   * @dev Moves `amount` tokens from `sender` to `recipient` using the
   * allowance mechanism. `amount` is then deducted from the caller's
   * allowance.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

  /**
   * @dev Emitted when `value` tokens are moved from one account (`from`) to
   * another (`to`).
   *
   * Note that `value` may be zero.
   */
  event Transfer(address indexed from, address indexed to, uint256 value);

  /**
   * @dev Emitted when the allowance of a `spender` for an `owner` is set by
   * a call to {approve}. `value` is the new allowance.
   */
  event Approval(address indexed owner, address indexed spender, uint256 value);
  
}
/**
 * Tracer Standard Vesting Contract
 */
contract VestingPublic is Ownable {

    //initialize data: token, member, vesting time
    IBEP20 public token;
    mapping(uint256 => address) private treasuryWallet;
    uint256 numberOfParticipants;
    uint256[] public vestingTimeList;
    uint256 totalSoldAmount = 0;
    uint256 tempSoldAmount = 0;
    mapping(address => bool) public admins;
    bytes32 private merkleRoot;
    uint public whitelistSaleEndTime = 0;
    uint public fcfsLimitAmount = 0 * 10 ** 18;


    //tiger of members
    struct Tier {
        uint256 tierId;
        uint256 amountMax;
    }

    mapping(address => uint256) public whitelistOfTiers; //whitelist: (address => maxAmount)

    struct Schedule {
        uint256 amount;
        uint256 claimedAmount;
        uint256 unlockTime;
        bool isFixed;
    }

    struct Plain {
        uint256 percentage;
        uint256 unlockTime;
        bool isSent;
    }
    Plain[] public schedulePlain; // array of plains

    // user => scheduleId => schedule
    mapping(address => mapping(uint256 => Schedule)) public schedules;
    mapping(address => bool) public isSoldWhitelist; //if WL user buy the token, is ture
    mapping(address => uint256) public locked; //locked amount mapping by address

    event Claim(address indexed claimer, uint256 amount);
    event Cancelled(address account);
    event NewVesting(address indexed investor, uint256 amount, bool isFixed);
    event AddNewAdmin(address _address);
    event RemoveAdminAddress(address _address);
    event UnlockTokens(uint256 _timestamp);
    event UpdateTreasuryWallet(address _treasuryWallet);

    modifier onlyAdmin() {
        require(_msgSender() != address(0x0) && admins[_msgSender()], "Caller is not the admin");
        _;
    }

    modifier checkWhitelist(address account, uint256 amount) {
        uint256 maxAmount = whitelistOfTiers[account];
        require(maxAmount != 0 && maxAmount >= amount, "Invalid whitelist member!");
        _;
    }

    constructor() {
        token = IBEP20(address(0xAd1f255571aC404d1213842Ad86658F8C6b3D717)); // token address
        treasuryWallet[0] = address(0xfB0712351456058AF6Ba5bBE06E13DFF8dd87a36); //treasury wallet address
        treasuryWallet[1] = address(0xfB0712351456058AF6Ba5bBE06E13DFF8dd87a36); //treasury wallet address

        admins[owner()] = true;  // add owner to admin role
        numberOfParticipants = 0; //set the initial numberOfParticipants

        // add schedule time
        vestingTimeList.push(1649685600); 

        vestingTimeList.push(1652184000);
        vestingTimeList.push(1654862400);
        vestingTimeList.push(1657454400);

        vestingTimeList.push(1660132800);
        vestingTimeList.push(1662811200);
        vestingTimeList.push(1665403200);


        //set the schedule plain
        for(uint256 i = 0; i < vestingTimeList.length; i++){
            if(i == 0) { // after TGE 
                schedulePlain.push(Plain(
                    500000, //%
                    vestingTimeList[i],
                    false
                ));
            }else { // next steps
                schedulePlain.push(Plain(
                    1583333, //%
                    vestingTimeList[i],
                    false
                ));
            }
        }

        whitelistOfTiers[owner()] = 87500000 * 10 ** 18;
    }

    function _leaf(address account) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(account));
    }

    function verifyWhitelist(bytes32 leaf, bytes32[] memory proof) private view returns (bool) {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (computedHash < proofElement) {
                // Hash(current computed hash + current element of the proof)
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                // Hash(current element of the proof + current computed hash)
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }

        // Check if the computed hash (root) is equal to the provided root
        return computedHash == merkleRoot;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner returns (bytes32) {
        merkleRoot = _merkleRoot;
        return merkleRoot;
    }

    function getRoot() external view returns(bytes32){
        return merkleRoot;
    }

    function addAdmin(address _address) external onlyOwner {
        require(_address != address(0x0), "Zero address");
        require(!admins[_address], "This address is already added as an admin");
        admins[_address] = true;
        emit AddNewAdmin(_address);
    }

    function removeAdmin(address _address) external onlyOwner {
        require(_address != address(0x0), "Zero address");
        require(admins[_address], "This address is not admin");
        admins[_address] = false;
        emit RemoveAdminAddress(_address);
    }

    function getTotalSoldAmount() external view returns(uint256) {
        return totalSoldAmount;
    }

    function getTempSoldAmount() external view returns(uint256) {
        return tempSoldAmount;
    }

    function getParticipants() external view returns(uint256) {
        return numberOfParticipants;
    }

    function setTreasuryWallet(address _treasuryWallet) external onlyAdmin {
        treasuryWallet[0] = _treasuryWallet;
        emit UpdateTreasuryWallet(_treasuryWallet);
    }

    function getTreasuryWallet() external view returns(address) {
        return treasuryWallet[0];
    }

    function setWLEndTime(uint256 _whitelistSaleEndTime) external onlyAdmin {
        whitelistSaleEndTime = _whitelistSaleEndTime;
    }

    function getWLEndTime() external view returns(uint256) {
        return whitelistSaleEndTime;
    }

    function setFcfsLimitAmount(uint256 _fcfsLimitAmount) external onlyAdmin {
        fcfsLimitAmount = _fcfsLimitAmount * 10 ** 18;
    }

    function getFcfsLimitAmount() external view returns(uint256) {
        return fcfsLimitAmount;
    }

    /**
     * @notice Sets up a vesting schedule for a set user.
     * @dev adds a new Schedule to the schedules mapping.
     * @param amount the amount of tokens being vested for the user.
     * @param isFixed a flag for if the vesting schedule is fixed or not. Fixed vesting schedules can't be cancelled.
     */
    function addVest(
        bytes32[] memory _proof,
        uint256 amount,
        bool isFixed,
        address payCurrency
    ) public {
        // check amount
        amount = amount * (10 ** 18);
        uint256 usdAmountToBuyToken = amount * 1 / 100;
        require(amount > 0, "Vesting: cspd token amount parameter is invalid");
        require(payCurrency != address(0x0), "vesting: currency address in invalid");
        require(IBEP20(payCurrency).balanceOf(msg.sender) >= usdAmountToBuyToken, "Vesting: currency token amount is not enough");
        // require the token is present
        uint256 currentLocked = locked[address(token)];
        require(IBEP20(token).balanceOf(address(this)) >= currentLocked + amount, "Vesting: Not enough tokens");

        //check whitelist
        require(verifyWhitelist(_leaf(msg.sender), _proof) == true,"Vesting: You are not a member of the whitelist!");
        if(isFixed){
            require(!isSoldWhitelist[msg.sender], "Vesting: you had already bought the SWPR as a member of the whitelist!");
        } else{
            require(block.timestamp >= whitelistSaleEndTime, "Vesting: you can't use the FCFS, yet!");
            require(locked[msg.sender] + amount <= fcfsLimitAmount, "Vesting: your order amount is over the limit!");
        }

        for(uint256 i = 0; i < schedulePlain.length; i++){
            uint256 _amount = amount * schedulePlain[i].percentage / 100 / 100000;
            _amount += schedules[msg.sender][i].amount;
            uint256 _unlockTime = schedulePlain[i].unlockTime;

            schedules[msg.sender][i] = Schedule(
                _amount,
                0,
                _unlockTime,
                true
            );
        }

        //if this user is first client, add him to participant
        if(isSoldWhitelist[msg.sender] == false && locked[msg.sender] == 0)
            numberOfParticipants ++;

        if(isFixed){
            isSoldWhitelist[msg.sender] = true;
        }
        else{
            locked[msg.sender] += amount;
        }

        locked[address(token)] = currentLocked + amount;
        totalSoldAmount += amount;
        if(numberOfParticipants >= 150 && numberOfParticipants < 1200){
            if(((numberOfParticipants - 150) % 3) == 0){
                IBEP20(payCurrency).transferFrom(msg.sender, address(treasuryWallet[1]), usdAmountToBuyToken); 
            }else {
                IBEP20(payCurrency).transferFrom(msg.sender, address(treasuryWallet[0]), usdAmountToBuyToken);
            }
        }else{
            IBEP20(payCurrency).transferFrom(msg.sender, address(treasuryWallet[0]), usdAmountToBuyToken);
        }
        emit NewVesting(msg.sender, amount, isFixed);
    }

    /**
     * @notice allows users to claim vested tokens if the cliff time has passed.
     * @param scheduleNumber which schedule the user is claiming against
     */
    function claim(uint256 scheduleNumber) external {
        Schedule storage schedule = schedules[msg.sender][scheduleNumber];
        require(
            schedule.unlockTime <= block.timestamp,
            "Vesting: unlockTime not reached"
        );
        require(schedule.amount > 0, "Vesting: not claimable");

        uint256 amountToTransfer = schedule.amount - schedule.claimedAmount;
        schedule.claimedAmount = schedule.amount; // set new claimed amount based off the curve
        locked[address(token)] = locked[address(token)] - amountToTransfer;
        require(IBEP20(token).transfer(msg.sender, amountToTransfer), "Vesting: transfer failed");
        emit Claim(msg.sender, schedule.amount);
    }

    /**
     * @notice Allows a vesting schedule to be cancelled.
     * @dev Any outstanding tokens are returned to the system.
     * @param account the account of the user whos vesting schedule is being cancelled.
     */
    function rug(address account, uint256 scheduleId) external onlyAdmin {
        Schedule storage schedule = schedules[account][scheduleId];
        require(!schedule.isFixed, "Vesting: Account is fixed");
        uint256 outstandingAmount = schedule.amount -
            schedule.claimedAmount;
        require(outstandingAmount != 0, "Vesting: no outstanding tokens");
        schedule.amount = 0;
        locked[address(token)] = locked[address(token)] - outstandingAmount;
        require(IBEP20(token).transfer(owner(), outstandingAmount), "Vesting: transfer failed");
        emit Cancelled(account);
    }

    /**
     * @return calculates the amount of tokens to distribute to an account at any instance in time, based off some
     *         total claimable amount.
     * @param amount the total outstanding amount to be claimed for this vesting schedule.
     * @param currentTime the current timestamp.
     * @param startTime the timestamp this vesting schedule started.
     * @param endTime the timestamp this vesting schedule ends.
     */
    
    /**
     * @notice Withdraws CSPD tokens from the contract.
     * @dev blocks withdrawing locked tokens.
     */
    function withdraw(uint256 amount) external onlyAdmin {
        amount = amount * 10 ** 18;
        // require(
        //     token.balanceOf(address(this)) - locked[address(token)] >= amount,
        //     "Vesting: Can't withdraw"
        // );
        require(token.transfer(owner(), amount), "Vesting: withdraw failed");
    }

    function multiSetTierOfAccount(
        address[] calldata accounts,
        uint256[] calldata _maxAmount
    ) external onlyAdmin {
        uint256 _numberOfAccounts = accounts.length;
        require( _maxAmount.length == _numberOfAccounts, "Tier: Array lengths differ");

        for (uint256 i = 0; i < _numberOfAccounts; i++) {
            require( accounts[i] != address(0x0) && _maxAmount[i] > 0, "Tier: invalid tier params");
            whitelistOfTiers[accounts[i]] = _maxAmount[i] * 10 ** 18;
        }
    }

    function setTierOfAccount(
        address account,
        uint256 _maxAmount
    ) external onlyAdmin {
        require(_maxAmount > 0, "Tier: index of tier is invalid");
        whitelistOfTiers[account] = _maxAmount * 10 ** 18;
    }

    function getTierOfAccount(
        address account
    ) public view returns (uint256){
        return whitelistOfTiers[account];
    }

    function getIsSoldWhitelist(
        address account
    ) public view returns (bool){
        return isSoldWhitelist[account];
    }

    function getSchedulePlain() external view returns(Plain [] memory) {
        return schedulePlain;
    }
}