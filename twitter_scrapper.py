import tweepy
import re
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener

#exception handler - mainly used to parse through tweets
def limit_handled(cursor):
    while True:
        try:
            yield cursor.next()
        except tweepy.RateLimitError:
            time.sleep(15 * 60)

#used for parsing extra stuff
def remove_unneccessary_items(text):
	return remove_http(remove_non_ascii_2(text));

#filter http 
def remove_http(text):
	return re.sub("https[^ ]*", "", text);

#filter anything that is not ascii
def remove_non_ascii_2(text):
	return ''.join([i if ord(i) < 128 else ' ' for i in text])

def get_tweets(username, numberOfTweets):
	#authorize the user
	consumer_key = '6O8Q4ZXIn6hEgGHL467pLz7Yh'
	consumer_secret = 'oL16iMGnmDcq7gkhtErYMNc5FZANjEF9vsFDRmBdbAPW6gh5bg'
	access_token = '500365544-iZH4NVnzXepmZ7RVzJi8hh9XJglVdxN7lVi1Wybx'
	access_secret = '37Bmo3BROxHTlsa7GzUCSt508YE6OnLIYn0lrkN0x6eUS'
	 
	auth = OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_secret)

	api = tweepy.API(auth)
	
	#array that holds our string
	str_array = []

	try:
		#-1 means that we want every single tweet
		if(numberOfTweets == -1):
			for tweet in limit_handled(tweepy.Cursor(api.user_timeline, username).items()):
				if not tweet.retweeted and 'RT @' not in tweet.text and tweet.text[0] != '@':
					str_array.append(remove_unneccessary_items(tweet.text));
		else:
			for tweet in limit_handled(tweepy.Cursor(api.user_timeline, username).items(numberOfTweets)):
				if not tweet.retweeted and 'RT @' not in tweet.text and tweet.text[0] != '@':
					str_array.append(remove_unneccessary_items(tweet.text));
	except TweepError:
		code = TweepError.message[0]['code']
		return code

	#string holds our tweet
	return "".join(str_array)

def main():
	
	print(get_tweets("Twitter", 100));

if __name__ == '__main__':
 	main()