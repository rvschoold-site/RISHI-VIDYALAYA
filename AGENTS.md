# RULES

## FRONTEND PRINCIPLES
- Ensure mobile-first responsive design with Tailwind CSSUtility classes and CSS Grid/Flexbox
- Prioritize accessibility with ARIA labels, semantic HTML, and keyboard navigation
- Implement performance optimizations including lazy loading, image optimization, and code splitting
- Follow SEO best practices with proper meta tags, heading structures, and clean URL design
- Use modern JavaScript (ES6+) and browser-compatible APIs

## TESTING MANDATES
- Every feature must include comprehensive test coverage using Jest and React Testing Library
- Aim for 80%+ code coverage across all components and utilities
- Include unit tests for business logic, component tests for UI, and integration tests for user flows
- Ensure tests run automatically in CI/CD pipeline with linting and formatting checks

## DEBUGGING STRATEGY
- Debug issues by following a systematic approach: inspect DOM, check network requests, review console logs
- Use browser developer tools for element inspection and performance profiling
- Apply a divide-and-conquer strategy by isolating components and testing them individually
- Implement proper error handling and fallback UI for graceful degradation

## SECURITY PROTOCOLS
- Never expose sensitive information in client-side code or version control
- Use HTTPS for secure data transmission and enforce secure cookie policies
- Implement proper input validation and output encoding to prevent XSS attacks
- Protect against CSRF attacks using CSRF tokens and secure session management

## DOCUMENTATION STANDARDS
- Document all components, utilities, and hooks with JSDoc comments
- Maintain inline code comments for complex logic and algorithms
- Create comprehensive README files for each feature with setup, usage, and troubleshooting instructions
- Update documentation as code evolves to ensure accuracy
