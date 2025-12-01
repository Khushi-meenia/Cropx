import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv(r"C:\Users\hp\Documents\Crop_Dataset.csv")

# One-hot encode categorical columns
df = pd.get_dummies(df, columns=['Soil_Type', 'Variety'])

# Features and target
X = df.drop('Crop', axis=1)
y = df['Crop']

# Save the column names for prediction
joblib.dump(list(X.columns), "model_columns.pkl")

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=300, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy:.4f}")

# Save model
joblib.dump(model, "crop_model.pkl")
print("Model and columns saved successfully!")
