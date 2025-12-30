import face_recognition
import cv2
import numpy as np

def test_face_detection():
    # 1. Load a sample image (replace 'your_image.jpg' with a real file path)
    # If you don't have one, this script will create a blank one just to test the library import
    try:
        image = face_recognition.load_image_file("person.jpg")
        print("✅ Image loaded successfully.")
    except FileNotFoundError:
        print("❌ 'person.jpg' not found. Creating a dummy check instead...")
        # Just check if the model can initialize
        face_recognition.face_encodings(np.zeros((100, 100, 3), dtype=np.uint8))
        print("✅ Models initialized successfully!")
        return

    # 2. Find all face locations in the image
    face_locations = face_recognition.face_locations(image)
    print(f"✅ Found {len(face_locations)} face(s) in this image.")

    # 3. Convert image to BGR (OpenCV format) and draw boxes
    top_layer = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    for (top, right, bottom, left) in face_locations:
        cv2.rectangle(top_layer, (left, top), (right, bottom), (0, 255, 0), 2)

    # 4. Display the result
    cv2.imshow('Face Detection Test', top_layer)
    print("Press any key to close the window...")
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    test_face_detection()