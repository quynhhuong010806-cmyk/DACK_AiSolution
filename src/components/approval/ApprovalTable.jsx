import { useEffect, useState } from "react";
import Card from "../common/Card";

import {
  getRequests,
  approveRequest,
  rejectRequest,
} from "../../services/requestService";

export default function ApprovalTable() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const data = await getRequests();

    const pending = data.filter(
      (item) => item.status === "Chờ phê duyệt"
    );

    setRequests(pending);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = async (item) => {
    await approveRequest(item.request_id);
    loadRequests();
  };

  const handleReject = async (item) => {
    const reason = prompt("Nhập lý do");

    if (!reason) return;

    await rejectRequest(
      item.request_id,
      reason
    );

    loadRequests();
  };

  return (
    <Card title="Danh sách yêu cầu chờ phê duyệt">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">Mã</th>
              <th className="border p-3">Vật tư</th>
              <th className="border p-3">Vendor AI đề xuất</th>
              <th className="border p-3">Điểm AI</th>
              <th className="border p-3">Rủi ro</th>
              <th className="border p-3">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((item) => (
              <tr key={item.request_id}>
                <td className="border p-3">
                  {item.request_id}
                </td>

                <td className="border p-3">
                  {item.item_name}
                </td>

                <td className="border p-3">
                  {item.vendor}
                </td>

                <td className="border p-3">
                  {item.vendor_score}
                </td>

                <td className="border p-3">
                  {item.risk_level}
                </td>

                <td className="border p-3">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        handleApprove(item)
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                    >
                      Phê duyệt
                    </button>

                    <button
                      onClick={() =>
                        handleReject(item)
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                    >
                      Từ chối
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
