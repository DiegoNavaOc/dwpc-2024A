//Cargando estilos
import './styles/style.css'
import './styles/style-b.css'

console.log("Webpack Working!!! 📦");

// Codigo ES6
// Default Parameters
let show = (msg="No message given") => {
  console.log(msg)
}
show();

// Async Await
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000)
  });
}

// Function asincrona
async function asyncCall() {
  console.log("Calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
}

// Llamar a la función asincrona
asyncCall();