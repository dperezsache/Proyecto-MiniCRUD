/**
	@file Contiene el modelo de la vista de actualización de personajes.
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/

import {Vista} from './vista.js';

/**
	Vista de la página de actualización.
**/
export class VistaActualizar extends Vista
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HtmlDivElement} div Div de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, div)
	{
        super(controlador, div);

		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.cargarListado.bind(this));
		
		// Coger referencias de los elementos del interfaz.
		this.campoNombre = this.div.getElementsByTagName('input')[0];
		this.campoDescripcion = this.div.getElementsByTagName('input')[1];
		this.fechaAparicion = this.div.getElementsByTagName('input')[2];
		this.urlInformacion = this.div.getElementsByTagName('input')[3];
		this.campoImagen = this.div.getElementsByTagName('input')[4];

		this.botonActualizar = this.div.getElementsByTagName('button')[0];
		this.botonCancelar = this.div.getElementsByTagName('button')[1];

		this.listado = this.div.getElementsByTagName('select')[0];

		this.parrafoResultado = this.div.getElementsByTagName('p')[0];
		this.parrafoResultado.style.display = 'none';

		// Asignar eventos.
		this.listado.onclick = this.actualizarForm.bind(this);
		this.botonActualizar.onclick = this.aceptar.bind(this);
		this.botonCancelar.onclick = this.cancelar.bind(this);
    }

	mostrar(ver)
	{
		super.mostrar(ver);
		this.parrafoResultado.style.display = 'none';
	}

	/**
		Actualiza el formulario con los datos del personaje seleccionado.
	**/
	actualizarForm()
	{
		let personajes = this.modelo.getLista();
		let dato = null;

		if(personajes != null)
		{
			for(let personaje of personajes)
			{
				if(personaje.id == this.listado.value)
				{
					dato = personaje;
					break;
				}
			}

			if(dato != null)
			{
				this.campoNombre.value = dato.nombre;
				this.campoDescripcion.value = dato.descripcion;
				this.fechaAparicion.value = dato.fecha;
				this.urlInformacion.value = dato.url;
				
				let tipo = this.div.querySelector('input[value="'+ dato.tipo +'"]');
				tipo.checked = true;
			}
		}
	}

	/**
		Carga el listado de personajes a actualizar. 
	**/
	cargarListado()
	{
		this.borrarListado();
		let personajes = this.modelo.getLista();

		if(personajes != null)
		{
			let primeraOpcion = document.createElement('option');
			primeraOpcion.textContent = '-- Selecciona personaje --';
			primeraOpcion.setAttribute('value', '-1');
			primeraOpcion.setAttribute('disabled', '');
			primeraOpcion.setAttribute('selected', '');
			this.listado.appendChild(primeraOpcion);

			for(let personaje of personajes)
			{
				let option = document.createElement('option');
				option.setAttribute('value', personaje.id);
				option.textContent = personaje.nombre;
				this.listado.appendChild(option);
			}
		}
	}

	/**
		Borra los options del select.
	**/
	borrarListado()
	{
		while(this.listado.firstElementChild)
			this.listado.firstElementChild.remove();
	}

	/**
		Atención al click de aceptar actualización.
	**/
	aceptar()
	{
		if(this.listado.value != -1)
		{
			if(this.campoNombre.value.match('^[A-Z][a-z]{3,10}$'))	// Comprobar que el nombre empiece en mayusculas y tenga de 3 a 10 letras sin números.
			{
				this.campoNombre.style.borderColor = '#c0bcbc';
				let tipoPersonaje = this.div.querySelector('input[name="nuevoTipo"]:checked');	// Obtener el radio button clicado
		
				if(this.campoDescripcion.value && this.fechaAparicion.value && this.urlInformacion.value && tipoPersonaje.value)
				{
					this.controlador.actualizarCRUD(
						this.listado.value,
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