# Arduino Smart Home – Khối 9

Website học tập tương tác 5 tuần dành cho học sinh lớp 9. Học sinh có thể học lý thuyết, chạy phòng thí nghiệm ảo, làm trắc nghiệm, lưu tiến độ và in chứng nhận mà không cần phần cứng. Mỗi bài cũng có lộ trình kiểm chứng tùy chọn bằng Grove Smart Home Kit.

## Chạy trên máy

Website không cần cài thư viện. Có thể mở `index.html` trực tiếp, hoặc dùng bất kỳ máy chủ web tĩnh nào nếu trình duyệt hạn chế JavaScript khi mở tệp cục bộ.

## Đưa lên GitHub Pages

1. Tạo repository GitHub và đưa toàn bộ dự án lên nhánh `main`.
2. Vào **Settings → Pages**.
3. Trong **Build and deployment**, chọn **GitHub Actions**.
4. Workflow có sẵn sẽ tự build và xuất bản website.

## Dữ liệu học sinh

Tên, lớp, nhóm và tiến độ chỉ lưu trong `localStorage` của trình duyệt. Không có dữ liệu nào được gửi lên Internet. Học sinh nên dùng nút **Xuất tiến độ JSON** để sao lưu hoặc nộp cho giáo viên.

## Chỉnh sửa nội dung

Nội dung 5 bài, câu hỏi và đáp án nằm trong mảng `lessons` ở `src/app.js`. Logic mô phỏng cũng được tổ chức trong tệp này để website có thể chạy mà không cần bước biên dịch.

Ngưỡng mặc định:

- Nhiệt độ cảnh báo: trên 25°C.
- Độ ẩm cảnh báo: dưới 40%.
- Âm thanh cảnh báo: trên 600.
- Đèn hành lang: khoảng cách dưới 10 cm.

## Giới hạn

Phiên bản GitHub Pages không có tài khoản hoặc cơ sở dữ liệu tập trung. Chứng nhận được tạo cục bộ cho mục đích học tập, không phải chứng thư có xác thực pháp lý.
