const router = require('express').Router();
const requestHandler = require('./request-handler.js');

router.get('/open', requestHandler.getOpenTickets);
router.get('/archive', requestHandler.getArchivedTickets);
router.post('/ticket', requestHandler.submitTicket);
router.put('/ticket', requestHandler.updateTicket);
router.post('/delete', requestHandler.deleteTicket);

router.get('/getResponse', requestHandler.getResponse);
router.get('/getDataServerA', requestHandler.getDataServerA);
router.get('/getDataServerB', requestHandler.getDataServerB);

router.get('/getDataServerB', requestHandler.getDataServerB);


router.get('/getCalculators', requestHandler.getCalculators);
router.get('/getCalculator', requestHandler.getCalculator);
router.post('/createCalculator', requestHandler.createCalculator);
router.post('/saveCalculator', requestHandler.saveCalculator);

module.exports = router;
