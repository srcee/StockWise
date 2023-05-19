import { Container, interfaces } from 'inversify';
import React, { useContext, useMemo } from 'react';

const InversifyContext = React.createContext<{ container: Container | null }>({
  container: null,
});

type Props = {
  container: Container;
  children: React.ReactNode;
};

export const InversifyContextProvider: React.FC<Props> = ({ container, children }) => {
  const value = useMemo(() => ({ container }), []);

  return <InversifyContext.Provider value={value}>{children}</InversifyContext.Provider>;
};

/**
 * Gets and returns an injectable class instance from the injection container.
 *
 * @param {ServiceIdentifier} identifier - The injectable class identifier
 * @param {any[]} dependenciesList - An array of variables upon whom change the useInjection will return a new injectable class instance
 * @returns {class} - Instance of the injectable class
 */
export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>, dependenciesList: any[] = []) {
  const { container } = useContext(InversifyContext);
  if (!container) {
    throw new Error();
  }

  const injectableInstance = useMemo(() => container.get<T>(identifier), [...dependenciesList]);

  return injectableInstance;
}
