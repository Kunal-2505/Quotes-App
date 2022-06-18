import React, { Suspense } from "react";
import Layout from "./components/layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import LoadingSpinner from "./components/UI/LoadingSpinner";
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <div>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Redirect to="allquotes"></Redirect>
            </Route>
            <Route path="/allquotes" exact>
              <AllQuotes />
            </Route>
            <Route path="/allquotes/:quoteId">
              <QuoteDetail />
            </Route>
            <Route path="/addquote">
              <NewQuote />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
