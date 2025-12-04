import joblib

cols = joblib.load("model_columns.pkl")
print("MODEL COLUMNS:")
for c in cols:
    print("-", c)
