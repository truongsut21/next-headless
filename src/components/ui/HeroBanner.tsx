'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types/post';
import { formatDate } from '@/lib/utils';

interface HeroBannerProps {
  posts: Post[];
}

export default function HeroBanner({ posts }: HeroBannerProps) {

    
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };



  if (posts.length === 0) return null;

  return (
    <div className="rounded-xl relative h-[300px] md:h-[600px] overflow-hidden bg-gray-900">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {post.featuredImage?.node?.sourceUrl && (
            <Image
              src={post.featuredImage?.node?.sourceUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="(max-width: 768px) 100vw, 1200px"
              quality={90}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12 md:pb-16">
              <div className="max-w-3xl space-y-4">
                <Badge className="bg-[#0080FA] hover:bg-[#0066CC] text-white">
                  {post.categories?.nodes
                    .map((category) => category.name)
                    .join(', ')}
                </Badge>

                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                     <div className="text-lg text-gray-200 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-1/2 left-4 right-4 flex -translate-y-1/2 justify-between">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-[#0080FA]'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
