// src/api/endpoints.ts
// All API endpoint paths — centralized. Never write URL strings in components.

const API = {
  // Auth
  auth: {
    login: '/auth/login/',
    logout: '/auth/logout/',
    refresh: '/auth/token/refresh/',
    me: '/auth/me/',
  },

  // Donors
  donors: {
    list: '/donors/',
    detail: (id: string) => `/donors/${id}/`,
    create: '/donors/',
    update: (id: string) => `/donors/${id}/`,
    delete: (id: string) => `/donors/${id}/`,
    donations: (id: string) => `/donors/${id}/donations/`,
  },

  // Donations
  donations: {
    list: '/donations/',
    detail: (id: string) => `/donations/${id}/`,
    create: '/donations/',
    update: (id: string) => `/donations/${id}/`,
    updateStatus: (id: string) => `/donations/${id}/status/`,
    workflow: (id: string) => `/donations/${id}/workflow/`,
  },

  // Blood Units (Inventory)
  bloodUnits: {
    list: '/blood-units/',
    detail: (id: string) => `/blood-units/${id}/`,
    create: '/blood-units/',
    update: (id: string) => `/blood-units/${id}/`,
    movements: (id: string) => `/blood-units/${id}/movements/`,
  },

  // Inventory
  inventory: {
    summary: '/inventory/summary/',
    byBloodGroup: '/inventory/by-blood-group/',
    expiringSoon: '/inventory/expiring-soon/',
    lowStock: '/inventory/low-stock/',
  },

  // Blood Requests
  requests: {
    list: '/blood-requests/',
    detail: (id: string) => `/blood-requests/${id}/`,
    create: '/blood-requests/',
    update: (id: string) => `/blood-requests/${id}/`,
    updateStatus: (id: string) => `/blood-requests/${id}/status/`,
    workflow: (id: string) => `/blood-requests/${id}/workflow/`,
  },

  // Hospitals
  hospitals: {
    list: '/hospitals/',
    detail: (id: string) => `/hospitals/${id}/`,
  },

  // Donation Camps
  camps: {
    list: '/camps/',
    detail: (id: string) => `/camps/${id}/`,
    create: '/camps/',
    update: (id: string) => `/camps/${id}/`,
    registrations: (id: string) => `/camps/${id}/registrations/`,
    updateStatus: (id: string) => `/camps/${id}/status/`,
  },

  // Employees
  employees: {
    list: '/employees/',
    detail: (id: string) => `/employees/${id}/`,
    create: '/employees/',
    update: (id: string) => `/employees/${id}/`,
    activity: (id: string) => `/employees/${id}/activity/`,
  },

  // Workflow
  workflow: {
    list: '/workflow/',
    byEntity: (type: string, id: string) => `/workflow/${type}/${id}/`,
  },

  // Dashboard
  dashboard: {
    summary: '/dashboard/summary/',
    alerts: '/dashboard/alerts/',
  },

  // Notifications
  notifications: {
    list: '/notifications/',
    markRead: (id: string) => `/notifications/${id}/read/`,
    markAllRead: '/notifications/read-all/',
  },
} as const;

export default API;
