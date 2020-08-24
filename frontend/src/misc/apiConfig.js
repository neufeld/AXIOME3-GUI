let baseEndpoint;

const hostname = window && window.location && window.location.hostname;

// Add different endpoints for different hostnames
// Nginx was configured to redirect requests to /api to backend service
baseEndpoint = 'http://localhost'

export const ENDPOINT_ROOT = `${baseEndpoint}/api`