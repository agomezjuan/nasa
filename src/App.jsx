import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Figure from './components/Figure/Figure';
import './App.css';

// Almacenamos en una constante la URL de la NASA
const NASA_URL = 'https://api.nasa.gov/';
// Almacenamos en una constante nuestra API Key, esto es recomendable almacenarlo en una variable de entorno
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

function App() {
  // Recuperamos la fecha actual en un formato ISO -> 2023-01-01
  const today = new Date(Date.now()).toISOString().slice(0, 10);

  // Creamos un estado para almacenar la fecha y el objeto que nos devuelva la API
  const [date, setDate] = useState(today);
  const [apod, setApod] = useState({});

  useEffect(() => {
    // Creamos una función asíncrona para poder hacer la petición a la API
    const getAPOD = async () => {
      // Creamos una constante para almacenar la respuesta de la API
      const response = await fetch(
        `${NASA_URL}planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
      );
      // Creamos una constante para almacenar la respuesta en formato JSON
      const data = await response.json();
      // Imprimimos la respuesta en la consola
      console.log(data);
      // Actualizamos el estado con la respuesta de la API
      setApod(data);
    };
    // Llamamos a la función
    getAPOD();
  }, [date]);

  // Crearemos una función que setee la fecha a través de un input en el formato
  // necesario (igual que el formato de today)
  const handleInput = ev => {
    setDate(ev.target.value.toLocaleString()); // .toLocaleString() sirve para formatear la fecha
  };

  return (
    <>
      <Header />
      <main>
        <h3>
          Esta imagen corresponde con la fecha{' '}
          {new Date(date).toLocaleString('ES-es', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          .
        </h3>
        <div className="controls">
          <button onClick={() => setDate(today)}>Hoy</button>
          {/* Seleccionar dia anterior */}
          <button
            onClick={() =>
              setDate(
                new Date(new Date(date).setDate(new Date(date).getDate() - 1))
                  .toISOString()
                  .slice(0, 10)
              )
            }>
            Día anterior
          </button>
          <input type="date" max={today} onChange={handleInput} value={date} />
          {/* Seleccionar dia siguiente */}
          <button
            disabled={date === today}
            onClick={() =>
              setDate(
                new Date(new Date(date).setDate(new Date(date).getDate() + 1))
                  .toISOString()
                  .slice(0, 10)
              )
            }>
            Día siguiente
          </button>
        </div>

        <section className="day_image">
          <Figure image={apod.url} altText={apod.title} />
          <div>
            <h2>{apod.title}</h2>
            <p>{apod.explanation}</p>
            {apod.copyright && (
              <blockquote>
                &copy; <em>{apod.copyright}</em>
              </blockquote>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
