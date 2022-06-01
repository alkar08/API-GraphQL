import { gql } from 'apollo-server-express'
import { raw } from 'body-parser'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        getAllVariables: [variableGlobal]
        getVariable(id: ID!): variableGlobal
    }

    extend type Mutation {
        createVariable(
            nombre: String
            valor: String
            usuarioCreacion: String
            usuarioModificacion: String
            idAplicacion: Int
        ): String

        updateVariable(
            id: ID
            nombre: String
            valor: String
            usuarioCreacion: String
            usuarioModificacion: String
            idAplicacion: Int
        ): String

        deleteVariable( id: ID): String
    }

    type variableGlobal {
        id: ID!
        nombre: String
        valor: String
        usuarioCreacion: String
        usuarioModificacion: String
        idAplicacion: Int
     }
`

export const resolvers = {
    Query: {
        getAllVariables: async () => db.variablesGlobales.findAll({raw:true,
            attributes:[['vgl_id','id'],
                ['vgl_nombre','nombre'],
                ['vgl_valor','valor'],
                ['vgl_usuarioCreacion','usuarioCreacion'],
                ['vgl_usuarioModificacion','usuarioModificacion'],
                ['vgl_idAplicacion','idAplicacion']
            ]}),
        getVariable: async (obj, args, context, info) =>{
          const variable_global = await db.variablesGlobales.findByPk(args.id, {raw:true,
            attributes:[['vgl_id','id'],
                ['vgl_nombre','nombre'],
                ['vgl_valor','valor'],
                ['vgl_usuarioCreacion','usuarioCreacion'],
                ['vgl_usuarioModificacion','usuarioModificacion'],
                ['vgl_idAplicacion','idAplicacion']
            ]})
          console.log("datos", variable_global);
          return variable_global
        }
    },
    Mutation:{
        createVariable: async (obj, {
            nombre, 
            valor,
            usuarioCreacion,
            usuarioModificacion,
            idAplicacion
        }) => {
            try {
                    await db.variablesGlobales.create({
                    vgl_nombre: nombre, 
                    vgl_valor: valor,
                    vgl_usuarioCreacion: usuarioCreacion,
                    vgl_usuarioModificacion: usuarioModificacion,
                    vgl_idAplicacion: idAplicacion 
                })
                return "Variable creada con éxito"
            } catch (error) {
                console.log(error);
            }
        },

        updateVariable: async (_, {
            id,
            nombre,
            valor,
            usuarioCreacion,
            usuarioModificacion,
            idAplicacion
        }) => {
            try {
                
                    await db.variablesGlobales.update({
                        vgl_nombre: nombre, 
                        vgl_valor: valor,
                        vgl_usuarioCreacion: usuarioCreacion,
                        vgl_usuarioModificacion: usuarioModificacion,
                        vgl_idAplicacion: idAplicacion 
                    }, { where: { vgl_id: id }});
                    return "Registro actualizado con éxito"
            } catch (error) {
                    console.log(error);
            }
        }, 

        deleteVariable: async(_, args) => {
            await db.variablesGlobales.destroy({ where: {vgl_id : args.id }})
            return "Registro eliminado con éxito"
        }
    }    
}
