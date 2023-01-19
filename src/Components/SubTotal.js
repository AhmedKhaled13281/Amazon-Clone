import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBasketTotal } from '../utils/BasketTotal'

const SubTotal = () => {
    const {basket} = useSelector(state => state.data)
    const {user} = useSelector(state => state.auth)
    
    const navigate = useNavigate()

    const handleCheckout = () => {
        if(user){
            navigate("/payment")
        }else{
            navigate("/login")
        }
    }
    console.log(getBasketTotal(basket))
  return (
    <div className='bg-[#cccccc]  flex flex-col justify-center items-center m-[auto] md:w-[60%] p-[15px] rounded-lg sm:w-[100%]'>
        <div>
                <>
                    <p className='text-2xl sm:text-xl'>Subtotal ({basket.length} Items) : <strong>{getBasketTotal(basket)}$</strong></p>
                    <label htmlFor="check" className='select-none ml-[20px]'>
                        <input id="check" type="checkbox"/>
                        This Order Is A Gift
                    </label>
                </>
        </div>
        <button className="w-[40%] mt-[15px] bg-[#F7CA00] p-1 flex rounded-lg justify-center items-center" onClick={() => handleCheckout()}>Proceed to Checkout</button>
    </div>
  )
}

export default SubTotal