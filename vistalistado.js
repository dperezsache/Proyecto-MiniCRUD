/**
	@file Contiene el modelo de la vista del listado de personajes.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista del listado.
	Contiene la tabla con los personajes que hayan.
**/
export class VistaListado extends Vista
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HtmlDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, div)
	{
        super(controlador, div);

		// Hacemos que VistaListado "observe" al Modelo.
		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.actualizar.bind(this));

		this.tabla = this.div.getElementsByTagName('tbody')[0];
		this.campoBuscar = this.div.getElementsByTagName('input')[0];
		this.btnBuscar = this.div.getElementsByTagName('button')[0];

		this.btnBuscar.onclick = this.busqueda.bind(this);
    }

	/**
		Realiza búsqueda de personajes
	**/
	busqueda()
	{
		this.controlador.buscarPersonaje(this.campoBuscar.value);
	}

	/**
		Recibe el aviso del modelo cuando ha sido actualizado.
		Actualiza los datos de la vista.
	**/
	actualizar()
	{
		// Limpiar el contenido actual para reeemplazarlo con el nuevo.
		this.borrarTabla();

		let personajes = this.modelo.getLista();
		
		if (personajes != null)
		{
			for(let personaje of personajes)
			{
				let tr = document.createElement('tr');
				this.tabla.appendChild(tr);
		
				// Nombre del personaje
				let td1 = document.createElement('td');
				tr.appendChild(td1);
				td1.textContent = personaje.nombre;
	
				// Descripción del personaje
				let td2 = document.createElement('td');
				tr.appendChild(td2);
				td2.textContent = personaje.descripcion;
	
				// Fecha aparición
				let td3 = document.createElement('td');
				tr.appendChild(td3);
				td3.textContent = personaje.fecha;
	
				// URL con más información
				let td4 = document.createElement('td');
				tr.appendChild(td4);
	
				let a = document.createElement('a');
				td4.appendChild(a);
				a.textContent = personaje.url;
				a.setAttribute('href', 'https://' + personaje.url)
				a.setAttribute('target', '_blank');
	
				// Imagen de personaje
				let td5 = document.createElement('td');
				tr.appendChild(td5);

				if(personaje.imagen)
				{
					let img = document.createElement('img');
					img.setAttribute('border', '1px solid lightgray');
					img.setAttribute('width', '96px');
					img.setAttribute('height', '96px');
					img.setAttribute('src', personaje.imagen);
					td5.appendChild(img);
				}
				else
				{
					let span = document.createElement('span');
					span.textContent = 'Sin imagen';
					td5.appendChild(span);
				}
	
				// Tipo de personaje
				let td6 = document.createElement('td');
				tr.appendChild(td6);
				td6.textContent = personaje.tipo;
	
				// Iconos borrar y modificar
				let td7 = document.createElement('td');
				tr.appendChild(td7);
				
				let spanEliminar = document.createElement('span');
				td7.appendChild(spanEliminar);
				spanEliminar.classList.add('material-symbols-rounded');
				spanEliminar.classList.add('icono');
				spanEliminar.textContent = 'delete';
				spanEliminar.onclick = this.eliminar.bind(this, personaje.id);
	
				let spanEditar = document.createElement('span');
				td7.appendChild(spanEditar);
				spanEditar.classList.add('material-symbols-rounded');
				spanEditar.classList.add('icono');
				spanEditar.textContent = 'edit';
				spanEditar.onclick = this.editar.bind(this, personaje.id);
			}
		}
	}

	/**
		Borra las filas de la tabla.
	**/
	borrarTabla()
	{
		while(this.tabla.firstElementChild)
			this.tabla.firstElementChild.remove();
	}

	/**
		Atención al evento eliminar de una fila.
		@param {Number} id ID del dato a eliminar.
	**/
	eliminar(id)
	{
		this.controlador.eliminarCRUD(id);
	}
	
	/**
		Atención al evento editar de una fila.
		@param {Number} id ID del dato a editar.
	**/
	editar(id)
	{
		this.controlador.editarCRUD(id);
	}
}