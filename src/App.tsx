import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import CheckoutPage from "./pages/CheckoutPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCart } from "./store/cartReducer";
import { ProtectedContext } from "./context/ProtectedContext";
import Protected from "./components/Protected";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route
          path="checkout"
          element={
            <Protected>
              <CheckoutPage />
            </Protected>
          }
        />
      </Route>
    )
  );
  return (
    <>
      <AuthContextProvider>
        <ProtectedContext>
          <RouterProvider router={router} />
          <ToastContainer />
        </ProtectedContext>
      </AuthContextProvider>
    </>
  );
};

export default App;
