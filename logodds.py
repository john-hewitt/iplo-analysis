#!/usr/bin/env python2
'''
Informative Dirichlet Prior Log-Odds Ratio Class
'''

from collections import Counter
import math

'''
Runs the log-odds algorithm on lists of words
'''
def get_analysis(one_words, two_words):
    y_i = Counter(one_words)
    y_j = Counter(two_words)
    y = Counter(two_words)
    y.update(one_words)

    n = float(sum(y.values()))
    n_i = float(sum(y_i.values()))
    n_j = float(sum(y_j.values()))
    a_0 = n
    a = {w:float(y[w]) for w in y}

    delta = {
            w:
            math.log( float(y_i[w] + a[w]) / float(n_i + a_0 - y_i[w] - a[w]) ) - 
            math.log( float(y_j[w] + a[w]) / float(n_j + a_0 - y_j[w] - a[w]) )
            for w in y
            }
    sigma = {
            w:
            math.sqrt( 1/float(y_i[w] + a[w]) + 1/float(y_j[w] + a[w]) )
            for w in y
            }
    zscores_freqs = {
            w:
            (delta[w]/sigma[w], y[w])
            for w in y
            }
    return zscores_freqs


def print_test_example():
    pop1 = open('example_text/one').read().split()
    pop2 = open('example_text/two').read().split()
    results = get_analysis(pop1, pop2)
    for word in sorted(results, key=lambda x: -results[x][0]):
        print word + '\t' + str(results[word])
