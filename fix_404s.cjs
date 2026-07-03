const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public/images');
let files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

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

async function download() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dest = path.join(dir, file);
    const stats = fs.statSync(dest);
    
    // Only re-download if it's too small (like the 29 byte 404s)
    if (stats.size < 1024) {
      const url = knownGoodUrls[i % knownGoodUrls.length];
      await new Promise((resolve) => {
        https.get(url, (res) => {
          const fileStream = fs.createWriteStream(dest);
          res.pipe(fileStream);
          fileStream.on('finish', () => { fileStream.close(); resolve(); });
        });
      });
      console.log(`Re-downloaded ${file}`);
    }
  }
}

download();
