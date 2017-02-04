from flask import Flask, request, render_template, redirect, url_for
from werkzeug.utils import secure_filename

import custom_tokenize
import logodds
import extract_phrases
import twitter_scrapper
import sys

app = Flask(__name__)

ALLOWED_EXTENSIONS = set(['txt'])

@app.route('/', methods=['GET', 'POST'])
def index():
	results = None
	if request.method == 'POST':
		text1 = None
		text2 = None
		color1 = "red"
		color2 = "blue"
		error = None
		if request.form['submit'] == 'plaintext':
			text1 = request.form['text1']
			text2 = request.form['text2']
		elif request.form['submit'] == 'twitter':
			if request.form['handle1'] == '' or request.form['handle2'] == '':
				error = 404
				return render_template("index.html", results=None, sortedResults=None, error=error, color1=color1, color2=color2)
			text1 = twitter_scrapper.get_tweets(request.form['handle1'], 100)
			text2 = twitter_scrapper.get_tweets(request.form['handle2'], 100)
			if text1 == 404 or text2 == 404:
				error = 404
				return render_template("index.html", results=None, sortedResults=None, error=error, color1=color1, color2=color2)
		elif request.form['submit'] == 'file':
                    print "file submitted!"
                    file1 = request.files['file1']
                    file2 = request.files['file2']
                    if not (allowed_file(file1.filename) and allowed_file(file2.filename)): 
                        return render_template("index.html", results=None, sortedResults=None)
                    print "file allowed!"
                    text1 = file1.read().decode('utf-8')
                    text2 = file2.read().decode('utf-8')

		color1 = str(request.form['color1'])
		color2 = str(request.form['color2'])

		tokenized = custom_tokenize.generate_tokens(text1, text2)
		phrases1 = list(phrasifier.phrases_of_sents(tokenized[0]))
		phrases2 = list(phrasifier.phrases_of_sents(tokenized[1]))
		results = logodds.get_analysis(phrases1, phrases2, large_prior)
		sortedResults = sorted(results.items(), key=lambda x:x[1][0])
		lowestLogScores = sortedResults[:10]
		highestLogScores = sortedResults[-10:]
		fullSortedResults = sortedResults
		sortedResults = {'scores':(lowestLogScores, highestLogScores)}
		return render_template("index.html", results=results, sortedResults=sortedResults, error=error, color1=color1, color2=color2)
	else:
		return render_template("index.html", results=None, sortedResults=None, error=None, color1=None, color2=None)

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == "__main__":
        print >> sys.stderr, "loading phrasifier..."
        # phrasifier = extract_phrases.get_default_phrasifier()
        print >> sys.stderr, "loading large prior..."
        # large_prior = logodds.get_large_prior()
	app.run()
