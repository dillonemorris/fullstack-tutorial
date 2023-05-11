import { gql, useQuery } from '@apollo/client'

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      content
    }
  }
`

export const NotesList = () => {
  const { loading, data } = useQuery(GET_NOTES)

  if (loading) {
    return <h2>...Loading</h2>
  }

  return (
    <ul>
      {data.notes.map((note) => (
        <li>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  )
}
