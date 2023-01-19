import React , {useEffect , useState} from 'react'
import { db } from '../utils/firebase'
import { useSelector } from 'react-redux'
import Order from '../Components/Order'

const Orders = () => {
  const {user} = useSelector(state => state.auth)
  const [orders , setOrders] = useState([])

  useEffect(() => {
    if(user){
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .orderBy("created", "desc")
          .onSnapshot((snapshot) => 
            setOrders(snapshot.docs.map(doc => ({
                id : doc.id,
                data : doc.data()
              }))
            )
          )
    }else{
      setOrders([])
    }
  },[user])

  
  return (
    <div className='w-[100%]'>
      <h1 className='text-center bg-[#cccccc] text-2xl font-bold m-[auto] w-[100%] p-4'>Your Orders</h1>
      <div className="">
        {orders && orders.map((order , index) => <Order order={order} key={index}/>)}
      </div>
    </div>
  )
}

export default Orders