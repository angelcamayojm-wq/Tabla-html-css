// ============================================================
// SECCIÓN 1: DISPLAY: NONE
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const gridNone = document.getElementById('gridNone');
    const btnRestaurarNone = document.getElementById('restaurarNone');

    if (gridNone) {
        // Evento para ocultar cuadro con display: none
        gridNone.addEventListener('click', function(e) {
            const cuadro = e.target.closest('.cuadro');
            if (!cuadro) return;
            // Si ya está oculto, no hacer nada
            if (cuadro.classList.contains('oculto-none')) return;
            cuadro.classList.add('oculto-none');
        });
    }

    if (btnRestaurarNone) {
        // Restaurar todos los cuadros de la sección None
        btnRestaurarNone.addEventListener('click', function() {
            if (gridNone) {
                const cuadros = gridNone.querySelectorAll('.cuadro');
                cuadros.forEach(c => c.classList.remove('oculto-none'));
            }
        });
    }

    // ============================================================
    // SECCIÓN 2: VISIBILITY: HIDDEN
    // ============================================================
    const gridHidden = document.getElementById('gridHidden');
    const btnRestaurarHidden = document.getElementById('restaurarHidden');

    if (gridHidden) {
        // Evento para ocultar cuadro con visibility: hidden
        gridHidden.addEventListener('click', function(e) {
            const cuadro = e.target.closest('.cuadro');
            if (!cuadro) return;
            if (cuadro.classList.contains('oculto-hidden')) return;
            cuadro.classList.add('oculto-hidden');
        });
    }

    if (btnRestaurarHidden) {
        // Restaurar todos los cuadros de la sección Hidden
        btnRestaurarHidden.addEventListener('click', function() {
            if (gridHidden) {
                const cuadros = gridHidden.querySelectorAll('.cuadro');
                cuadros.forEach(c => c.classList.remove('oculto-hidden'));
            }
        });
    }

    console.log('✅ Display None vs Visibility Hidden - Funcionando correctamente');
});







// ============================================================
// JUEGO DE MEMORIA - VERSIÓN SIMPLIFICADA Y FUNCIONAL
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Emojis
    const EMOJIS = ['⚽', '🏆', '🥅', '👟', '🧤', '🎯'];
    const TOTAL_PAREJAS = EMOJIS.length;

    // Estado
    let cartas = [];
    let primerCarta = null;
    let segundaCarta = null;
    let bloqueado = false;
    let parejasEncontradas = 0;
    let intentos = 0;

    const tablero = document.getElementById('tablero');
    const intentosSpan = document.getElementById('intentos');
    const parejasSpan = document.getElementById('parejas');
    const btnReiniciar = document.getElementById('reiniciar-memoria');

    // Barajar
    function barajar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Iniciar juego
    function iniciarJuego() {
        const pares = [...EMOJIS, ...EMOJIS];
        cartas = barajar(pares);

        // Resetear estado
        primerCarta = null;
        segundaCarta = null;
        bloqueado = false;
        parejasEncontradas = 0;
        intentos = 0;
        actualizarContadores();

        // Limpiar y crear tarjetas
        tablero.innerHTML = '';
        cartas.forEach((emoji, index) => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-memoria', 'oculta'); // empieza oculta
            tarjeta.dataset.index = index;
            tarjeta.dataset.emoji = emoji;
            tarjeta.dataset.emparejada = 'false';
            tarjeta.textContent = emoji; // el emoji se muestra cuando está visible

            tarjeta.addEventListener('click', () => manejarClick(tarjeta));
            tablero.appendChild(tarjeta);
        });
    }

    function manejarClick(tarjeta) {
        if (bloqueado) return;
        if (tarjeta.dataset.emparejada === 'true') return;
        if (tarjeta.classList.contains('visible')) return;
        if (primerCarta === tarjeta) return;

        // Mostrar tarjeta (cambiar clase)
        tarjeta.classList.remove('oculta');
        tarjeta.classList.add('visible');

        if (!primerCarta) {
            primerCarta = tarjeta;
        } else {
            segundaCarta = tarjeta;
            intentos++;
            actualizarContadores();

            const emoji1 = primerCarta.dataset.emoji;
            const emoji2 = segundaCarta.dataset.emoji;

            if (emoji1 === emoji2) {
                // ¡Coinciden!
                primerCarta.dataset.emparejada = 'true';
                segundaCarta.dataset.emparejada = 'true';
                primerCarta.classList.add('emparejada');
                segundaCarta.classList.add('emparejada');
                // Se quedan visibles (no se quita 'visible')

                parejasEncontradas++;
                actualizarContadores();

                primerCarta = null;
                segundaCarta = null;

                if (parejasEncontradas === TOTAL_PAREJAS) {
                    setTimeout(() => {
                        alert('🎉 ¡Ganaste! Encontraste todas en ' + intentos + ' intentos.');
                    }, 400);
                }
            } else {
                // No coinciden
                bloqueado = true;
                setTimeout(() => {
                    // Ocultar solo si no están emparejadas
                    if (primerCarta && primerCarta.dataset.emparejada !== 'true') {
                        primerCarta.classList.remove('visible');
                        primerCarta.classList.add('oculta');
                    }
                    if (segundaCarta && segundaCarta.dataset.emparejada !== 'true') {
                        segundaCarta.classList.remove('visible');
                        segundaCarta.classList.add('oculta');
                    }
                    primerCarta = null;
                    segundaCarta = null;
                    bloqueado = false;
                }, 1000);
            }
        }
    }

    function actualizarContadores() {
        intentosSpan.textContent = 'Intentos: ' + intentos;
        parejasSpan.textContent = 'Parejas: ' + parejasEncontradas + ' / ' + TOTAL_PAREJAS;
    }

    btnReiniciar.addEventListener('click', iniciarJuego);
    iniciarJuego();
});

