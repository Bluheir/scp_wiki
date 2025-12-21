type RGB = { r: number; g: number; b: number }
type HSL = { h: number; s: number; l: number }

function parseColor(input: string): RGB {
	const hexMatch = input.match(/^#([0-9a-f]{6})$/i)
	if (hexMatch) {
		const n = parseInt(hexMatch[1], 16)
		return {
			r: (n >> 16) & 255,
			g: (n >> 8) & 255,
			b: n & 255
		}
	}

	const rgbMatch = input.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
	if (rgbMatch) {
		return {
			r: +rgbMatch[1],
			g: +rgbMatch[2],
			b: +rgbMatch[3]
		}
	}

	throw new Error("Unsupported color format")
}

function rgbToHsl({ r, g, b }: RGB): HSL {
	r /= 255
	g /= 255
	b /= 255

	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const d = max - min

	let h = 0
	const l = (max + min) / 2
	const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))

	if (d !== 0) {
		switch (max) {
			case r:
				h = ((g - b) / d) % 6
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h *= 60
		if (h < 0) h += 360
	}

	return { h, s, l }
}

function hslToRgb({ h, s, l }: HSL): RGB {
	const c = (1 - Math.abs(2 * l - 1)) * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = l - c / 2

	let r = 0,
		g = 0,
		b = 0

	if (h < 60) [r, g, b] = [c, x, 0]
	else if (h < 120) [r, g, b] = [x, c, 0]
	else if (h < 180) [r, g, b] = [0, c, x]
	else if (h < 240) [r, g, b] = [0, x, c]
	else if (h < 300) [r, g, b] = [x, 0, c]
	else [r, g, b] = [c, 0, x]

	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255)
	}
}

function rgbToHex({ r, g, b }: RGB): string {
	return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
}

export function contrastingForeground(bg: string): string {
	const rgb = parseColor(bg)
	const hsl = rgbToHsl(rgb)

	// Rotate hue for chromatic contrast
	hsl.h = (hsl.h + 180) % 360

	// Flip lightness for readability
	hsl.l = hsl.l > 0.5 ? 0.25 : 0.75

	const fgRgb = hslToRgb(hsl)
	return rgbToHex(fgRgb)
}
