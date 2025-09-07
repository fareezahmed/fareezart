'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Tools Grid Component
 * Features:
 * - Grid of development and design tools
 * - Lazy-loaded icons with hover animations
 * - Accessibility with proper alt text
 * - Responsive grid layout
 */

interface Tool {
  name: string;
  icon: string;
  category: 'design' | 'development' | 'other';
  description?: string;
}

interface ToolsGridProps {
  className?: string;
}

// Tools data - replace with actual tool icons
const tools: Tool[] = [
  // Design Tools
  { name: 'Figma', icon: '/next.svg', category: 'design', description: 'UI/UX Design' },
  { name: 'Photoshop', icon: '/vercel.svg', category: 'design', description: 'Image Editing' },
  { name: 'Illustrator', icon: '/file.svg', category: 'design', description: 'Vector Graphics' },
  { name: 'Sketch', icon: '/globe.svg', category: 'design', description: 'Interface Design' },
  
  // Development Tools
  { name: 'React', icon: '/next.svg', category: 'development', description: 'Frontend Framework' },
  { name: 'Next.js', icon: '/vercel.svg', category: 'development', description: 'React Framework' },
  { name: 'TypeScript', icon: '/file.svg', category: 'development', description: 'Type Safety' },
  { name: 'Tailwind CSS', icon: '/globe.svg', category: 'development', description: 'Utility CSS' },
  { name: 'Node.js', icon: '/window.svg', category: 'development', description: 'Backend Runtime' },
  { name: 'Git', icon: '/next.svg', category: 'development', description: 'Version Control' },
  
  // Other Tools
  { name: 'Lottie', icon: '/vercel.svg', category: 'other', description: 'Animations' },
  { name: 'Webflow', icon: '/file.svg', category: 'other', description: 'No-Code Design' },
  { name: 'Framer', icon: '/globe.svg', category: 'other', description: 'Prototyping' },
];

export default function ToolsGrid({ className = '' }: ToolsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const categoryLabels = {
    design: 'Design Tools',
    development: 'Development',
    other: 'Other Tools',
  };

  return (
    <motion.section
      className={`py-16 lg:py-24 bg-gray-50 ${className}`}
      aria-labelledby="tools-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 
            id="tools-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Tools & Technologies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life, 
            from concept to deployment.
          </p>
        </motion.div>

        {/* Tools Grid by Category */}
        <div className="space-y-16">
          {Object.entries(groupedTools).map(([category, categoryTools]) => (
            <motion.div
              key={category}
              className="space-y-8"
              variants={itemVariants}
            >
              {/* Category Header */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
              </div>

              {/* Tools Grid */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                variants={containerVariants}
              >
                {categoryTools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    className="group"
                    variants={itemVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center transition-shadow duration-200 group-hover:shadow-md"
                      variants={hoverVariants}
                    >
                      {/* Tool Icon */}
                      <div className="relative w-12 h-12 mx-auto mb-4">
                        <Image
                          src={tool.icon}
                          alt={`${tool.name} icon`}
                          fill
                          className="object-contain"
                          sizes="48px"
                          loading="lazy"
                        />
                      </div>

                      {/* Tool Name */}
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {tool.name}
                      </h4>

                      {/* Tool Description */}
                      {tool.description && (
                        <p className="text-xs text-gray-500">
                          {tool.description}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            I'm always exploring new tools and technologies to stay current 
            with the latest trends and best practices in web development.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
