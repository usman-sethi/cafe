const fs = require('fs');
const path = require('path');

const replaceMap = {
  'https://images.unsplash.com/photo-1461023058943-07cb14a60dfc?q=80&w=800&auto=format&fit=crop&fm=webp': '/images/img_212587f2.webp',
  'https://images.unsplash.com/photo-1445116572660-236099ceabeb?q=80&w=3000&auto=format&fit=crop&fm=webp': '/images/img_097bf6cb.webp',
  'https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=1000&auto=format&fit=crop&fm=webp': '/images/img_128ac12e.webp',
  'https://images.unsplash.com/photo-1495474472207-464a4d96597b?q=80&w=800&auto=format&fit=crop&fm=webp': '/images/img_e5bf5a4d.webp',
  'https://images.unsplash.com/photo-1555507036-ab1f40ce8861?q=80&w=2000&auto=format&fit=crop&fm=webp': '/images/img_7354bac2.webp',
  'https://images.unsplash.com/photo-1445116572660-236099ceabeb?q=80&w=1000&auto=format&fit=crop&fm=webp': '/images/img_682d4b43.webp',
  'https://images.unsplash.com/photo-1495474472201-4467d5f06129?q=80&w=1000&auto=format&fit=crop&fm=webp': '/images/img_38f84fe4.webp'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [badUrl, goodImg] of Object.entries(replaceMap)) {
    if (content.includes(badUrl)) {
      content = content.replace(badUrl, goodImg);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content);
  }
}
