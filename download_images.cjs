const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const srcDir = path.join(process.cwd(), 'src');
const pubImgDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(pubImgDir)) {
  fs.mkdirSync(pubImgDir, { recursive: true });
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
let urlMap = {};

async function processFiles() {
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /(https:\/\/images\.unsplash\.com\/[^"'\s\)]+|https:\/\/i\.pravatar\.cc\/[^"'\s\)]+)/g;
    const matches = content.match(regex);
    if (matches) {
      for (let url of matches) {
        if (!urlMap[url]) {
          const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
          const ext = url.includes('pravatar') ? 'jpg' : 'webp';
          const filename = `img_${hash}.${ext}`;
          const dest = path.join(pubImgDir, filename);
          console.log(`Downloading ${url} to ${filename}`);
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(dest, Buffer.from(buffer));
            urlMap[url] = `/images/${filename}`;
          } catch(e) {
            console.error(`Failed to download ${url}`, e);
          }
        }
        if (urlMap[url]) {
          content = content.replace(url, urlMap[url]);
        }
      }
      fs.writeFileSync(file, content);
    }
  }
}

processFiles().then(() => console.log('Done'));
