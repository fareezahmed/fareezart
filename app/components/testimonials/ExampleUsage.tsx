import Testimonials from './Testimonials';

/**
 * Example Usage of Testimonials Component
 * This demonstrates how to integrate the testimonials section
 * into your pages with mock data
 */

// Mock testimonial data - replace with your actual data source
const mockTestimonials = [
  {
    id: '1',
    quote: 'Working with FareezArt was an absolute pleasure. Their attention to detail and creative vision brought our project to life in ways we never imagined. The final result exceeded all our expectations.',
    author: 'Sarah Johnson',
    role: 'Creative Director',
    company: 'Design Studio Co.',
    avatar: '/next.svg' // Replace with actual avatar URLs
  },
  {
    id: '2',
    quote: 'The illustrations created for our children\'s book were simply magical. Each character had personality and charm that resonated with our young readers. Highly recommended!',
    author: 'Michael Chen',
    role: 'Publisher',
    company: 'Storybook Publishing',
    avatar: '/vercel.svg'
  },
  {
    id: '3',
    quote: 'FareezArt\'s design system transformed our brand identity completely. The consistency and quality across all touchpoints has significantly improved our user experience.',
    author: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'TechStart Inc.',
    avatar: '/file.svg'
  },
  {
    id: '4',
    quote: 'The cartoon characters designed for our marketing campaign were a huge hit with our audience. The style perfectly captured our brand\'s playful personality.',
    author: 'David Kim',
    role: 'Marketing Director',
    company: 'Brand Agency',
    avatar: '/globe.svg'
  },
  {
    id: '5',
    quote: 'As a technical writer, I appreciated FareezArt\'s ability to translate complex concepts into clear, engaging visual content. The collaboration was seamless.',
    author: 'Lisa Thompson',
    role: 'Technical Writer',
    company: 'Software Solutions',
    avatar: '/window.svg'
  }
];

export default function ExampleUsage() {
  return (
    <Testimonials
      testimonials={mockTestimonials}
      title="What Clients Say"
      subtitle="Hear from the people I've had the pleasure of working with"
      autoRotate={true}
      autoRotateInterval={5000}
    />
  );
}

