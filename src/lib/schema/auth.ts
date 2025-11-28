import * as z from "zod"
import { m } from "$lib/paraglide/messages"

const common = {
	email: z.email({ error: m.auth_invalidEmail }),
	password: (min: number, max: number) => z.string().min(min, { error: m.auth_invalidPassword({ min, max }) }).max(max, { error: m.auth_invalidPassword({ min, max }) })
}

export const signInSchema = z.object({
	email: common.email,
	// In the future, the min password length may be changed to be lower or higher for registration,
	// hence why the min value in signInSchema is different to the one in registerSchema
	password: common.password(1, 255)
})

const alphabetLower = "abcdefghijklmnopqrstuvwxyz"
const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+`~-_+=[]\\{}|;':\",./<>?"

export const registerSchema = z.object({
	email: common.email,
	username: z.string().min(1, { error: m.register_invalidUsername }).max(32, { error: m.register_invalidUsername }),
	password: common.password(8, 255).refine((value) => {
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
	}, { error: m.register_badPassword }),
	confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
	if(password !== confirmPassword) {
		ctx.addIssue({
			code: "custom",
			path: ["confirmPassword"],
			message: m.register_passwordsDontMatch()
		})
	}
})