// ============================================================
// BANNER PUBLICITARIO FIJO (ABRIR/CERRAR) - VERSIÓN CORREGIDA
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos
    const banner = document.getElementById('bannerPublicitario');
    const btnCerrar = document.getElementById('cerrarBanner');
    const btnMostrar = document.getElementById('btnMostrarBanner');

    // Verificar que existan
    if (!banner) {
        console.warn('Banner no encontrado');
        return;
    }
    if (!btnCerrar) {
        console.warn('Botón cerrar no encontrado');
        return;
    }
    if (!btnMostrar) {
        console.warn('Botón mostrar no encontrado');
        return;
    }

    // Función para cerrar el banner
    function cerrarBanner() {
        banner.classList.add('oculto');
        btnMostrar.style.display = 'block';
    }

    // Función para mostrar el banner
    function mostrarBanner() {
        banner.classList.remove('oculto');
        btnMostrar.style.display = 'none';
    }

    // Asignar eventos
    btnCerrar.addEventListener('click', cerrarBanner);
    btnMostrar.addEventListener('click', mostrarBanner);

    console.log('✅ Banner inicializado correctamente');
});

// ============================================================
// MENÚ STICKY MEJORADO - OCULTAR / MOSTRAR
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    var menu = document.getElementById('menuSticky');
    var btnCerrar = document.getElementById('cerrarMenu');
    var btnMostrar = document.getElementById('btnMostrarMenu');

    // Verificar que los elementos existan
    if (!menu || !btnCerrar || !btnMostrar) {
        console.warn('No se encontraron los elementos del menú sticky.');
        return;
    }

    // Cerrar menú
    btnCerrar.addEventListener('click', function() {
        menu.classList.add('oculto');
        btnMostrar.style.display = 'flex';
    });

    // Mostrar menú
    btnMostrar.addEventListener('click', function() {
        menu.classList.remove('oculto');
        btnMostrar.style.display = 'none';
    });

    // Si el menú está visible al cargar, ocultar el botón flotante
    if (!menu.classList.contains('oculto')) {
        btnMostrar.style.display = 'none';
    }

    console.log('Menú sticky mejorado inicializado correctamente.');
});


/* ============================================================
   BARAJA COMPLETA DE 52 CARTAS (PÓKER)
============================================================ */
const barajaCompleta = (() => {
    const palos = [
        { simbolo: '♠', color: 'negro' },
        { simbolo: '♥', color: 'rojo' },
        { simbolo: '♦', color: 'rojo' },
        { simbolo: '♣', color: 'negro' }
    ];
    const numeros = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    const baraja = [];
    for (const palo of palos) {
        for (const num of numeros) {
            baraja.push({
                numero: num,
                palo: palo.simbolo,
                color: palo.color
            });
        }
    }
    return baraja;
})();

/* ============================================================
   SELECCIONAR 6 CARTAS ALEATORIAS (sin repetición)
============================================================ */
function obtenerCartasAleatorias(cantidad = 6) {
    const mezclada = [...barajaCompleta];
    for (let i = mezclada.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mezclada[i], mezclada[j]] = [mezclada[j], mezclada[i]];
    }
    return mezclada.slice(0, cantidad);
}

