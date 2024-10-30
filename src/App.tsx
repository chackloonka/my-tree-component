import { Container, Form } from 'react-bootstrap'
import Tree from './components/Tree'
import mockData from './mock/taxonomy.json'
import './index.css'
import { useState } from 'react';
import { ITreeNode } from './components/Tree'

function App() {
  const [query, setQuery] = useState("");
  const handleNodeClick = (node: ITreeNode) => {
    alert(`You clicked on: ${node.name} (${node.common_name})`);
  };
  return (
    <Container>
      <h1 className="my-4">Tree Prototype</h1>
      <Form.Group className='my-3'>
        <Form.Label>Search</Form.Label>
        <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
      </Form.Group>

      <Tree 
        data={mockData} 
        query={query} 
        onNodeClick={handleNodeClick} 
        initialOpenNodes={['Cat Family', 'Gorillas']} 
      />
    </Container>
  )
}

export default App
