# Phòng thí nghiệm Arduino - Khối 9

Website học Arduino theo hành trình 7 trạm thực hành, mô phỏng hoàn toàn trên Velxio. Học sinh học theo nhịp **dự đoán - kiểm tra - giải thích**, làm quiz, nộp liên kết mô phỏng, nhận huy hiệu năng lực và in chứng nhận từng bài.

## Nội dung

1. Sơ đồ khối và Arduino Uno
2. Digital Input/Output và `if...else`
3. Analog Input, PWM và `map()`
4. Serial Monitor và cảm biến mưa
5. Khoảng cách và động cơ Servo
6. Màn hình LCD và thư viện
7. Dự án Smart Home tổng hợp

## Tiến độ học tập

Họ tên, lớp, điểm, liên kết bài làm, thử thách và huy hiệu chỉ được lưu trong `localStorage` của trình duyệt với khóa `ash-velxio-v1`. Website không yêu cầu tài khoản và không gửi dữ liệu học sinh đến máy chủ.

Điều kiện hoàn thành mỗi trạm được giữ nguyên: quiz đạt ít nhất 70% và có liên kết dự án thuộc `velxio.dev`.

## Chạy cục bộ

Website không có bước biên dịch. Chạy bằng một máy chủ web tĩnh, sau đó mở `index.html` qua máy chủ đó.

## Triển khai

Workflow `.github/workflows/deploy.yml` tự động đưa `index.html` và thư mục `src` lên GitHub Pages khi nhánh `main` có commit mới.
