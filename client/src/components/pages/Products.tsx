import { PencilIcon } from "lucide-react";
const Products = () => {
  return (
    <div className="px-4">
      <a href="/products/addproducts">add products</a>
      <div className=" flex items-center justify-center font-sans overflow-hidden">
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
                <tr className="border-b border-gray-200 ">
                  <td className="py-3 px-0 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span className="font-medium">5</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-left">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span>tuyik</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">2542</div>
                  </td>
                  <td id="address" className="py-3 px-0 text-center">
                    <div className="">
                      <strong>dfvbfd</strong>,
                    </div>
                  </td>

                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">fsaf</div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">
                      Description
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex gap-4 items-center justify-center">
                      <p>wd</p>
                      <p>swd</p>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
