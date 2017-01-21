import tweepy
import re
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener

def limit_handled(cursor):
    while True:
        try:
            yield cursor.next()
        except tweepy.RateLimitError:
            time.sleep(15 * 60)

def remove_unneccessary_items(text):
	return remove_http(remove_non_ascii_2(text));

def remove_http(text):
	return re.sub("https[^ ]*", "", text);

def remove_non_ascii_2(text):
	return ''.join([i if ord(i) < 128 else ' ' for i in text])

def main():
	consumer_key = '6O8Q4ZXIn6hEgGHL467pLz7Yh'
	consumer_secret = 'oL16iMGnmDcq7gkhtErYMNc5FZANjEF9vsFDRmBdbAPW6gh5bg'
	access_token = '500365544-iZH4NVnzXepmZ7RVzJi8hh9XJglVdxN7lVi1Wybx'
	access_secret = '37Bmo3BROxHTlsa7GzUCSt508YE6OnLIYn0lrkN0x6eUS'
	 
	auth = OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_secret)
	
	string = str()

	api = tweepy.API(auth)
	for tweet in limit_handled(tweepy.Cursor(api.user_timeline, 'Twitter').items(100)):
		if not tweet.retweeted and 'RT @' not in tweet.text and tweet.text[0] != '@':
			#print(remove_unneccessary_items(tweet.text));
			string += remove_unneccessary_items(tweet.text);
	
	print(string);
	
	#for status in limit_handled(tweepy.Cursor(api.user_timeline, 'Twitter').items()):
	    # Process a single status
	    #print(remove_http(remove_non_ascii_2(status.text)))

if __name__ == '__main__':
 	main()