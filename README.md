# ChakriKhujo - AI-Powered Recruitment Platform

A modern, responsive Next.js front-end for ChakriKhujo, an AI-powered recruitment and career guidance platform. Features dual portals for recruiters and job seekers with comprehensive UI components, mock data, and smooth animations.

## 🚀 Features

### 🏢 Recruiter Portal
- **Dashboard**: KPI cards, hiring trends, and AI-generated insights
- **Job Management**: Create job postings with ATS weight configuration
- **Candidate Review**: Sortable candidate table with ATS scores and resume preview
- **Interview Management**: Calendar view, live note-taking, and AI question suggestions
- **Analytics**: Hiring funnel analysis, bias audit, and performance metrics

### 👤 Job Seeker Portal
- **Profile Management**: Resume upload with AI parsing and profile optimization
- **Job Search**: Personalized job listings with AI match scores
- **Application Tracker**: Kanban-style board with drag-and-drop functionality
- **Career Guidance**: Skill gap analysis, radar charts, and learning recommendations

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark Mode**: Built-in theme switching with persistent preferences
- **Smooth Animations**: Framer Motion transitions and micro-interactions
- **Accessibility**: Semantic HTML, focus management, and ARIA labels
- **Modern UI**: Shadcn/UI components with consistent design system

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **UI Components**: Shadcn/UI with Radix primitives
- **Styling**: Tailwind CSS with CSS variables theming
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Animation**: Framer Motion
- **State Management**: React Context + Zustand
- **Drag & Drop**: @dnd-kit
- **Form Handling**: React Hook Form
- **File Upload**: React Dropzone
- **Notifications**: Sonner

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── recruiter/         # Recruiter portal routes
│   │   ├── dashboard/     # KPI dashboard
│   │   ├── jobs/          # Job management
│   │   ├── candidates/    # Candidate review
│   │   ├── interviews/    # Interview management
│   │   └── analytics/     # Analytics & reporting
│   └── seeker/            # Job seeker portal routes
│       ├── profile/       # Profile management
│       ├── jobs/          # Job search
│       ├── applications/  # Application tracking
│       └── career/        # Career guidance
├── components/
│   ├── layout/           # Layout components (sidebar, topbar)
│   ├── ui/               # Reusable UI components
│   └── common/           # Shared components
├── context/              # React Context providers
├── lib/                  # Utilities and mock data
└── hooks/                # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd asia-fest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Docker commands
npm run docker:build
npm run docker:dev
npm run docker:prod
```

## 🎯 Key Features Demonstrated

### Role-Based Navigation
- Dynamic sidebar based on user role (recruiter/seeker)
- Role switcher in top navigation
- Context-aware routing and permissions

### AI-Powered Features
- **ATS Scoring**: Candidate matching with configurable weights
- **Smart Recommendations**: Job suggestions and career guidance
- **Bias Detection**: Automated hiring pattern analysis
- **Question Generation**: AI-suggested interview questions

### Interactive Components
- **Drag & Drop**: Application status management
- **Data Visualization**: Charts and analytics dashboards
- **Real-time Updates**: Live interview timer and note-taking
- **File Upload**: Resume parsing with progress indicators

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Progressive Enhancement**: Graceful degradation
- **Touch-Friendly**: Optimized for mobile interactions
- **Adaptive Layout**: Dynamic sidebar collapse

## 🎨 Design System

### Color Scheme
- **Primary**: Dynamic based on HSL variables
- **Secondary**: Complementary accent colors
- **Semantic**: Success, warning, error states
- **Dark Mode**: Comprehensive theme support

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Consistent sizing hierarchy
- **Weights**: Strategic font weight usage

### Components
- **Consistent**: Unified component library
- **Accessible**: WCAG compliance
- **Composable**: Flexible and reusable

## 📊 Mock Data

The application includes comprehensive mock data for:
- **Jobs**: Realistic job postings with ATS scores
- **Candidates**: Detailed candidate profiles
- **Applications**: Multi-stage application tracking
- **Analytics**: Hiring metrics and trends
- **Interviews**: Scheduled and completed interviews

## 🔧 Configuration

### Theme Configuration
Located in `src/app/globals.css`:
- CSS variables for consistent theming
- Dark mode support
- Responsive design tokens

### Component Configuration
Located in `components.json`:
- Shadcn/UI configuration
- Path aliases
- Style preferences

## 📱 Responsive Behavior

### Mobile (< 768px)
- Collapsible navigation
- Stacked layouts
- Touch-optimized interactions
- Simplified data tables

### Tablet (768px - 1024px)
- Adaptive grid layouts
- Partial sidebar visibility
- Optimized chart sizes

### Desktop (> 1024px)
- Full sidebar navigation
- Multi-column layouts
- Detailed data tables
- Enhanced interactions

## 🎭 Animations

### Page Transitions
- Smooth route changes
- Loading states
- Progressive disclosure

### Micro-interactions
- Hover effects
- Focus indicators
- Success feedback
- Error states

### Data Visualization
- Animated chart transitions
- Progressive data loading
- Interactive tooltips

## 🧪 Testing Approach

### Component Testing
- Unit tests for utility functions
- Component behavior testing
- Integration testing

### User Experience Testing
- Accessibility testing
- Cross-browser compatibility
- Performance optimization

## 🔮 Future Enhancements

### Backend Integration
- REST API implementation
- Authentication system
- Database integration
- Real-time updates

### Advanced Features
- WebRTC video interviews
- AI chatbot integration
- Advanced analytics
- Email notifications

### Performance
- Server-side rendering optimization
- Image optimization
- Bundle splitting
- Caching strategies

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is for demonstration purposes. Please ensure compliance with any applicable licenses for dependencies.

---

**Note**: This is a front-end only implementation with mock data. No actual backend functionality is included. The application demonstrates UI/UX patterns and component architecture for a modern recruitment platform.