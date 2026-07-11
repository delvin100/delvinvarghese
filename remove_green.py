from PIL import Image

# Load the gif
im = Image.open('public/undefined - Imgur.gif')

frames = []
durations = []
try:
    while True:
        # Preserve original frame duration
        durations.append(im.info.get('duration', 50))
        
        # Convert to RGBA
        frame = im.convert('RGBA')
        datas = frame.getdata()
        
        newData = []
        for item in datas:
            # Check if pixel is "green".
            if item[1] > 100 and item[1] > item[0] + 50 and item[1] > item[2] + 50:
                newData.append((255, 255, 255, 0)) # transparent
            else:
                newData.append(item)
                
        frame.putdata(newData)
        frames.append(frame)
        im.seek(im.tell() + 1)
except EOFError:
    pass

# Save the frames as an animated GIF
if frames:
    frames[0].save('public/luffy_custom.gif',
                   save_all=True,
                   append_images=frames[1:],
                   duration=durations, # use original frame durations
                   loop=0,
                   transparency=0,
                   disposal=2)
    print(f"Successfully created public/luffy_custom.gif with {len(frames)} frames. Original durations applied.")
else:
    print("No frames found")
