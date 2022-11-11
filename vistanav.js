/**
	@file Contiene el modelo de la vista de menú de navegación de la aplicación
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/

/**
	Implementa una vista del menú de navegación.
**/
export class VistaNav
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HtmlNavElement} nav Nav de HTML en el que se desplegará la vista.
	**/
	constructor(controlador, nav)
	{
		this.controlador = controlador;
		this.nav = nav;
		
		this.liCRUD = this.nav.getElementsByTagName('li')[0];
		this.liListado = this.nav.getElementsByTagName('li')[1];
        this.liActualizar = this.nav.getElementsByTagName('li')[2];
		
		this.liCRUD.onclick = this.pulsarCRUD.bind(this);
		this.liListado.onclick = this.pulsarListado.bind(this);
		this.liActualizar.onclick = this.pulsarActualizar.bind(this);
	}

	/**
		Atención a la pulsación sobre el enlace de CRUD
	**/
	pulsarCRUD()
	{
		this.controlador.pulsarNavCRUD();
	}

	/**
		Atención a la pulsación sobre el enlace de listado
	**/
	pulsarListado()
	{
		this.controlador.pulsarNavListado();
	}
	
	/**
		Atención a la pulsación sobre el enlace de actualizar
	**/
	pulsarActualizar()
	{
		this.controlador.pulsarNavActualizar();
	}
}