/* ============================================================
   CREAR CARTA EN ABANICO HORIZONTAL (ABSOLUTE, CENTRADA)
============================================================ */
function crearCartaPoker(data, index, total) {
    const wrapper = document.createElement('div');
    wrapper.className = 'carta-wrapper';

    const cartaAncho = 170;
    const cartaAlto = 250;

    // Dimensiones del contenedor (coinciden con CSS max-width/height)
    const contenedorAncho = 700;  // max-width del contenedor
    const contenedorAlto = 420;   // altura del contenedor

    // Desplazamiento horizontal principal, vertical mínimo
    const espacioX = 80;  // separación horizontal entre cartas (centros)
    const espacioY = 8;   // ligero escalón vertical para dar sensación de cascada

    // Ancho total del mazo
    const mazoAncho = (total - 1) * espacioX + cartaAncho;
    const mazoAlto = cartaAlto; // la altura apenas cambia

    // Centro del contenedor
    const centroX = contenedorAncho / 2;
    const centroY = contenedorAlto / 2;

    // Esquina superior izquierda del mazo
    const mazoLeft = centroX - mazoAncho / 2;
    const mazoTop = centroY - mazoAlto / 2;

    // Posición de esta carta
    const posX = mazoLeft + index * espacioX;
    const posY = mazoTop + index * espacioY; // ligero descenso

    wrapper.style.left = posX + 'px';
    wrapper.style.top = posY + 'px';
    wrapper.style.zIndex = index;

    // ---- CARTA INTERNA (gira en 3D) ----
    const carta = document.createElement('div');
    carta.className = 'carta-poker';

    // Reverso
    const reverso = document.createElement('div');
    reverso.className = 'cara reverso';
    carta.appendChild(reverso);

    // Anverso
    const anverso = document.createElement('div');
    anverso.className = `cara anverso ${data.color}`;

    const tl = document.createElement('div');
    tl.className = 'esquina top-left';
    tl.innerHTML = `${data.numero}<sup>${data.palo}</sup>`;
    anverso.appendChild(tl);

    const centro = document.createElement('div');
    centro.className = 'simbolo-central';
    centro.textContent = data.palo;
    anverso.appendChild(centro);

    const br = document.createElement('div');
    br.className = 'esquina bottom-right';
    br.innerHTML = `${data.numero}<sup>${data.palo}</sup>`;
    anverso.appendChild(br);

    carta.appendChild(anverso);
    wrapper.appendChild(carta);

    wrapper.addEventListener('click', () => {
        carta.classList.toggle('volteada');
    });

    return wrapper;
}

/* ============================================================
   INICIALIZAR BARAJA HORIZONTAL
============================================================ */
function inicializarBarajaAleatoria() {
    const contenedor = document.getElementById('barajaContenedor');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    const cartasAleatorias = obtenerCartasAleatorias(6);
    cartasAleatorias.forEach((data, index) => {
        contenedor.appendChild(crearCartaPoker(data, index, cartasAleatorias.length));
    });
}

// Reiniciar
document.getElementById('reiniciar-baraja')?.addEventListener('click', () => {
    document.querySelectorAll('.carta-poker').forEach(c => c.classList.remove('volteada'));
    inicializarBarajaAleatoria();
});

// Arrancar
document.addEventListener('DOMContentLoaded', inicializarBarajaAleatoria);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    inicializarBarajaAleatoria();
}


/* ============================================================
   FUNCIÓN PARA CAMBIAR IDIOMA (PSEUDOCLASE LANG)
============================================================ */
function cambiarIdioma(idioma) {
    // Cambiar el atributo lang del contenedor
    const contenedor = document.getElementById('lang-contenedor');
    contenedor.setAttribute('lang', idioma);
    
    // Actualizar botones activos
    const botones = document.querySelectorAll('.lang-btn');
    botones.forEach(boton => {
        boton.classList.remove('active');
    });
    
    // Activar el botón correspondiente
    const botonActivo = document.querySelector(`.lang-btn-${idioma}`);
    if (botonActivo) {
        botonActivo.classList.add('active');
    }
}

/* ============================================================
   FUNCIÓN PARA CAMBIAR DIRECCIÓN (PSEUDOCLASE DIR)
============================================================ */
function cambiarDireccion(direccion) {
    const contenedor = document.getElementById('dir-contenedor');
    contenedor.setAttribute('dir', direccion);
    
    const botones = document.querySelectorAll('.dir-btn');
    botones.forEach(boton => {
        boton.classList.remove('active');
    });
    
    const botonActivo = document.querySelector(`.dir-btn-${direccion}`);
    if (botonActivo) {
        botonActivo.classList.add('active');
    }
}



