"""
Optimiza imágenes, fuentes y mueve el CV.
Uso (desde la raíz del proyecto):
    pip install pillow fonttools brotli cairosvg
    python scripts/optimize-assets.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "public" / "assets" / "images"
LOGOS = ROOT / "public" / "assets" / "logos"
FONTS = ROOT / "public" / "fonts"
CV = ROOT / "public" / "cv"


def to_webp(src: Path, dst: Path, width: int, quality: int = 82):
    im = Image.open(src).convert("RGBA")
    h = round(im.height * width / im.width)
    im.resize((width, h), Image.LANCZOS).save(dst, "WEBP", quality=quality, method=6)
    print(f"  {dst.name}: {dst.stat().st_size // 1024} KB")


def remove(path: Path):
    if path.exists():
        path.unlink()
        print(f"  borrado {path.relative_to(ROOT)}")


print("Imágenes (PNG -> WebP)")
jobs = [
    ("planet-retailvision.png", "planet-retailvision.webp", 900),
    ("planet-small-01.png", "planet-small-01.webp", 520),
    ("planet-small-02.png", "planet-small-02.webp", 520),
    ("planet-small-03.png", "planet-small-03.webp", 520),
    ("rocket.png", "rocket.webp", 900),
]
for src, dst, w in jobs:
    if (IMG / src).exists():
        to_webp(IMG / src, IMG / dst, w)
        remove(IMG / src)

print("Logo de Lilian (SVG de 860 KB -> WebP de 4 KB)")
svg = LOGOS / "logo_lilianG.svg"
if svg.exists():
    try:
        import cairosvg

        tmp = LOGOS / "_tmp.png"
        cairosvg.svg2png(url=str(svg), write_to=str(tmp), output_width=128, output_height=128)
        Image.open(tmp).convert("RGBA").save(LOGOS / "logo_lilianG.webp", "WEBP", quality=90, method=6)
        tmp.unlink()
        remove(svg)
    except ImportError:
        print("  (instala cairosvg para convertir el logo: pip install cairosvg)")

print("Fuentes (OTF -> WOFF2)")
try:
    from fontTools.ttLib import TTFont

    for w in ("Bold", "ExtraBold"):
        otf = FONTS / f"Humant-{w}.otf"
        if otf.exists():
            f = TTFont(otf)
            f.flavor = "woff2"
            f.save(FONTS / f"Humant-{w}.woff2")
            print(f"  Humant-{w}.woff2")
            remove(otf)
except ImportError:
    print("  (instala fonttools y brotli: pip install fonttools brotli)")

print("Duplicados y archivos sin uso")
remove(ROOT / "src" / "assets" / "hero.png")
remove(ROOT / "src" / "assets" / "vite.svg")
dup = IMG / "retailvision"  # ya existe en src/assets/projects/retailvision
if dup.exists():
    for f in dup.iterdir():
        f.unlink()
    dup.rmdir()
    print("  borrada public/assets/images/retailvision/ (duplicada)")

print("CV")
CV.mkdir(exist_ok=True)
old = ROOT / "public" / "cv-luis-crisanto.pdf"
if old.exists():
    old.replace(CV / "cv-luis-crisanto-es.pdf")  # supone que este es el de español
    print("  movido a public/cv/cv-luis-crisanto-es.pdf")
print("  -> pon tu CV en inglés en public/cv/cv-luis-crisanto-en.pdf")
print("Listo.")