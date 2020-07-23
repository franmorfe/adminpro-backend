const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');


const getUsuarios = async(req, res)=> {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req, res = response)=> {

    const { email, password } = req.body;

    try {

        const existEmail = await Usuario.findOne({ email });

        if ( existEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar token JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        });
    }

}


const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto

    const uid = req.params.id;

    try {
        
        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró ningún usuario con ese id'
            });
        }

        // Actualizaciones
        const { email, password, google, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {

            const existEmail = await Usuario.findOne({ email });
            if ( existEmail ) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );
        
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        });
    }

}


const borrarUsuario = async(req, res = response)=> {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró ningún usuario con ese id'
            });
        }

        const usuarioBorrado = await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        });
    }

    res.json({
        ok: true,
        usuarios
    });
}

module.exports =  {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}