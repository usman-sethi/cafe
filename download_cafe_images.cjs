const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public/images');
let files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg'));

// Unsplash cafe/coffee related images
const unsplashImages = [
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
  'https://images.unsplash.com/photo-1445116572660-236099cecd07',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348',
  'https://images.unsplash.com/photo-1495474472201-44bbec755a58',
  'https://images.unsplash.com/photo-1507133750070-4cb5038ea8f3',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
  'https://images.unsplash.com/photo-1501339817388-d1d11721f542',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2',
  'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0',
  'https://images.unsplash.com/photo-1463797221720-6b07e6426c24',
  'https://images.unsplash.com/photo-1521017432531-fbd92076e4fa',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096',
  'https://images.unsplash.com/photo-1481833707121-59f4df66f73e',
  'https://images.unsplash.com/photo-1559525839-b184a4d698c7',
  'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb'
].map(url => url + '?auto=format&fit=crop&w=800&q=80');

async function download() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = unsplashImages[i % unsplashImages.length];
    // change the dest to .jpg
    const destName = file.replace('.webp', '.jpg');
    const dest = path.join(dir, destName);
    
    await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          https.get(res.headers.location, (res2) => {
            const fileStream = fs.createWriteStream(dest);
            res2.pipe(fileStream);
            fileStream.on('finish', () => { fileStream.close(); resolve(); });
          }).on('error', reject);
        } else {
          const fileStream = fs.createWriteStream(dest);
          res.pipe(fileStream);
          fileStream.on('finish', () => { fileStream.close(); resolve(); });
        }
      }).on('error', reject);
    });
    console.log(`Downloaded high quality image for ${destName}`);
    if (file.endsWith('.webp')) {
      try { fs.unlinkSync(path.join(dir, file)); } catch(e) {}
    }
  }
}

download().then(() => console.log('Cafe images downloaded!'));
