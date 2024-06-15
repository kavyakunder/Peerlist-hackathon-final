import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./pages/RootLayout";
import InterviewPage from "./pages/InterviewPage";
import CategoryPage from "./pages/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/category", element: <CategoryPage /> },
      { path: "/interview", element: <InterviewPage /> },
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
