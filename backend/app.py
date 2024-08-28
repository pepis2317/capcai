import base64
from flask import Flask, jsonify, request
from flask_cors import CORS
from keras import models
import numpy as np
import cv2 as cv

app = Flask(__name__)
model = models.load_model('backend\capc_ai_image_classifier.model')

CORS(app)
@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['file']
    image = cv.imdecode(np.frombuffer(file.read(), np.uint8), cv.IMREAD_COLOR)
    image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
    _, buffer = cv.imencode('.png', image)
    image_base64 = base64.b64encode(buffer).decode('utf-8')
    prediction = model.predict(np.array([image]))
    print(prediction)
    return jsonify({'prediction':int(np.argmax(prediction)), 'image_base64': image_base64})

# to run, f5, pick flask, ctrl c ctrl v the path to app.py

if __name__ == "__main__":
    app.run(debug=True)