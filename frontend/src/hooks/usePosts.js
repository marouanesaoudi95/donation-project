import { useState, useEffect } from 'react';
import api from '../services/api';

const mockPosts = [
  {
    _id: "1",
    donor: { name: "Sarah Chen" },
    donationType: "food",
    quantity: 50,
    remainingQty: 12,
    description: "Fresh organic apples and bananas from local farm. Perfect condition.",
    status: "available",
    contactPhone: "(415) 555-9821",
    createdAt: "2026-04-09"
  },
  {
    _id: "2",
    donor: { name: "TechForGood Inc" },
    donationType: "electronics",
    quantity: 15,
    remainingQty: 15,
    description: "Refurbished laptops for students and nonprofits.",
    status: "available",
    contactPhone: "(650) 555-3312",
    createdAt: "2026-04-08"
  },
  {
    _id: "3",
    donor: { name: "Alex Rivera" },
    donationType: "clothes",
    quantity: 80,
    remainingQty: 3,
    description: "Winter jackets, brand new, various sizes.",
    status: "available",
    contactPhone: "(510) 555-7744",
    createdAt: "2026-04-10"
  }
];

export const usePosts = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    // In real MERN: const res = await api.get('/posts');
    setPosts(mockPosts);
    setLoading(false);
  };

  const createPost = async (newPost) => {
    const post = { ...newPost, _id: Date.now().toString(), remainingQty: newPost.quantity, status: 'available' };
    setPosts([post, ...posts]);
    // api.post('/posts', newPost)
  };

  const updateRemainingQty = (postId, amount) => {
    setPosts(prev => prev.map(p => 
      p._id === postId 
        ? { ...p, remainingQty: Math.max(0, p.remainingQty - amount) } 
        : p
    ));
  };

  return { posts, loading, fetchPosts, createPost, updateRemainingQty };
};