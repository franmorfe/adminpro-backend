const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');



const fileUpload = async( req, res = response ) => {

    const coleccion = req.params.coleccion;
    const id = req.params.id;

    const coleccionesValidas = ['usuarios', 'medicos', 'hospitales'];

    if ( !coleccionesValidas.includes(coleccion) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El servicio solicitado no existe'
        });
    }

    // Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Ningún archivo adjunto'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ].toLowerCase();

    // Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El formato de imagen no es válido'
        });
    }

    // Generar el nombre del fichero
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path donde guardar la imagen
    const path = `./uploads/${ coleccion }/${ nombreArchivo }`; 

    // Mover la imagen
    file.mv( path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al guardar la imagen'
            });
        }

        return res.json({
            ok: true,
            msg: 'Archivo guardado correctamente',
            nombreArchivo
        });
    });

    actualizarImagen( coleccion, id, nombreArchivo );
   
}

const getImagen = (req, res = response) => {

    const coleccion = req.params.coleccion;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ coleccion }/${ foto }` );

    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const noImage = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( noImage );
    }

}


module.exports =  {
    fileUpload,
    getImagen
}