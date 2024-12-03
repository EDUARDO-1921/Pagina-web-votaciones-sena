const rutaUsuarios = 'https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json';
async function validarAcceso() {
    try {
        const peticion = await fetch(rutaUsuarios);
        if (!peticion.ok) {
            throw new Error(`Error en la respuesta: ${peticion.status}`);
        }
        const datos = await peticion.json(); 
        const datosusuario = document.querySelector('input[placeholder="usuario"]');
        const datoscontraseña = document.querySelector('input[placeholder="contraseña"]');
        const mostrarmensaje = document.getElementById('mensaje');
        document.querySelector('button#acceder').addEventListener('click', () => {
            const nombreIngresado = datosusuario.value.trim();
            const claveIngresada = datoscontraseña.value.trim();
            if (datos.username === nombreIngresado && datos.password === claveIngresada) {
                localStorage.setItem('guardarsession', 'true');
                mostrarmensaje.textContent = `Bienvenido Administrador, ${datos.username}!`;
                mostrarmensaje.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'vista.html';
                }, 1200);
            } else {
                mostrarmensaje.textContent = 'los datos son incorrectos';
                mostrarmensaje.style.color = 'red';
            }
        });
    } catch (error) {
        console.error('error', error);
        const mostrarmensaje = document.getElementById('mensaje');
        mostrarmensaje.textContent = 'no es posible conectarse';
        mostrarmensaje.style.color = 'red';
    }
}
window.addEventListener('load', validarAcceso);
