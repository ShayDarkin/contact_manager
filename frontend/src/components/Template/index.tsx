export interface IGlobalTemplate {
  children: React.ReactNode;
}

const GlobalTemplate = ({ children }: IGlobalTemplate) => {
  return <>{children}</>;
};

export default GlobalTemplate;
