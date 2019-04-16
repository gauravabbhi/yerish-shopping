//example:- https://github.com/zeit/next.js/tree/canary/examples/with-now-env
if (process.env.NODE_ENV !== 'production') {
    require('now-env')
}

module.exports = {
    target: "serverless"
};
