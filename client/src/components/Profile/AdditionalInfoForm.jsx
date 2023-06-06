import React, { useState } from 'react';

import Form from './Forms/Form';
import FormMultiSelect from './Forms/FormMultiSelect';

const healthConditionsAndInjuriesOptions = [
  'Heart disease',
  'Asthma',
  'Diabetes',
  'High blood pressure',
  'Arthritis',
  'Osteoporosis',
  'Pregnancy',
  'Obesity',
  'Chronic pain',
  'Anxiety or depression',
  'Joint injuries (e.g., sprains, strains)',
  'Back pain',
  'Knee pain',
  'Shoulder impingement',
  'Tendonitis',
  'Rotator cuff injury',
  'Plantar fasciitis',
  'Carpal tunnel syndrome',
  'Sports-related concussions',
  'Hamstring strain',
  'Shin splints',
  'IT band syndrome',
  'Golfer\'s elbow',
  'Tennis elbow',
  'Pulled muscles',
];

const dietaryRestrictionsOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Nut-free',
  'Shellfish-free',
  'Pescatarian',
  'Kosher',
  'Halal',
  'Low-carb',
  'Low-fat',
  'Sugar-free',
  'Paleo',
  'Whole30',
  'FODMAP',
];

const allergiesIntolerancesOptions = [
  'Milk',
  'Eggs',
  'Peanuts',
  'Tree nuts',
  'Wheat',
  'Soy',
  'Fish',
  'Shellfish',
  'Sesame seeds',
  'Barley',
  'Rye',
  'Oats',
  'Lactose',
  'Sulphites',
  'Almonds',
  'Cashews',
  'Walnuts',
  'Pecans',
  'Hazelnuts',
  'Pistachios',
  'Brazil nuts',
  'Macadamia nuts',
  'Soybeans',
  'Eggs',
  'Sesame seeds',
];

const weeklyAvailabilityOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdditionalInfoForm() {
  const [healthConditionsAndInjuries, setHealthConditionsAndInjuries] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergiesIntolerances, setAllergiesIntolerances] = useState([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);

  const clear = () => {
    setHealthConditionsAndInjuries([]);
    setDietaryRestrictions([]);
    setAllergiesIntolerances([]);
    setWeeklyAvailability([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      'healthConditionsAndInjuries: ': healthConditionsAndInjuries,
      'dietaryRestrictions: ': dietaryRestrictions,
      'allergiesIntolerances: ': allergiesIntolerances,
      'workoutDayOfWeek: ': weeklyAvailability,

    });

    clear();
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Update Additional Profile"
    >
      <FormMultiSelect
        id="health-conditions-and-injuries"
        label="Health Conditions & Injuries"
        value={healthConditionsAndInjuries}
        setValue={setHealthConditionsAndInjuries}
        options={healthConditionsAndInjuriesOptions}
      />
      <FormMultiSelect
        id="dietary-restrictions"
        label="Dietary Restrictions"
        value={dietaryRestrictions}
        setValue={setDietaryRestrictions}
        options={dietaryRestrictionsOptions}
      />
      <FormMultiSelect
        id="allergies-intolerances"
        label="Allergies & Intolerances"
        value={allergiesIntolerances}
        setValue={setAllergiesIntolerances}
        options={allergiesIntolerancesOptions}
      />
      <FormMultiSelect
        id="weekly-availability"
        label="Weekly Availability"
        value={weeklyAvailability}
        setValue={setWeeklyAvailability}
        options={weeklyAvailabilityOptions}
      />
    </Form>
  );
}
