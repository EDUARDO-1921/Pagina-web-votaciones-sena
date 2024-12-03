const guardarlosvotos = JSON.parse(localStorage.getItem('votos')) || {};
document.body.innerHTML = `
    <h1>Resultados de Votación</h1>
    <div id="resultados"></div>
    <button id="reiniciar">Reiniciar Votaciones</button>
    <button id="cerrarSesion">Cerrar Sesión</button>
`;
const verlosresultados = document.getElementById('resultados');
function mostrarResultados() {
    verlosresultados.innerHTML = '';
    if (Object.keys(guardarlosvotos).length > 0) {
        for (const [candidato, votos] of Object.entries(guardarlosvotos)) {
            const elemento = document.createElement('p');
            elemento.innerHTML = `<strong>${candidato}:</strong> ${votos} votos`;
            verlosresultados.appendChild(elemento);
        }
    } else {
        verlosresultados.innerHTML = '<p>Lo siento aun no hay votos</p>';
    }
}
document.getElementById('reiniciar').addEventListener('click', () => {
    localStorage.removeItem('votos');
    alert('votacion reinciada');
    location.reload();
});
document.getElementById('cerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('sesionActiva');
    alert('Session finalizada Dirigiendo a:');
    window.location.href = 'iniciarsession.html';
});
mostrarResultados();
