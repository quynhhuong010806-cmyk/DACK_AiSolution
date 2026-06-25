import {
  FaPaperPlane,
  FaRedo,
  FaUpload,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import TextAreaField from "../common/TextAreaField";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import {
  createRequest,
} from "../../services/requestService";
export default function PurchaseForm() {
const navigate = useNavigate();

const [loading, setLoading] = useState(false);

const [category, setCategory] = useState("");
const [itemName, setItemName] = useState("");
const [quantity, setQuantity] = useState("");
const [unit, setUnit] = useState("Kg");
const [requiredDate, setRequiredDate] = useState("");
const [priority, setPriority] = useState("Trung bình");
const [description, setDescription] = useState("");
const handleSubmit = async () => {

  try {

    setLoading(true);

    await createRequest({
      category,
      item_name: itemName,
      quantity,
      unit,
      required_date: requiredDate,
      priority,
      description,
    });

    toast.success(
      "Yêu cầu đã được gửi thành công!"
    );

    navigate("/dashboard");

  } catch (error) {

    console.error(error);

    toast.error(
      "Gửi yêu cầu thất bại"
    );

  } finally {

    setLoading(false);

  }

};
  return (
    <Card title="Thông tin yêu cầu mua hàng">

      <div className="grid grid-cols-2 gap-6">

        <SelectField
  label="Danh mục vật tư"
  required
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
          <option>Chọn danh mục vật tư</option>
          <option>Nguyên vật liệu</option>
          <option>Linh kiện</option>
          <option>Thiết bị</option>
          <option>Dịch vụ</option>
        </SelectField>

        <InputField
  label="Tên vật tư cần mua"
  placeholder="Ví dụ: Thép tấm SS400"
  required
  value={itemName}
  onChange={(e) =>
    setItemName(e.target.value)
  }
/>

        <InputField
  label="Số lượng"
  type="number"
  placeholder="Nhập số lượng"
  required
  value={quantity}
  onChange={(e) =>
    setQuantity(e.target.value)
  }
/>

        <SelectField
  label="Đơn vị tính"
  required
  value={unit}
  onChange={(e) =>
    setUnit(e.target.value)
  }
>
          <option>Kg</option>
          <option>Tấn</option>
          <option>Mét</option>
          <option>Chiếc</option>
          <option>Bộ</option>
        </SelectField>

        <InputField
  label="Ngày cần giao"
  type="date"
  required
  value={requiredDate}
  onChange={(e) =>
    setRequiredDate(e.target.value)
  }
/>

        <SelectField
  label="Mức độ ưu tiên"
  value={priority}
  onChange={(e) =>
    setPriority(e.target.value)
  }
>
          <option>Thấp</option>
          <option>Trung bình</option>
          <option>Cao</option>
        </SelectField>

      </div>

      <div className="mt-6">

        <TextAreaField
  label="Mô tả yêu cầu"
  placeholder="..."
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>

      </div>

      <div className="mt-6">

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Đính kèm tài liệu
        </label>

        <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:bg-blue-50 transition cursor-pointer">

          <FaUpload className="mx-auto text-4xl text-blue-500 mb-3" />

          <p className="font-medium">
            Kéo & thả tài liệu hoặc nhấn để tải lên
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Hỗ trợ PDF, Word, Excel, Hình ảnh
          </p>

        </div>

      </div>

      <div className="flex gap-4 mt-8">

        <Button
  onClick={handleSubmit}
  disabled={loading}
>
          <div className="flex items-center gap-2">
            <FaPaperPlane />
            Gửi yêu cầu đánh giá
          </div>
        </Button>

        <Button variant="secondary">
          <div className="flex items-center gap-2">
            <FaRedo />
            Làm mới
          </div>
        </Button>

      </div>

    </Card>
  );
}
