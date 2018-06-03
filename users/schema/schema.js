const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql

const BaseURL = "http://localhost:3000/";

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`${BaseURL}companies/${parentValue.id}/users`).then(resp => resp.data);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`${BaseURL}companies/${parentValue.companyId}`).then(resp => resp.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`${BaseURL}users/${args.id}`).then(resp => resp.data);
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`${BaseURL}companies/${args.id}`).then(resp => resp.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post(`${BaseURL}users/`, { firstName, age }).then(resp => resp.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`${BaseURL}users/${id}`).then(resp => resp.data);
            } 
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }, 
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.patch(`${BaseURL}users/${args.id}`, args).then(resp => resp.data);
            } 
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});