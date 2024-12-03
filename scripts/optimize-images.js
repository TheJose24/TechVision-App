const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets/img/avatar';
const outputDir = 'src/assets/img/optimized';

// Asegúrate de que el directorio de salida exista
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            // Redimensionar si la imagen es muy grande
            .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true
            })
            // Convertir a WebP con buena calidad
            .webp({ quality: 80 })
            .toFile(outputPath.replace(/\.[^/.]+$/, '.webp'));

        // También crear versión JPG optimizada para fallback
        await sharp(inputPath)
            .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 85, progressive: true })
            .toFile(outputPath.replace(/\.[^/.]+$/, '.jpg'));

        console.log(`✅ Optimized: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`❌ Error optimizing ${inputPath}:`, error);
    }
}

// Procesar todas las imágenes en el directorio
fs.readdir(inputDir, async (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    for (const file of imageFiles) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);
        await optimizeImage(inputPath, outputPath);
    }
});