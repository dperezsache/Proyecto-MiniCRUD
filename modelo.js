/**
	@file Contiene el modelo de la aplicación.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/

/**
	Clase Modelo.
	Gestiona los datos de la aplicación.
**/
export class Modelo
{
    constructor(controlador)
    {
        this.controlador = controlador;
		this.callbacks = [];
		this.listaPersonajes;
		this.db;
		this.conectarDB();
    }

	/**
		Iniciar conexión con la base de datos.
	**/
	conectarDB()
	{
		const peticion = window.indexedDB.open('PersonajesDB', 1);

		peticion.onsuccess = (event) => {
			this.db = event.target.result;
			this.obtenerRegistros();
		}

		peticion.onupgradeneeded = (event) => {
			this.db = event.target.result;
			this.db.createObjectStore('tablaPersonajes', { keyPath: 'id', autoIncrement: true });
		}

		peticion.onerror = () => console.error('Error al conectar con la BBDD');
	}

	/**
		Registra un objeto para informarle de los cambios en el Modelo.
		@param {Function} callback Función de callback que será llamada cuando cambien los datos.
	**/
	registrar(callback)
	{
		this.callbacks.push(callback);
	}

	/**
		Ejecuta todos los callback registrados.
	**/
	avisar()
	{
		for(let callback of this.callbacks)
			callback();
	}

	/**
	 	Insertar registro en la BD.
		@param {String} nombre Nombre del personaje.
		@param {String} descripcion Descripción del personaje.
		@param {String} fecha Fecha de aparición del personaje.
		@param {String} url URL con más información sobre el personaje.
		@param {File} imagen Imagen del personaje.
		@param {String} tipo Tipo de personaje.
	**/
	insertar(nombre, descripcion, fecha, url, imagen, tipo)
	{
		// Quitar el http(s) que pueda haber en la url
		url = url.replace('http://', '');
		url = url.replace('https://', '');

		if(imagen)
		{
			// Transformar imagen a base64 y generar objeto del personaje
			let reader = new FileReader();
			reader.readAsDataURL(imagen);
			reader.onload = () => 
			{
				const personaje = {
					'nombre': nombre,
					'descripcion': descripcion,
					'fecha': fecha,
					'url': url,
					'imagen': reader.result,
					'tipo': tipo
				};

				const peticion = this.db.transaction('tablaPersonajes', 'readwrite').objectStore('tablaPersonajes').add(personaje);
				peticion.onsuccess = () => this.obtenerRegistros();
			};
		}
		else
		{
			const personaje = {
				'nombre': nombre,
				'descripcion': descripcion,
				'fecha': fecha,
				'url': url,
				'imagen': null,
				'tipo': tipo
			};

			const peticion = this.db.transaction('tablaPersonajes', 'readwrite').objectStore('tablaPersonajes').add(personaje);
			peticion.onsuccess = () => this.obtenerRegistros();
		}
	}

	/**
		Obtener personaje usando el ID, para después poder actualizarlo.
		@param {Number} id ID del personaje.
		@param {String} nombre Nombre del personaje.
		@param {String} descripcion Descripción del personaje.
		@param {String} fecha Fecha de aparición del personaje.
		@param {String} url URL con más información sobre el personaje.
		@param {File} imagen Imagen del personaje.
		@param {String} tipo Tipo de personaje.
	**/
	procesarPersonaje(id, nombre, descripcion, fecha, url, imagen, tipo)
	{
		const peticion = this.db.transaction('tablaPersonajes', 'readwrite').objectStore('tablaPersonajes').get(parseInt(id));
		peticion.onsuccess = (event) => {
			const datos = event.target.result;
			this.actualizarPersonaje(datos, nombre, descripcion, fecha, url, imagen, tipo);
		}
	}

	/**
		Actualizar los datos de un personaje de la base de datos.
		@param {Object} datos Datos del personaje.
		@param {String} nombre Nombre del personaje.
		@param {String} descripcion Descripción del personaje.
		@param {String} fecha Fecha de aparición del personaje.
		@param {String} url URL con más información sobre el personaje.
		@param {File} imagen Imagen del personaje.
		@param {String} tipo Tipo de personaje.
	**/
	actualizarPersonaje(datos, nombre, descripcion, fecha, url, imagen, tipo)
	{
		// Quitar el http(s) que pueda haber en la url
		url = url.replace('http://', '');
		url = url.replace('https://', '');

		datos.nombre = nombre;
		datos.descripcion = descripcion;
		datos.fecha = fecha;
		datos.url = url;
		datos.tipo = tipo;

		if(imagen)
		{
			let reader = new FileReader();
			reader.readAsDataURL(imagen);
			reader.onload = () => {
				datos.imagen = reader.result;
				const peticion = this.db.transaction('tablaPersonajes', 'readwrite').objectStore('tablaPersonajes').put(datos);
				peticion.onsuccess = () => this.obtenerRegistros();
			};
		}
		else
		{
			datos.imagen = null;
			const peticion = this.db.transaction('tablaPersonajes', 'readwrite').objectStore('tablaPersonajes').put(datos);
			peticion.onsuccess = () => this.obtenerRegistros();
		}
	}

	/**
		Elimina un registro de la BBDD.
		@param {Number} id Nº identificador del registro a eliminar.
	**/
	borrar(id)
	{
		const peticion = this.db.transaction('tablaPersonajes', 'readwrite').objectStore('tablaPersonajes').delete(id);
		peticion.onsuccess = () => this.obtenerRegistros();
	}

	/**
		Devuelve los registros de la base de datos a un array en el modelo, después llama a los callbacks.
		@returns {Array} Datos de la BBDD.
	**/
	obtenerRegistros()
	{
		const peticion = this.db.transaction('tablaPersonajes', 'readonly').objectStore('tablaPersonajes').getAll();
		
		peticion.onsuccess = () => {
			this.listaPersonajes = peticion.result;
			this.avisar();
		};
	}

	/**
		Busca personajes que coincidan exactamente con el nombre.
		@param {String} nombre Nombre del personaje.
	**/
	buscar(nombre)
	{
		if(!nombre)
		{
			this.obtenerRegistros();
		}
		else
		{
			const peticion = this.db.transaction('tablaPersonajes', 'readonly').objectStore('tablaPersonajes').getAll();

			peticion.onsuccess = () => {
				const personajes = peticion.result;
				this.listaPersonajes = [];	// Limpiar la lista de personajes
	
				for(let personaje of personajes)
				{
					if(personaje.nombre === nombre) 
						this.listaPersonajes.push(personaje);
				}

				this.avisar();
			}
		}
	}

	/**
		Devuelve la lista local de personajes.
		@returns {Array} Lista.
	**/
	getLista()
	{
		return this.listaPersonajes;
	}
}