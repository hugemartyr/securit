

# import face_recognition
# import cv2
# import json
# import numpy as np
# import os
# import sys

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DB_PATH = os.path.join(BASE_DIR, "face_db.json")

# # Load face DB
# if not os.path.exists(DB_PATH):
#     print(json.dumps({ "success": False, "error": "NO_DB" }))
#     sys.exit(1)

# with open(DB_PATH, "r") as f:
#     db = json.load(f)

# if not db:
#     print(json.dumps({ "success": False, "error": "EMPTY_DB" }))
#     sys.exit(1)

# known_user_ids = list(db.keys())
# known_embeddings = [np.array(db[k]) for k in known_user_ids]

# # Capture one frame (headless)
# cap = cv2.VideoCapture(0)
# ret, frame = cap.read()
# cap.release()

# if not ret:
#     print(json.dumps({ "success": False, "error": "CAMERA_FAIL" }))
#     sys.exit(1)

# rgb = frame[:, :, ::-1]

# # ✅ Explicit face detection (CRITICAL)
# face_locations = face_recognition.face_locations(rgb, model="hog")

# if len(face_locations) != 1:
#     print(json.dumps({ "success": False, "error": "FACE_COUNT_INVALID" }))
#     sys.exit(1)

# encodings = face_recognition.face_encodings(
#     rgb,
#     face_locations,
#     num_jitters=1
# )

# if not encodings:
#     print(json.dumps({ "success": False, "error": "ENCODING_FAIL" }))
#     sys.exit(1)

# query_embedding = encodings[0]

# # Compare with stored embeddings
# distances = face_recognition.face_distance(
#     known_embeddings,
#     query_embedding
# )

# best_match_index = int(np.argmin(distances))
# best_distance = distances[best_match_index]

# # Threshold (lower = stricter)
# THRESHOLD = 0.45

# if best_distance < THRESHOLD:
#     print(json.dumps({
#         "success": True,
#         "userId": known_user_ids[best_match_index]
#     }))
# else:
#     print(json.dumps({ "success": False }))


import face_recognition
import cv2
import json
import numpy as np
import os
import sys

# Set paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "face_db.json")

# 1. Load face DB with empty-file check
if not os.path.exists(DB_PATH) or os.path.getsize(DB_PATH) == 0:
    print(json.dumps({ "success": False, "error": "NO_DB" }))
    sys.exit(1)

try:
    with open(DB_PATH, "r") as f:
        db = json.load(f)
except json.JSONDecodeError:
    print(json.dumps({ "success": False, "error": "CORRUPT_DB" }))
    sys.exit(1)

if not db:
    print(json.dumps({ "success": False, "error": "EMPTY_DB" }))
    sys.exit(1)

known_user_ids = list(db.keys())
known_embeddings = [np.array(db[k]) for k in known_user_ids]

# 2. Capture with WARM-UP (Crucial for macOS/Continuity Camera)
cap = cv2.VideoCapture(0)

# Let the sensor adjust (prevents black/blurry frames)
for _ in range(20):
    cap.read()

ret, frame = cap.read()
cap.release()

if not ret or frame is None:
    print(json.dumps({ "success": False, "error": "CAMERA_FAIL" }))
    sys.exit(1)

# 3. CONVERT & FIX MEMORY LAYOUT (Crucial for Dlib/NumPy compatibility)
# Use cv2.cvtColor for better reliability than slicing
rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
# Force contiguous memory to fix the TypeError: compute_face_descriptor()
rgb = np.ascontiguousarray(rgb)

# 4. Explicit face detection
face_locations = face_recognition.face_locations(rgb, model="hog")

if len(face_locations) != 1:
    # Diagnostic: includes count in error for debugging
    print(json.dumps({ "success": False, "error": "FACE_COUNT_INVALID", "found": len(face_locations) }))
    sys.exit(1)

# 5. Encoding with error handling
try:
    encodings = face_recognition.face_encodings(
        rgb,
        face_locations,
        num_jitters=1
    )
except TypeError:
    # Secondary attempt without jitters if dlib arguments fail
    encodings = face_recognition.face_encodings(rgb, face_locations)

if not encodings:
    print(json.dumps({ "success": False, "error": "ENCODING_FAIL" }))
    sys.exit(1)

query_embedding = encodings[0]

# 6. Compare with stored embeddings
distances = face_recognition.face_distance(
    known_embeddings,
    query_embedding
)

best_match_index = int(np.argmin(distances))
best_distance = distances[best_match_index]

# Threshold (0.45 is strict; 0.6 is default)
THRESHOLD = 0.45

if best_distance < THRESHOLD:
    print(json.dumps({
        "success": True,
        "userId": known_user_ids[best_match_index],
        "confidence": round(1 - best_distance, 2)
    }))
else:
    print(json.dumps({ "success": False, "error": "NOT_RECOGNIZED" }))