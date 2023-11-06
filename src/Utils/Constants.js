import shortid from "shortid";

export const ROW = "row";
export const COLUMN = "column";
export const SIDEBAR_ITEM = "sidebarItem";
export const COMPONENT = "component";
export const TWOCOLUMNBLOCK = "TwoColumnBlock";
export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "input",
      content: "Some input",
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "name",
      content: "Some name",
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "email",
      content: "Some email",
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "phone",
      content: "Some phone",
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "image",
      content: "Some image",
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "Two-Column-Block",
      content: "MultiColumn",
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "Three-Column-Block",
      content: "ThreeColumn",
    },
  },
];
