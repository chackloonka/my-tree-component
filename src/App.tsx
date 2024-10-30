import { Container } from 'react-bootstrap'
import Tree from './components/Tree'
import mockData from './mock/taxonomy.json'
import './index.css'

function App() {
  return (
    <Container>
      <h1 className="my-4">Tree Prototype Component</h1>
      <Tree data={mockData} />
    </Container>
  )
}

export default App
