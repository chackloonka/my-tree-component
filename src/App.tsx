import { Container, Form } from 'react-bootstrap'
import Tree from './components/Tree'
import mockData from './mock/taxonomy.json'
import './index.css'
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState("");

  return (
    <Container>
      <h1 className="my-4">Tree Prototype</h1>
      <Form.Group className='my-3'>
        <Form.Label>Search</Form.Label>
        <Form.Control value={query} onChange={(e) => setQuery(e.target.value)}/>
      </Form.Group>

      <Tree data={mockData} query={query} />
    </Container>
  )
}

export default App
