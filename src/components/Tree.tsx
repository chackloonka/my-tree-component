import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {
  FaRegFolder,
  FaRegFolderOpen,
  FaRegFile
} from "react-icons/fa";
/**
 * ITreeNode:
 * - `taxon`: Defines the taxonomic rank: "Family" | "Genus" | "Species".
 * - `name`: Scientific name of the taxon.
 * - `common_name`: Common name of the taxon.
 * - `children`: Optional array of child ITreeNodes.
 */
export interface ITreeNode {
  taxon: "Family" | "Genus" | "Species";
  name: string;
  common_name: string;
  children?: ITreeNode[];
}
/**
 * Props for Tree component.
 * - `data`: Node data to be rendered in the tree structure.
 * - `query`: Optional string for searching/filtering nodes.
 * - `onNodeClick`: Optional node onClick handler.
 * - `initialOpenNodes`: Optional array of nodes what should be open by name or common_name.
 */
interface ITreeProps {
  data: ITreeNode[];
  query?: string;
  onNodeClick?: (node: ITreeNode) => void;
  initialOpenNodes?: string[];
}

function Tree({ data, query, onNodeClick, initialOpenNodes = [] } : ITreeProps) {
  return (
    <ListGroup>
      {data.map((item: ITreeNode) =>
        <TreeNode node={item} key={item.name} query={query} onNodeClick={onNodeClick} initialOpenNodes={initialOpenNodes}/>
      )}
    </ListGroup>
  )
}

/**
 * Props for Tree Node Component.
 * - `node`: ITreeNode data to be rendered in the tree structure.
 * - `query`: Optional string for searching/filtering nodes.
 * - `onNodeClick`: Optional node onClick handler.
 */
interface ITreeNodeProps {
  node: ITreeNode;
  query?: string;
  onNodeClick?: (node: ITreeNode) => void;
  initialOpenNodes?: string[];
}
const filterTree = (node:ITreeNode, query:string): boolean => {
  if(
    node.common_name.toLowerCase().includes(query.toLowerCase()) ||
    node.name.toLowerCase().includes(query.toLowerCase()) 
  ) return true;
  if(node.children) {
    return node.children.some((child) => filterTree(child, query))
  }
  return false
}

export function TreeNode({ node, query, onNodeClick, initialOpenNodes } : ITreeNodeProps) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (query) {
      setIsOpen(filterTree(node, query));
    } else {
      setIsOpen(false);
    }
    
    // Update the open state based on initialOpenNodes
    if (initialOpenNodes && initialOpenNodes.includes(node.common_name)) {
      setIsOpen(true);
    }
  }, [query, node, initialOpenNodes]);

  const matchesQuery = query && (
    node.name.toLowerCase().includes(query.toLowerCase()) || node.common_name.toLowerCase().includes(query.toLowerCase())
  );
  
  // Skip rendering nodes that don't match the search
  if (query && !filterTree(node, query)) return null;

  const handleItenClick = () => {
    if (onNodeClick) {
      onNodeClick(node); 
    }
    setIsOpen(!isOpen)
  }
  return <>
    <div className="TreeNode">
      <ListGroupItem 
        action={!!node?.children} 
        onClick={handleItenClick} 
        active={matchesQuery} 
      >
        <span className="pe-2 text-warning">
          {node.children ? (isOpen ? <FaRegFolderOpen /> : <FaRegFolder />) : <FaRegFile />}
        </span>
        <span>
          {node.common_name} aka {node.name}
        </span>
      </ListGroupItem>
      {isOpen && node.children && node.children?.map(item =>
        <TreeNode node={item} key={item.name} query={query} onNodeClick={onNodeClick}  initialOpenNodes={initialOpenNodes}/>
      )}
    </div>
  </>
}

export default Tree