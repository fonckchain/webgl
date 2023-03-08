import React, { Suspense, Fragment } from "react";
import AnimatedCursor from "react-animated-cursor";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import PageLoading from "src/component/PageLoading";
import AuthGuard from "src/component/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import UserAuthContext from "src/context/User";

const history = createBrowserHistory();

function App() {
  const theme = createTheme();
  console.log(theme);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <UserAuthContext>
            <Router history={history}>
              <RenderRoutes data={routes} />
            </Router>
          </UserAuthContext>
        </MuiPickersUtilsProvider>
        {/* <AnimatedCursor
        innerSize={15}
        outerSize={25}
        color='193, 11, 111'
        outerAlpha={0.2}
        innerScale={1.3}
        outerScale={5}
        
         /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;
          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
