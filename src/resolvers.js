import noteModel from './model'

const resolvers = 
{
    Query : {
        getAllNotes: async() => {
          const notes = await noteModel.find().exec()
          console.log('notes', notes)
          return notes
        }
    },
  Mutation: {
        addNote: async (obj, args, context, info) => {
            args.input.created = new Date().toString()
            const response = await noteModel.create(args.input)
            return response
      } 
  }
}

export default resolvers