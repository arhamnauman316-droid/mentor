from pathlib import Path
import re
import sys

html_path = Path(sys.argv[1] if len(sys.argv) > 1 else "index.html")
html = html_path.read_text(encoding="utf-8")
# Validate only inline scripts. External scripts are checked by their providers at runtime.
blocks = re.findall(r'<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script\s*>', html, re.I)
if not blocks:
    raise SystemExit("No inline script blocks found; refusing a false-positive check.")
out_dir = Path(".syntax-check")
out_dir.mkdir(exist_ok=True)
for i, block in enumerate(blocks, 1):
    (out_dir / f"inline-{i}.js").write_text(block, encoding="utf-8")
print(f"Extracted {len(blocks)} inline JavaScript blocks for node --check.")
