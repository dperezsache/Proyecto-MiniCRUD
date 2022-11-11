/**
	@file Contiene el modelo de la vista de CRUD.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista del CRUD.
	Contiene el formulario de inserción.
**/
export class VistaCRUD extends Vista
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HtmlDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, div)
	{
		super(controlador, div);

		// Coger referencias de los elementos del interfaz.
		this.campoNombre = this.div.getElementsByTagName('input')[0];
		this.campoDescripcion = this.div.getElementsByTagName('input')[1];
		this.fechaAparicion = this.div.getElementsByTagName('input')[2];
		this.urlInformacion = this.div.getElementsByTagName('input')[3];
		this.campoImagen = this.div.getElementsByTagName('input')[4];

		this.botonInsertar = this.div.getElementsByTagName('button')[0];
		this.botonCancelar = this.div.getElementsByTagName('button')[1];

		this.parrafoResultado = this.div.getElementsByTagName('p')[0];
		this.parrafoResultado.style.display = 'none';

		// Asignar eventos.
		this.botonInsertar.onclick = this.aceptar.bind(this);
		this.botonCancelar.onclick = this.cancelar.bind(this);
	}

	mostrar(ver)
	{
		super.mostrar(ver);
		this.parrafoResultado.style.display = 'none';
	}

	/**
		Atención al click sobre el botón Aceptar de la vista.
	**/
	aceptar()
	{
		if (this.campoNombre.value.match('^[A-Z][a-z]{3,10}$'))	// Comprobar que el nombre empiece en mayusculas y tenga de 3 a 10 letras sin números.
		{
			this.campoNombre.style.borderColor = '#c0bcbc';
			let tipoPersonaje = this.div.querySelector('input[name="tipo"]:checked');	// Obtener el radio button clicado
	
			if (this.campoDescripcion.value && this.fechaAparicion.value && this.urlInformacion.value && tipoPersonaje.value)
			{
				this.controlador.aceptarCRUD(
					this.campoNombre.value, 
					this.campoDescripcion.value, 
					this.fechaAparicion.value,
					this.urlInformacion.value, 
					this.campoImagen.files[0], 
					tipoPersonaje.value
				);
				this.parrafoResultado.style.display = 'block';
			}
		}
		else
		{
			this.campoNombre.style.borderColor = 'red';
		}
	}

	/**
		Limpiar los campos del formulario.
	**/
	cancelar()
	{
		this.campoNombre.value = '';
		this.campoDescripcion.value = '';
		this.fechaAparicion.value = '';
		this.urlInformacion.value = '';
		this.campoImagen.value = '';
		this.parrafoResultado.style.display = 'none';
	}
}