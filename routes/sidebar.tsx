/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    path: '/', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
    exact: true,
  },
  {
    path: '/example/cards',
    icon: 'CardsIcon',
    name: 'Karyawan',
  },
  // {
  //   path: '/example/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/example/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/example/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/example/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/example/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  {
    icon: 'PagesIcon',
    name: 'Sertifikat',
    routes: [
      // submenu
      {
        path: '/sertifikat/belum-diambil',
        name: 'Belum Diambil',
      },
      {
        path: '/sertifikat/sudah-diambil',
        name: 'Sudah Diambil',
      },
    ],
  },
]

export type { IRoute }
export default routes
