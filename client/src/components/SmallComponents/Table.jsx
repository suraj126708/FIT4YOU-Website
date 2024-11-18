export default function Table() {
  return (
    <div className="w-full lg:w-[65%] overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-300 rounded-md shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
            <thead className="bg-gray-300">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase"
                >
                  Trainer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase"
                >
                  Exercise
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase"
                >
                  Time Slot
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  Suraj
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  Weightlifting
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  5:00 AM - 8:00 AM
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  Dev
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  Yoga
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  8:00 AM - 10:00 AM
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  Rohan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  CrossFit
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  10:00 AM - 12:00 PM
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  Anna
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  Pilates
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  12:00 PM - 2:00 PM
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  Payal
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  Nutrition Coaching
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  2:00 PM - 4:00 PM
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
