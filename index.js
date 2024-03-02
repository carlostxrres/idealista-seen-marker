// ==UserScript==
// @name            Idealista - marca los inmuebles vistos
// @name:es         Idealista - marca los inmuebles vistos
// @version         0.0.1
// @description     En Idealista, marca los inmuebles vistos con un pequeño banner
// @description:es  En Idealista, marca los inmuebles vistos con un pequeño banner
// @author          carlostxrres
// @match           https://www.idealista.com/*
// @icon            https://www.google.com/s2/favicons?sz=64&domain=idealista.com
// @updateURL       https://raw.githubusercontent.com/carlostxrres/idealista-seen-marker/main/index.js
// @downloadURL     https://raw.githubusercontent.com/carlostxrres/idealista-seen-marker/main/index.js
// @grant           GM.setValue
// @grant           GM.getValue
// @grant           GM.addStyle
// ==/UserScript==

(function() {
    'use strict'

    /* Global constants */
    const KEYS = {
        SEEN_LIST: "seenList"
    }
    const CLASSNAMES = {
        SEEN_LISTED_INMUEBLE: "seen-listed-inmueble",
        SEEN_LISTED_INMUEBLE_BANNER: "seen-listed-inmueble-banner",
    }

    /* Script */
    startUp()

    function startUp() {
        addCss()

        const paths = location
        .pathname
        .split("/")
        .filter(Boolean)

        const actionByPath = {
            "inmueble": handleInmueblePage,
            "alquiler-viviendas": handleInmuebleListPage,
            "venta-viviendas": handleInmuebleListPage,
        }
        actionByPath[paths[0]]?.(paths)
    }

    async function handleInmueblePage([, id]) {
        const seenInmuebles = await GM.getValue(KEYS.SEEN_LIST, {})
        seenInmuebles[id] = {
            lastSeen: new Date().getTime()
        }
        await GM.setValue(KEYS.SEEN_LIST, seenInmuebles)
    }

    async function handleInmuebleListPage() {
        const seenInmuebles = await GM.getValue(KEYS.SEEN_LIST, {})
        const inmuebleNodes = Array.from(document.querySelectorAll(".items-container.items-list > article.item"))
        inmuebleNodes.forEach(inmuebleNode => {
            const inmuebleNodeId = inmuebleNode.dataset.adid
            const isSeen = Object.hasOwn(seenInmuebles, inmuebleNodeId)
            if (!isSeen) return

            displayInmuebleNodeAsSeen(inmuebleNode)
        })
    }

    function displayInmuebleNodeAsSeen(inmuebleNode) {
        inmuebleNode.classList.add(CLASSNAMES.SEEN_LISTED_INMUEBLE)

        const banner = document.createElement("div")
        banner.innerHTML = getIconSvg("eye") + "Seen"
        banner.className = CLASSNAMES.SEEN_LISTED_INMUEBLE_BANNER
        inmuebleNode.appendChild(banner)
    }

    function getIconSvg(icon, { size = 24, strokeWidth = 1.5 } = {}) {
        // Icons from https://tabler.io/icons
        const svgContent = {
            eye: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />`,
        }
        return [
            `<svg`,
            ` xmlns="http://www.w3.org/2000/svg"`,
            ` width="${size}"`,
            ` height="${size}"`,
            ` viewBox="0 0 ${size} ${size}"`,
            ` stroke-width="${strokeWidth}"`,
            ` stroke="currentColor"`,
            ` fill="none"`,
            ` stroke-linecap="round"`,
            ` stroke-linejoin="round"`,
            `>${svgContent[icon]}</svg>`,
        ].join("")
    }

    function addCss() {
        const css = [
            `.${CLASSNAMES.SEEN_LISTED_INMUEBLE} {`,
            `  position: relative;`,
            `}`,

            `.${CLASSNAMES.SEEN_LISTED_INMUEBLE} > *:not(.${CLASSNAMES.SEEN_LISTED_INMUEBLE_BANNER}) {`,
            `  filter: opacity(.4);`,
            `}`,

            `.${CLASSNAMES.SEEN_LISTED_INMUEBLE_BANNER} {`,
            `  position: absolute;`,
            `  inset: 1rem auto auto 1rem;`,
            `  background-color: #0009;`,
            `  color: white;`,
            `  padding: .5rem 1rem;`,
            `  display: flex;`,
            `  gap: .5rem;`,
            `  border-radius: 4px;`,
            `  border: 1px solid #f4f5f2;`,
            `}`,
        ].join("\n")
        GM.addStyle(css)
    }
})()
