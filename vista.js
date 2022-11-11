/**
	@file Contiene el modelo de la aplicación
	@author David Pérez Saché <dperezsache.guadalupe@alumnado.fundacionloyola.es>
	@license GPL-3.0-or-later
**/

/**
	Implementa una vista.
**/
export class Vista
{
	/**
		Constructor de la clase.
		@param {Controlador} controlador Controlador de la vista.
		@param {HtmlDivElement} div Div de HTML en el que se desplegará la vista.
	**/
    constructor(controlador, div)
    {
		this.controlador = controlador;
        this.div = div;
    }

    /**
		Muestra u oculta el div principal de la vista.
		@param {Boolean} ver True muestra la vista y false la oculta.
	**/
	mostrar(ver)
	{
		if(ver) 
			this.div.style.display = 'block';
		else 
			this.div.style.display = 'none';
	}
}