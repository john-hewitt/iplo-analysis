from flask import Flask, request, render_template
import custom_tokenize

app = Flask(__name__)

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

def loganalysis(text1, text2):
	return text1 + ' ' + text2

if __name__ == "__main__":
	app.run()