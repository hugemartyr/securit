


# import face_recognition
# import cv2
# import json
# import sys
# import os

# USER_ID = sys.argv[1]

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DB_PATH = os.path.join(BASE_DIR, "face_db.json")

# cap = cv2.VideoCapture(0)

# ret, frame = cap.read()
# cap.release()

# if not ret:
#     print("{\"success\": false, \"error\": \"CAMERA_FAIL\"}")
#     sys.exit(1)

# rgb = frame[:, :, ::-1]

# # ✅ EXPLICIT face detection (critical fix)
# face_locations = face_recognition.face_locations(rgb, model="hog")

# if len(face_locations) != 1:
#     print("{\"success\": false, \"error\": \"FACE_COUNT_INVALID\"}")
#     sys.exit(1)

# encodings = face_recognition.face_encodings(
#     rgb,
#     face_locations,
#     num_jitters=1
# )

# if not encodings:
#     print("{\"success\": false, \"error\": \"ENCODING_FAIL\"}")
#     sys.exit(1)

# embedding = encodings[0].tolist()

# # Load DB
# if os.path.exists(DB_PATH):
#     with open(DB_PATH) as f:
#         db = json.load(f)
# else:
#     db = {}

# db[USER_ID] = embedding

# with open(DB_PATH, "w") as f:
#     json.dump(db, f, indent=2)

# print("{\"success\": true}")

import face_recognition
import cv2
import json
import sys
import os
import numpy as np

USER_ID = sys.argv[1]
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "face_db.json")

cap = cv2.VideoCapture(0)

print(f"Opening camera preview for user: {USER_ID}")
print("Commands: [SPACE] to Capture | [Q] to Quit")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 1. Create a small version for faster face detection
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])

    # 2. Detect faces for the preview box
    face_locations = face_recognition.face_locations(rgb_small_frame)

    # 3. Draw boxes on the preview (scale back up by 4)
    for (top, right, bottom, left) in face_locations:
        cv2.rectangle(frame, (left*4, top*4), (right*4, bottom*4), (0, 255, 0), 2)
        cv2.putText(frame, "Face Detected", (left*4, top*4 - 10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    cv2.imshow('Register Face - Preview', frame)

    key = cv2.waitKey(1) & 0xFF
    
    # Press SPACE to capture
    if key == ord(' '):
        if len(face_locations) != 1:
            print(f"❌ Error: Found {len(face_locations)} faces. Need exactly 1 to register.")
            continue
        
        # We have exactly one face, let's encode the HIGH-RES frame
        print("📸 Capturing...")
        rgb_full = np.ascontiguousarray(frame[:, :, ::-1])
        # Find location in full res
        full_face_locations = face_recognition.face_locations(rgb_full)
        encodings = face_recognition.face_encodings(rgb_full, full_face_locations)
        
        if encodings:
            embedding = encodings[0].tolist()
            
            # Load and Save to DB
            db = {}
            if os.path.exists(DB_PATH) and os.path.getsize(DB_PATH) > 0:
                with open(DB_PATH, "r") as f:
                    db = json.load(f)
            
            db[USER_ID] = embedding
            with open(DB_PATH, "w") as f:
                json.dump(db, f, indent=2)
            
            print(f"✅ User '{USER_ID}' registered successfully!")
            break
        else:
            print("❌ Encoding failed. Try again.")

    # Press Q to quit
    elif key == ord('q'):
        print("Registration cancelled.")
        break
print("{\"success\": true}")

cap.release()
cv2.destroyAllWindows()