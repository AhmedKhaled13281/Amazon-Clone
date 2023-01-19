import React , {useEffect , useReducer} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProduct from '../Components/CheckoutProduct'
import { getBasketTotal } from '../utils/BasketTotal'
import { CardElement , useStripe , useElements} from '@stripe/react-stripe-js'
import { db } from '../utils/firebase'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import { clearBasket } from '../Redux/actions'


const initialState = {
    succeeded : false,
    processing : "",
    error : null,
    disabled : true,
    clientSecret : false
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SUCCEEDED' :
            return {...state , succeeded : action.payload}
        case 'PROCESSING' :
            return {...state , processing : action.payload}
        case 'ERROR' :
            return {...state , error : action.payload}
        case 'DISABLED' :
            return {...state , disabled : action.payload}
        case 'CLIENT_SECRET' :
            return {...state , clientSecret : action.payload}
        default :
            return state
    }
}

const Payment = () => {
    const {basket} = useSelector(state => state.data)
    const {user} = useSelector(state => state.auth)
    
    const [state , dispatchPaymentState] = useReducer(reducer , initialState)

    const dispatch = useDispatch()
    const stripe = useStripe()
    const element = useElements()
    const navigate = useNavigate()

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method : 'POST',
                url : `/payment/create?total=${getBasketTotal(basket) * 100}`
            })
            dispatchPaymentState({type : 'CLIENT_SECRET' , payload : response.data.clientSecret})
        }

        getClientSecret()
    },[basket])

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatchPaymentState({type : 'PROCESSING' , payload : true})
        const result = await stripe.confirmCardPayment(state.clientSecret , {
            payment_method : {
                card : element.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            db.collection("users")
              .doc(user && user.uid)
              .collection("orders")
              .doc(paymentIntent.id)
              .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
              });

            dispatchPaymentState({type : 'SUCCEEDED' , payload : true})
            dispatchPaymentState({type : 'ERROR' , payload : null})
            dispatchPaymentState({type : 'PROCESSING' , payload : false})

            dispatch(clearBasket())
            navigate("/orders")
        }).catch(err => {dispatchPaymentState({type : 'ERROR' , payload : err})})
    }

    const handleChange = (e) => {
        dispatchPaymentState({type : 'DISABLED' , payload : e.empty})
        dispatchPaymentState({type : 'ERROR' , payload : e.error ? e.error.message : ""})
    }

  return (
    <>
      <div className="w-[100%] bg-[#cccccc] m-[auto] p-4">
        <h2 className="text-center text-2xl font-bold">
          Checkout <span className="text-[#8533ff]">{basket.length} items</span>
        </h2>
      </div>

      <div className="w-[80%] m-[auto] my-[10px]">
        <div className="flex flex-wrap m-[auto]">
          <h1 className="flex-w-[30%] text-xl font-bold mr-[5rem]">
            Delivery Address
          </h1>
          <div className="flex-w-[70%]">
            <h1>{user?.email}</h1>
            <h1>House no. 230 Near Garden</h1>
            <h1>Cairo, Egypt</h1>
          </div>
        </div>

        <hr className="h-[5px] bg-[#F7CA00] rounded-lg my-[5px]" />

        <div className="flex flex-wrap">
          <h1 className="flex-w-[30%] text-xl font-bold">
            Review items and Delivery
          </h1>
          <div className="flex-w-[70%] ">
            {basket &&
              basket.map((item) => (
                <CheckoutProduct key={item.id} product={item} />
              ))}
          </div>
        </div>

        <hr className="h-[5px] bg-[#F7CA00] rounded-lg my-[5px]" />

        <div className="flex flex-wrap">
          <h1 className="flex-w-[30%] text-xl font-bold mr-[5rem]">
            Payment Method
          </h1>
          <div className="flex-w-[30%] md:w-[50%] sm:w-[100%]">
            <form onSubmit={handleSubmit}>
              <div className= 'text-black p-5 w-[100%]'>
               Card Data : <CardElement  className='bg-gray-200 p-4 md:w-[100%] rounded-lg  sm:w-[100%]' onChange={handleChange}/>
              </div>
              <h1 className="text-xl font-bold">
                Order Total : {getBasketTotal(basket)}
              </h1>
              <button
                className="w-[100%] mt-[15px] bg-[#F7CA00] p-2 rounded-l text-xl cursor-pointer"
                disabled={state.processing || state.disabled || state.succeeded}
              >
                {state.processing ? <p>Processing ...</p> : 'Buy Now'}
              </button>
              {state.error && <h1>{state.error}</h1>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment