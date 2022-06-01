import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        aplicaciones: [Aplicacion]
        aplicacion(id: ID!): Aplicacion
    }

    type Mutation{
        createAplicacion(
            nombre: String
            prefijo: String
            palabraSecreta: String
            ruta: String
            conexionDB: String
            estado: String
            usuarioCreacion: String
            usuarioModificacion: String
            formatoCarpetaLote: String
        ): String

        updateAplicacion(
            id: ID
            nombre: String
            prefijo: String
            palabraSecreta: String
            ruta: String
            conexionDB: String
            estado: String
            usuarioCreacion: String
            usuarioModificacion: String
            formatoCarpetaLote: String
        ): String

        deleteAplicacion( id: ID ): String

    }

    type Aplicacion {
        id: ID!
        nombre: String
        prefijo: String
        palabraSecreta: String
        ruta: String
        conexionDB: String
        estado: String
        usuarioCreacion: String
        usuarioModificacion: String
        formatoCarpetaLote: String
    }
`

 export const resolvers = {
    Query: {
        aplicaciones: async () => db.aplicacion.findAll({raw : true,
                attributes:[['plc_id','id'],
                           ['plc_nombre','nombre'],
                           ['plc_prefijo','prefijo'],
                           ['plc_palabraSecreta','palabraSecreta'],
                           ['plc_ruta','ruta'],
                           ['plc_conexionDB','conexionDB'],
                           ['plc_estado','estado'],
                           ['plc_usuarioCreacion','usuarioCreacion'],
                           ['plc_usuarioModificacion','usuarioModificacion'],
                           ['pcl_formatoCarpetaLote','formatoCarpetaLote']
                 ]}),
        aplicacion: async (parent, args, context, info) =>{
            const datos = await db.aplicacion.findByPk(args.id, {raw:true, 
                attributes:[['plc_id','id'],
                            ['plc_nombre','nombre'],
                            ['plc_prefijo','prefijo'],
                            ['plc_palabraSecreta','palabraSecreta'],
                            ['plc_ruta','ruta'],
                            ['plc_conexionDB','conexionDB'],
                            ['plc_estado','estado'],
                            ['plc_usuarioCreacion','usuarioCreacion'],
                            ['plc_usuarioModificacion','usuarioModificacion'],
                            ['pcl_formatoCarpetaLote','formatoCarpetaLote']
                ]})
                        
            console.log(datos);
            return datos
        },
    }, 

    Mutation:{
        createAplicacion: async (_, {
            nombre,
            prefijo,
            palabraSecreta,
            ruta,
            conexionDB,
            estado,
            usuarioCreacion,
            usuarioModificacion,
            formatoCarpetaLote,
        }) => {
            try {
                    await db.aplicacion.create({
                        plc_nombre : nombre,
                        plc_prefijo: prefijo,
                        plc_palabraSecreta: palabraSecreta,
                        plc_ruta: ruta,
                        plc_conexionDB: conexionDB,
                        plc_estado: estado,
                        plc_usuarioCreacion: usuarioCreacion,
                        plc_usuarioModificacion: usuarioModificacion,
                        pcl_formatoCarpetaLote: formatoCarpetaLote
                })
                return "aplicación creada con éxito"
            } catch (error) {
                console.log(error);
            }
        },

        updateAplicacion: async(_,{
            id,
            nombre,
            prefijo,
            palabraSecreta,
            ruta,
            conexionDB,
            estado,
            usuarioCreacion,
            usuarioModificacion,
            formatoCarpetaLote
        }) => {
            try {
                     await db.aplicacion.update({
                        plc_nombre : nombre,
                        plc_prefijo: prefijo,
                        plc_palabraSecreta: palabraSecreta,
                        plc_ruta: ruta,
                        plc_conexionDB: conexionDB,
                        plc_estado: estado,
                        plc_usuarioCreacion: usuarioCreacion,
                        plc_usuarioModificacion: usuarioModificacion,
                        pcl_formatoCarpetaLote: formatoCarpetaLote
                }, { where: { plc_id: id } });
                return "registro modificado con éxito"
            } catch (error) {
                console.log(error);
            }
        },

        deleteAplicacion: async (_, args) => {
            await db.aplicacion.destroy({ where: {plc_id: args.id}})
            return "Registro eliminado con éxito"
        }
    }
}


