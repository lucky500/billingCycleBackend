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

BillingCycle.route('summary', (req, res, next) => {
    //mongo docs aggregate groups values from multiple documents and return single value
    BillingCycle.aggregate({
        //$projects, passes along the documents with the requested fields to the next stage in the pipeline.
        //$sum - calculates and returns the sum of numeric values.
        $project: { credit: { $sum: "$credits.value" }, debt: {$sum: "$debts.value" }}
    }, {
        //group based in a criteria, _id is mandatory, so we set it to null, with id
        //we are grouping based on year or month, but we want to group everything
        //without a criteria, so we are setting _id to null
        $group: {_id: null, credit: { $sum: "$credit" }, debt: {$sum: "$debt"}}
    }, {
        //projecting our results, setting _id to 0, and grabbing the
        //result of our credit and debit.
        $project: { _id: 0, credit: 1, debt: 1 }
    }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    });
});



module.exports = BillingCycle;