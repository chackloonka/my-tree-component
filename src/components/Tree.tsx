/**
 * Type definition for a ITreeNode.
 * - `taxon`: Defines the taxonomic rank "Family" | "Genus" | "Species".
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
  console.log(data.data);

  return (
    <div>
      <ul>
        {data.map((item: ITreeNode) =>
          <TreeItem node={item} key={item.name} />
        )}
      </ul>
    </div>
  )
}

function TreeItem({ node }: { node: ITreeNode }) {

  return <li>
    <span>{node.common_name}</span>
    {node.children && <ul>
      {node.children?.map(item =>
        <TreeItem node={item} key={item.name} />
      )}
    </ul>}

  </li>
}

export default Tree