// David Pérez Saché
import {Modelo} from './modelo.js';
import {VistaNav} from './vistanav.js';
import {VistaCRUD} from './vistacrud.js';
import {VistaListado} from './vistalistado.js';
import {VistaActualizar} from './vistaupdate.js';

/**
	Controlador de la aplicación
**/
class Controlador
{
    /**
		Constructor de la clase.
		Llama al método iniciar al cargarse la página.
	**/
    constructor()
    {
        window.onload = this.iniciar.bind(this);
    }

    /**
		Inicia la aplicación.
		Crea el modelo y las vistas.
	**/
    iniciar()
    {
        this.modelo = new Modelo(this);

		this.nav = document.getElementsByTagName('nav')[0];
        this.divCRUD = document.getElementById('divCRUD');
		this.divListado = document.getElementById('divListado');
		this.divActualizar = document.getElementById('divActualizar');
        
		this.vistaNav = new VistaNav(this, this.nav);
        this.vistaCRUD = new VistaCRUD(this, this.divCRUD);
		this.vistaListado = new VistaListado(this, this.divListado);
		this.vistaActualizar = new VistaActualizar(this, this.divActualizar);

		this.vistaCRUD.mostrar(true);	// Iniciar viendo la vista CRUD.
    }

    /**
		Inserta el elemento en el modelo.
    **/
    aceptarCRUD(nombre, descripcion, fecha, url, imagen, tipo)
    {
        this.modelo.insertar(nombre, descripcion, fecha, url, imagen, tipo);
    }

    /**
		Atención al click en el icono eliminar del CRUD.
		Elimina el elemento en el modelo.
		@param {Number} id ID del dato a eliminar.
	**/
	eliminarCRUD(id)
	{
		this.modelo.borrar(id);
	}

	/**
		Atención al click en el icono editar del CRUD.
		Manda al formulario de edición.
		@param {Number} id ID del dato a editar.
	**/
	editarCRUD(id)
	{
		this.pulsarNavActualizar();
		this.vistaActualizar.listado.value = id;
		this.vistaActualizar.actualizarForm();
	}

	/**
		Atención al click en el icono editar del CRUD.
	**/
	actualizarCRUD(id, nombre, descripcion, fecha, url, imagen, tipo)
	{
		this.modelo.procesarPersonaje(id, nombre, descripcion, fecha, url, imagen, tipo);
	}

	/**
		Realizar búsqueda de personaje.
		@param {String} nombre Nombre del personaje.
	**/
	buscarPersonaje(nombre)
	{
		this.modelo.buscar(nombre);
	}

    /**
		Devuelve el modelo de la aplicación.
		@return {Modelo} El modelo de la aplicación.
	**/
	getModelo()
	{
		return this.modelo;
	}

	/**
		Atención a la pulsación del enlace de CRUD en el menú de navegación.
	**/
	pulsarNavCRUD()
	{
		this.vistaCRUD.mostrar(true);
		this.vistaListado.mostrar(false);
		this.vistaActualizar.mostrar(false);
	}

	/**
		Atención a la pulsación del enlace de listado en el menú de navegación.
	**/
	pulsarNavListado()
	{
		this.vistaCRUD.mostrar(false);
		this.vistaListado.mostrar(true);
		this.vistaActualizar.mostrar(false);
	}
	
	/**
		Atención a la pulsación del enlace de actualizar en el menú de navegación.
	**/
	pulsarNavActualizar()
	{
		this.vistaCRUD.mostrar(false);
		this.vistaListado.mostrar(false);
		this.vistaActualizar.mostrar(true);
	}
}

const app = new Controlador();