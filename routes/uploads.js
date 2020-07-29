/*
    Path: /api/upload/<coleccion>/<:id>
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { check } = require('express-validator');

const { fileUpload, getImagen } = require('../controllers/uploads');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// default options
router.use(expressFileUpload());

router.put('/:coleccion/:id',
    [
        validarJWT
    ],
    fileUpload
);

router.get('/:coleccion/:foto', getImagen );





module.exports = router;