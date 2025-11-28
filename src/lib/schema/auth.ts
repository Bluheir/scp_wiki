import * as z from "zod"
import { m } from "$lib/paraglide/messages"

const common = {
	email: z.email({ error: m.auth_invalidEmail }),
	password: z.string().min(1, { error: m.auth_invalidPassword }).max(255, { error: m.auth_invalidPassword })
}

export const signInSchema = z.object({
	email: common.email,
	password: common.password
})

const alphabetLower = "abcdefghijklmnopqrstuvwxyz"
const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+`~-_+=[]\\{}|;':\",./<>?"

export const registerSchema = z.object({
	email: common.email,
	username: z.string().min(1, { error: m.register_invalidUsername }).max(32, { error: m.register_invalidUsername }),
	password: common.password.refine((value) => {
		let hasLower: boolean = false
		let hasUpper: boolean = false
		let hasNumber: boolean = false
		let hasSymbol: boolean = false

		for(const char of value) {
			if(!hasLower && alphabetLower.includes(char)) {
				hasLower = true
			} else if(!hasUpper && alphabetUpper.includes(char)) {
				hasUpper = true
			} else if(!hasNumber && numbers.includes(char)) {
				hasNumber = true
			} else if(!hasSymbol && symbols.includes(char)) {
				hasSymbol = true
			}
		}

		return hasNumber && hasSymbol && hasUpper && hasLower
	}, { error: m.register_badPassword })
})
