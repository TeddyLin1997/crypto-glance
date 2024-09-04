import { lazy, Suspense } from 'react'
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

const routes = [
  { key: 'home', path: '/', index: true, component: lazy(() => import('@/pages/home')) },
]

const root = (
  <Route path="/">
    <Route>
      {routes.map(item => (<Route key={item.key} index={false} path={item.path} element={<item.component/>} />)) }
    </Route>
  </Route>
)

const router = createBrowserRouter(createRoutesFromElements(root))

const Router = () => (
  <Suspense>
    <RouterProvider router={router} />
  </Suspense>

)

export default Router
