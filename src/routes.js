import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';
import RestricGuard from 'src/components/RestricGuard';
/* connectIntl */
import { formatMessage } from 'src/contexts/Intl';

export const renderRoutes = (routes = [], intl) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          function renderComponent(props) {
            return (route.roles)
              ? (
                <RestricGuard roles={route.roles} >
                  <Component {...props} />
                </RestricGuard>
              )
              : <Component intl={intl} {...props} />
          }

          let path = route.path;
          if (route.multilanguage) {
            if (typeof path === 'object') {
              path = formatMessage(intl[path.value], path.params);
            } else {
              path = formatMessage(intl[path]);
            }
          }

          return (
            <Route
              key={i}
              path={path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {
                      route.routes
                        ? renderRoutes(route.routes, intl)
                        : renderComponent(props)
                    }
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/verification',
    component: lazy(() => import('src/views/auth/VerificationView/JWTVerification'))
  },
  {
    exact: true,
    path: '/verification-unprotected',
    component: lazy(() => import('src/views/auth/VerificationView/JWTVerification'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/forgotpassword',
    component: lazy(() => import('src/views/auth/ForgotpasswordView'))
  },
  {
    exact: true,
    path: '/resetpass',
    component: lazy(() => import('src/views/auth/ResetPasswordView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/2fa-login',
    component: lazy(() => import('src/views/2falogin'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '*',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },

      // NEW ROUTER START
      {
        exact: true,
        path: '/app/start',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },
      {
        exact: true,
        path: '/app/profile',
        component: lazy(() => import('src/views/profile'))
      },
      {
        exact: true,
        path: '/app/product',
        component: lazy(() => import('src/views/product'))
      },
      {
        exact: true,
        path: '/app/license',
        component: lazy(() => import('src/views/licenses/LicensesListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlAppbalance',
        component: lazy(() => import('src/views/balance/balanceListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlAppwithdrawal',
        component: lazy(() => import('src/views/withdrawl/withdrawalListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlAppaffiliate',
        component: lazy(() => import('src/views/affiliates/affiliateListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlAppmarketing',
        component: lazy(() => import('src/views/marketing/marketingListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlAppoperation',
        component: lazy(() => import('src/views/operations/operationListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlAppsupport',
        component: lazy(() => import('src/views/support/supportListView'))
      },
      {
        exact: true,
        multilanguage: true,
        path: 'urlApplegal',
        component: lazy(() => import('src/views/legal/legalListView'))
      },
      // NEW ROUTER END
      {
        component: () => <Redirect to="/" />
      }
    ]
  },
];

export default routes;
