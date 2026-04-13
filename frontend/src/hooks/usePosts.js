import { useState } from 'react';
import {
  getAllDonations,
  createDonation,
  updateDonation,
  deleteDonation,
} from '../services/postService';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllDonations();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (newPost) => {
    const created = await createDonation(newPost);
    setPosts((prev) => [created, ...prev]);
    return created;
  };

  const updatePost = async (postId, payload) => {
    const updated = await updateDonation(postId, payload);
    setPosts((prev) => prev.map((post) => (post._id === postId ? updated : post)));
    return updated;
  };

  const removePost = async (postId) => {
    await deleteDonation(postId);
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  return { posts, loading, fetchPosts, createPost, updatePost, removePost };
};