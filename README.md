# Idealista - Marca los inmuebles vistos
Este script de Tampermonkey marca automáticamente los inmuebles que ya has visitado en Idealista con un pequeño banner, mejorando tu experiencia de navegación al buscar propiedades.

## Pre-requisitos
Antes de instalar este script, necesitas tener Tampermonkey instalado en tu navegador.

### Instalación de Tampermonkey

1. **Google Chrome / Microsoft Edge / Brave / Vivaldi:**
   - Visita [Chrome Web Store - Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) y haz clic en "Añadir a Chrome".

2. **Mozilla Firefox:**
   - Visita [Firefox Add-ons - Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) y haz clic en "Añadir a Firefox".

3. **Safari:**
   - Visita [Tampermonkey for Safari](https://apps.apple.com/app/tampermonkey/id1482490089) y haz clic en "Obtener".

Después de instalar Tampermonkey, deberías ver el icono de Tampermonkey en la esquina superior derecha de tu navegador.

## Instalación del Script

Para instalar este script, sigue estos pasos:

1. Asegúrate de que Tampermonkey está activado y abierto en tu navegador.
2. Visita el siguiente enlace para acceder al script:

   [Instalar Script - Idealista Seen Marker](https://raw.githubusercontent.com/carlostxrres/idealista-seen-marker/main/index.user.js)

3. Tampermonkey debería abrir automáticamente una nueva pestaña o ventana mostrando el script.
4. Haz clic en el botón "Instalar" que aparece en la ventana de Tampermonkey para añadir el script a tu navegador.

Una vez instalado, el script comenzará a funcionar inmediatamente en el sitio web de Idealista, marcando los inmuebles que ya has visitado.

## To do
- [x] Begin with an initial version in TamperMonkey
- [ ] On UI seen-banner:
   - [ ] Show when the property was seen for the last time
   - [ ] Add an option to "set as unseen" on property nodes (on click?)
- [ ] Allow real-time flagging
- [ ] Migrate this to a Firefox add-on
- [ ] Add "reset storage" option
