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

module.exports = router;
