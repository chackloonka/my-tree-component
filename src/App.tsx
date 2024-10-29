import Tree from './components/Tree'
import mockData from './mock/taxonomy.json'

function App() {
  return (
    <>
      <h1>Tree Prototype Component</h1>
      <Tree data={mockData} />
    </>
  )
}

export default App
