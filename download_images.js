const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public/images');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));

const categories = ['coffee', 'cafe', 'barista', 'latte', 'pastry', 'breakfast', 'tea', 'dessert', 'lunch', 'restaurant', 'food', 'drink'];

async function download() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const category = categories[i % categories.length];
    const url = `https://source.unsplash.com/featured/800x600/?${category}`;
    const newName = file.replace('.webp', '.jpg');
    const dest = path.join(dir, newName);
    
    // Download image
    // Note: source.unsplash.com redirects, so we need to handle that or use a different service like 
    // https://images.unsplash.com/... or picsum.
    // Let's use https://picsum.photos/800/600?random=${i} for guaranteed fast responses.
    
    const picsumUrl = `https://picsum.photos/800/600?random=${i}`;
    
    await new Promise((resolve) => {
      https.get(picsumUrl, (res) => {
        if (res.statusCode === 302) {
          https.get(res.headers.location, (res2) => {
            const fileStream = fs.createWriteStream(dest);
            res2.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              resolve();
            });
          });
        } else {
           const fileStream = fs.createWriteStream(dest);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              resolve();
            });
        }
      });
    });
    console.log(`Downloaded ${newName}`);
    // Delete the corrupted webp
    fs.unlinkSync(path.join(dir, file));
  }
}

download().then(() => console.log('All done!'));
