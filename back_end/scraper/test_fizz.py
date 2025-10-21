from rapidfuzz import fuzz


res = fuzz.ratio("", "this is a test")

print(res)
