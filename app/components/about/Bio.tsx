'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Bio Component
 * Features:
 * - Clean, conversational introduction
 * - Professional headshot with lazy loading
 * - Ollivere-inspired minimalist design
 * - Accessibility-first approach
 */

interface BioProps {
  className?: string;
}

export default function Bio({ className = '' }: BioProps) {
  return (
    <motion.section
      className={`py-16 lg:py-24 ${className}`}
      aria-labelledby="bio-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Bio Text */}
          <div className="order-2 lg:order-1">
            <h1 
              id="bio-heading"
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Hello, I'm Fareez
            </h1>
            
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I've been crafting digital experiences for over 5 years, specializing in 
                frontend development and creative design. My passion lies in building 
                interfaces that are not just functional, but delightful to use.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                I believe in the power of clean code, thoughtful design, and user-centered 
                thinking. Every project is an opportunity to solve real problems while 
                pushing the boundaries of what's possible on the web.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, 
                sketching ideas, or sharing knowledge with the developer community. 
                I'm always excited to collaborate on projects that make a difference.
              </p>
            </div>

            {/* Key Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600 mb-1">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl transform rotate-3"></div>
                
                {/* Profile Image */}
                <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src="/next.svg" // Replace with actual profile image
                      alt="Fareez - Frontend Developer and Designer"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                      priority={false}
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full"
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

