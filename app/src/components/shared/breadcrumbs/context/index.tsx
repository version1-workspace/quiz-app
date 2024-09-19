import { createContext, useContext, useState } from "react";

type Breadcrumb = {
  label: string;
  to: string;
};

type BreadcrumbsContextType = {
  data: Breadcrumb[];
  push: (breadcrumb: Breadcrumb) => void;
  pop: () => Breadcrumb | undefined;
  clear: () => void;
  set: (breadcrumbs: Breadcrumb[]) => void;
  setWithDefault: (breadcrumbs: Breadcrumb[]) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType>({
  data: [],
  push: () => {},
  pop: () => undefined,
  clear: () => {},
  set: () => {},
  setWithDefault: () => {},
});

const useInternal = ({ defaultValues }: { defaultValues: Breadcrumb[] }) => {
  const [data, setData] = useState<Breadcrumb[]>(defaultValues);

  const clear = () => {
    setData([]);
  };

  const set = (breadcrumbs: Breadcrumb[]) => {
    setData(breadcrumbs);
  };

  const setWithDefault = (breadcrumbs: Breadcrumb[]) => {
    setData([...defaultValues, ...breadcrumbs]);
  };

  const push = (breadcrumb: Breadcrumb) => {
    setData((prev) => [...prev, breadcrumb]);
  };

  const pop = () => {
    setData((prev) => prev.slice(0, -1));
    return data[data.length - 1];
  };

  return {
    data,
    push,
    pop,
    clear,
    set,
    setWithDefault,
  };
};

export const BreadcrumbsContainer = ({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues: Breadcrumb[];
}) => {
  const value = useInternal({ defaultValues: defaultValues });

  return (
    <BreadcrumbsContext.Provider value={value}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);

  return context;
};
