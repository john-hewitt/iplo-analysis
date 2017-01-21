from flask import Flask, request, render_template
# import custom_tokenize
import logodds

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
	results = None
	if request.method == 'POST':
		text1 = request.form['text1']
		text2 = request.form['text2']
		# tokenized = generate_tokens(text1, text2)
		list1 = ['a', 'a', 'b', 'c', 'c', 'c', 'c', 'a', 'c', 'a', 'e', 'gas', 'gas']
		list2 = ['a', 'b', 'b', 'c', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'dededededed', 'd', 'h', 'i', 'j']
		# phrases = get_phrases(tokenized)
		results = logodds.get_analysis(list1, list2)
		print results
		# results = {'hi': (100, 100), 'Mar': (200, 50)}
		return render_template("index.html", results=results)
	else:
		return render_template("index.html", results=None)

def loganalysis(text1, text2):
	return text1 + ' ' + text2

if __name__ == "__main__":
	app.run()