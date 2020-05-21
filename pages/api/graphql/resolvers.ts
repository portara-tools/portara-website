import { User } from '../models/userModel'

export const resolvers = {
  Query: {
    hello: () => 'hello'
  },
  Mutation: {
    createUser: (_: any,{ name }: any) => {
      const user = new User({ name });
      user.save()
      console.log('new user saved to database')
      return user
    }
  }
};
