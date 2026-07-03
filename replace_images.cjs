const fs = require('fs');
const path = require('path');

const knownGoodUrls = [
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1495474472201-44bbec755a58?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507133750070-4cb5038ea8f3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501339817388-d1d11721f542?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1521017432531-fbd92076e4fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1481833707121-59f4df66f73e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80'
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
let urlIndex = 0;
const urlMap = {};

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /\/images\/img_[a-z0-9]+\.jpg/g;
    content = content.replace(regex, (match) => {
        if (!urlMap[match]) {
            urlMap[match] = knownGoodUrls[urlIndex % knownGoodUrls.length];
            urlIndex++;
        }
        return urlMap[match];
    });
    fs.writeFileSync(file, content);
});

console.log('Replaced images with Unsplash URLs!');
