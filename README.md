# Weather App

A modern, responsive weather application built with Next.js and TypeScript that provides real-time weather information using the AccuWeather API.

## Features

- Real-time weather data
- Location-based weather
- City search functionality
- 5-day weather forecast
- Daily temperature evolution chart
- Temperature unit conversion (Celsius/Fahrenheit)
- Responsive design
- PWA support
- Accessibility features

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API**: AccuWeather
- **HTTP Client**: Axios
- **PWA**: next-pwa
- **Testing**: Vitest, Testing Library

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- AccuWeather API key

### Environment Setup

1. Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_ACCUWEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_API_BASE_URL=http://dataservice.accuweather.com
```

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

The project uses Vitest and Testing Library for comprehensive testing coverage.

### Running Tests

- Run all tests:

  ```bash
  npm run test
  ```

- Run tests with UI:

  ```bash
  npm run test:ui
  ```

- Generate coverage report:

  ```bash
  npm run test:coverage
  ```

- Run tests in CI environment:
  ```bash
  npm run test:ci
  ```

### Test Structure

- \'src/test/\': Main test directory
  - \'setup.ts\': Test environment configuration
  - \'utils.tsx\': Test utilities and custom renders
  - \'components/\': Component tests
  - \'utils/\': Utility function tests
  - \'mappers/\': Data mapper tests

### Testing Patterns

1. **Component Tests**

   - Render testing
   - User interaction
   - State management
   - Async operations
   - Error handling
   - Accessibility

2. **Utility Tests**

   - Input validation
   - Data transformation
   - Error cases
   - Edge cases

3. **Mapper Tests**
   - Data transformation
   - API response handling
   - Type validation

### Test Coverage

The project maintains high test coverage across:

- Components
- Utility functions
- Data mappers
- Redux slices
- Custom hooks

Coverage reports include:

- Statements
- Branches
- Functions
- Lines

### Continuous Integration

Tests are automatically run:

- On every pull request
- Before each commit (via husky)
- In CI/CD pipeline

## Project Structure

```
src/
├── api/                # API related code
│   ├── axios.ts        # Axios instance and interceptors
│   ├── mappers/        # Data mapping utilities
│   ├── security/       # Rate limiting and security
│   └── weather/        # Weather service implementations
├── app/                # Next.js app directory
│   ├── context/        # React context providers
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── styles/         # Global styles
├── components/         # React components
│   ├── CitySearch/     # City search functionality
│   ├── CurrentLocation/# Current weather display
│   ├── DailyEvolution/ # Temperature evolution chart
│   ├── Forecast/       # 5-day forecast
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── test/               # Unit testing
└── utils/              # Utility functions
```

## Features in Detail

### Current Weather

- Displays current temperature and weather conditions
- Shows location name
- Supports temperature unit switching

### City Search

- Autocomplete city search
- Displays city and country
- Error handling for invalid searches

### 5-Day Forecast

- Shows daily high and low temperatures
- Weather condition icons
- Precipitation probability
- Responsive card layout

### Daily Temperature Evolution

- Interactive line chart
- Custom tooltips
- Temperature trend visualization
- Unit-aware display

## API Rate Limiting

The application implements a client-side rate limiter to prevent API abuse:

- Maximum 10 requests per minute
- Automatic request queuing
- User-friendly error messages

## Error Handling

Comprehensive error handling for:

- Network errors
- API rate limiting
- Location permission denials
- Invalid API responses
- Timeout issues

## Accessibility

- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## Performance Optimization

- Dynamic imports
- Image optimization
- PWA capabilities
- Client-side caching
- Debounced API calls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
