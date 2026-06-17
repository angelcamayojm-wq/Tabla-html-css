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




