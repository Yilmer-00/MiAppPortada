from pathlib import Path
import PIL.Image as Image

files = sorted(Path('assets').glob('*.png'))
converted = 0
for f in files:
    try:
        img = Image.open(f)
        fmt = (img.format or '').upper()
        if fmt != 'PNG':
            rgba = img.convert('RGBA') if img.mode != 'RGBA' else img
            rgba.save(f, format='PNG')
            converted += 1
            print('converted', f.name, 'from', fmt)
    except Exception as e:
        print('ERR', f.name, e)

print('converted_count', converted)
