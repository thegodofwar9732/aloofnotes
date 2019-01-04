import noteModel from './model'

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
        addNote: async (obj, args, context, info) => {
            
            args.input.created = getCreatedTime()
            const response = await noteModel.create(args.input)
            return response
      } 
  }
}

export default resolvers