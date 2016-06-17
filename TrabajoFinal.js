//Listado de URLs accedidas por un usuario en concreto, ordenado por fecha y hora de acceso. Ejemplo usuario 39
db.accesos.find({id_usuario:39}).sort({ fecha_acceso:1 })
//Listado de todos los usuarios que han accedido a una URL del gestor.
db.accesos.distinct("id_usuario",{ app_acceso: "Gestor" })
//Listado de todos los usuarios que han accedido a la aplicación en un rango de tiempo específico.
db.accesos.find({'fecha_acceso':{$gte:ISODate('2015-09-17'),$lte:ISODate('2015-09-18')}},{_id:0,id_usuario:1})
//Identificador del último usuario que ha utilizado la aplicación cliente.
db.accesos.find({"app_acceso":"Cliente"},{_id:0,id_usuario:1}).sort({ fecha_acceso:-1 }).limit(1)
//Listado de todas las URLs almacenadas y el número de accesos que ha tenido cada una.
db.accesos.mapReduce(function(){emit(this.url,1)},
                    function(key,values) {return Array.sum(values)},
                    {
                        out:{inline:1}
                        }
)
//Listado de todas las URLs con dos o más tags asociados.
//Listado de usuarios que han accedido a URLs con una sola etiqueta. Además de mostrar el usuario, muestra también el tag asociado.
//Listado de los tags existentes en la collection y la cantidad de URLs asociadas a ese tag.
//Listado de usuarios que han accedido a una URL con un tag específico.
db.accesos.find({ $and: [{url:"http://spotify.com"}, {tags: "ocio" }]}, { _id: 0, id_usuario: 1 })
//Cantidad de URLs asociadas a un tag específico.
