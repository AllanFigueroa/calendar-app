/*
    Event Routes
    /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {isDate} = require('../helpers/isDate');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento,actualizarEvento,eliminarEvento} = require('../controllers/events');

const router = Router();

//Todas las rutas tienen validación de JWT
router.use(validarJWT);


//Obtener Eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de fin es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEvento);

//Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de fin es obligatorio').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);

//Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports = router;