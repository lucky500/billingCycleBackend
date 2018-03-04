const BillingCycle = require('./billingCycle');

BillingCycle.methods(['get', 'put', 'post', 'delete']);
BillingCycle.updateOptions({ new: true, runValidators: true });

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error){
            res.status(500).json({errors: [error]});
        } else {
            res.json({value});
        }
    });
});

module.exports = BillingCycle;