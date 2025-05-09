import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Question Papers API
export const questionPapersService = {
  // Get all question papers with optional filters
  getAllPapers: async (filters = {}) => {
    const response = await api.get('/question-papers', { params: filters });
    return response.data;
  },

  // Get a single question paper by ID
  getPaperById: async (id) => {
    const response = await api.get(`/question-papers/${id}`);
    return response.data;
  },

  // Upload a new question paper
  uploadPaper: async (paperData) => {
    const response = await api.post('/question-papers', paperData);
    return response.data;
  },

  // Record a download
  recordDownload: async (paperId) => {
    const response = await api.post(`/question-papers/${paperId}/download`);
    return response.data;
  },
};

// Projects API
export const projectsService = {
  // Get all projects with optional filters
  getAllProjects: async (filters = {}) => {
    const response = await api.get('/projects', { params: filters });
    return response.data;
  },

  // Get a single project by ID
  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create a new project
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update a project
  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete a project
  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Join a project
  joinProject: async (id) => {
    const response = await api.post(`/projects/${id}/join`);
    return response.data;
  },

  // Leave a project
  leaveProject: async (id) => {
    const response = await api.post(`/projects/${id}/leave`);
    return response.data;
  },
};

// Marketplace API
export const marketplaceService = {
  // Get all listings with optional filters
  getAllListings: async (filters = {}) => {
    const response = await api.get('/marketplace', { params: filters });
    return response.data;
  },

  // Get a single listing by ID
  getListingById: async (id) => {
    const response = await api.get(`/marketplace/${id}`);
    return response.data;
  },

  // Create a new listing
  createListing: async (listingData) => {
    const response = await api.post('/marketplace', listingData);
    return response.data;
  },

  // Update a listing
  updateListing: async (id, listingData) => {
    const response = await api.put(`/marketplace/${id}`, listingData);
    return response.data;
  },

  // Delete a listing
  deleteListing: async (id) => {
    const response = await api.delete(`/marketplace/${id}`);
    return response.data;
  },

  // Mark listing as sold
  markAsSold: async (id) => {
    const response = await api.post(`/marketplace/${id}/sold`);
    return response.data;
  },
};

// Forum API
export const forumService = {
  // Get all posts with optional filters
  getAllPosts: async (filters = {}) => {
    const response = await api.get('/forum/posts', { params: filters });
    return response.data;
  },

  // Get a single post by ID
  getPostById: async (id) => {
    const response = await api.get(`/forum/posts/${id}`);
    return response.data;
  },

  // Create a new post
  createPost: async (postData) => {
    const response = await api.post('/forum/posts', postData);
    return response.data;
  },

  // Update a post
  updatePost: async (id, postData) => {
    const response = await api.put(`/forum/posts/${id}`, postData);
    return response.data;
  },

  // Delete a post
  deletePost: async (id) => {
    const response = await api.delete(`/forum/posts/${id}`);
    return response.data;
  },

  // Get comments for a post
  getComments: async (postId) => {
    const response = await api.get(`/forum/posts/${postId}/comments`);
    return response.data;
  },

  // Add a comment to a post
  addComment: async (postId, commentData) => {
    const response = await api.post(`/forum/posts/${postId}/comments`, commentData);
    return response.data;
  },

  // Update a comment
  updateComment: async (postId, commentId, commentData) => {
    const response = await api.put(`/forum/posts/${postId}/comments/${commentId}`, commentData);
    return response.data;
  },

  // Delete a comment
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(`/forum/posts/${postId}/comments/${commentId}`);
    return response.data;
  },
};

// File Upload Service
export const uploadService = {
  // Upload a file
  uploadFile: async (formData) => {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 