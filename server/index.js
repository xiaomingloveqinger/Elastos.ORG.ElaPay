import cluster from 'cluster'
import os from 'os'
import express from 'express'
import morgan from 'morgan'
import {
    SERVER_PORT
} from 'config/config'
import mongoose from 'mongoose'
import api from 'modules/api'
import elaprices from 'modules/api/controllers/elaprice'
import querytx from 'modules/api/controllers/querytx'
import subscribewithdetails from 'modules/api/controllers/subscriptiondetails'
import subscribewithtx from 'modules/api/controllers/subscriptionhash'
import bodyParser from 'body-parser';

var constants = require("config/constants");
const system = express()

system.use(bodyParser.json());
system.use(bodyParser.urlencoded({
    extended: true
}));
system.use('/api', api)
system.get('/', (req, res) => {
    res.json('Landing page')
})

//Added  to support Background Jobs
import childProcess from 'child_process';
var _finalizedData = null,
    _httpRequestArray = ['Request Details'];

var data = {
    'start': true,
    'interval': constants.BACKGROUNDJOBSTIMEINTERVAL,
    'content': _httpRequestArray
};

//To Handle requests based on tx hash,details and fetch blocks
system._retrieveTxDetailsChild = childProcess.fork('./services/bcjobs/txDbRetriever');
system._sendTxDetailsChild = childProcess.fork('./services/bcjobs/txCallbackPost');
system._retrieveDetailsPerBlock = childProcess.fork('./services/bcjobs/detailsDbRetriever');
system._sendDetailsPerBlock = childProcess.fork('./services/bcjobs/detailsCallbackPost');
system._retrieveTxBlockDetails = childProcess.fork('./services/bcjobs/fetchblocks');
//Start request based on hash
system._retrieveTxDetailsChild.send(data);
system._sendTxDetailsChild.send(data);
system._retrieveTxBlockDetails.send(data);
system._retrieveDetailsPerBlock.send(data);
system._sendDetailsPerBlock.send(data);

system.use(morgan('dev'))
system.listen(SERVER_PORT, () => console.log(`Server listen to :${SERVER_PORT}`))
