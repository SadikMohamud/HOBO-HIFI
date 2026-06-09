#!/usr/bin/env python
import shutil
import os

src = r'C:\Users\Sadik Mohamud\hobo-hifi'
dst = r'C:\Users\Sadik Mohamud\Desktop\HOBO-HIFI'

try:
    # Remove destination if it exists
    if os.path.exists(dst):
        shutil.rmtree(dst)
    
    # Copy the directory
    shutil.copytree(src, dst)
    
    # Verify destination exists
    if os.path.exists(dst) and os.path.isdir(dst):
        print(f'✓ Success: {dst}')
        exit(0)
    else:
        print(f'✗ Failed to verify destination')
        exit(1)
except Exception as e:
    print(f'✗ Error: {e}')
    exit(1)
