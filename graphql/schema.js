import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import 'isomorphic-fetch'
import casual from 'casual'

import { format as formatDate } from 'date-fns'

import fetchAPI from '../utils/fetchAPI'

const typeDefs = `
  type Query {
    posts(first: Int = 20): [PostType]
    post(id: Int!): PostType
  }
  type PostType {
    id: Int
    title: String
    body: String
    author: AuthorType
    pubDate(format: String = "DD-MM-YYYY"): String
    relatePosts(first: Int = 5): [PostType]
  }
  type AuthorType {
    name: String
    avatar: String
  }
`



const mocks = {
  PostType: () => ({
    id: casual.integer(0, 100000),
    title: casual.title,
    body: casual.words(100),
    author: {
      name: casual.first_name,
      avatar: `${casual.url}profile.jpg`
    },
    pubDate: casual.date()
  })
}


const resolvers = {

}


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

addMockFunctionsToSchema({ schema, mocks })

