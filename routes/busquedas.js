/*
    Path: /api/todo/<busqueda>
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:busqueda', validarJWT,  getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT,  getDocumentosColeccion);

router.post('/', 
    [
        validarJWT,
        // check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        // validarCampos
    ],
    getTodo
);

router.put('/:id',
    [
    
    ],
    getTodo
);

router.delete('/:id',
    [
    
    ], 
    getTodo
);


module.exports = router;