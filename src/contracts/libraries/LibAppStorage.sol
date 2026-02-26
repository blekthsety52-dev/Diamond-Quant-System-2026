// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library LibAppStorage {
    struct AppStorage {
        mapping(address => bool) authorizedTraders;
        bool circuitBreaker;
        // ... other storage slots
    }

    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }

    function enforceCircuitBreaker() internal view {
        AppStorage storage ds = diamondStorage();
        require(!ds.circuitBreaker, "Circuit Breaker Active");
    }
}
