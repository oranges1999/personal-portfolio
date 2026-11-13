import type { Project } from './types'

// To add a project: append an object here. Optional fields (screenshots, demoUrl, repoUrl)
// are simply not rendered until you set them.
export const projects: Project[] = [
  {
    slug: 'booking-platform',
    status: 'completed',
    title: { en: 'Appointment Booking Platform', vi: 'Nền tảng đặt lịch hẹn' },
    summary: {
      en: 'Online booking for a small salon or clinic: customers book and pay a deposit, staff see their own schedule, and the owner runs everything from one admin panel — all updating in real time.',
      vi: 'Hệ thống đặt lịch online cho salon hoặc phòng khám nhỏ: khách đặt lịch và đặt cọc, nhân viên xem lịch của mình, chủ tiệm quản lý mọi thứ trong một trang quản trị — tất cả cập nhật theo thời gian thực.',
    },
    stack: ['Laravel', 'Inertia', 'Vue 3', 'Tailwind CSS', 'MySQL', 'Laravel Reverb', 'Stripe', 'Pest', 'Docker'],
    problem: {
      en: 'A small business that takes bookings by phone loses time to back-and-forth, double bookings and no-shows. This project replaces the phone and the paper diary with a public booking page, a deposit paid up front, automatic reminders and a live calendar for the whole team. It is a demo built with a fictional brand and seeded sample data.',
      vi: 'Một cửa tiệm nhỏ nhận lịch qua điện thoại mất nhiều thời gian trao đổi qua lại, dễ trùng lịch và hay bị khách bỏ hẹn. Dự án này thay điện thoại và sổ tay bằng trang đặt lịch công khai, tiền cọc trả trước, nhắc lịch tự động và một bộ lịch trực tiếp cho cả tiệm. Đây là dự án demo, dùng thương hiệu hư cấu và dữ liệu mẫu.',
    },
    roles: [
      {
        name: { en: 'Admin (owner)', vi: 'Admin (chủ tiệm)' },
        can: { en: 'Everything: services, staff, appointments, customers, settings and reports.', vi: 'Toàn quyền: dịch vụ, nhân viên, lịch hẹn, khách hàng, cài đặt và báo cáo.' },
      },
      {
        name: { en: 'Staff', vi: 'Nhân viên' },
        can: { en: 'View and update their own appointments, register days off.', vi: 'Xem và cập nhật lịch hẹn của mình, đăng ký ngày nghỉ.' },
      },
      {
        name: { en: 'Customer', vi: 'Khách hàng' },
        can: { en: 'Book, reschedule and cancel their own appointments; see history and invoices.', vi: 'Đặt, đổi, huỷ lịch của mình; xem lịch sử và hoá đơn.' },
      },
      {
        name: { en: 'Guest', vi: 'Khách vãng lai' },
        can: { en: 'Browse services and book without an account.', vi: 'Xem dịch vụ và đặt lịch không cần tài khoản.' },
      },
    ],
    features: [
      {
        title: { en: 'Public booking flow', vi: 'Luồng đặt lịch công khai' },
        items: [
          { en: 'Pick a service, a staff member (or "anyone"), a day and a free time slot.', vi: 'Chọn dịch vụ, nhân viên (hoặc "bất kỳ ai"), ngày và khung giờ còn trống.' },
          { en: 'Free slots are calculated from working hours, days off, existing bookings and service duration.', vi: 'Giờ trống được tính từ giờ làm việc, ngày nghỉ, lịch đã đặt và thời lượng dịch vụ.' },
          { en: 'A slot is held for 10 minutes during payment and released if the payment is not completed.', vi: 'Khung giờ được giữ 10 phút trong lúc thanh toán và trả lại nếu không thanh toán xong.' },
          { en: 'Works well on a phone.', vi: 'Dùng tốt trên điện thoại.' },
        ],
      },
      {
        title: { en: 'Payments (Stripe test mode)', vi: 'Thanh toán (Stripe chế độ test)' },
        items: [
          { en: 'Stripe Checkout for the deposit, confirmed by webhook.', vi: 'Stripe Checkout cho tiền đặt cọc, xác nhận qua webhook.' },
          { en: 'Refunds when a booking is cancelled inside the configurable policy window.', vi: 'Hoàn tiền khi huỷ lịch trong khoảng thời gian chính sách cho phép (cấu hình được).' },
          { en: 'Transaction history for the admin and downloadable PDF invoices.', vi: 'Lịch sử giao dịch cho admin và hoá đơn PDF tải về được.' },
        ],
      },
      {
        title: { en: 'Admin and staff tools', vi: 'Công cụ cho admin và nhân viên' },
        items: [
          { en: 'Day, week and month calendar, filterable by staff member.', vi: 'Lịch theo ngày, tuần, tháng; lọc theo nhân viên.' },
          { en: 'Manage services, categories, staff, working hours, holidays and customers.', vi: 'Quản lý dịch vụ, danh mục, nhân viên, giờ làm việc, ngày nghỉ và khách hàng.' },
          { en: 'Appointment lifecycle: pending payment, confirmed, completed, cancelled, no-show.', vi: 'Vòng đời lịch hẹn: chờ thanh toán, đã xác nhận, hoàn thành, đã huỷ, vắng mặt.' },
          { en: 'Dashboard with revenue and booking charts, plus CSV export.', vi: 'Dashboard có biểu đồ doanh thu và lượt đặt, kèm xuất CSV.' },
        ],
      },
      {
        title: { en: 'Chat and real time', vi: 'Chat và realtime' },
        items: [
          { en: 'One-to-one chat between customer and shop, with online status, typing indicator and read receipts.', vi: 'Chat 1-1 giữa khách và tiệm, có trạng thái online, "đang gõ…" và đã xem.' },
          { en: 'Free slots, calendars, payment status and dashboard numbers update without a page reload.', vi: 'Giờ trống, lịch, trạng thái thanh toán và số liệu dashboard cập nhật không cần tải lại trang.' },
          { en: 'Email confirmations and a reminder 24 hours before the appointment.', vi: 'Email xác nhận và email nhắc lịch trước 24 giờ.' },
        ],
      },
    ],
    highlights: [
      { en: 'Double-booking is prevented at the database level with transactions and row locks, so two people booking the same slot at the same moment cannot both succeed.', vi: 'Chống đặt trùng ngay ở tầng cơ sở dữ liệu bằng transaction và khoá dòng, nên hai người cùng đặt một khung giờ tại cùng thời điểm không thể đều thành công.' },
      { en: 'Private WebSocket channels are authorised per user, so only the people involved in an appointment or a conversation receive its events.', vi: 'Kênh WebSocket riêng tư được phân quyền theo từng người dùng, chỉ người liên quan tới lịch hẹn hoặc cuộc trò chuyện mới nhận được sự kiện.' },
      { en: 'Role-based access is enforced with Laravel policies and gates rather than checks scattered through controllers.', vi: 'Phân quyền theo vai trò bằng Policy và Gate của Laravel thay vì kiểm tra rải rác trong controller.' },
      { en: 'Pest tests cover slot calculation, booking, permissions and the Stripe webhook; GitHub Actions runs tests and lint on every push.', vi: 'Test bằng Pest cho phần tính giờ trống, đặt lịch, phân quyền và webhook Stripe; GitHub Actions chạy test và lint mỗi lần push.' },
      { en: 'One-command local setup with Laravel Sail, and a seeder that creates demo accounts for every role.', vi: 'Chạy local bằng một lệnh với Laravel Sail, có seeder tạo sẵn tài khoản demo cho từng vai trò.' },
    ],
  },
  {
    slug: 'language-landing',
    status: 'planned',
    title: { en: 'Language-Learning App Landing Page', vi: 'Landing page cho app học ngoại ngữ' },
    summary: {
      en: 'A marketing landing page for a fictional language-learning app, taken from a design file to a fast, animated, bilingual Nuxt site.',
      vi: 'Landing page giới thiệu một app học ngoại ngữ hư cấu, đi từ file thiết kế đến một trang Nuxt nhanh, có animation và hai ngôn ngữ.',
    },
    stack: ['Nuxt', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', '@nuxtjs/i18n', '@nuxt/image'],
    problem: {
      en: 'Clients who hand over a design want to know two things: will the build match it, and will it be fast? This project will answer both in public — the design file, the built page and the Lighthouse scores side by side.',
      vi: 'Khách giao bản thiết kế muốn biết hai điều: bản code có khớp thiết kế không, và có nhanh không? Dự án này sẽ trả lời công khai cả hai — file thiết kế, trang đã dựng và điểm Lighthouse đặt cạnh nhau.',
    },
    features: [
      {
        title: { en: 'Page sections', vi: 'Các phần của trang' },
        items: [
          { en: 'Hero with an animated phone mockup, headline stats that count up on scroll, and six feature cards.', vi: 'Hero có mockup điện thoại chuyển động, số liệu nổi bật đếm chạy khi cuộn tới, và sáu thẻ tính năng.' },
          { en: 'Pricing table with a monthly/yearly toggle and a highlighted plan.', vi: 'Bảng giá có nút chuyển tháng/năm và gói nổi bật.' },
          { en: 'Swipeable testimonial carousel (clearly marked as demo content), FAQ accordion and a waitlist form.', vi: 'Carousel đánh giá vuốt được (ghi rõ là nội dung demo), FAQ dạng accordion và form đăng ký chờ.' },
        ],
      },
      {
        title: { en: 'Behaviour', vi: 'Chức năng' },
        items: [
          { en: 'Vietnamese and English, each with its own URL.', vi: 'Tiếng Việt và tiếng Anh, mỗi ngôn ngữ một URL riêng.' },
          { en: 'Light and dark mode that remembers the visitor\'s choice.', vi: 'Chế độ sáng/tối, nhớ lựa chọn của người xem.' },
          { en: 'Waitlist form validated on the client and the server, with spam protection.', vi: 'Form đăng ký chờ được kiểm tra ở cả client lẫn server, có chống spam.' },
          { en: 'Scroll animations that switch off when the visitor prefers reduced motion.', vi: 'Animation khi cuộn, tự tắt khi người xem bật giảm chuyển động.' },
        ],
      },
    ],
    highlights: [
      { en: 'Target: the built page will match the design at 375, 768, 1280 and 1440 px.', vi: 'Mục tiêu: trang dựng xong khớp thiết kế ở 375, 768, 1280 và 1440 px.' },
      { en: 'Target: Lighthouse 90+ for Performance, Accessibility, Best Practices and SEO.', vi: 'Mục tiêu: Lighthouse từ 90 trở lên cho Performance, Accessibility, Best Practices và SEO.' },
      { en: 'Content will live in data files, so copy changes will not require touching components.', vi: 'Nội dung sẽ nằm trong file dữ liệu, nên đổi chữ không cần sửa component.' },
      { en: 'Reusable components (Button, Card, Section, Badge) will share design tokens defined once.', vi: 'Các component dùng lại (Button, Card, Section, Badge) sẽ dùng chung bộ design token định nghĩa một lần.' },
    ],
  },
  {
    slug: 'ai-report-agent',
    status: 'planned',
    title: { en: 'AI Report Agent (MCP)', vi: 'AI Report Agent (MCP)' },
    summary: {
      en: 'Upload a CSV, ask a question in plain language, and an agent will analyse the data, draw the chart and write the report — as an MCP server and as a small web app.',
      vi: 'Tải lên một file CSV, hỏi bằng ngôn ngữ tự nhiên, và agent sẽ phân tích dữ liệu, vẽ biểu đồ rồi viết báo cáo — dưới dạng MCP server và một web app nhỏ.',
    },
    stack: ['Node.js', 'TypeScript', 'MCP SDK', 'Claude API', 'Zod', 'Vue', 'Tailwind CSS'],
    problem: {
      en: 'Most people with a spreadsheet of sales data do not want to write formulas; they want an answer. This project will show how an AI agent can give one reliably: the model decides what to compute, and small, well-defined tools do the computing.',
      vi: 'Phần lớn người có một bảng dữ liệu doanh số không muốn viết công thức; họ muốn câu trả lời. Dự án này sẽ cho thấy AI agent có thể trả lời một cách đáng tin: mô hình quyết định cần tính gì, còn các tool nhỏ, định nghĩa rõ ràng lo phần tính.',
    },
    features: [
      {
        title: { en: 'MCP server', vi: 'MCP server' },
        items: [
          { en: 'Tools to load a CSV, describe its columns, filter rows, group and aggregate, and build time series.', vi: 'Các tool để đọc CSV, mô tả các cột, lọc dòng, nhóm và tổng hợp, và gộp theo thời gian.' },
          { en: 'Chart tool that will return bar, line and pie charts as SVG.', vi: 'Tool vẽ biểu đồ cột, đường, tròn và trả về dạng SVG.' },
          { en: 'Report tool that will combine results and charts into HTML or Markdown.', vi: 'Tool ghép kết quả và biểu đồ thành báo cáo HTML hoặc Markdown.' },
          { en: 'Will run inside Claude Desktop and Claude Code from a sample config.', vi: 'Sẽ chạy được trong Claude Desktop và Claude Code bằng file cấu hình mẫu.' },
        ],
      },
      {
        title: { en: 'Web demo', vi: 'Web demo' },
        items: [
          { en: 'Upload a CSV or pick one of three sample datasets, then preview the table and column summary.', vi: 'Tải CSV lên hoặc chọn một trong ba bộ dữ liệu mẫu, rồi xem trước bảng và tóm tắt các cột.' },
          { en: 'Ask a question and watch each step the agent takes: which tool, with what result.', vi: 'Đặt câu hỏi và theo dõi từng bước agent làm: gọi tool nào, kết quả ra sao.' },
          { en: 'Streamed answer with text and chart, and a one-click downloadable report.', vi: 'Câu trả lời hiện dần gồm chữ và biểu đồ, bấm một nút để tải báo cáo.' },
        ],
      },
    ],
    highlights: [
      { en: 'Every tool will have a strict input schema (Zod) and readable error messages.', vi: 'Mỗi tool sẽ có schema đầu vào chặt chẽ (Zod) và thông báo lỗi dễ hiểu.' },
      { en: 'Safety by design: files will be read only from an allowed folder, file size will be capped, and no code from user data will ever be executed.', vi: 'An toàn từ thiết kế: chỉ đọc file trong thư mục cho phép, giới hạn kích thước file, và không bao giờ chạy code lấy từ dữ liệu người dùng.' },
      { en: 'The API key will stay on the backend; the public demo will have per-visitor limits and a spending cap.', vi: 'API key chỉ nằm ở backend; bản demo công khai sẽ giới hạn theo từng người dùng và có hạn mức chi phí.' },
      { en: 'Acceptance test: five sample questions on the sales dataset must match figures calculated by hand.', vi: 'Tiêu chí nghiệm thu: năm câu hỏi mẫu trên bộ dữ liệu doanh số phải khớp với số liệu tính tay.' },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
