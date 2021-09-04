import Info from "./Info"

export const infoRoutes = [
    {
      path: '/info/people',
      component: Info,
      fetchPath: "people"
    },
    {
      path: '/info/planets',
      component: Info,
      fetchPath: "planets"
    },
    {
      path: '/info/films',
      component: Info,
      fetchPath: "films"
    },
    {
      path: '/info/species',
      component: Info,
      fetchPath: "species"
    },
    {
      path: '/info/vehicles',
      component: Info,
      fetchPath: "vehicles"
    },
    {
      path: '/info/starships',
      component: Info,
      fetchPath: "starships"
    },
  ]