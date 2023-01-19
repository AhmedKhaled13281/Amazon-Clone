import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux'
import { removeFromBasket , addToBasket} from '../Redux/actions'

const CheckoutProduct = ({product , hideButton}) => {
    const dispatch = useDispatch()

  return (
    <div className="flex w-[80%] m-[auto] my-[3rem]">
      <div className="lg:flex-w-[35%] md:w-[30%]">
        <img
          className="lg:object-contain w-[30%] m-[auto] md:w-[30%] sm:w-[70%]"
          src={product?.image}
          alt="ProductImage"
        />
      </div>
      <div>
        <p>{product.title}</p>
        <p>Amount : {product.amount}</p>
        <p>
          Price : {product.price}$ * {product.amount} ={" "}
          {product.price * product.amount}$
        </p>
        <div className="flex">
          {Array(product.rating)
            .fill()
            .map((_, index) => (
              <p key={index}>⭐</p>
            ))}
        </div>

          <div className="flex">
              {!hideButton && (
              <button
                onClick={() => dispatch(removeFromBasket({ ...product }))}
                className="mt-[15px] bg-[#f0c14b] p-1 flex mr-[10px] rounded-lg"
              >
                <i className="mx-2">
                  <RemoveIcon />
                </i>

              </button>
            )}
            {!hideButton && (
              <button
                onClick={() => dispatch(addToBasket({ ...product }))}
                className="mt-[15px] bg-[#f0c14b] p-1 flex rounded-lg"
              >
                <i className="mx-2">
                  <AddIcon />
                </i>

              </button>
            )}
          </div>
      </div>
    </div>
  );
}

export default CheckoutProduct