const express = require('express');

module.exports = function(server){
    //Define URL base for all routes
    const router = express.Router()
    server.use('/api', router)

    //Routes billing cycle
    const BillingCycle = require('../api/billingCycle/billingCycleService');
    BillingCycle.register(router, '/billingCycles');
}