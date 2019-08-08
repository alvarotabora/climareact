import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App()
{
  //State Principal
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() =>
  {
    //Prevenir ejecucion
    if (ciudad === '') return;

    const consultarAPI = async () =>
    {
      const appId = '447cc95dbac0be949ed9130315e3ec0d';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ ciudad },${ pais }&appid=${ appId }`;
      
      //Consultar la url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
    }

    consultarAPI();
  }, [ciudad, pais]);

  const datosConsulta = datos =>
  {
    //Validar ambos campos
    if (datos.ciudad === '' || datos.pais === '')
    {
      //Un error
      guardarError(true);

      return;
    }

    //Ciudad y pais existen agregarlos a State
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  //Cargar un componente condicionalmente
  let componente;

  if (error)
  {
    //Muestra componente
    componente = <Error mensaje='Campos obligatorios' />
  }
  else if (resultado.cod === "404")
  {
    componente = <Error mensaje='La ciudad no existe en nuestro registro' />
  }
  else
  {
    //Mostrar el Clima
    componente = <Clima resultado={resultado} />;
  }

  return (
    <div className="App">
      <Header
        titulo='Clima ReactApp'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
