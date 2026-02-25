import * as React from "react"
import Callout from "../../callout"
import figma from "@figma/code-connect"

figma.connect(
  Callout,
  "https://www.figma.com/design/DSWhPLyJzbliP1fBrLxDUR/M%C3%ADstica-Desktop?node-id=775%3A154",
  {
    props: {
      asset: figma.boolean("Asset", {
        true: figma.children('*'),
        false: undefined,
      }),
      dismissable: figma.boolean("Dismissable", {
        true: () => {},
        false: undefined,
      }),
      title: figma.boolean("Title", {
        true: figma.textContent("Title"),
        false: undefined,
      }),
      description: figma.textContent("Description"),
      variant: figma.enum("Theme context", {
        Default: "default",
        Brand: "brand",
        Alternative: "default",
      }),
      buttonPrimary: figma.boolean("Action", {
        true: figma.children('[D]*'),
        false: undefined,
      }),
      buttonSecondary: figma.boolean("Action", {
        true: figma.children('Button Secondary [D]*'),
        false: undefined,
      }),
      buttonLink: figma.boolean("Action", {
        true: figma.children('Button Link [D]*'),
        false: undefined,
      }),
    },
    example: (props) => (
      <Callout
        asset={props.asset}
        title={props.title}
        description={props.description}
        onClose={props.dismissable}
        variant={props.variant} 
        buttonPrimary={props.buttonPrimary}
        buttonSecondary={props.buttonSecondary}
        buttonLink={props.buttonLink}
    ),
  },
)
