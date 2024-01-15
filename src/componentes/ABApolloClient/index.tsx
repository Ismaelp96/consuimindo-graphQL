import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactElement } from 'react';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:9000/graphql',
});
type ApolloProps = {
  children: ReactElement;
};
const ABApolloClient = ({ children }: ApolloProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ABApolloClient;
