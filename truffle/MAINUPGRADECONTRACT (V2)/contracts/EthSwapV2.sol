pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthSwapV2 {
    string public name;
    uint256 public timeDiffrence;
    uint256 public oneDay;
    uint256 public sixMonth;
    uint256 public twelveMonth;
    uint256 public twentyFourMonth;
    uint256 public unstakeAmount;
    uint256 public incentiveAmount;
    uint256 public countIntrest;
    uint256 public currentTime;
    IERC20 public token;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public isStaking;

    mapping(address => uint256) public stakes;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rateFtp
    );

    function storeConstructor(
        IERC20 _token,
        string memory _name,
        uint256 _oneDay,
        uint256 _sixMonth,
        uint256 _twelveMonth,
        uint256 _twentyFourMonth
    ) public {
        stakeholders.push();
        token = _token;
        name = _name;
        oneDay = _oneDay;
        sixMonth = _sixMonth;
        twelveMonth = _twelveMonth;
        twentyFourMonth = _twentyFourMonth;
    }

    struct Stake {
        address user;
        uint256 amount;
        uint256 since;
        bool claimable;
        uint256 stakeStatus;
    }
    struct Stakeholder {
        address user;
        Stake[] address_stakes;
    }

    Stakeholder[] public stakeholders;

    event Staked(
        address indexed user,
        uint256 amount,
        uint256 index,
        uint256 timestamp
    );

    function buyTokens(uint256 _liveRate) public payable {
        uint256 tokenAmount = msg.value * _liveRate + 3000000000000000000;
        // uint256 tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, address(token), tokenAmount, _liveRate);
        // emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

//   function buyTokens() public payable {
//     uint256 tokenAmount = msg.value * rate;
//     require(token.balanceOf(address(this)) >= tokenAmount);

//     token.transfer(msg.sender, tokenAmount);

//     emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
//   }

    function _addStakeholder(address staker) internal returns (uint256) {
        stakeholders.push();
        uint256 userIndex = stakeholders.length - 1;
        stakeholders[userIndex].user = staker;
        stakes[staker] = userIndex;
        return userIndex;
    }

    function stakeTokens(uint256 _amount, uint256 status) public {
        require(_amount > 0, "Cannot stake nothing");

        uint256 index = stakes[msg.sender];
        uint256 timestamp = block.timestamp;
        if (index == 0) {
            index = _addStakeholder(msg.sender);
        }
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        isStaking[msg.sender] = true;
        token.transferFrom(msg.sender, address(this), _amount);

        stakeholders[index].address_stakes.push(
            Stake(msg.sender, _amount, timestamp, true, status)
        );
        emit Staked(msg.sender, _amount, index, timestamp);
    }

    function _withdrawStake(uint256 index)
        public
        returns (uint256)
    {
        uint256 user_index = stakes[msg.sender];
        Stake memory current_stake = stakeholders[user_index].address_stakes[
            index
        ];
        // require(
        //     current_stake.amount >= amount,
        //     "Staking: Cannot withdraw more than you have staked"
        // );
        // ******************************************************************************************************************* //
        if (current_stake.claimable == true) {
            current_stake.claimable = false;

            currentTime = block.timestamp;

            timeDiffrence = currentTime - current_stake.since;

            unstakeAmount = current_stake.amount;

            uint256 ftpPercentage24M;
            uint256 ftpPercentage12M;
            uint256 ftpPercentage06M;
            if (current_stake.stakeStatus == 2) {
                ftpPercentage24M = 30;
                ftpPercentage12M = 25;
                ftpPercentage06M = 20;
            } else {
                ftpPercentage24M = 15;
                ftpPercentage12M = 10;
                ftpPercentage06M = 7;
            }

            if (timeDiffrence >= twentyFourMonth) {
                countIntrest = ((unstakeAmount / 100) * ftpPercentage24M) * 2;
                incentiveAmount = countIntrest + unstakeAmount;

            } else if (timeDiffrence >= twelveMonth) {
                countIntrest = ((unstakeAmount / 100) * ftpPercentage12M);
                incentiveAmount = countIntrest + unstakeAmount;

            } else if (timeDiffrence >= sixMonth) {
                countIntrest = ((unstakeAmount / 100) * ftpPercentage06M) / 2;
                incentiveAmount = countIntrest + unstakeAmount;

            } else if (timeDiffrence >= oneDay) {
                countIntrest = ((unstakeAmount / 100) * ftpPercentage06M) / 2;
                incentiveAmount = countIntrest + unstakeAmount;

            } else {
                incentiveAmount = unstakeAmount;
            }

            token.transfer(msg.sender, incentiveAmount);
            // token.transfer(msg.sender, current_stake.amount + 10000000000000000000);
            stakingBalance[msg.sender] =
                stakingBalance[msg.sender] -
                current_stake.amount;
        }
    }
}
