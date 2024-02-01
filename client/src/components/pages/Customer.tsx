import { PencilIcon } from "lucide-react"

const Customer = () => {
  return (
   

    <div className="overflow-x-auto">
    <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
      <div className="w-full">
        <div className="bg-white shadow-md rounded my-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th
                  className="py-3 px-0 text-left cursor-pointer"
                 
                  
                >
                  Order#{' '}
                
                </th>
                <th className="py-3 px-0 text-left">Items</th>
                <th
                  className="py-3 px-0 text-left cursor-pointer"
                  
                  
                >
                  Total Amount{' '}
                  
                </th>
                <th className="py-3 px-0 text-center">Shipping Address</th>
                <th className="py-3 px-0 text-center">Order Status</th>
                <th className="py-3 px-0 text-center">Payment Method</th>
                <th className="py-3 px-0 text-center">Payment Status</th>
                <th
                  className="py-3 px-0 text-left cursor-pointer"
                
                >
                  
                </th>
                <th
                  className="py-3 px-0 text-left cursor-pointer"
                  
                >
                  Last Updated{' '}
                
                </th>
                <th className="py-3 px-0 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
             
                <tr
                
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-0 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span className="font-medium">5</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-left">
                  
                      <div  className="flex items-center">
                        <div className="mr-2">
                          
                        </div>
                        <span>
                       tuyik
                        </span>
                      </div>
                   
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">
                   2542
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="">
                      <div>
                        <strong>dfvbfd</strong>,
                      </div>
                      <div>dfvbfd,</div>
                      <div>dfvbfd, </div>
                      <div>dfvbfd </div>
                      <div>dfvbfd, </div>
                      <div>dfvbfd, </div>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                   
                      <select >
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                 
                      
                  </td>

                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">
                    yj
                    </div>
                  </td>

                  <td className="py-3 px-0 text-center">
                 
                      <select
                       
                      >
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                      </select>
                  
                      <span
                       
                      >
                       
                      </span>
             
                  </td>

                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">
                     
                    </div>
                  </td>


                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">
                    </div>
                  </td>

                  <td className="py-3 px-0 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                       
                      </div>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                        <PencilIcon/>
                  
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


  )
}

export default Customer