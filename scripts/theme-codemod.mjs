#!/usr/bin/env node
/**
 * Convierte colores fijos del tema oscuro en tokens CSS (variables).
 * Uso:
 *   node scripts/theme-codemod.mjs --dry   (solo muestra qué cambiaría)
 *   node scripts/theme-codemod.mjs         (aplica los cambios)
 * En el tema oscuro el resultado visual es idéntico al actual.
 * Es idempotente: ejecutarlo dos veces no rompe nada.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const DRY = process.argv.includes('--dry')
const CWD = process.cwd()
const SRC = join(CWD, 'src')
const SKIP = ['src/theme/', 'src/components/ThemeToggle.jsx']

// Claves que representan color de TEXTO
const TEXT_KEYS = new Set(['color', 'muted', 'error', 'warn', 'ok'])
const isText = (k) => TEXT_KEYS.has(k)

// ── Utilidades ──────────────────────────────────────────────────────────────
const files = []
const walk = (dir) => {
    for (const name of readdirSync(dir)) {
        const full = join(dir, name)
        if (statSync(full).isDirectory()) walk(full)
        else if (full.endsWith('.jsx')) files.push(full)
    }
}

const KEY_RE = /([A-Za-z_$][\w$]*)\s*(?::(?!:)|=(?![=>]))/g

const lineOf = (src, idx) => {
    const start = src.lastIndexOf('\n', idx - 1) + 1
    let end = src.indexOf('\n', idx)
    if (end === -1) end = src.length
    return { start, text: src.slice(start, end) }
}

// Última clave (color:, background:, style.color =, ...) antes del valor, en la misma línea
const keyBefore = (src, idx) => {
    const { start } = lineOf(src, idx)
    let key = null
    for (const m of src.slice(start, idx).matchAll(KEY_RE)) key = m[1]
    return key
}

// Atributos SVG (fill="..."): se dejan intactos para no alterar los dibujos
const isAttr = (src, idx) => src[idx - 1] === '"' && src[idx - 2] === '='

// ── Reglas ──────────────────────────────────────────────────────────────────
const rules = []
const add = (re, fn) => {
    rules.push({
        re,
        fn: (m, ...rest) => {
            const src = rest[rest.length - 1]
            const offset = rest[rest.length - 2]
            if (isAttr(src, offset)) return m
            const key = keyBefore(src, offset)
            const line = lineOf(src, offset).text
            return fn(m, rest.slice(0, -2), key, line)
        },
    })
}

// Blancos con transparencia → tinta del tema (texto vs. superficie)
add(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([\d.]+)\s*\)/g, (m, [a], key) =>
    `rgba(var(--ink-rgb), calc(${a} * var(${isText(key) ? '--k-text' : '--k-fill'})))`)

// Fondos oscuros con transparencia
add(/rgba\(\s*13\s*,\s*11\s*,\s*20\s*,\s*([\d.]+)\s*\)/g, (m, [a]) => `rgba(var(--bg-rgb), ${a})`)
add(/rgba\(\s*19\s*,\s*16\s*,\s*31\s*,\s*([\d.]+)\s*\)/g, (m, [a]) => `rgba(var(--surface-rgb), ${a})`)
add(/rgba\(\s*7\s*,\s*5\s*,\s*16\s*,\s*([\d.]+)\s*\)/g, (m, [a]) => `rgba(var(--scrim-rgb), ${a})`)

// Fondos sólidos
add(/#0d0b14(?![0-9a-fA-F])/gi, (m, _c, key) => (isText(key) ? 'var(--on-accent)' : 'var(--bg)'))
add(/#13101f(?![0-9a-fA-F])/gi, () => 'var(--surface)')
add(/#1e1a24(?![0-9a-fA-F])/gi, () => 'var(--surface-2)')
add(/#090711(?![0-9a-fA-F])/gi, () => 'var(--bg-2)')
add(/#07050d(?![0-9a-fA-F])/gi, () => 'var(--bg-3)')

// Blanco usado como color de texto → tinta
add(/#f{3}(?:f{3})?(?![0-9a-fA-F])/gi, (m, _c, key) => (isText(key) ? 'var(--ink)' : m))

// Colores de marca como TEXTO → versión legible en cada tema.
// Se omiten las líneas con `rgb:` (categoryAccent en Projects usa `${accent.color}30`).
const brandHex = (hex, token) =>
    add(new RegExp(`${hex}(?![0-9a-fA-F])`, 'gi'), (m, _c, key, line) =>
        isText(key) && !/\brgb\s*:/.test(line) ? `var(${token})` : m)

brandHex('#fc8f54', '--accent-ink')
brandHex('#ffb388', '--accent-soft')
brandHex('#6867d2', '--indigo-ink')
brandHex('#8f8eea', '--indigo-ink-soft')
brandHex('#a5a4e8', '--indigo-ink-pale')
brandHex('#f5525b', '--coral-ink')

const brandRgba = (nums, token) =>
    add(
        new RegExp(`rgba\\(\\s*${nums.join('\\s*,\\s*')}\\s*,\\s*([\\d.]+)\\s*\\)`, 'g'),
        (m, [a], key) => (isText(key) ? `rgba(var(${token}), calc(${a} * var(--k-text)))` : m),
    )

brandRgba([252, 143, 84], '--accent-ink-rgb')
brandRgba([104, 103, 210], '--indigo-ink-rgb')
brandRgba([245, 82, 91], '--coral-ink-rgb')

// Logos oscuros: invertir solo en tema oscuro
add(/'invert\(1\) brightness\(0\.7\)'/g, () => "'var(--logo-invert)'")

// ── Ejecución ───────────────────────────────────────────────────────────────
walk(SRC)

let totalFiles = 0
let totalChanges = 0

for (const file of files) {
    const rel = relative(CWD, file).split(sep).join('/')
    if (SKIP.some((s) => rel === s || rel.startsWith(s))) continue

    const original = readFileSync(file, 'utf8')
    let src = original
    let changes = 0

    for (const { re, fn } of rules) {
        src = src.replace(re, (...args) => {
            const out = fn(...args)
            if (out !== args[0]) changes++
            return out
        })
    }

    if (src !== original) {
        totalFiles++
        totalChanges += changes
        if (!DRY) writeFileSync(file, src, 'utf8')
        console.log(`${DRY ? '[dry] ' : ''}${rel}: ${changes} cambios`)
    }
}

console.log(`\n${DRY ? '[dry] ' : ''}${totalFiles} archivos, ${totalChanges} reemplazos.`)