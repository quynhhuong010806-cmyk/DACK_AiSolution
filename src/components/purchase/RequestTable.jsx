import { useEffect, useState } from "react";
import Card from "../common/Card";

import {
  getRequests,
} from "../../services/requestService";

export default function RequestTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
  try {

    const data =
      await getRequests();

    setRequests(data);

  } catch (error) {

    console.error(error);

  }
};
  useEffect(() => {

  loadRequests();

  const interval =
    setInterval(() => {

      loadRequests();

    }, 5000);

  return () =>
    clearInterval(interval);

}, []);

  const filteredData = requests.filter((item) => {
    const matchSearch =
      item.request_id.toLowerCase().includes(search.toLowerCase()) ||
      item.item_name.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "Tất cả" ||
      item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "bg-blue-100 text-blue-700";

      case "Đang đánh giá":
        return "bg-purple-100 text-purple-700";

      case "Chờ phê duyệt":
        return "bg-orange-100 text-orange-700";

      case "Đã phê duyệt":
        return "bg-green-100 text-green-700";

      case "Từ chối":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card title="Danh sách yêu cầu mua hàng">

      {/* Search & Filter */}

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Tìm kiếm theo mã hoặc vật tư..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option>Tất cả</option>
          <option>Đang xử lý</option>
          <option>Đang đánh giá</option>
          <option>Chờ phê duyệt</option>
          <option>Đã phê duyệt</option>
          <option>Từ chối</option>
        </select>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="border p-3 text-left">
                Mã yêu cầu
              </th>

              <th className="border p-3 text-left">
                Vật tư
              </th>

              <th className="border p-3 text-left">
                Danh mục
              </th>

              <th className="border p-3 text-left">
                Ngày gửi
              </th>

              <th className="border p-3 text-center">
                Trạng thái
              </th>

              <th className="border p-3 text-center">
                Tiến trình AI
              </th>

              <th className="border p-3 text-center">
                Thao tác
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredData.length > 0 ? (

              filteredData.map((item) => (

                <tr
                  key={item.request_id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="border p-3 font-medium">
                    {item.request_id}
                  </td>

                  <td className="border p-3">
                    {item.item_name}
                  </td>

                  <td className="border p-3">
                    {item.category}
                  </td>

                  <td className="border p-3">
                    {item.created_at}
                  </td>

                  <td className="border p-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="border p-3">

                    <div className="flex items-center gap-3">

                      <div className="flex-1 bg-gray-200 rounded-full h-3">

                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{
                            width: `${item.progress}%`,
                          }}
                        />

                      </div>

                      <span className="w-12 text-sm font-semibold text-gray-700">
                        {item.progress}%
                      </span>

                    </div>

                  </td>

                  <td className="border p-3 text-center">

                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Xem
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  Không tìm thấy yêu cầu phù hợp.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex justify-between items-center mt-6">

        <span className="text-sm text-gray-500">
          Hiển thị {filteredData.length} / {requests.length} yêu cầu
        </span>

        <div className="flex gap-2">

          <button className="border rounded-lg px-3 py-1 hover:bg-gray-100">
            ◀
          </button>

          <button className="bg-blue-600 text-white rounded-lg px-3 py-1">
            1
          </button>

          <button className="border rounded-lg px-3 py-1 hover:bg-gray-100">
            ▶
          </button>

        </div>

      </div>

    </Card>
  );
}
