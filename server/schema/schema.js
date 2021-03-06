const { projects, clients } = require('../sampleData.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

//Project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve: (parent, args) => {
                return clients.find(client => client.id === parent.clientId);
            }
        }
    })
});

//Client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone:{type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
         projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return projects;
            } //resolve is a function that returns the data
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve (parent, args){
                return projects.find(project => project.id === args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return clients;
            } //resolve is a function that returns the data
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve (parent, args){
                return clients.find(client => client.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery,
})