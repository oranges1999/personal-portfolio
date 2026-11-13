# Thiết kế: Website portfolio cá nhân

Ngày: 2026-11-13

## Mục đích

Một website giới thiệu Huy Nguyen (full-stack developer: Laravel, Vue/Nuxt, Node.js, AI agent) cho khách trên Upwork. Khách vào site phải thấy nhanh ba điều: Huy làm được gì, đã làm ra sản phẩm gì, và liên hệ ở đâu.

Nguồn nội dung: doc "Spec dự án cá nhân và portfolio" và hồ sơ Upwork hiện tại.

## Mục tiêu

- Giới thiệu bản thân, dịch vụ, cách làm việc và tech stack (lấy từ hồ sơ Upwork).
- Trình bày 3 dự án demo, mỗi dự án một trang case study.
- Hai ngôn ngữ: Anh (mặc định) và Việt.
- Thêm ảnh, link demo, link repo cho dự án sau này chỉ bằng cách sửa file dữ liệu.
- Tự deploy lên GitHub Pages mỗi lần push vào nhánh mặc định.

## Không làm

- Không nhắc tới design tool cho file .pen (spec ghi là riêng tư).
- Không hiện giá theo giờ, tên công ty đang làm, hay thông tin cá nhân ngoài các kênh liên hệ đã chọn.
- Không có form liên hệ gửi qua server (GitHub Pages là site tĩnh).
- Không có blog, CMS, analytics.

## Điều phải tránh

- Trình bày dự án chưa làm như đã xong. Mỗi dự án có nhãn trạng thái đúng sự thật.
- Ảnh chụp, số liệu, đánh giá của khách bịa ra.

## Các hướng đã cân nhắc

| Hướng | Được | Mất |
| --- | --- | --- |
| A. Một trang duy nhất, dự án là các thẻ | Nhanh nhất, gọn | Không đủ chỗ kể chi tiết từng dự án; ít giá trị với khách đang đánh giá năng lực |
| **B. Trang chủ + trang case study cho từng dự án, nội dung trong file dữ liệu TypeScript** (đã chọn) | Đủ chiều sâu, có kiểu dữ liệu kiểm tra thiếu bản dịch, ít phụ thuộc | Phải viết nội dung 2 ngôn ngữ cho 3 dự án |
| C. Như B nhưng dùng Nuxt Content (Markdown) | Viết bài dài thoải mái | Thêm một module và cách tổ chức song ngữ phức tạp hơn, chưa cần cho 3 dự án |

Stack và nơi deploy do bạn chọn: Nuxt + Tailwind, xuất site tĩnh, GitHub Pages.

## Thiết kế

**Kỹ thuật**

- Nuxt (bản ổn định mới nhất) + Tailwind CSS + `@nuxtjs/i18n`, build bằng `nuxt generate`.
- URL: tiếng Anh ở `/`, tiếng Việt ở `/vi/`. Site nằm tại `https://oranges1999.github.io/personal-portfolio/`.
- Chế độ sáng/tối, nhớ lựa chọn, mặc định theo hệ điều hành.
- SEO cơ bản: title, description, Open Graph, `hreflang` cho 2 ngôn ngữ.
- GitHub Actions: build và deploy lên Pages khi push vào nhánh mặc định.

**Trang chủ** (một trang cuộn, menu nhảy tới từng phần)

```
Header:  Huy Nguyen | Services  Projects  About  Contact | EN/VI | sáng/tối
Hero:    "Full-Stack Developer — Laravel, Vue/Nuxt, Node.js, AI Agents"
         1–2 câu giới thiệu · [Xem dự án] [Hire me on Upwork]
Services: 5 thẻ — Laravel/PHP · Vue/Nuxt + Tailwind · Node.js · AI agents · DB & DevOps
Projects: 3 thẻ, mỗi thẻ có nhãn trạng thái, stack, mô tả ngắn → trang case study
How I work: 4 điểm từ hồ sơ Upwork
Tech stack: danh sách công nghệ theo nhóm
About:   Việt Nam (GMT+7), 2+ năm kinh nghiệm, học vấn, ngôn ngữ
Contact: Upwork · GitHub · Email
Footer
```

**Trang case study** `/projects/<slug>`: vấn đề, vai trò người dùng, tính năng chính, stack, điểm kỹ thuật đáng chú ý, ảnh chụp (nếu có), link demo và repo (nếu có).

**Trạng thái dự án**

| Dự án | Nhãn | Ghi chú |
| --- | --- | --- |
| Appointment Booking Platform | Completed · live demo coming soon | Đã code xong, chưa deploy |
| Language-learning landing page | Planned | Chưa làm |
| AI Report Agent (MCP) | Planned | Chưa làm |

Nội dung case study viết từ spec. Hai dự án chưa làm được mô tả ở thì tương lai ("will", "sẽ").

## Quyết định của tôi (bạn có thể sửa)

- Tên hiển thị: "Huy Nguyen".
- Tiếng Anh là mặc định vì khách Upwork đọc tiếng Anh.
- Giao diện tối giản, chữ là chính, một màu nhấn; tôi tự thiết kế, không dùng template.
- Chỗ ảnh chụp chưa có sẽ ẩn hẳn, không đặt ảnh giữ chỗ.
- Nội dung dự án nằm ở `data/projects.ts`, chữ giao diện nằm ở `i18n/locales/{en,vi}.json`.

## Còn thiếu từ bạn

1. Địa chỉ email muốn hiện công khai.
2. Link repo của Booking Platform (tôi không thấy nó trong danh sách repo GitHub của bạn) và ảnh chụp màn hình nếu có.
3. Sau khi code được merge vào nhánh mặc định: bật Pages một lần tại Settings → Pages → Source: "GitHub Actions".

Thiếu mục 1 và 2 vẫn build được: kênh hoặc link nào chưa có thì không hiển thị.

## Kiểm tra trước khi báo xong

- `nuxt generate` chạy không lỗi.
- Mở bản build bằng trình duyệt ở 375px và 1280px, cả 2 ngôn ngữ, cả sáng và tối; chụp ảnh để xem lại.
- Mọi link nội bộ hoạt động dưới đường dẫn con `/personal-portfolio/`.
