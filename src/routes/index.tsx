import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Layout from '@/pages/layout'

const routes = [
  { key: 'home', path: '/', index: true, component: lazy(() => import('@/pages/home')) },
  { key: 'not-found', path: '*', index: false, component: Layout.NotFound },
]

const root = (
  <Route path="/" element={<Layout />} errorElement={<Layout.ErrorBoundary />}>
    <Route element={<Layout.SuspenseLayout />}>
      {routes.map(item => (<Route key={item.key} index={false} path={item.path} element={<item.component/>} />)) }
      {/* { routes.map(item => (
        <Route key={item.key} index={false} path={item.path} element={<item.component/>}>
          { item.index === false && item.children ? item.children.map(node => <Route key={node.key} index={item.index} path={node.path} element={<node.component/>} />) : null }
        </Route>
      ))} */}
    </Route>
  </Route>
)

const router = createBrowserRouter(createRoutesFromElements(root))

const Router = () => (
  <ErrorBoundary fallbackRender={Layout.ErrorBoundary}>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </ErrorBoundary>

)

export default Router
