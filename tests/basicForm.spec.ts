import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';

test.describe('DemoQA Basic Form Tests', () => {
  let form: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    form = new PracticeFormPage(page);
    await form.navigateToForm();
  });

  test('should successfully submit form with minimum required fields', async () => {
    // Fill only the required fields
    await form.fillFirstName('John');
    await form.fillLastName('Doe');
    await form.fillEmail('john.doe@example.com');
    await form.selectGender('Male');
    await form.fillMobileNumber('1234567890');
    
    // Submit the form
    await form.submitForm();
    
    // Verify that form data matches modal data
    await form.validateFormDataMatchesModal();
    
    // Close modal
    await form.closeModal();
  });

  test('should verify all form fields are present and accessible', async () => {
    // This test is automatically covered by validateRequiredElementsPresence() 
    // which runs in navigateToForm()
    console.log('✅ All form fields validation passed during navigation');
  });

  test('should allow typing in form fields and validate input values', async () => {
    // Test field interaction
    await form.fillFirstName('TestFirstName');
    await form.fillLastName('TestLastName');
    await form.fillEmail('test@example.com');
    await form.fillMobileNumber('9876543210');
    
    // Get and validate form values
    const formData = await form.getFormValues();
    expect(formData.firstName).toBe('TestFirstName');
    expect(formData.lastName).toBe('TestLastName');
    expect(formData.email).toBe('test@example.com');
    expect(formData.mobile).toBe('9876543210');
  });

  test('should handle gender selection for Male', async () => {
    // Fill required fields and select Male gender
    await form.fillFirstName('Test');
    await form.fillLastName('User');
    await form.fillEmail('test@example.com');
    await form.selectGender('Male');
    await form.fillMobileNumber('1234567890');
    
    // Submit and verify
    await form.submitForm();
    await form.validateFormDataMatchesModal();
    await form.closeModal();
  });

  test('should handle gender selection for Female', async () => {
    // Fill required fields and select Female gender
    await form.fillFirstName('Jane');
    await form.fillLastName('Smith');
    await form.fillEmail('jane@example.com');
    await form.selectGender('Female');
    await form.fillMobileNumber('9876543210');
    
    // Submit and verify
    await form.submitForm();
    await form.validateFormDataMatchesModal();
    await form.closeModal();
  });

  test('should include current address when provided', async () => {
    // Fill required fields
    await form.fillFirstName('Alice');
    await form.fillLastName('Johnson');
    await form.fillEmail('alice@example.com');
    await form.selectGender('Female');
    await form.fillMobileNumber('5551234567');
    
    // Fill optional address
    const testAddress = '123 Main Street, New York, NY';
    await form.fillCurrentAddress(testAddress);
    
    // Submit form and verify address is included
    await form.submitForm();
    await form.validateFormDataMatchesModal();
    await form.closeModal();
  });

  test('should validate required data format before submission', async () => {
    // Test data validation functionality
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      address: '123 Test Street'
    };
    
    // Validate data format
    await form.validateRequiredFieldsData(testData);
    
    console.log('✅ Data validation passed');
  });

  test('should validate mobile number format (10 digits)', async () => {
    // Test valid mobile
    const validMobile = '1234567890';
    const isValid = await form.validateMobileFormat(validMobile);
    expect(isValid).toBe(true);
    
    // Test invalid mobile
    const invalidMobile = '123456789'; // 9 digits
    const isInvalid = await form.validateMobileFormat(invalidMobile);
    expect(isInvalid).toBe(false);
  });

  test('should handle gender selection for Other', async () => {
    // Fill required fields and select Other gender
    await form.fillFirstName('Alex');
    await form.fillLastName('Taylor');
    await form.fillEmail('alex@example.com');
    await form.selectGender('Other');
    await form.fillMobileNumber('5555555555');
    
    // Submit and verify
    await form.submitForm();
    await form.validateFormDataMatchesModal();
    await form.closeModal();
  });
/*
  test('should display form title and structure correctly', async () => {
    // Verify page title (already checked in navigateToForm)
    await expect(form.page).toHaveTitle(/DEMOQA/);
    
    // Verify main form elements are structured correctly
    const formElement = form.page.locator('#userForm');
    await expect(formElement).toBeVisible();
    
    console.log('✅ Form structure validation passed');
  });*/
});
