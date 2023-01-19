import React from 'react'
import moment from 'moment/moment'
import CheckoutProduct from './CheckoutProduct'


const Order = ({order}) => {
  return (
    <div className=''>
        <div className="flex">
            <h2 className='flex-auto text-3xl font-bold'>Order</h2>
            <h2 className="block">Date : {moment.unix(order.data.created).format("YYYY-MM-DD, h:ma")}</h2>
        </div>
        {
            order.data.basket?.map(item => (
                <CheckoutProduct key={item.id} product={item} hideButton={true}/>
            ))
        }
        <div>
                <>
                    <h3 className='text-center bg-[#cccccc] text-2xl font-bold m-[auto] w-[100%] p-4'>Order Total : {order.data.amount / 100}</h3>
                </>
        </div>
    </div>
  )
}

export default Order