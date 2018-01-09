import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools'
import 'isomorphic-fetch'
import casual from 'casual'

import { format as formatDate } from 'date-fns'

import fetchAPI from '../utils/fetchAPI'

/*
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
*/


const typeDefs = `
  type Query {
    menus: [MenuType]
  }

  type MenuType {
    id: Int
    categoryId: Int
    name: String
    images: String
    price: Int
    rating:RatingType
  }

  type RatingType {
    one: Int
    two: Int
    three: Int
    four: Int
    five: Int
  }

`

/*

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
*/



const mocks = {
  Query: () => ({
    menus: (_, { limit = 10 }) => new MockList(limit)
  }),
  MenuType: () => ({
    id: casual.integer(0, 100000),
    categoryId: casual.integer(0, 100000),
    name: casual.title,
    images: `${casual.url}profile.jpg`,
    price: casual.price,
    rating: {
      one: casual.integer(1, 100),
      two: casual.integer(1, 100),
      three: casual.integer(1, 100),
      four: casual.integer(1, 100),
      five: casual.integer(1, 100),
    }
  })


}


const resolvers = {

}


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

addMockFunctionsToSchema({ schema, mocks })

