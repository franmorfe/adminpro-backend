const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const eliminarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path );
    }
}

const actualizarImagen =  async (coleccion, id, nombreArchivo) =>{

    let oldPath;

    switch( coleccion ) {

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                return false;
            }

            oldPath = `./uploads/usuarios/${ usuario.img }`;
            eliminarImagen ( oldPath );

            usuario.img = nombreArchivo;
            await usuario.save();

            return true;
            
        break;

        case 'medicos':

            const medico = await Medico.findById(id);
            if ( !medico ) {
                return false;
            }

            oldPath = `./uploads/medicos/${ medico.img }`;
            eliminarImagen ( oldPath );

            medico.img = nombreArchivo;
            await medico.save();

            return true;

        break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                return false;
            }

            oldPath = `./uploads/hospitales/${ hospital.img }`;
            eliminarImagen ( oldPath );

            hospital.img = nombreArchivo;
            await hospital.save();

            return true;

        break;


    }


}


module.exports = {
    actualizarImagen
}