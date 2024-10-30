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
interface ITreeNode {
  taxon: "Family" | "Genus" | "Species";
  name: string;
  common_name: string;
  children?: ITreeNode[];
}
/**
 * Props for Tree component.
 * - `data`: Node data to be rendered in the tree structure.
 * - `searchQuery`: Optional string for searching/filtering nodes.
 */
interface ITreeProps {
  data: ITreeNode[];
  query?: string;
  onItemClick?: (node: ITreeNode) => void;
}

function Tree({ data, query, onItemClick } : ITreeProps) {
  return (
    <ListGroup>
      {data.map((item: ITreeNode) =>
        <TreeItem node={item} key={item.name} query={query} onItemClick={onItemClick}/>
      )}
    </ListGroup>
  )
}

/**
 * Props for Tree Item Component.
 * - `node`: ITreeNode data to be rendered in the tree structure.
 * - `query`: Optional string for searching/filtering nodes.
 */
interface ITreeItemProps {
  node: ITreeNode;
  query?: string;
  onItemClick?: (node: ITreeNode) => void;
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

export function TreeItem({ node, query, onItemClick } : ITreeItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (query) {
      setIsOpen(filterTree(node, query));
    } else {
      setIsOpen(false);
    }
  }, [query, node]);

  const matchesQuery = query && (
    node.name.toLowerCase().includes(query.toLowerCase()) || node.common_name.toLowerCase().includes(query.toLowerCase())
  );
  
  // Skip rendering nodes that don't match the search
  if (query && !filterTree(node, query)) return null;

  const handleItenClick = () => {
    if (onItemClick) {
      onItemClick(node); 
    }
    setIsOpen(!isOpen)
  }
  return <>
    <div className="TreeItem">
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
        <TreeItem node={item} key={item.name} query={query} onItemClick={onItemClick}/>
      )}
    </div>
  </>
}

export default Tree