const { ApolloServer, gql } = require("apollo-server");

const notes = [
  {
    id: "1",
    title: "First Note",
    content: "This is the first note.",
    createdAt: new Date("2022-01-01T00:00:00Z"),
    updatedAt: new Date("2022-01-01T00:00:00Z"),
  },
  {
    id: "2",
    title: "Second Note",
    content: "This is the second note.",
    createdAt: new Date("2022-01-02T00:00:00Z"),
    updatedAt: new Date("2022-01-02T00:00:00Z"),
  },
];

const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    notes: [Note!]!
    noteById(id: ID!): Note
  }

  type Mutation {
    createNote(title: String!, content: String!): Note!
    updateNote(id: ID!, title: String!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    notes: () => notes,
    noteById: (_, { id }) => notes.find((note) => note.id === id),
  },
  Mutation: {
    createNote: (_, { title, content }) => {
      const newNote = {
        id: String(notes.length + 1),
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      notes.push(newNote);
      return newNote;
    },
    updateNote: (_, { id, title, content }) => {
      const index = notes.findIndex((note) => note.id === id);
      if (index === -1) {
        throw new Error(`Note with ID ${id} not found`);
      }
      const updatedNote = {
        ...notes[index],
        title,
        content,
        updatedAt: new Date(),
      };
      notes[index] = updatedNote;
      return updatedNote;
    },
    deleteNote: (_, { id }) => {
      const index = notes.findIndex((note) => note.id === id);
      if (index === -1) {
        return false;
      }
      notes.splice(index, 1);
      return true;
    },
  },
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
server.listen().then(() => {
  console.log(`Server is running at http://localhost:4000`);
});
