# Hướng Dẫn Sử Dụng API Backend - Quản Lý Công Việc

## 1. Cài đặt ban đầu: Kết nối tới Backend

Để ứng dụng React Native có thể giao tiếp với API trên máy tính của bạn, bạn **phải** cấu hình đúng địa chỉ IP.

**Bước 1: Tìm địa chỉ IP của máy tính**

1.  Mở Command Prompt (gõ `cmd` vào menu Start).
2.  Gõ lệnh `ipconfig` và nhấn Enter.
3.  Tìm địa chỉ `IPv4 Address` (thường có dạng `192.168.x.x`).

**Bước 2: Cập nhật tệp cấu hình**

1.  Mở tệp: `frontend/src/config/apiConfig.js`.
2.  Thay thế chuỗi `YOUR_COMPUTER_IP` bằng địa chỉ IP bạn vừa tìm được.

    ```javascript
    // Ví dụ sau khi thay thế:
    const API_BASE_URL = 'http://192.168.1.10:8080/api/v1';
    ```

**Base URL cho mọi request API sẽ là:** `http://<IP_CỦA_BẠN>:8080/api/v1`

## 2. Kiểm tra API với Swagger UI

Bạn có thể xem tài liệu và kiểm tra trực tiếp tất cả các API một cách trực quan.

1.  Đảm bảo backend Spring Boot đang chạy.
2.  Mở trình duyệt và truy cập: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

Tại đây, bạn có thể thực hiện các lệnh gọi API (POST, GET, PUT,...) và xem kết quả trả về ngay lập tức.

## 3. Mô tả các Đối tượng Dữ liệu (Data Models)

### `Task`

| Thuộc tính  | Kiểu dữ liệu | Mô tả                                     |
|-------------|--------------|-------------------------------------------|
| `id`        | `Long`       | Khóa chính, định danh duy nhất.           |
| `name`      | `String`     | Tên công việc (Bắt buộc).                 |
| `priority`  | `String`     | Độ ưu tiên. Xem Enum `Priority`.          |
| `status`    | `String`     | Trạng thái. Xem Enum `Status`.            |
| `description`| `String`     | Mô tả chi tiết (Có thể là `null`).        |

### Enum `Priority`

- `"HIGH"`
- `"MEDIUM"`
- `"LOW"`

### Enum `Status`

- `"PENDING"`
- `"COMPLETED"`

## 4. Danh sách API Endpoints

**Base URL:** `/api/v1/tasks`

--- 

### 4.1. Lấy danh sách tất cả công việc

- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Response (200 OK):** Mảng các đối tượng `Task`.

  ```json
  [
    {
      "id": 1,
      "name": "Học React Native",
      "priority": "HIGH",
      "status": "PENDING",
      "description": "Hoàn thành tutorial về State Management."
    },
    {
      "id": 2,
      "name": "Đi chợ",
      "priority": "MEDIUM",
      "status": "PENDING",
      "description": null
    }
  ]
  ```

--- 

### 4.2. Thêm mới một công việc

- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Request Body:**

  ```json
  {
    "name": "Làm bài tập về nhà",
    "priority": "LOW",
    "description": "Bài tập chương 5."
  }
  ```

- **Response (201 Created):** Đối tượng `Task` vừa được tạo.

  ```json
  {
    "id": 3,
    "name": "Làm bài tập về nhà",
    "priority": "LOW",
    "status": "PENDING",
    "description": "Bài tập chương 5."
  }
  ```

--- 

### 4.3. Lấy chi tiết một công việc

- **Method:** `GET`
- **Endpoint:** `/tasks/{id}`
- **Response (200 OK):** Đối tượng `Task` tương ứng.
- **Error Response (404 Not Found):** Nếu không tìm thấy.

--- 

### 4.4. Cập nhật thông tin công việc

- **Method:** `PUT`
- **Endpoint:** `/tasks/{id}`
- **Request Body:** (Chứa các trường cần cập nhật)

  ```json
  {
    "name": "Đi siêu thị mua đồ",
    "priority": "HIGH",
    "description": "Mua thêm sữa và bánh mì."
  }
  ```

- **Response (200 OK):** Đối tượng `Task` sau khi đã cập nhật.

--- 

### 4.5. Cập nhật trạng thái công việc

- **Method:** `PATCH`
- **Endpoint:** `/tasks/{id}/status`
- **Request Body:**

  ```json
  {
    "status": "COMPLETED"
  }
  ```

- **Response (200 OK):** Đối tượng `Task` sau khi đã cập nhật trạng thái.

--- 

### 4.6. Xóa một công việc

- **Method:** `DELETE`
- **Endpoint:** `/tasks/{id}`
- **Response (200 OK hoặc 204 No Content):** Không có nội dung trả về, chỉ cần kiểm tra status code.
- **Error Response (404 Not Found):** Nếu không tìm thấy.
