// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../libraries/LibAppStorage.sol";

/**
 * @title L2AggregatorFacet
 * @notice Specialized execution module for L2 Liquidity Aggregators
 */
contract L2AggregatorFacet {
    event AggregatedSwap(address indexed router, uint256 amountIn, uint256 amountOut);

    error SlippageExceeded(uint256 expected, uint256 actual);

    /**
     * @notice Executes a swap via a specialized L2 Aggregator Router
     * @param _router The L2 Aggregator contract address
     * @param _minOut The minimum output required by the Kelly Risk engine
     * @param _payload The encoded swap data from the off-chain engine
     */
    function executeAggregatedSwap(
        address _router,
        uint256 _minOut,
        bytes calldata _payload
    ) external {
        LibAppStorage.enforceCircuitBreaker();
        LibAppStorage.AppStorage storage ds = LibAppStorage.diamondStorage();
        
        require(ds.authorizedTraders[msg.sender], "Auth: Not Authorized");

        uint256 balanceBefore = address(this).balance;

        // Low-level assembly call to the aggregator for maximum gas efficiency
        (bool success, bytes memory result) = _router.call(_payload);
        if (!success) revert("AGGREGATOR_CALL_FAILED");

        // 2026 Anti-Slippage Check
        uint256 balanceAfter = address(this).balance;
        if (balanceAfter - balanceBefore < _minOut) {
            revert SlippageExceeded(_minOut, balanceAfter - balanceBefore);
        }

        emit AggregatedSwap(_router, msg.value, balanceAfter - balanceBefore);
    }
}
