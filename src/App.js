import { lazy, Suspense, useEffect, useState } from "react";
import { Route , Routes  } from "react-router-dom";
import Header from "./Components/Header";
// import Home from './Pages/Home'
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import {setUser} from './Redux/actions'
// import ProductView from "./Pages/ProductView";
// import Checkout from "./Pages/Checkout";
// import Payment from "./Pages/Payment";
// import Orders from "./Pages/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Lazy Loading
const Home = lazy(() => import("./Pages/Home"))
const Login = lazy(() => import("./Pages/Login"))
const Register = lazy(() => import("./Pages/Register"))
const Checkout = lazy(() => import("./Pages/Checkout"))
const Payment = lazy(() => import("./Pages/Payment"))
const Orders = lazy(() => import("./Pages/Orders"))
const ProductView =  lazy(() => import("./Pages/ProductView"))

const promise = loadStripe('pk_test_51MRLShJrFE8HiED6l5oFwCsfwfUBNdIFW6jt99bZ29FaeB10wOTuzuylcZZokpd6iogHrUwAtAWKkTWc2uRqXvQX00VmteGjKT')

function App() {
  const [term , setTerm] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        if(authUser)
          dispatch(setUser(authUser))
         else
          dispatch(setUser(null))
    })
  })
  return (
    <div>
      <div></div>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Suspense fallback={<h1>Loading ...</h1>}>
                <Header setTerm={setTerm} />
                <Home term={term} />
              </Suspense>
            </>
          }
        />
        <Route path="/login" element={<Suspense fallback={<h1>Loading ...</h1>}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<h1>Loading ...</h1>}><Register /></Suspense>} />
        <Route
          path="/products/:id"
          element={
            <>
              <Suspense fallback={<h1>Loading ...</h1>}>
                <Header /> <ProductView />
              </Suspense>
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Suspense fallback={<h1>Loading ...</h1>}>
                <Header />
                <Checkout />
              </Suspense>
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Suspense fallback={<h1>Loading ...</h1>}>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </Suspense>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Suspense fallback={<h1>Loading ...</h1>}>
                <Header />
                <Orders />
              </Suspense>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
