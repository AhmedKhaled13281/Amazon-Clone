import {Link} from 'react-router-dom'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../Redux/actions';


const Product = ({id , title , image , price , rating , specification , detail}) => {
    const dispatch = useDispatch();
  return (
    <div className="bg-white p-10 mt-[20px] md:mt-[50px] ">
      <div className="h-[100px] mb-[15px]">
        <Link to={`/products/${id}`}>
          <p className="font-bold">{title}</p>
        </Link>
        <p>
          <strong className="text-[#00cc00]"> Price : ${price}</strong>
        </p>
        <div className="flex">
          Rating :{" "}
          {Array(rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>
      </div>
      <img
        className="w-[100] max-h-[200px] object-contain mb-[15px] m-[auto] sm:mt-[3rem]"
        src={image}
        alt="prodcutImg"
      />
      <button
        onClick={() => dispatch(addToBasket({
            id,
            title,
            image,
            price,
            rating,
            specification,
            detail,
          }))}
        className="w-[150px] m-[auto] bg-[#f0c14b] p-1 flex "
      >
        <i className="mx-2">
          <AddShoppingCartOutlinedIcon />
        </i>
        Add To Cart
      </button>
    </div>
  );
}

export default Product