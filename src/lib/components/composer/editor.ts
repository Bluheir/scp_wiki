import { Editor } from "@tiptap/core"
import { Markdown } from "@tiptap/markdown"
import Superscript from "@tiptap/extension-superscript"
import History from "@tiptap/extension-history"
import Subscript from "@tiptap/extension-subscript"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedListExt from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Link from "@tiptap/extension-link"
import FontFamily from "@tiptap/extension-font-family"
import { TextStyle } from "@tiptap/extension-text-style"
import Placeholder from "@tiptap/extension-placeholder"
import { Italic as Italic } from "@tiptap/extension-italic"
import { Bold as Bold } from "@tiptap/extension-bold"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Document from "@tiptap/extension-document"
import Heading from "@tiptap/extension-heading"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import { m } from "$lib/paraglide/messages"

export function createSimpleEditor(): Editor {
	return new Editor({
		extensions: [
			Markdown,
			Italic.configure(),
			Bold,
			Link,
			Underline,
			Paragraph,
			Heading,
			Text,
			TextAlign.configure({
				alignments: ["left", "center", "right", "justify"],
				types: ["heading", "paragraph"]
			}),
			Placeholder.configure({
				placeholder: m.composer_placeholder()
			}),
			TextStyle,
			FontFamily,
			ListItem,
			Document,
			BulletList,
			OrderedListExt,
			Superscript,
			Subscript,
			History
		],
		autofocus: true,
		content: "",
		contentType: "markdown",
		enableInputRules: false
	})
}
