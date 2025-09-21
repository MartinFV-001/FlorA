// js/quotes.js
(async function () {
  const EL = document.getElementById('footer-phrase');
  if (!EL) return;

  // Fallback local por si no carga el JSON
  const FALLBACK = [
    "Hoy, 21 de septiembre, te regalo rosas amarillas para que el sol te dure en las manos.",
    "Si llega el otoño, mis rosas amarillas te recordarán que contigo siempre es primavera.",
    "Eres mi 21 de septiembre: llegas y todo florece.",
    "Rosas amarillas para la persona que convierte cualquier día en celebración.",
    "Que cada pétalo te diga lo que yo repito en silencio: qué suerte la mía de encontrarte.",
    "Guardo un rayo de sol en cada rosa, para cuando me faltes.",
    "El calendario dice 21/09; mi corazón dice: quédate.",
    "Entre tantos septiembres, me quedo con este: el que paso contigo.",
    "Si las rosas amarillas significan alegría, tú eres mi ramo infinito.",
    "Te abrazo en amarillo: luz, fiesta y nosotros.",
    "Si el tiempo es una maldición, que me condene como a Drácula: a cruzar siglos solo para volver a encontrarte.",
    "Renunció a la luz por un beso; yo, en cambio, elijo tu luz para que ninguna noche me convierta en sombra.",
    "Si cambias de rostro, reconoceré tu alma: es la misma que él persigue desde otra vida y otro nombre.",
    "Cuando hablas, suenas como el violín que compone Elfman: una nota y ya estoy perdidamente tuyo.",
    "No temo a la cruz ni a los espejos; solo temo un amanecer sin ti en mi castillo de sueños.",
    "Hoy te mando rosas amarillas para que la suerte aprenda tu nombre.",
    "Si el sol tuviera perfume, olería a tus manos con flores amarillas.",
    "En mi agenda, el 21 de septiembre siempre dice: pensar en ti.",
    "Cada pétalo es un “gracias” por los días en que te quedas.",
    "Si la alegría es un color, contigo es amarillo dorado.",
    "Guardé una promesa en esta rosa: volver a empezar a tu lado.",
    "Que esta rosa amarilla te recuerde que el futuro también sonríe.",
    "Contigo, los lunes florecen.",
    "No traigo magia, traigo flores: hacen lo mismo cuando te miro.",
    "Eres la nota amarilla en mi canción favorita.",
    "Si te pierdes, sigue el rastro de pétalos hasta mi puerta.",
    "Hoy riego el jardín de tu ánimo con luz y paciencia.",
    "A tu lado, septiembre dura más.",
    "Eres mi buena noticia con forma de flor.",
    "Lo que no sé decir, lo escriben estas rosas por mí."
  ];

  async function loadPhrases() {
    try {
      const res = await fetch('assets/phrases.json', { cache: 'no-store' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return FALLBACK;
  }

  // baraja no repetitiva usando localStorage
  function nextIndex(total) {
    const ORDER_KEY = 'footerPhraseOrder';
    const IDX_KEY = 'footerPhraseIdx';

    let order = JSON.parse(localStorage.getItem(ORDER_KEY) || 'null');
    let idx = Number(localStorage.getItem(IDX_KEY) || '0');

    if (!order || order.length !== total) {
      order = Array.from({ length: total }, (_, i) => i);
      // Fisher–Yates
      for (let i = total - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      idx = 0;
    }

    const out = order[idx];
    idx = (idx + 1) % total;

    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    localStorage.setItem(IDX_KEY, String(idx));
    return out;
  }

  const phrases = await loadPhrases();
  if (!Array.isArray(phrases) || phrases.length === 0) return;

  const i = nextIndex(phrases.length);
  EL.textContent = phrases[i];
})();
