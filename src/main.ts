import * as sourceMapSupport from 'source-map-support';

import * as _ from 'lodash';

function initSourceMap() {
    if (process.env.NODE_ENV === 'development') {
        sourceMapSupport.install();
        console.log('ENV_LOG:', 'SOURCE MAP ENABLED');
    }
}

async function main() {
    initSourceMap();
}
main();
