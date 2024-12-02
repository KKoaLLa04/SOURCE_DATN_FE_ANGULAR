export interface IContextMenuOption {
  svgIcon: string;
  label: string;
  type: string;
  action: string;
  permission: string;
  innerClass?: string;
  danger?: string;
  borderTop?: string;
  borderBottom?: string;
  data?: any;
  isHide?: boolean
}

export interface IProperty {
  type: string;
  prop: string;
  value: string;
  data?: any;
}
