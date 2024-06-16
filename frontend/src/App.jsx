import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./pages/RootLayout";
import InterviewPage from "./pages/InterviewPage";
import CategoryPage from "./pages/CategoryPage";
import FeedbackPage from "./pages/FeedbackPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/category", element: <CategoryPage /> },
      { path: "/interview", element: <InterviewPage /> },
      { path: "/feedback", element: <FeedbackPage /> },
      { path: "/*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
