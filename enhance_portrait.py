from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

def enhance_portrait():
    # Load original image
    img = Image.open('public/images/Meet_The_Couple.jpeg')
    
    # Zoom out: Crop a wider area to show more of their bodies and context
    # Centered around x=1220, y=1450
    left, top, right, bottom = 470, 450, 1970, 2450
    crop_img = img.crop((left, top, right, bottom))
    
    # Resize to high quality 900x1200 (aspect ratio 3:4)
    target_size = (900, 1200)
    crop_img = crop_img.resize(target_size, Image.Resampling.LANCZOS)
    
    # 1. Enhance Color (Vibrancy/Saturation)
    color_enhancer = ImageEnhance.Color(crop_img)
    crop_img = color_enhancer.enhance(1.2)
    
    # 2. Enhance Brightness (Warm glow on faces)
    brightness_enhancer = ImageEnhance.Brightness(crop_img)
    crop_img = brightness_enhancer.enhance(1.15)
    
    # 3. Enhance Contrast
    contrast_enhancer = ImageEnhance.Contrast(crop_img)
    crop_img = contrast_enhancer.enhance(1.1)
    
    # 4. Enhance Sharpness (Ensure faces and hair are 100% crisp)
    sharpness_enhancer = ImageEnhance.Sharpness(crop_img)
    crop_img = sharpness_enhancer.enhance(1.2)
    
    # 5. Create a subtle dark corner vignette (keeps the center fully bright and sharp)
    # This darkens the corners slightly to focus attention on the couple, without causing any face blur.
    vignette = Image.new('L', target_size, 255)
    draw = ImageDraw.Draw(vignette)
    
    # Draw a large soft ellipse for the vignette
    # We want a very wide ellipse so only the corners are darkened
    draw.ellipse([-100, -100, 1000, 1300], fill=255)
    
    # Blur the vignette mask heavily to make the transition extremely smooth
    vignette_mask = vignette.filter(ImageFilter.GaussianBlur(150))
    
    # Create a darkened version of the image
    dark_img = ImageEnhance.Brightness(crop_img).enhance(0.78)
    
    # Combine the sharp bright image with the darkened version using the vignette mask
    final_img = Image.composite(crop_img, dark_img, vignette_mask)
    
    # Save the final premium portrait
    final_img.save('public/images/couple_portrait.jpg', 'JPEG', quality=92)
    print("Successfully enhanced and saved couple_portrait.jpg with wider crop and sharp faces.")

if __name__ == '__main__':
    enhance_portrait()
