const fs = require('fs');
const path = require('path');
const controllersDir = path.join(process.cwd(), 'controllers');
const files = fs.readdirSync(controllersDir).filter(f => f.endsWith('.js'));
files.forEach(file => {
  const filePath = path.join(controllersDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/req\.file\.path/g, "'/uploads/' + req.file.filename");
  content = content.replace(/req\.files\.profileImage\[0\]\.path/g, "'/uploads/' + req.files.profileImage[0].filename");
  content = content.replace(/req\.files\.resume\[0\]\.path/g, "'/uploads/' + req.files.resume[0].filename");
  fs.writeFileSync(filePath, content);
});
