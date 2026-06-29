import 'server-only';
import { writeFileSync } from 'fs';
import { join } from 'path';

interface OpenAPIRoute {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  summary: string;
  tags?: string[];
  parameters?: Array<{
    name: string;
    in: 'path' | 'query' | 'header';
    required?: boolean;
    schema: { type: string };
    description?: string;
  }>;
  requestBody?: {
    required?: boolean;
    content: Record<string, { schema: Record<string, unknown> }>;
  };
  responses: Record<
    string,
    {
      description: string;
      content?: Record<string, { schema: Record<string, unknown> }>;
    }
  >;
}

const routes: OpenAPIRoute[] = [
  // Products
  { path: '/api/products', method: 'GET', summary: 'List all products', tags: ['Products'], parameters: [{ name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filter by category' }, { name: 'range', in: 'query', schema: { type: 'string' }, description: 'Filter by product range' }, { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' }, { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Items per page' }], responses: { '200': { description: 'Paginated list of products', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/products/{id}', method: 'GET', summary: 'Get product by ID', tags: ['Products'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Product ID' }], responses: { '200': { description: 'Product details', content: { 'application/json': { schema: { type: 'object' } } } }, '404': { description: 'Product not found' } } },
  { path: '/api/products', method: 'POST', summary: 'Create a product', tags: ['Products'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '201': { description: 'Product created', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/products/{id}', method: 'PUT', summary: 'Update a product', tags: ['Products'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Product ID' }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '200': { description: 'Product updated', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/products/{id}', method: 'DELETE', summary: 'Delete a product', tags: ['Products'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Product ID' }], responses: { '200': { description: 'Product deleted' } } },

  // Articles
  { path: '/api/articles', method: 'GET', summary: 'List all articles', tags: ['Articles'], parameters: [{ name: 'status', in: 'query', schema: { type: 'string' }, description: 'Filter by status' }, { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' }, { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Items per page' }], responses: { '200': { description: 'Paginated list of articles', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/articles/{id}', method: 'GET', summary: 'Get article by ID', tags: ['Articles'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Article ID' }], responses: { '200': { description: 'Article details', content: { 'application/json': { schema: { type: 'object' } } } }, '404': { description: 'Article not found' } } },
  { path: '/api/articles', method: 'POST', summary: 'Create an article', tags: ['Articles'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '201': { description: 'Article created', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/articles/{id}', method: 'PUT', summary: 'Update an article', tags: ['Articles'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Article ID' }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '200': { description: 'Article updated', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/articles/{id}', method: 'DELETE', summary: 'Delete an article', tags: ['Articles'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Article ID' }], responses: { '200': { description: 'Article deleted' } } },

  // Orders
  { path: '/api/orders', method: 'GET', summary: 'List orders', tags: ['Orders'], parameters: [{ name: 'status', in: 'query', schema: { type: 'string' }, description: 'Filter by status' }, { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' }, { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Items per page' }], responses: { '200': { description: 'Paginated list of orders', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/orders/{id}', method: 'GET', summary: 'Get order by ID', tags: ['Orders'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Order ID' }], responses: { '200': { description: 'Order details', content: { 'application/json': { schema: { type: 'object' } } } }, '404': { description: 'Order not found' } } },
  { path: '/api/orders', method: 'POST', summary: 'Create an order', tags: ['Orders'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '201': { description: 'Order created', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/orders/{id}/status', method: 'PATCH', summary: 'Update order status', tags: ['Orders'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Order ID' }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '200': { description: 'Order status updated', content: { 'application/json': { schema: { type: 'object' } } } } } },

  // Cart
  { path: '/api/cart', method: 'GET', summary: 'Get current cart', tags: ['Cart'], responses: { '200': { description: 'Current cart contents', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/cart', method: 'POST', summary: 'Add item to cart', tags: ['Cart'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '200': { description: 'Cart updated', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/cart', method: 'DELETE', summary: 'Clear cart', tags: ['Cart'], responses: { '200': { description: 'Cart cleared' } } },

  // Account
  { path: '/api/account/profile', method: 'GET', summary: 'Get user profile', tags: ['Account'], responses: { '200': { description: 'User profile', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/account/profile', method: 'PUT', summary: 'Update user profile', tags: ['Account'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '200': { description: 'Profile updated', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/account/addresses', method: 'GET', summary: 'List user addresses', tags: ['Account'], responses: { '200': { description: 'List of addresses', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/account/addresses', method: 'POST', summary: 'Add an address', tags: ['Account'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '201': { description: 'Address created', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/account/addresses/{id}', method: 'PUT', summary: 'Update an address', tags: ['Account'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Address ID' }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '200': { description: 'Address updated', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/account/addresses/{id}', method: 'DELETE', summary: 'Delete an address', tags: ['Account'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Address ID' }], responses: { '200': { description: 'Address deleted' } } },

  // Auth
  { path: '/api/auth/signin', method: 'POST', summary: 'Sign in', tags: ['Auth'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '200': { description: 'Sign in successful' }, '401': { description: 'Invalid credentials' } } },
  { path: '/api/auth/signup', method: 'POST', summary: 'Sign up', tags: ['Auth'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '201': { description: 'Account created' } } },
  { path: '/api/auth/signout', method: 'POST', summary: 'Sign out', tags: ['Auth'], responses: { '200': { description: 'Sign out successful' } } },

  // Media
  { path: '/api/upload', method: 'POST', summary: 'Upload a file', tags: ['Media'], requestBody: { required: true, content: { 'multipart/form-data': { schema: { type: 'object' } } } }, responses: { '201': { description: 'File uploaded', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/media', method: 'GET', summary: 'List media assets', tags: ['Media'], parameters: [{ name: 'folder', in: 'query', schema: { type: 'string' }, description: 'Filter by folder' }, { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' }, { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Items per page' }], responses: { '200': { description: 'Paginated list of media', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/media/{id}', method: 'DELETE', summary: 'Delete a media asset', tags: ['Media'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Media ID' }], responses: { '200': { description: 'Media deleted' } } },

  // Events
  { path: '/api/events', method: 'GET', summary: 'List events', tags: ['Events'], parameters: [{ name: 'format', in: 'query', schema: { type: 'string' }, description: 'Filter by format' }, { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' }, { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Items per page' }], responses: { '200': { description: 'Paginated list of events', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/events/{id}', method: 'GET', summary: 'Get event by ID', tags: ['Events'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Event ID' }], responses: { '200': { description: 'Event details', content: { 'application/json': { schema: { type: 'object' } } } }, '404': { description: 'Event not found' } } },

  // SEO
  { path: '/api/seo/{path*}', method: 'GET', summary: 'Get SEO metadata for a path', tags: ['SEO'], parameters: [{ name: 'path', in: 'path', required: true, schema: { type: 'string' }, description: 'URL path' }], responses: { '200': { description: 'SEO metadata', content: { 'application/json': { schema: { type: 'object' } } } } } },

  // Comments
  { path: '/api/comments', method: 'GET', summary: 'List comments', tags: ['Comments'], parameters: [{ name: 'targetType', in: 'query', schema: { type: 'string' }, description: 'Target type (article, product)' }, { name: 'targetId', in: 'query', schema: { type: 'string' }, description: 'Target ID' }, { name: 'page', in: 'query', schema: { type: 'integer' }, description: 'Page number' }, { name: 'limit', in: 'query', schema: { type: 'integer' }, description: 'Items per page' }], responses: { '200': { description: 'Paginated list of comments', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/comments', method: 'POST', summary: 'Create a comment', tags: ['Comments'], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '201': { description: 'Comment created', content: { 'application/json': { schema: { type: 'object' } } } } } },
  { path: '/api/comments/{id}', method: 'DELETE', summary: 'Delete a comment', tags: ['Comments'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Comment ID' }], responses: { '200': { description: 'Comment deleted' } } },
];

const securitySchemes = {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Session JWT token for authenticated requests',
  },
};

export function generateOpenAPISpec() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'MM Pharma API',
      version: '0.1.0',
      description: 'RESTful API for the MM Pharma e-commerce platform. Provides endpoints for products, orders, cart, user accounts, media, events, SEO, and comments.',
    },
    servers: [
      { url: '/', description: 'Same-origin server' },
    ],
    paths: {} as Record<string, Record<string, Omit<OpenAPIRoute, 'path' | 'method'>>>,
    components: {
      securitySchemes,
    },
    security: [{ bearerAuth: [] }],
  };

  for (const route of routes) {
    const { path, method, ...definition } = route;
    if (!spec.paths[path]) {
      spec.paths[path] = {};
    }
    spec.paths[path][method.toLowerCase()] = definition;
  }

  return spec;
}

export function writeOpenAPISpec() {
  const spec = generateOpenAPISpec();
  const outputPath = join(process.cwd(), 'public', 'openapi.json');
  writeFileSync(outputPath, JSON.stringify(spec, null, 2), 'utf-8');
}
