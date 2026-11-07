import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiHome,
  FiMonitor,
  FiSearch,
  FiPlus,
  FiBell,
  FiSettings,
  FiTool,
  FiAlertCircle,
  FiCheckCircle,
  FiBox,
  FiMoreVertical,
  FiX,
  FiTrash2
} from "react-icons/fi";
import "./App.css";

const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = RAW_API_URL.replace(/\/+$/, "");
const API_URL = `${BASE_URL}/api/devices`;

function displayStatus(status) {
  const statusMap = {
    "Dang su dung": "Đang sử dụng",
    "Dang bao tri": "Đang bảo trì",
    "Hu hong": "Hư hỏng",
    "Ngung su dung": "Ngừng sử dụng",
  };

  return statusMap[status] || status;
}

function App() {
  const [activeMenu, setActiveMenu] = useState("devices");
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  // Lấy dữ liệu thiết bị từ Backend
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL, {
          params: { search },
        });

        setDevices(response.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
        setError("Không thể tải dữ liệu thiết bị. Vui lòng kiểm tra Backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [search]);

  // Xử lý thêm thiết bị mới
  const handleAddDevice = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newDevice = {
      deviceId: form.deviceId.value.trim(),
      name: form.name.value.trim(),
      deviceType: form.deviceType.value.trim(),
      room: form.room.value.trim(),
      brand: form.brand.value.trim(),
      model: form.model.value.trim(),
      quantity: Number(form.quantity.value),
      status: form.status.value,
      purchaseDate: form.purchaseDate.value,
      description: form.description.value.trim(),
    };

    try {
      await axios.post(API_URL, newDevice);
      alert("Thêm thiết bị thành công!");
      setShowAddForm(false);

      const response = await axios.get(API_URL, {
        params: { search },
      });
      setDevices(response.data);
    } catch (err) {
      console.error("Lỗi thêm thiết bị:", err);
      alert(err.response?.data?.message || "Không thể thêm thiết bị!");
    }
  };
// Xử lý cập nhật thiết bị
const handleUpdateDevice = async (e) => {
  e.preventDefault();

  const form = e.target;

  const updatedDevice = {
    deviceId: form.deviceId.value.trim(),
    name: form.name.value.trim(),
    deviceType: form.deviceType.value.trim(),
    room: form.room.value.trim(),
    brand: form.brand.value.trim(),
    model: form.model.value.trim(),
    quantity: Number(form.quantity.value),
    status: form.status.value,
    purchaseDate: form.purchaseDate.value,
    description: form.description.value.trim(),
  };

  try {
    await axios.put(`${API_URL}/${editingDevice._id}`, updatedDevice);

    alert("Cập nhật thiết bị thành công!");
    setEditingDevice(null);

    const response = await axios.get(API_URL, {
      params: { search },
    });

    setDevices(response.data);
  } catch (err) {
    console.error("Lỗi cập nhật thiết bị:", err);
    alert(err.response?.data?.message || "Không thể cập nhật thiết bị!");
  }
};
// Xử lý xóa thiết bị
const handleDeleteDevice = async (device) => {
  const confirmDelete = window.confirm(
    `Bạn có chắc chắn muốn xóa thiết bị "${device.name}" không?`
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`${API_URL}/${device._id}`);

    alert("Xóa thiết bị thành công!");

    const response = await axios.get(API_URL, {
      params: { search },
    });

    setDevices(response.data);
  } catch (err) {
    console.error("Lỗi xóa thiết bị:", err);
    alert(err.response?.data?.message || "Không thể xóa thiết bị!");
  }
};
  // Thống kê thiết bị
  const totalDevices = devices.length;

  const inUse = devices.filter(
    (device) => displayStatus(device.status) === "Đang sử dụng"
  ).length;

  const maintenance = devices.filter(
    (device) => displayStatus(device.status) === "Đang bảo trì"
  ).length;

  const damaged = devices.filter(
    (device) => displayStatus(device.status) === "Hư hỏng"
  ).length;

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><FiMonitor /></div>
          <span>Device<span className="brand-highlight">Care</span></span>
        </div>

        <p className="menu-label">MENU CHÍNH</p>

        <button
          className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveMenu("dashboard")}
        >
          <FiHome /> Tổng quan
        </button>

        <button
          className={`menu-item ${activeMenu === "devices" ? "active" : ""}`}
          onClick={() => setActiveMenu("devices")}
        >
          <FiMonitor /> Quản lý thiết bị
        </button>

        <p className="menu-label">HỆ THỐNG</p>

        <button className="menu-item">
          <FiTool /> Bảo trì thiết bị
        </button>

        <button className="menu-item">
          <FiSettings /> Cài đặt
        </button>

        <div className="sidebar-bottom">
          <div className="user-avatar">VT</div>
          <div>
            <strong>Quản trị viên</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>Quản lý thiết bị</h2>
            <p>Quản lý và theo dõi thiết bị trong hệ thống</p>
          </div>

          <div className="topbar-actions">
            <button className="icon-button"><FiBell /></button>
            <div className="topbar-avatar">VT</div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="welcome-section">
          <div>
            <h1>Xin chào, Quản trị viên! 👋</h1>
            <p>Chào mừng bạn đến với hệ thống quản lý thiết bị.</p>
          </div>

          <button className="add-button" onClick={() => setShowAddForm(true)}>
            <FiPlus /> Thêm thiết bị
          </button>
        </section>

        {/* Thống kê */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue"><FiBox /></div>
            <div>
              <p>Tổng thiết bị</p>
              <h2>{totalDevices}</h2>
              <small>Số loại thiết bị</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green"><FiCheckCircle /></div>
            <div>
              <p>Đang sử dụng</p>
              <h2>{inUse}</h2>
              <small>Thiết bị hoạt động</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange"><FiTool /></div>
            <div>
              <p>Đang bảo trì</p>
              <h2>{maintenance}</h2>
              <small>Thiết bị cần bảo trì</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red"><FiAlertCircle /></div>
            <div>
              <p>Hư hỏng</p>
              <h2>{damaged}</h2>
              <small>Thiết bị gặp sự cố</small>
            </div>
          </div>
        </section>

        {/* Bảng danh sách thiết bị */}
        <section className="device-section">
          <div className="section-heading">
            <div>
              <h2>Danh sách thiết bị</h2>
              <p>Thông tin các thiết bị hiện có</p>
            </div>

            <div className="search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Tìm kiếm thiết bị..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>MÃ THIẾT BỊ</th>
                  <th>TÊN THIẾT BỊ</th>
                  <th>LOẠI</th>
                  <th>PHÒNG</th>
                  <th>SỐ LƯỢNG</th>
                  <th>TRẠNG THÁI</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">Đang tải dữ liệu...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7">{error}</td>
                  </tr>
                ) : devices.length === 0 ? (
                  <tr>
                    <td colSpan="7">Không tìm thấy thiết bị nào.</td>
                  </tr>
                ) : (
                  devices.map((device) => {
                    const status = displayStatus(device.status);

                    return (
                      <tr key={device._id || device.deviceId}>
                        <td className="device-id">{device.deviceId}</td>
                        <td
                          className="device-name"
                          onClick={() => setSelectedDevice(device)}
                          style={{ cursor: "pointer" }}
                        >
                          {device.name}
                        </td>
                        <td>{device.deviceType}</td>
                        <td>{device.room}</td>
                        <td>{device.quantity}</td>
                        <td>
                          <span
                            className={`status ${
                              status === "Đang sử dụng"
                                ? "status-green"
                                : status === "Đang bảo trì"
                                ? "status-orange"
                                : "status-red"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
              <td>
<div className="action-buttons">
  <button
    className="more-button"
    onClick={() => setEditingDevice(device)}
    title="Sửa thiết bị"
  >
    <FiMoreVertical />
  </button>

  <button
    className="delete-button"
    onClick={() => handleDeleteDevice(device)}
    title="Xóa thiết bị"
  >
    <FiTrash2 />
  </button>
</div>
</td>
</tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Hiển thị {devices.length} thiết bị
          </div>
        </section>
      </main>

      {/* Modal Thêm thiết bị */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Thêm thiết bị mới</h3>
              <button onClick={() => setShowAddForm(false)} className="close-btn">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddDevice} className="device-form">
              <div className="form-group">
                <label>Mã thiết bị:</label>
                <input name="deviceId" required />
              </div>
              <div className="form-group">
                <label>Tên thiết bị:</label>
                <input name="name" required />
              </div>
              <div className="form-group">
                <label>Loại thiết bị:</label>
                <input name="deviceType" required />
              </div>
              <div className="form-group">
                <label>Phòng:</label>
                <input name="room" required />
              </div>
              <div className="form-group">
                <label>Thương hiệu:</label>
                <input name="brand" />
              </div>
              <div className="form-group">
                <label>Model:</label>
                <input name="model" />
              </div>
              <div className="form-group">
                <label>Số lượng:</label>
                <input type="number" name="quantity" defaultValue={1} min={1} required />
              </div>
              <div className="form-group">
                <label>Trạng thái:</label>
                <select name="status" defaultValue="Dang su dung">
                  <option value="Dang su dung">Đang sử dụng</option>
                  <option value="Dang bao tri">Đang bảo trì</option>
                  <option value="Hu hong">Hư hỏng</option>
                  <option value="Ngung su dung">Ngừng sử dụng</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ngày mua:</label>
                <input type="date" name="purchaseDate" />
              </div>
              <div className="form-group">
                <label>Ghi chú / Mô tả:</label>
                <textarea name="description" rows={3}></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>Hủy</button>
                <button type="submit" className="primary-btn">Lưu thiết bị</button>
              </div>
            </form>
          </div>
        </div>
      )}
    {editingDevice && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h3>Cập nhật thiết bị</h3>
        <button
          onClick={() => setEditingDevice(null)}
          className="close-btn"
        >
          <FiX />
        </button>
      </div>

      <form onSubmit={handleUpdateDevice} className="device-form">
        <div className="form-group">
          <label>Mã thiết bị:</label>
          <input name="deviceId" defaultValue={editingDevice.deviceId} required />
        </div>

        <div className="form-group">
          <label>Tên thiết bị:</label>
          <input name="name" defaultValue={editingDevice.name} required />
        </div>

        <div className="form-group">
          <label>Loại thiết bị:</label>
          <input name="deviceType" defaultValue={editingDevice.deviceType} required />
        </div>

        <div className="form-group">
          <label>Phòng:</label>
          <input name="room" defaultValue={editingDevice.room} required />
        </div>

        <div className="form-group">
          <label>Thương hiệu:</label>
          <input name="brand" defaultValue={editingDevice.brand || ""} />
        </div>

        <div className="form-group">
          <label>Model:</label>
          <input name="model" defaultValue={editingDevice.model || ""} />
        </div>

        <div className="form-group">
          <label>Số lượng:</label>
          <input
            type="number"
            name="quantity"
            defaultValue={editingDevice.quantity}
            min={1}
            required
          />
        </div>

        <div className="form-group">
          <label>Trạng thái:</label>
          <select name="status" defaultValue={editingDevice.status}>
            <option value="Dang su dung">Đang sử dụng</option>
            <option value="Dang bao tri">Đang bảo trì</option>
            <option value="Hu hong">Hư hỏng</option>
            <option value="Ngung su dung">Ngừng sử dụng</option>
          </select>
        </div>

        <div className="form-group">
          <label>Ngày mua:</label>
          <input
            type="date"
            name="purchaseDate"
            defaultValue={editingDevice.purchaseDate?.slice(0, 10) || ""}
          />
        </div>

        <div className="form-group">
          <label>Ghi chú / Mô tả:</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={editingDevice.description || ""}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => setEditingDevice(null)}>
            Hủy
          </button>
          <button type="submit" className="primary-btn">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      {/* Modal Xem chi tiết thiết bị */}
      {selectedDevice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Chi tiết thiết bị: {selectedDevice.name}</h3>
              <button onClick={() => setSelectedDevice(null)} className="close-btn">
                <FiX />
              </button>
            </div>
            <div className="device-detail-body">
              <p><strong>Mã thiết bị:</strong> {selectedDevice.deviceId}</p>
              <p><strong>Loại:</strong> {selectedDevice.deviceType}</p>
              <p><strong>Phòng:</strong> {selectedDevice.room}</p>
              <p><strong>Thương hiệu:</strong> {selectedDevice.brand || "—"}</p>
              <p><strong>Model:</strong> {selectedDevice.model || "—"}</p>
              <p><strong>Số lượng:</strong> {selectedDevice.quantity}</p>
              <p><strong>Trạng thái:</strong> {displayStatus(selectedDevice.status)}</p>
              <p><strong>Ngày nhập:</strong> {selectedDevice.purchaseDate || "—"}</p>
              <p><strong>Mô tả:</strong> {selectedDevice.description || "Không có ghi chú"}</p>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setSelectedDevice(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;