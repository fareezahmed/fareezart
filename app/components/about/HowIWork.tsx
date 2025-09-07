'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * How I Work Component
 * Features:
 * - Three-step process with staggered animations
 * - Clean horizontal layout
 * - Lazy-loaded illustrations
 * - Accessibility with proper semantic structure
 */

interface WorkStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

interface HowIWorkProps {
  className?: string;
}

const workSteps: WorkStep[] = [
  {
    id: 'understand',
    title: 'Understand',
    description: 'I start by deeply understanding your goals, users, and constraints.',
    icon: '/next.svg', // Replace with actual icons
    details: [
      'Research your target audience',
      'Analyze business requirements',
      'Define project scope and timeline',
      'Identify technical constraints'
    ]
  },
  {
    id: 'prototype',
    title: 'Prototype',
    description: 'I create rapid prototypes to explore ideas and validate concepts.',
    icon: '/vercel.svg',
    details: [
      'Wireframe key user flows',
      'Create interactive prototypes',
      'Test with real users',
      'Iterate based on feedback'
    ]
  },
  {
    id: 'refine',
    title: 'Refine',
    description: 'I polish the solution with attention to detail and performance.',
    icon: '/file.svg',
    details: [
      'Optimize for performance',
      'Ensure accessibility compliance',
      'Polish visual design',
      'Prepare for deployment'
    ]
  }
];

export default function HowIWork({ className = '' }: HowIWorkProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.section
      className={`py-16 lg:py-24 ${className}`}
      aria-labelledby="how-i-work-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={stepVariants}
        >
          <h2 
            id="how-i-work-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            How I Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A structured approach to delivering exceptional results, 
            from initial concept to final deployment.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {workSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              variants={stepVariants}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              {/* Step Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 h-full">
                {/* Icon */}
                <motion.div
                  className="relative w-16 h-16 mx-auto mb-6"
                  variants={iconVariants}
                >
                  <Image
                    src={step.icon}
                    alt={`${step.title} process icon`}
                    fill
                    className="object-contain"
                    sizes="64px"
                    loading="lazy"
                  />
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2 text-left">
                    {step.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        className="flex items-start gap-2 text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.5 + (index * 0.3) + (detailIndex * 0.1)
                        }}
                      >
                        <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connecting Line (except for last item) */}
              {index < workSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-12 lg:w-24 h-0.5 bg-gradient-to-r from-blue-200 to-transparent transform -translate-y-1/2 z-0"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          variants={stepVariants}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Ready to work together?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let's discuss your project and see how this process can help 
              bring your vision to life.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
