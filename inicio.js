const url = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json";
const votos = {};
async function ObtenerCandidatos() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`);
        }
        const candidatos = await respuesta.json();
        console.log("Candidatos obtenidos:", candidatos);
        candidatos.forEach(candidato => {
            votos[candidato.nombre + " " + candidato.apellido] = 0;
        });
        const votosGuardados = JSON.parse(localStorage.getItem('votos')) || {};
        Object.assign(votos, votosGuardados);
        mostrardatos(candidatos);
    } catch (error) {
        console.error("Error al obtener los candidatos:", error);
    }
}
function mostrardatos(candidatos) {
    const lista = document.getElementById("candidatos");
    if (!lista) {
        console.error("Elemento no encontrados");
        return;
    }
    lista.innerHTML = "";
    candidatos.forEach(candidato => {
        const elemento = document.createElement("div");
        elemento.classList.add("candidato");
        elemento.innerHTML = `
            <p><strong>Compañero:</strong> ${candidato.nombre} ${candidato.apellido}</p>
            <p><strong>Ficha:</strong> ${candidato.ficha}</p>
            <p><strong>Programa:</strong> ${candidato.curso}</p>
            <img src="${candidato.foto}" alt="Foto de ${candidato.nombre}" width="100">
        `;
        elemento.addEventListener("click", () => {
            confirmarVoto(candidato);
        });
        lista.appendChild(elemento);
    });
}
function confirmarVoto(candidato) {
    const confirmar = confirm(`¿Estás de acuerdo en votar por ${candidato.nombre} ${candidato.apellido}?`);
    if (confirmar) {
        votos[candidato.nombre + " " + candidato.apellido]++;
        alert(`Has votado por ${candidato.nombre} ${candidato.apellido}. listo el voto`);
        const contador = document.getElementById(
            `votos-${candidato.nombre}-${candidato.apellido.replace(" ", "-")}`
        );
        if (contador) {
            contador.innerHTML =`<strong>Votos:</strong> ${votos[candidato.nombre + " " + candidato.apellido]}`;
        }
        localStorage.setItem('votos', JSON.stringify(votos));
    } else {
        alert("voto cancelado");
    }
}
ObtenerCandidatos();