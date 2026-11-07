
const express = require("express");
const router = express.Router();
const Device = require("../models/Device");

// Lấy danh sách thiết bị + Tìm kiếm
router.get("/", async (req, res) => {
    try {
        const { search } = req.query;
        let filter = {};

        if (search && search.trim() !== "") {
            const keyword = search.trim();

            filter = {
                $or: [
                    { deviceId: { $regex: keyword, $options: "i" } },
                    { name: { $regex: keyword, $options: "i" } },
                    { deviceType: { $regex: keyword, $options: "i" } },
                    { room: { $regex: keyword, $options: "i" } },
                    { brand: { $regex: keyword, $options: "i" } }
                ]
            };
        }

        const devices = await Device.find(filter);
        res.status(200).json(devices);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy thiết bị theo ID
router.get("/:id", async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);

        if (!device) {
            return res.status(404).json({
                message: "Không tìm thấy thiết bị"
            });
        }

        res.status(200).json(device);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Thêm thiết bị
router.post("/", async (req, res) => {
    try {
        const {
            deviceId,
            name,
            quantity
        } = req.body;

        // Kiểm tra dữ liệu bắt buộc
        if (!deviceId || !deviceId.trim()) {
            return res.status(400).json({
                message: "Mã thiết bị không được để trống"
            });
        }

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Tên thiết bị không được để trống"
            });
        }

        if (quantity !== undefined &&
            (!Number.isInteger(Number(quantity)) || Number(quantity) < 1)) {
            return res.status(400).json({
                message: "Số lượng phải là số nguyên lớn hơn 0"
            });
        }

        // Kiểm tra mã thiết bị đã tồn tại
        const existingDevice = await Device.findOne({
            deviceId: deviceId.trim()
        });

        if (existingDevice) {
            return res.status(409).json({
                message: "Mã thiết bị đã tồn tại"
            });
        }

        const device = new Device({
            ...req.body,
            deviceId: deviceId.trim(),
            name: name.trim()
        });

        const savedDevice = await device.save();

        res.status(201).json({
            message: "Thêm thiết bị thành công",
            data: savedDevice
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Mã thiết bị đã tồn tại"
            });
        }

        res.status(400).json({ message: error.message });
    }
});

// Cập nhật thiết bị
router.put("/:id", async (req, res) => {
    try {
        const {
            deviceId,
            name,
            quantity
        } = req.body;

        // Kiểm tra dữ liệu
        if (deviceId !== undefined && !deviceId.trim()) {
            return res.status(400).json({
                message: "Mã thiết bị không được để trống"
            });
        }

        if (name !== undefined && !name.trim()) {
            return res.status(400).json({
                message: "Tên thiết bị không được để trống"
            });
        }

        if (quantity !== undefined &&
            (!Number.isInteger(Number(quantity)) || Number(quantity) < 1)) {
            return res.status(400).json({
                message: "Số lượng phải là số nguyên lớn hơn 0"
            });
        }

        // Kiểm tra mã trùng với thiết bị khác
        if (deviceId) {
            const existingDevice = await Device.findOne({
                deviceId: deviceId.trim(),
                _id: { $ne: req.params.id }
            });

            if (existingDevice) {
                return res.status(409).json({
                    message: "Mã thiết bị đã được sử dụng"
                });
            }
        }

        const updateData = { ...req.body };

        if (deviceId !== undefined) {
            updateData.deviceId = deviceId.trim();
        }

        if (name !== undefined) {
            updateData.name = name.trim();
        }

        const device = await Device.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!device) {
            return res.status(404).json({
                message: "Không tìm thấy thiết bị"
            });
        }

        res.status(200).json({
            message: "Cập nhật thiết bị thành công",
            data: device
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Mã thiết bị đã tồn tại"
            });
        }

        res.status(400).json({ message: error.message });
    }
});

// Xóa thiết bị
router.delete("/:id", async (req, res) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.id);

        if (!device) {
            return res.status(404).json({
                message: "Không tìm thấy thiết bị"
            });
        }

        res.status(200).json({
            message: "Xóa thiết bị thành công"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
