
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        // Mã thiết bị
        deviceId: {
            type: String,
            required: [true, "Mã thiết bị không được để trống"],
            unique: true,
            trim: true
        },

        // Tên thiết bị
        name: {
            type: String,
            required: [true, "Tên thiết bị không được để trống"],
            trim: true
        },

        // Loại thiết bị
        deviceType: {
            type: String,
            trim: true
        },

        // Phòng học
        room: {
            type: String,
            trim: true
        },

        // Thương hiệu
        brand: {
            type: String,
            trim: true
        },

        // Model thiết bị
        model: {
            type: String,
            trim: true
        },

        // Số lượng
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: [1, "Số lượng phải lớn hơn 0"],
            validate: {
                validator: Number.isInteger,
                message: "Số lượng phải là số nguyên"
            }
        },

        // Trạng thái
        status: {
            type: String,
            enum: [
                "Đang sử dụng",
                "Đang bảo trì",
                "Hư hỏng",
                "Ngừng sử dụng",
                "Dang su dung",
                "Dang bao tri",
                "Hu hong",
                "Ngung su dung"
            ],
            default: "Đang sử dụng"
        },

        // Ngày mua
        purchaseDate: {
            type: String
        },

        // Mô tả
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Device", deviceSchema);
