import React , {useState} from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../utils/ProductsData'
import { useDispatch } from 'react-redux';
import { addToBasket } from '../Redux/actions';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const ProductView = () => {
  const [item] = useState(products)
  const dispatch = useDispatch()
  const {id} = useParams()
  const {title , image , price , rating , specification , detail } = item.find((i) => i.id === id)

  return (
    <div className='mb-[20px]'>
      <div className="mb-3">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ads banner"
        />
      </div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="lg:flex-w-[35%] md:w-[30%] ">
          <img className="lg:object-contain w-[30%] m-[auto] md:w-[50%]" src={image} alt="ProductImage" />
        </div>
        <div className="w-[65%]">
          <h2 className="font-bold">{title}</h2>

          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, index) => (
                <p key={index}>⭐</p>
              ))}
          </div>

          <p>Price : <span className="font-bold">{price}$</span></p>
          <h3 className="font-bold">Specification</h3>
          <ul className="list-disc list-inside">
            {specification.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3 className="font-bold">Product Description</h3>
          <p>{detail}</p>
          <button
            onClick={() =>
              dispatch(
                addToBasket({
                  id,
                  title,
                  image,
                  price,
                  rating,
                  specification,
                  detail,
                })
              )
            }
            className="mt-[15px] bg-[#f0c14b] p-1 flex "
          >
            <i className="mx-2">
              <AddShoppingCartOutlinedIcon />
            </i>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductView