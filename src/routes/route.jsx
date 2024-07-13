import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import DetailPage from "../pages/DetailPage";
import SearchPage from "../pages/SearchPage";


export const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />
              },
              {
                path: '/:explore',
                element: <ExplorePage />
              },
              ,
              {
                path: '/:explore/:id',
                element: <DetailPage />
              },
              ,
              {
                path: '/search',
                element: <SearchPage />
              },
              
        ],
        errorElement: <ErrorPage />
    }


]);