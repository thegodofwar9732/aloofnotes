const noteModel = require('./model')

// gets number of milliseconds since epoch
const getCreatedTime = ()=> {
	let milliseconds = new Date().getTime()
	return milliseconds
}


const resolvers = 
{
	Query : {
		getAllNotes: async() => {
			let notes = await noteModel.find().exec()
			/* noteToSelf: 
            notes is an array of objects that have field
            '_id' of type 'ObjectID', I can't query this field
            because graphql does not support that type(ObjectID)
            out of the box, HOWEVER, if i query 'id' instead of '_id', i can get the mongo id, eventhough there is no such field as
            'id' in this mongo object. This is very strange and I DON'T KNOW HOW IT WORKS
            */
			return notes
		}
	},
	Mutation: {
		addNote: async (obj, args) => {  
			args.input.created = getCreatedTime()
			const response = await noteModel.create(args.input)
			return response
		}, // all args for resolvers: obj, args, context, info
		editNote: async (obj, args) => {
			const response = await noteModel.findByIdAndUpdate(args.input.id, args.input, {new:true}) 
			return response
		}

	}
}

module.exports = resolvers