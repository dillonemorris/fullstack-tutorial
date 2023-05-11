import { gql, useMutation } from '@apollo/client'

const ADD_NOTE_MUTATION = gql`
  mutation AddNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      title
      content
      createdAt
    }
  }
`

export const AddNoteForm = () => {
  const [addNote, { loading, error }] = useMutation(ADD_NOTE_MUTATION, {
    refetchQueries: [
      'GetNotes', // Query name
    ],
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const title = formData.get('title')
    const content = formData.get('content')

    await addNote({
      variables: { title, content },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" />
      </label>
      <br />
      <label>
        Content:
        <textarea name="content" />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Note'}
      </button>
      {error && <p>Error adding note: {error.message}</p>}
    </form>
  )
}
