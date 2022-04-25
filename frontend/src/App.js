import Home from "./components/Home";
import Auth from "./components/Auth";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";

const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <CookiesProvider>
          <div className="App">
            <Router>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Auth />} />
              </Routes>
            </Router>
          </div>
        </CookiesProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
