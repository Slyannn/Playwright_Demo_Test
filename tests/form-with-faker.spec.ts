import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { PracticeFormPage } from '../pages/PracticeFormPage';

test.describe('DemoQA Form Tests avec Faker', () => {
  let form: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    form = new PracticeFormPage(page);
    await form.navigateToForm();
  });

  test('should submit form with faker generated data', async () => {
    // Générer des données avec Faker
    const testData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.string.numeric(10),
      address: faker.location.streetAddress({ useFullAddress: true }),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']) as 'Male' | 'Female' | 'Other'
    };

    console.log('📋 Données générées:', testData);

    // Valider les données avant de les utiliser
    await form.validateRequiredFieldsData(testData);

    // Remplir le formulaire
    await form.fillFirstName(testData.firstName);
    await form.fillLastName(testData.lastName);
    await form.fillEmail(testData.email);
    await form.selectGender(testData.gender);
    await form.fillMobileNumber(testData.mobile);
    await form.fillCurrentAddress(testData.address);

    // Soumettre et valider
    await form.submitForm();
    await form.validateFormDataMatchesModal();
    await form.closeModal();
  });

  test('should generate and test multiple users', async () => {
    for (let i = 1; i <= 3; i++) {
      console.log(`\n🎲 Test utilisateur #${i}`);
      
      const userData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        mobile: faker.string.numeric(10),
        address: faker.location.streetAddress(),
        gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']) as 'Male' | 'Female' | 'Other'
      };

      console.log('Utilisateur:', userData);

      // Remplir et soumettre
      await form.fillFirstName(userData.firstName);
      await form.fillLastName(userData.lastName);
      await form.fillEmail(userData.email);
      await form.selectGender(userData.gender);
      await form.fillMobileNumber(userData.mobile);
      await form.fillCurrentAddress(userData.address);

      await form.submitForm();
      await form.validateFormDataMatchesModal();
      await form.closeModal();

      // Recharger pour le prochain test
      if (i < 3) {
        await form.navigateToForm();
      }
    }
  });

  test('should test with realistic data variations', async () => {
    // Test avec différentes variations de données réalistes
    const realisticData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.string.numeric(10),
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.country()}`,
      gender: 'Female' as const
    };

    console.log('🌍 Données réalistes:', realisticData);

    await form.fillFirstName(realisticData.firstName);
    await form.fillLastName(realisticData.lastName);
    await form.fillEmail(realisticData.email);
    await form.selectGender(realisticData.gender);
    await form.fillMobileNumber(realisticData.mobile);
    await form.fillCurrentAddress(realisticData.address);

    await form.submitForm();
    await form.validateFormDataMatchesModal();
    await form.closeModal();
  });

  test('should test edge cases with faker', async () => {
    const edgeData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: '1234567890', // Mobile 
      address: faker.lorem.sentences(2), // Adresse longue
      gender: 'Other' as const
    };

    console.log('🎯 Données edge case:', edgeData);

    await form.fillFirstName(edgeData.firstName);
    await form.fillLastName(edgeData.lastName);
    await form.fillEmail(edgeData.email);
    await form.selectGender(edgeData.gender);
    await form.fillMobileNumber(edgeData.mobile);
    await form.fillCurrentAddress(edgeData.address);

    await form.submitForm();
    await form.validateFormDataMatchesModal();
    await form.closeModal();
  });

  test('should test file upload functionality', async () => {
    const testData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.string.numeric(10),
      address: faker.location.streetAddress()
    };

    console.log('📁 Test d\'upload de fichier avec données:', testData);

    // Remplir les champs obligatoires
    await form.fillFirstName(testData.firstName);
    await form.fillLastName(testData.lastName);
    await form.fillEmail(testData.email);
    await form.selectGender('Male');
    await form.fillMobileNumber(testData.mobile);
    await form.fillCurrentAddress(testData.address);

    // Upload du fichier de test
    const filePath = 'assets/test-document.txt';
    await form.uploadPicture(filePath);

    // Soumettre le formulaire
    await form.submitForm();
    
    // Valider que le fichier apparaît dans le modal
    const isFileValidated = await form.validateUploadedFile('test-document.txt');
    expect(isFileValidated).toBe(true);
    
    await form.closeModal();
  });

  test('should test image upload functionality', async () => {
    const testData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.string.numeric(10),
      address: faker.location.streetAddress()
    };

    console.log('🖼️ Test d\'upload d\'image avec données:', testData);

    // Remplir les champs obligatoires
    await form.fillFirstName(testData.firstName);
    await form.fillLastName(testData.lastName);
    await form.fillEmail(testData.email);
    await form.selectGender('Female');
    await form.fillMobileNumber(testData.mobile);
    await form.fillCurrentAddress(testData.address);

    // Upload de l'image de test
    const filePath = 'assets/sample-image.png';
    await form.uploadPicture(filePath);

    // Soumettre le formulaire
    await form.submitForm();
    
    // Valider que l'image apparaît dans le modal
    const isFileValidated = await form.validateUploadedFile('sample-image.png');
    expect(isFileValidated).toBe(true);
    
    await form.closeModal();
  });

  test('should test with complete form including subjects and hobbies', async ({ page }) => {
    // Créer une nouvelle instance pour éviter les conflits
    const newForm = new PracticeFormPage(page);
    await newForm.navigateToForm();

    const completeData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      mobile: faker.string.numeric(10),
      address: faker.location.streetAddress(),
      gender: faker.helpers.arrayElement(['Male', 'Female']) as 'Male' | 'Female',
      subject: faker.helpers.arrayElement(['Math', 'Physics', 'Chemistry', 'Biology', 'Computer Science']),
      hobbies: faker.helpers.arrayElements(['Sports', 'Reading', 'Music'], { min: 1, max: 2 })
    };

    console.log('📚 Données complètes:', completeData);

    // Remplir tous les champs avec attente
    await newForm.fillFirstName(completeData.firstName);
    await newForm.fillLastName(completeData.lastName);
    await newForm.fillEmail(completeData.email);
    await newForm.selectGender(completeData.gender);
    await newForm.fillMobileNumber(completeData.mobile);
    
    // Attendre un peu après les champs obligatoires
    await newForm.page.waitForTimeout(1000);
    
    await newForm.selectSubject(completeData.subject);
    
    // S'assurer qu'aucun modal n'interfère avant la sélection des hobbies
    await newForm.ensureNoModalOpen();
    
    for (const hobby of completeData.hobbies) {
      await newForm.selectHobby(hobby);
      // Petite pause entre les hobbies
      await newForm.page.waitForTimeout(500);
    }
    
    await newForm.fillCurrentAddress(completeData.address);
    await newForm.selectState('NCR');
    await newForm.selectCity('Delhi');

    // Attendre un peu avant la soumission pour s'assurer que tout est rempli
    await newForm.page.waitForTimeout(1000);

    // Vérifier que les champs sont bien remplis avant soumission
    const formValues = await newForm.getFormValues();
    console.log('📋 Valeurs avant soumission:', formValues);
    
    // Seulement soumettre si les champs obligatoires sont remplis
    if (formValues.firstName && formValues.lastName && formValues.email && formValues.mobile) {
      await newForm.submitForm();
      await newForm.validateFormDataMatchesModal();
      await newForm.closeModal();
    } else {
      console.log('❌ Champs obligatoires manquants, pas de soumission');
      throw new Error('Les champs obligatoires ne sont pas remplis correctement');
    }
  });
});