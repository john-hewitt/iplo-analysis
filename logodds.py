#!/usr/bin/env python2
'''
Informative Dirichlet Prior Log-Odds Ratio Class
'''

from collections import Counter
import sys
import math
import codecs

'''
Runs the log-odds algorithm on lists of words
'''
def get_analysis(one_words, two_words, a):
    one_words = filter( lambda x: len(x) != 1, [x.lower() for x in one_words])
    two_words = filter( lambda x: len(x) != 1, [x.lower() for x in two_words])
    y_i = Counter(one_words)
    y_j = Counter(two_words)
    y = Counter(two_words)
    y.update(one_words)

    n = float(sum(y.values()))
    n_i = float(sum(y_i.values()))
    n_j = float(sum(y_j.values()))
    #a_0 = n/4
    #a = {w:float(y[w])/4 for w in y}
    #a = get_large_prior(y)
    a.update(y)
    a_0 = float(sum(a.values()))

    delta = {
            w:
            math.log( float(y_i[w] + a[w]) / float(n_i + a_0 - y_i[w] - a[w]) ) - 
            math.log( float(y_j[w] + a[w]) / float(n_j + a_0 - y_j[w] - a[w]) )
            for w in y
            }
    sigma = {
            w:
            math.sqrt( 
                1/float(y_i[w] + a[w]) + 
                1/float(n_i + a_0 - y_i[w] - a[w]) +
                1/float(y_j[w] + a[w]) +
                1/float(n_j + a_0 - y_i[w] - a[w]))
            for w in y
            }
    zscores_freqs = {
            w:
            (delta[w]/sigma[w], y[w], y_i[w], y_j[w])
            for w in y
            }

    for word in sorted(zscores_freqs, key=lambda x: -zscores_freqs[x][0]):
        print >> sys.stderr, word + '\t' + str(zscores_freqs[word])
    return zscores_freqs


def get_large_prior():
    counter = Counter()
    print >> sys.stderr, "getting large prior..."
    for line in codecs.open('resources/small_phrase_corpus_tok2', 'r', 'utf-8'):
        words = [x.strip() for x in line.split()]
        counter.update(words)
    #counter.update(y)
    return counter


def print_test_example():
    pop1 = open('example_text/one').read().split()
    pop2 = open('example_text/two').read().split()
    results = get_analysis(pop1, pop2)
    for word in sorted(results, key=lambda x: -results[x][0]):
        print word + '\t' + str(results[word])

if __name__ == '__main__':
    print_test_example()
