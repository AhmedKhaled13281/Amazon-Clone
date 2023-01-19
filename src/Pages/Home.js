import React , {useState , useEffect} from 'react'
import { products, headerItems } from '../utils/ProductsData'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Slider from '../Components/Slider'
import banner1 from '../assets/BannerImages/Banner1.jpg'
import banner2 from '../assets/BannerImages/Banner2.jpg'
import banner3 from '../assets/BannerImages/Banner3.jpg'
import banner4 from '../assets/BannerImages/Banner4.jpg'
import banner5 from '../assets/BannerImages/Banner5.jpg'
import Product from '../Components/Product'

const images = [banner1 , banner2 , banner3 , banner4 , banner5]
const Home = ({term}) => {
  const [data , setData] = useState(products)

  useEffect(() => {
    products.forEach(item => {

      if(item.title.split(" ")[0].toLowerCase() === term.split(" ")[0].toLowerCase())
        {
          console.log(item.title.includes(term))
          console.log(term)
          setData(item)
        }
        else if (term === ''){
          setData(products)
        }
    })
  }, [data , term])

  return (
    <div style={{backgroundColor : '#cccccc'}}>
      <div className="hidden md:flex bg-[#232F3E] text-white h-[6vh] items-center truncate md:text-clip ">
        {headerItems.map((item, index) => (
          <p className="mx-[12px]" key={index}>
            {item}
          </p>
        ))}
      </div>
      <div className="">
        <Slider Images={images} />
      </div>
      <div className="flex justify-center mx-[auto] max-w-[auto] ">
        <div className="my-[3rem]">
          <div className="max-w-[180vh] grid gap-x-5 grid-y-0 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 ">
            {data.length > 1 ? (
              data.map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  detail={item.detail}
                  specification={item.specification}
                />
              ))
            ) : (
              <Product
                key={data.id}
                id={data.id}
                title={data.title}
                image={data.image}
                price={data.price}
                rating={data.rating}
                detail={data.detail}
                specification={data.specification}
              />
            )}
          </div>
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ marginTop: "40px", cursor: "pointer" }}
            className="flex  rounded-full bg-blue-100 w-[50px] h-[50px] m-[auto]"
          >
            <h2 className=" w-[100%] flex justify-center align-center m-[auto]">
              <ArrowUpwardIcon />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home