import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import {TreeItem} from "./Tree";

const sampleNodeData = {
  "taxon": "Family",
  "name": "Felidae",
  "common_name": "Cat Family",
  "children": [
    {
      "taxon": "Genus",
      "name": "Felis",
      "common_name": "Small Cats",
      "children": [
        {
          "taxon": "Species",
          "name": "Felis catus",
          "common_name": "Domestic Cat"
        },
        {
          "taxon": "Species",
          "name": "Felis silvestris",
          "common_name": "Wildcat"
        },
        {
          "taxon": "Species",
          "name": "Felis lybica",
          "common_name": "African Wildcat"
        }
      ]
    },
    {
      "taxon": "Genus",
      "name": "Prionailurus",
      "common_name": "Leopard Cats",
      "children": [
        {
          "taxon": "Species",
          "name": "Prionailurus bengalensis",
          "common_name": "Leopard Cat"
        },
        {
          "taxon": "Species",
          "name": "Prionailurus viverrinus",
          "common_name": "Fishing Cat"
        },
        {
          "taxon": "Species",
          "name": "Prionailurus planiceps",
          "common_name": "Flat-headed Cat"
        }
      ]
    },
    {
      "taxon": "Genus",
      "name": "Neofelis",
      "common_name": "Clouded Leopards",
      "children": [
        {
          "taxon": "Species",
          "name": "Neofelis nebulosa",
          "common_name": "Clouded Leopard"
        },
        {
          "taxon": "Species",
          "name": "Neofelis diardi",
          "common_name": "Sunda Clouded Leopard"
        },
        {
          "taxon": "Species",
          "name": "Neofelis brachyurus",
          "common_name": "East Asian Clouded Leopard"
        }
      ]
    }
  ]
}

describe("TreeItem", () => {
  test('renders the treeItem structure correctly', () => {
    render(<TreeItem node={sampleNodeData}/>)
    expect(screen.getByText('Cat Family aka Felidae')).toBeInTheDocument()
  })

  test('expands and collapses nodes on click', () => {
    render(<TreeItem node={sampleNodeData}/>)
    expect(screen.queryByText("Small Cats aka Felis")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Cat Family aka Felidae'))
    expect(screen.getByText("Small Cats aka Felis")).toBeInTheDocument()

    fireEvent.click(screen.getByText('Cat Family aka Felidae'))
    expect(screen.queryByText("Small Cats aka Felis")).not.toBeInTheDocument()
  })

  test('hightlights and expands nodes the match search query', () => {
    render(<TreeItem node={sampleNodeData} query="Domestic Cat"/>)
    const highlightedNode = screen.getByText("Domestic Cat aka Felis catus").parentElement;
    expect(highlightedNode).toBeInTheDocument();
    expect(highlightedNode).toHaveClass("list-group-item active");
  })
})