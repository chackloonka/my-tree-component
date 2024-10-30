import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {
  FaRegFolder,
  FaRegFolderOpen,
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
}

function Tree({ data, query } : ITreeProps) {
  return (
    <ListGroup>
      {data.map((item: ITreeNode) =>
        <TreeItem node={item} key={item.name} query={query}/>
      )}
    </ListGroup>
  )
}

/**
 * Props for Tree Item Component.
 * - `node`: Node data to be rendered in the tree structure.
 * - `query`: Optional string for searching/filtering nodes.
 */
interface ITreeItemProps {
  node: ITreeNode;
  query?: string;
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

function TreeItem({ node, query } : ITreeItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (query) {
      setIsOpen(filterTree(node, query));
    } else {
      setIsOpen(false);
    }
  }, [query, node]);

  // Skip rendering nodes that don't match the search
  if (query && !filterTree(node, query)) return null;

  return <>
    <div className="TreeItem">
      <ListGroupItem  onClick={() => setIsOpen(!isOpen)} >
        <span className="pe-2">
          {node.children && (isOpen ? <FaRegFolderOpen /> : <FaRegFolder />)}
        </span>
        <span>
          {node.taxon} "{node.common_name} aka {node.name}"
        </span>
      </ListGroupItem>
      {isOpen && node.children && node.children?.map(item =>
        <TreeItem node={item} key={item.name} />
      )}
    </div>
  </>
}

export default Tree