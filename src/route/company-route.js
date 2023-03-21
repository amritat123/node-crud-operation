// company route ----------------

const company_controller = require('../controller/company-controller');

const  express = require('express')
const router = express.Router();

router.post('/add_company', company_controller.add_company);
router.get('/get_company', company_controller.get_company);
router.patch('/update_company', company_controller.update_company);
router.delete('/delete_company/:id', company_controller.delete_company_by_id);
module.exports = router;
