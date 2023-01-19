import React  from 'react'
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch , useSelector} from 'react-redux';
import { logoutInit } from '../Redux/actions';

const Header = ({setTerm}) => {
  const userData = useSelector(state => state.auth.user)
  const basketItems = useSelector(state => state.data.basket)
  const dispatch = useDispatch()


  const Logout = () => {
      if(userData)
        dispatch(logoutInit())
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={submitHandler}>
    <nav className="sticky flex items-center h-[60px] bg-[#131921] z-1000 top-0">
      <Link to="/" className="w-[auto]">
        <img
          className="w-[100px] mr-10 ml-5 object-contain mt-18"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className="hidden md:flex text-white mr-[-1px]  flex-col">
        <LocationOnIcon />
      </div>
      <div className="hidden md:flex flex-col text-white mr-3">
        <span className="block f-small text-[12px]">Hello</span>
        <span className="block text-1 text-[14px]">Select Your Address</span>
      </div>
      <div className="hidden md:flex flex-1 items-center rounded-[24px] mr-[-10px]">
        {/* <select className="h-[41px] p-[5px] text-[14px] rounded-[2px]">
          <option>All</option>
        </select> */}

          <input onChange={(e) => setTerm(e.target.value)} placeholder="Search"  type="text" className="h-[41px] p-[10px] w-4/5 border-0" />
          <SearchIcon
            style={{
              height: "41",
              padding: "10",
              backgroundColor: "#fcba03",
              fontSize: "3.2rem",
              userSelect : 'none'
            }}
          />

      </div>
      <div className="hidden md:flex text-white mr-5 ml-5">
        <Link to={`${userData ? '/' : '/login'}`}>
          <div onClick={Logout} className="flex flex-col mr-6">
            <span className="block f-small text-[12px]"> Hello {userData ? userData.email : "Guest"}</span>
            <span className="block text-1 text-[14px] font-bold">{userData ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="flex flex-col mr-5">
            <span className="block f-small text-[12px]">Return </span>
            <span className="block text-1 text-[14px] font-bold">& Orders</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div style={{ display: "flex", alignItems: "center" , marginTop : '5px'}}>
            <ShoppingCartOutlinedIcon />
            <span className="mx-3">{basketItems.length}</span>
          </div>
        </Link>
      </div>

           {/* Mobile First */}
      <div className="md:hidden flex items-center">
        <div className="flex text-white w-full">
          <Link to={`${userData ? '/' : '/login'}`}>
            <div onClick={Logout} className="flex flex-col mr-6">
              <span className="block f-small text-[9px]">Hello {userData ? userData.email : "Guest"}</span>
              <span className="block text-1 text-[14px] font-bold">
                  {userData ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="flex flex-col mr-5">
              <span className="block f-small text-[12px]">Return </span>
              <span className="block text-1 text-[14px] font-bold">
                & Orders
              </span>
            </div>
          </Link>
          <Link to="/checkout">
            <div style={{ display: "flex", alignItems: "center" , marginTop : '10px'}}>
              <ShoppingCartOutlinedIcon />
              <span className="mx-3">{basketItems.length}</span>
            </div>
          </Link>
        </div>
      </div>

    </nav>
    </form>
  );
}

export default Header