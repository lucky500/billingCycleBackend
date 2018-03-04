const BillingCycle = require('./billingCycle');

BillingCycle.methods(['get', 'put', 'post', 'delete']);
BillingCycle.updateOptions({ new: true, runValidators: true });

module.exports = BillingCycle;