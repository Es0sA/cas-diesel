import fs from 'fs';
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("import ProfileSettings from './components/ProfileSettings';", "import ProfileSettings from './components/ProfileSettings';\nimport AdminDashboard from './components/AdminDashboard';");

content = content.replace('<Route path="/profile" element={<ProfileSettings user={user} />} />', '<Route path="/profile" element={<ProfileSettings user={user} />} />\n          <Route path="/admin" element={<AdminDashboard user={user} />} />');

fs.writeFileSync(file, content);
