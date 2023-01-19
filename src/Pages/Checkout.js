import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../Components/CheckoutProduct'
import SubTotal from '../Components/SubTotal'

const Checkout = () => {
    const {basket} = useSelector(state => state.data)
    const {user} = useSelector(state => state.auth)

    return (
    <div>
      <div className="mb-3 ">
        <img
          className='w-[100%]'  
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ads banner"
        />
      </div>
      <div className="mx-[2rem]">
            <h6 className='text-xl'>Hello, {user?.email}</h6>
            <h1 className='xl:ml-[2rem] mt-[5px] text-3xl font-bold sm:text-xl'>{basket.length === 0 ? "Your Shopping basket is Empty" : "Your Shopping Basket "}</h1>
            {basket.length > 0 && <SubTotal />}
      </div>
        <div>
            {basket && basket.map((item) => (
                <CheckoutProduct key={item.id} product={item}/>
            ))}
        </div>
        <div>

        </div>
    </div>
  )
}

export default Checkout