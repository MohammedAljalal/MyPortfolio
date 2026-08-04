const fs = require('fs');
const path = require('path');
const controllersDir = path.join(process.cwd(), 'controllers');
const files = fs.readdirSync(controllersDir).filter(f => f.endsWith('.js'));
files.forEach(file => {
  const filePath = path.join(controllersDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/'\/uploads\/' \+ req\.file\.filename/g, "req.file.path");
  content = content.replace(/'\/uploads\/' \+ req\.files\.profileImage\[0\]\.filename/g, "req.files.profileImage[0].path");
  content = content.replace(/'\/uploads\/' \+ req\.files\.resume\[0\]\.filename/g, "req.files.resume[0].path");
  fs.writeFileSync(filePath, content);
});
