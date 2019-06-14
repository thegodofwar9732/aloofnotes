const defaultOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
}

const api = process.env.NODE_ENV === 'production'? '/graphql' : 'http://localhost:5000/graphql'

export const addNoteRequest = async ({title, text}) => {
	const options = {
		...defaultOptions,
		body: addNoteMutation({title, text})
	}
	// TODO: add conditional for production for url
	return fetch(api, options).then(res => res.json())
}

const addNoteMutation =  ({title, text}) => {
    return `{"variables": {"input": {"title": "${title}", "text": "${text}"}},"query":"mutation change($input: NewNote){ newNote: addNote(input: $input) {id title text } }"}`
}

export const getAllNotesRequest = async () => {
	const options = {
		...defaultOptions,
		body: getAllNotesQuery
	}
	// TODO: add conditional for production for url
	return fetch(api, options).then(res => res.json())
}

export const getAllNotesQuery = '{"query":"{ allNotes: getAllNotes {id title text } }"}'