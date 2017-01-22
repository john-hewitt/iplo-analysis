import sys

speaker = ''

for line in open('transcript.txt'):
    words = [x.strip() for x in line.split()]
    if not words:
        continue
    first = words[0].strip(':')
    if first.isupper():
        words = words[1:]
        if first == 'CLINTON':
            speaker = 'clinton'
        elif first == 'TRUMP':
            speaker = 'trump'
        else:
            speaker = ''
    if speaker == 'clinton':
        print ' '.join(words)
    elif speaker == 'trump':
        print >> sys.stderr, ' '.join(words)
