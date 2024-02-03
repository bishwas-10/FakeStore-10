import { Button } from "@mui/material";
import { PencilIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TProductSchema } from "./sub-components/add-products";
const Products = () => {

  const products = useSelector((state:RootState)=>state.product.products);
  console.log(products);
  return (
    <div className="px-4">
      <div className="h-20 w-full p-4 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide uppercase">Product section</h1>
          <p className="mt-2 ">WHere you can add the products and check all the products listed below
            with pagination features
          </p>
        </div>
       <Button variant="outlined"><a href="/products/addproducts">add  products</a></Button>  
      </div>
    
      <div className=" flex items-center justify-center font-sans overflow-hidden p-3">
        <div className="w-full">
          <div className=" shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-left cursor-pointer">S.N.</th>
                  <th className="py-3 px-0 text-left">Image</th>
                  <th className="py-3 px-0 text-left cursor-pointer">Title</th>
                  <th className="py-3 px-0 text-center">Price</th>
                  <th className="py-3 px-0 text-center">Category</th>
                  <th className="py-3 px-0 text-center">Description</th>
                  <th className="py-3 px-0 text-center">Rating</th>
                  <th className="py-3 px-0 text-center">Last Updated</th>

                  <th className="py-3 px-0 text-center">Edit</th>
                </tr>
              </thead>
              <tbody className=" text-sm font-medium">

                {products.length!==0 && (
                  <>
                  {products.map((product:TProductSchema,index:number)=>{
 <tr className="border-b border-gray-200 ">
                  <td className="py-3 px-0 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span className="font-medium">{index}</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-left">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span>{product.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">{product.price}</div>
                  </td>
                  <td id="category" className="py-3 px-0 text-center">
                    <div className="">
                      <strong>{product.category}</strong>,
                    </div>
                  </td>

                  <td className="py-3 px-0 text-center">
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">
                      {product.description}
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex gap-4 items-center justify-center">
                      <p>{product.rating.rate}</p>
                      <p>{product.rating.count}</p>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <p className="text-center ">last updated</p>
                  </td>

                  <td className="py-3 px-0 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120"></div>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                        <PencilIcon />
                      </div>
                    </div>
                  </td>
                </tr>
                  })}
                  
                  </>
                  
                )}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
