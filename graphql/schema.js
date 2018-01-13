import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools'
import 'isomorphic-fetch'
import casual from 'casual'
import { format as formatDate } from 'date-fns'
import fetchAPI from '../utils/fetchAPI'

const typeDefs = `

  type Query {
    category(id: Int!):CategoryType
    categories: [CategoryType]
    menus : [MenuType]
    menu(id: Int!): MenuType
  }
  
  type CategoryType{
    id: Int
    name: String
    images: String
    menus: [MenuType]
  }

  type MenuType {
    id: Int
    categoryId: Int
    name: String
    images: String
    price: Int
    rating:RatingType
    comments:[CommentType]
    category: CategoryType
  }

  type RatingType {
    one: Int
    two: Int
    three: Int
    four: Int
    five: Int
  }
  
  type CommentType{
    id: Int
    body: String
    menuId: Int
  }
`

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


/*
http://localhost:4000/categories/
http://localhost:4000/categories/2?_embed=menus
http://localhost:4000/menus/1?_expand=category&_embed=comments

*/


const resolvers = {
  Query: {
    menu: (_, args, context, info) => {
      return fetchAPI(`/menus/${args.id}?_expand=category&_embed=comments`).then(({ data }) => data)
    },
    menus: (_, args, context, info) => {
      return fetchAPI(`/menus/`).then(({ data }) => data)
    },
    category: (_, args, context, info) => {
      return fetchAPI(`/categories/${args.id}?_embed=menus`).then(({ data }) => data)
    },
    categories: (_, args, context, info) => {
      return fetchAPI(`/categories/`).then(({ data }) => data)
    }
  }
}




export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

//addMockFunctionsToSchema({ schema, mocks })

