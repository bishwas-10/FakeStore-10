import { PencilIcon } from "lucide-react";

const Customers = () => {
  return (
    <div className="px-4">
      <div className=" flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className=" shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-left cursor-pointer">S.N.</th>
                  <th className="py-3 px-0 text-center">Email</th>
                  <th className="py-3 px-0 text-center">Username</th>
                  <th className="py-3 px-0 text-center">
                    <tr className="flex flex-row justify-around">
                      <th>First Name</th>
                      <th>Last Name</th>
                    </tr>
                  </th>
                  <th className="py-3 px-0 text-center">
                    <tr className="flex flex-row justify-around">
                      <th>City</th>
                      <th>Street</th>
                      <th>Zipcode</th>
                    </tr>
                  </th>
                  <th className="py-3 px-0 text-center">Phone</th>
                  <th className="py-3 px-0 text-center">last updated</th>
                  <th className="py-3 px-0 text-center">Edit</th>
                </tr>
              </thead>
              <tbody className=" text-sm font-medium">
                <tr className="border-b border-gray-200 ">
                  <td className="py-3 px-0 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">2</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-left">
                    <div className="flex items-center">
                      <span>hasudh@gmail.com</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">
                      username
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <tr className="flex flex-row justify-around">
                      <td>first</td>
                      <td>last</td>
                    </tr>
                  </td>

                  <td className="py-3 px-0 text-center">
                    <tr className="flex flex-row justify-around">
                      <td>city</td>
                      <td>street</td>
                      <td>zipcode</td>
                    </tr>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <span className="flex items-center justify-center">
                      phone
                    </span>
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

export default Customers;
