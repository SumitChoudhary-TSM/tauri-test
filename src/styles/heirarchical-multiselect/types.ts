export interface HierarchyNode {
  label: string;
  value: string;
  children?: HierarchyNode[];
}

export type FlatNode =
  | (HierarchyNode & { isParent: true; parentValue?: never })
  | (HierarchyNode & { isParent: false; parentValue: string });

export interface Props {
  options: HierarchyNode[];
  value: Record<string, string[]>;
  onChange: (value: Record<string, string[]>) => void;
  placeholder?: string;
  size?: 'small' | 'medium';
}
