const userProfile1 = {
  userID: '1',
  api_key: 'abcd1234',
  first_name: 'John',
  last_name: 'Doe',
  image: 'https://example.com/profile1.jpg',
  birthday: '1990-01-01',
  height: 180,
  height_unit: 'cm',
  weight: 75,
  weight_unit: 'kg',
  experience: 'Intermediate',
  body_mass: 24,
  muscle_mass: 60,
  duration: 60,
  num_day_of_week: 3,
  preference: 'Cardio',
  equipment: ['Treadmill', 'Dumbbells'],
  allergyList: ['Peanuts', 'Seafood'],
  goalList: ['Weight loss', 'Muscle toning'],
  healthList: ['High blood pressure'],
  dietList: ['Vegan']
};

const userProfile2 = {
  userID: '2',
  api_key: 'efgh5678',
  first_name: 'Jane',
  last_name: 'Smith',
  image: 'https://example.com/profile2.jpg',
  birthday: '1995-05-15',
  height: 165,
  height_unit: 'cm',
  weight: 62,
  weight_unit: 'kg',
  experience: 'Beginner',
  body_mass: 21,
  muscle_mass: 55,
  duration: 45,
  num_day_of_week: 5,
  preference: 'Yoga',
  equipment: ['Yoga mat'],
  allergyList: ['Gluten'],
  goalList: ['Flexibility'],
  healthList: [],
  dietList: ['Paleo']
};

const userProfile3 = {
  userID: '3',
  api_key: 'ijkl9012',
  first_name: 'Alex',
  last_name: 'Johnson',
  image: 'https://example.com/profile3.jpg',
  birthday: '1988-09-30',
  height: 175,
  height_unit: 'cm',
  weight: 80,
  weight_unit: 'kg',
  experience: 'Advanced',
  body_mass: 26,
  muscle_mass: 65,
  duration: 90,
  num_day_of_week: 7,
  preference: 'Weightlifting',
  equipment: ['Barbell', 'Bench press', 'Squat rack'],
  allergyList: [],
  goalList: ['Strength training', 'Muscle gain'],
  healthList: ['Diabetes'],
  dietList: ['Keto']
};

const userProfile4 = {
    userID: "4",
    api_key: "mnop5678",
    first_name: "Sarah",
    last_name: "Johnson",
    image: "https://example.com/profile4.jpg",
    birthday: "1992-08-20",
    height: 170,
    height_unit: "cm",
    weight: 68,
    weight_unit: "kg",
    experience: "Intermediate",
    body_mass: 23,
    muscle_mass: 57,
    duration: 60,
    num_day_of_week: 4,
    preference: "HIIT",
    equipment: ["Jump rope", "Resistance bands"],
    allergyList: [],
    goalList: ["Weight loss", "Toning"],
    healthList: [],
    dietList: ["Vegetarian"]
  };

const updatedUserProfile4 = {
    userID: "4",
    api_key: "mnop5678",
    first_name: "Sarah",
    last_name: "Johnson",
    image: "https://example.com/profile4.jpg",
    birthday: "1992-08-20",
    height: 175, // Updated height
    height_unit: "cm",
    weight: 65, // Updated weight
    weight_unit: "kg",
    experience: "Intermediate",
    body_mass: 23,
    muscle_mass: 57,
    duration: 60,
    num_day_of_week: 4,
    preference: "HIIT",
    equipment: ["Jump rope", "Resistance bands"],
    allergyList: ["Dairy"], // Updated allergy
    goalList: ["Weight loss", "Toning"],
    healthList: ["Asthma"], // Updated health condition
    dietList: ["Vegetarian"]
};
  

module.exports = {
    userProfile1,
    userProfile2,
    userProfile3,
    userProfile4
};