#!/usr/bin/env python2
'''
Extracts likely bigram and trigram phrases from a large corpus
'''

import sys
import unicodecsv as csv
import codecs
from collections import Counter
import argparse

LAMBDA = 0

'''
Takes a list of sentences (each of which is a list of words.)

Generates ngrams for the sentences.
'''
def ngrams_of_sents(sents, k):
    for sent in sents:
        sent = [x.strip() for x in sent.split()]
        for ngram in get_ngrams(sent, k):
            yield ngram
    

'''
Generates ngrams from arbitrary sequences.
'''
def get_ngrams(seq, k):
    buf = []
    for x in seq:
        if len(buf) == k:
            buf.pop(0)
        buf.append(x)
        if len(buf) == k:
            yield tuple(buf)

'''
Takes a list of sentences (each of which is a list of words.)

Returns a word count dictionary.
'''
def get_counter(sentence_list):
    word_counter = Counter()
    for sentence in sentence_list:
        word_counter.update(sentence)
    return word_counter


def get_stats(fileobj):
    y = Counter()
    for line in fileobj:
        line = filter(lambda z: bool(z), [x.strip() for x in line.split()])
        y.update(line)
    return y



'''
Takes a list of sentences (each of which is a list of words.)

Returns the ratios of observed cooccurence statistics between pairs of words
and the hypothetical ratio of cooccurence if the words appeared independently
of each other.
'''
def ratios(filename):
    #print >> sys.stderr, 'size of sentence list', len(sentence_list)
    #y = get_counter(sentence_list)
    print >> sys.stderr, "compiling statistics..."
    y = get_stats(codecs.open(filename, 'r', 'utf-8'))
    print >> sys.stderr, "done"
    n = float(sum(y.values()))
    pi = {w:y[w]/n for w in y}

    ratio_dict = {}

    print >> sys.stderr, "extracting 2grams..."
    ngrams = [x for x in ngrams_of_sents(codecs.open(filename, 'r', 'utf-8'),2)]
    print >> sys.stderr, 'done'
    y_ngrams = Counter(ngrams)
    n_ngrams = float(sum(y_ngrams.values()))
    pi_ngrams = {w:y_ngrams[w]/n_ngrams for w in y_ngrams}
    for (word_one, word_two) in ngrams:
        p_word_one = pi[word_one]
        p_word_two = pi[word_two]
        independent_prob = p_word_one * p_word_two
        dependent_prob = pi_ngrams[(word_one, word_two)]
        ratio_dict[(word_one, word_two)] = dependent_prob / independent_prob


    filtered_dict = {}
    print >> sys.stderr, 'printing filtered phrases...'
    for (wordone, wordtwo) in ratio_dict:
        if wordone.isnumeric() or wordtwo.isnumeric():
            continue
        if (y[wordone] > LAMBDA or wordone.istitle()) \
        and (y[wordtwo] > LAMBDA or wordtwo.istitle()):
        #if (y[wordone] > LAMBDA)\
        #        and (y[wordtwo] > LAMBDA):
            filtered_dict[(wordone, wordtwo)] = ratio_dict[(wordone, wordtwo)]

    print >> sys.stderr, 'done...'
    return filtered_dict 
    

class Phrasifier():
    '''
    Takes the path to a TSV of word1<TAB>word2,
    representing phrases.
    Returns an object that takes sentence lists and
    returns phrasified sentence lists.
    '''
    phrases = set()

    def __init__(self, filepath):
        for line in codecs.open(filepath, 'r', 'utf-8'):
            line = [x.strip() for x in line.split('\t')]
            self.phrases.add((line[0], line[1]))

    '''
    Takes a list of sentences,
    yields a flattened list of phrases.
    '''
    def phrases_of_sents(self, sentence_list):
        for sent in sentence_list:
            buf = []
            for word in sent:
                if len(buf) == 2:
                    if tuple(buf) in self.phrases:
                        words = tuple(buf)
                        buf = [word]
                        yield '_'.join(words)
                    else:
                        buf.append(word)
                        yield buf.pop(0)
                else:
                    buf.append(word)
            if len(buf) == 2:
                if tuple(buf) in self.phrases:
                    yield '_'.join(buf)
                else:
                    for word in buf:
                        yield word



def print_ngram_example():
    print 'unigrams', [x for x in get_ngrams([1,2,3,4], 1)]
    print 'bigrams', [x for x in get_ngrams([1,2,3,4], 2)]
    print 'trigrams', [x for x in get_ngrams([1,2,3,4], 3)]
    print '4grams', [x for x in get_ngrams([1,2,3,4], 4)]

def print_test_example():
    corpus = codecs.open('example_text/corpus', 'r', 'utf-8').readlines()
    corpus = [filter(lambda z: bool(z), [x.strip() for x in y.split()]) for y in corpus]

    #corpus = filter(lambda x: bool(x), open('example_text/corpus').read().decode('utf-8').split())
    ratio_list = ratios(corpus)
    for word1, word2, in sorted(ratio_list, key = lambda x: ratio_list[x]):
        print '(', word1.encode('utf-8'), ',', word2.encode('utf-8'), ')', ratio_list[(word1, word2)]

def print_test_phrase_replaceent():
    phrases = 'example_text/example_phrases'
    extractor = Phrasifier(phrases)
    print [x for x in extractor.phrases_of_sents([['Barack', 'Obama', 'was', 'president', 'in', 'the', 'White', 'House'],['Steve', 'Jobs', 'founded', 'Apple', 'Inc.']])]

if __name__ == '__main__':
    #print_test_phrase_replaceent()
    argp = argparse.ArgumentParser()
    argp.add_argument('corpus')
    args = argp.parse_args()
    #corpus = codecs.open(args.corpus, 'r', 'utf-8').readlines()
    #corpus = [filter(lambda z: bool(z), [x.strip() for x in y.split()]) for y in corpus]
    ratio_list = ratios(args.corpus)
    for word1, word2, in sorted(ratio_list, key = lambda x: ratio_list[x]):
        print '\t'.join([word1.encode('utf-8'), word2.encode('utf-8'), str(ratio_list[(word1, word2)])])



#print_ngram_example()
#print_test_example()
