from flask import Flask, request, render_template, redirect, url_for
from werkzeug.utils import secure_filename

import custom_tokenize

app = Flask(__name__)

ALLOWED_EXTENSIONS = set(['txt'])

@app.route('/', methods=['GET', 'POST'])
def index():
	results = None
	if request.method == 'POST':
		text1 = request.form['text1']
		text2 = request.form['text2']
		tokenized = generate_tokens(text1, text2)
		phrases = get_phrases(tokenized)
		results = get_analysis(phrases)
		return render_template("index.html", results=results)
	else:
		return render_template("index.html", results=None)

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		if file.filename == '':
			flash('No selected file');
			return redirect(request.url)
		if file and allowed_file(file.filename):
			s = file.read()
			return s
	return

def loganalysis(text1, text2):
	return text1 + ' ' + text2

if __name__ == "__main__":
	app.run()