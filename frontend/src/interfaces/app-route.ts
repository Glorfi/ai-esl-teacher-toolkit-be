export interface IAppRoute {
  path: string;
  protected?: boolean;
  element: () => JSX.Element;
}
