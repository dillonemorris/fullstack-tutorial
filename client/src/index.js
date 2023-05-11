import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import ReactDOM from 'react-dom/client'
import { App } from './App'

// Initialize ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

// Find our rootElement or throw and error if it doesn't exist
const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

// Pass the ApolloClient instance to the ApolloProvider component;
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
