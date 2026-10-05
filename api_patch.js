import fs from 'fs';
const file = 'src/api.js';
let content = fs.readFileSync(file, 'utf8');

const adminAndDispute = `
  orders: {
    list: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(\`/orders\${query ? \`?\${query}\` : ''}\`);
    },
    create: (data) => request('/orders/create', { method: 'POST', body: JSON.stringify(data) }),
    dispute: (id, data) => request(\`/orders/\${id}/dispute\`, { method: 'POST', body: JSON.stringify(data) }),
  },
  admin: {
    getStats: () => request('/admin/stats'),
    getUsers: () => request('/admin/users'),
    getDisputes: () => request('/admin/disputes'),
    verifyUser: (id, isVerified) => request(\`/admin/users/\${id}/verify\`, { method: 'PUT', body: JSON.stringify({ isVerified }) }),
    resolveDispute: (id, resolution) => request(\`/admin/disputes/\${id}/resolve\`, { method: 'POST', body: JSON.stringify({ resolution }) })
  },
`;

content = content.replace(/orders:\s*{[\s\S]*?create:.*?\n\s*},/, adminAndDispute);
fs.writeFileSync(file, content);
