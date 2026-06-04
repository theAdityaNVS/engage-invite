from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

def enhance_portrait():
    # Load original image
    img = Image.open('public/images/Meet_The_Couple.jpeg')
    
    # Correct crop coordinates to capture faces and upper bodies:
    # Centered around x=1215, y=1300
    left, top, right, bottom = 615, 500, 1815, 2100
    crop_img = img.crop((left, top, right, bottom))
    
    # Resize to high quality 900x1200 (aspect ratio 3:4)
    target_size = (900, 1200)
    crop_img = crop_img.resize(target_size, Image.Resampling.LANCZOS)
    
    # 1. Enhance Color (Vibrancy/Saturation)
    color_enhancer = ImageEnhance.Color(crop_img)
    crop_img = color_enhancer.enhance(1.22)
    
    # 2. Enhance Brightness (Make them glow and look radiant)
    brightness_enhancer = ImageEnhance.Brightness(crop_img)
    crop_img = brightness_enhancer.enhance(1.15)
    
    # 3. Enhance Contrast (Rich shadow details and depth)
    contrast_enhancer = ImageEnhance.Contrast(crop_img)
    crop_img = contrast_enhancer.enhance(1.12)
    
    # 4. Enhance Sharpness (Crisp facial features)
    sharpness_enhancer = ImageEnhance.Sharpness(crop_img)
    crop_img = sharpness_enhancer.enhance(1.25)
    
    # 5. Create a professional portrait mask to keep the couple sharp and blur the background
    # We create a mask where 255 (white) keeps the image sharp, and fades to 0 (black) for background blur.
    # The couple is in the center, roughly from x=150 to x=750.
    mask = Image.new('L', target_size, 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw a soft ellipse over the couple's body area to keep it sharp
    # Ellipse box: left, top, right, bottom
    # We want to cover both of them, from y=100 (heads) down to y=1100 (torso)
    draw.ellipse([120, 80, 780, 1150], fill=255)
    
    # Apply a heavy Gaussian blur to the mask to make the sharp-to-blur transition seamless
    mask = mask.filter(ImageFilter.GaussianBlur(100))
    
    # Create a blurred version of the image for the background
    # 15px radius gives a beautiful, clean DSLR bokeh effect
    blurred_img = crop_img.filter(ImageFilter.GaussianBlur(16))
    
    # Apply a very subtle darkening/vignette to the background to focus attention on the couple
    dark_blurred = ImageEnhance.Brightness(blurred_img).enhance(0.92)
    
    # Composite the sharp couple with the blurred background
    final_img = Image.composite(crop_img, dark_blurred, mask)
    
    # Save the final premium portrait
    final_img.save('public/images/couple_portrait.jpg', 'JPEG', quality=92)
    print("Successfully enhanced and saved couple_portrait.jpg with correct crop coordinates.")

if __name__ == '__main__':
    enhance_portrait()
