import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import ErrorPage from "../pages/ErrorPage"
import MemberInfoPage from "../pages/member/MemberInfoPage"
import MemberPage from "../pages/member/MemberPage"
import TeamInfoPage from "../pages/team/TeamInfoPage"
import TeamPage from "../pages/team/TeamPage"

const routes = createBrowserRouter([
  {
    path: "/training-application",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "member", element: <MemberPage /> },
      { path: "team", element: <TeamPage /> },
      { path: "team/info/:teamid", element: <TeamInfoPage /> },
      { path: "member/info/:memberid", element: <MemberInfoPage /> }
    ]
  }

])

export default routes
