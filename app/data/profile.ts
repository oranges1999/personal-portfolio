import type { Profile } from './types'

export const profile: Profile = {
  name: 'Huy Nguyen',
  title: {
    en: 'Full-Stack Developer — Laravel, Vue/Nuxt, Node.js, AI Agents',
    vi: 'Lập trình viên Full-Stack — Laravel, Vue/Nuxt, Node.js, AI Agent',
  },
  intro: {
    en: 'I build web applications end to end: from a Figma design to the API, the database and the deployment. Based in Vietnam, working with clients worldwide.',
    vi: 'Tôi xây dựng ứng dụng web trọn vẹn từ đầu đến cuối: từ bản thiết kế Figma đến API, cơ sở dữ liệu và triển khai. Sống tại Việt Nam, làm việc với khách hàng ở mọi nơi.',
  },
  services: [
    {
      title: { en: 'Laravel / PHP', vi: 'Laravel / PHP' },
      body: {
        en: 'REST APIs, admin panels, payment integrations, bug fixes and version upgrades.',
        vi: 'REST API, trang quản trị, tích hợp thanh toán, sửa lỗi và nâng cấp phiên bản.',
      },
    },
    {
      title: { en: 'Vue.js / Nuxt + Tailwind CSS', vi: 'Vue.js / Nuxt + Tailwind CSS' },
      body: {
        en: 'Responsive, pixel-accurate interfaces built from your Figma designs.',
        vi: 'Giao diện responsive, bám sát từng pixel theo bản thiết kế Figma của bạn.',
      },
    },
    {
      title: { en: 'Node.js (Express)', vi: 'Node.js (Express)' },
      body: {
        en: 'Backend services and APIs in JavaScript or TypeScript.',
        vi: 'Dịch vụ backend và API viết bằng JavaScript hoặc TypeScript.',
      },
    },
    {
      title: { en: 'AI agents & automation', vi: 'AI agent & tự động hoá' },
      body: {
        en: 'LLM-powered tools built on MCP, and AI-assisted development with Claude Code.',
        vi: 'Công cụ dùng LLM xây trên MCP, và phát triển phần mềm có AI hỗ trợ với Claude Code.',
      },
    },
    {
      title: { en: 'Databases & DevOps', vi: 'Cơ sở dữ liệu & DevOps' },
      body: {
        en: 'MySQL, MongoDB, Docker and CI/CD pipelines that keep releases boring.',
        vi: 'MySQL, MongoDB, Docker và CI/CD để mỗi lần phát hành đều êm.',
      },
    },
  ],
  process: [
    {
      title: { en: 'Clear written communication', vi: 'Trao đổi rõ ràng bằng văn bản' },
      body: {
        en: 'Regular progress updates, and questions asked early rather than late. I prefer chat and email, so requirements stay documented for both of us.',
        vi: 'Cập nhật tiến độ đều đặn, có thắc mắc là hỏi sớm. Tôi ưu tiên chat và email để yêu cầu luôn được ghi lại cho cả hai bên.',
      },
    },
    {
      title: { en: 'Code the next developer can pick up', vi: 'Code để người sau tiếp nhận được' },
      body: {
        en: 'Clean, maintainable code with tests where they matter.',
        vi: 'Code gọn gàng, dễ bảo trì, có test ở những chỗ quan trọng.',
      },
    },
    {
      title: { en: 'Happy to take over existing work', vi: 'Sẵn sàng tiếp nhận dự án dang dở' },
      body: {
        en: 'Comfortable reading an unfamiliar codebase and finishing a half-built project.',
        vi: 'Quen với việc đọc một codebase lạ và hoàn thiện dự án đang làm dở.',
      },
    },
    {
      title: { en: 'Flexible hours', vi: 'Giờ giấc linh hoạt' },
      body: {
        en: 'Based in GMT+7 and able to overlap with your working day.',
        vi: 'Ở múi giờ GMT+7 và sắp xếp được để trùng giờ làm việc của bạn.',
      },
    },
  ],
  stack: [
    { group: { en: 'Backend', vi: 'Backend' }, items: ['Laravel', 'PHP', 'Node.js', 'Express', 'REST APIs'] },
    { group: { en: 'Frontend', vi: 'Frontend' }, items: ['Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
    { group: { en: 'Data & DevOps', vi: 'Dữ liệu & DevOps' }, items: ['MySQL', 'MongoDB', 'Docker', 'CI/CD'] },
    { group: { en: 'AI & tooling', vi: 'AI & công cụ' }, items: ['MCP', 'Claude Code', 'AI agents', 'Figma'] },
  ],
  about: [
    {
      en: "Hi, I'm Huy — a full-stack developer from Hanoi with 2+ years of professional experience as a software engineer.",
      vi: 'Chào bạn, tôi là Huy — lập trình viên full-stack ở Hà Nội, với hơn 2 năm kinh nghiệm làm kỹ sư phần mềm.',
    },
    {
      en: 'Most of my work is the unglamorous middle of a product: admin panels, payment flows, the API behind the screen, and the interface that has to match the design. Lately I also build AI agents and use AI-assisted development to ship faster without giving up on understanding every line.',
      vi: 'Phần lớn công việc của tôi là phần "ruột" của sản phẩm: trang quản trị, luồng thanh toán, API phía sau màn hình, và giao diện phải khớp với thiết kế. Gần đây tôi làm thêm AI agent và dùng AI hỗ trợ lập trình để giao hàng nhanh hơn mà vẫn hiểu từng dòng code.',
    },
  ],
  facts: [
    { label: { en: 'Location', vi: 'Địa điểm' }, value: { en: 'Hanoi, Vietnam (GMT+7)', vi: 'Hà Nội, Việt Nam (GMT+7)' } },
    { label: { en: 'Experience', vi: 'Kinh nghiệm' }, value: { en: '2+ years as a software engineer', vi: 'Hơn 2 năm làm kỹ sư phần mềm' } },
    { label: { en: 'Education', vi: 'Học vấn' }, value: { en: "Engineer's degree in Information Technology, Hanoi Open University", vi: 'Kỹ sư Công nghệ thông tin, Đại học Mở Hà Nội' } },
    { label: { en: 'Languages', vi: 'Ngôn ngữ' }, value: { en: 'Vietnamese (native), English (conversational)', vi: 'Tiếng Việt (bản ngữ), tiếng Anh (giao tiếp)' } },
  ],
  links: {
    upwork: 'https://www.upwork.com/freelancers/~012cdccc4a8d9ffcf7',
    github: 'https://github.com/oranges1999',
    email: 'nhuhuy1999@gmail.com',
  },
}
