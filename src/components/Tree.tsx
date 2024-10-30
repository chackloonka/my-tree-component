import { useState } from "react";
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

interface ITreeProps {
  data: ITreeNode[];
}

function Tree({ data }: { data: ITreeProps }) {
  return (
    <ListGroup>
      {data.map((item: ITreeNode) =>
        <TreeItem node={item} key={item.name} />
      )}
    </ListGroup>
  )
}

function TreeItem({ node }: { node: ITreeNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return <>
    <div className="TreeItem">
      <ListGroupItem 
        className="cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pe-2">
          {node.children && (isOpen ? <FaRegFolderOpen /> : <FaRegFolder />)}
        </span>
        <span>
          {node.common_name} aka {node.name}
        </span>
      </ListGroupItem>
      {isOpen && node.children && node.children?.map(item =>
        <TreeItem node={item} key={item.name} />
      )}
    </div>
  </>
}

export default Tree