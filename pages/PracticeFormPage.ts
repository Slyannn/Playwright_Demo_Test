import { Page, expect } from "@playwright/test";
import path from "path";

export class PracticeFormPage {
    constructor(public page: Page) {}

    // Locators
    private firstNameInput = '#firstName';
    private lastNameInput = '#lastName';
    private emailInput = '#userEmail';
    private genderMaleRadio = 'input#gender-radio-1';
    private genderFemaleRadio = 'input#gender-radio-2';
    private genderOtherRadio = 'input#gender-radio-3';
    private mobileNumberInput = '#userNumber';
    private dateOfBirthInput = '#dateOfBirthInput';
    private subjectsInput = '#subjectsInput';
    private hobbySportsCheckbox = 'label[for="hobbies-checkbox-1"]';
    private hobbyReadingCheckbox = 'label[for="hobbies-checkbox-2"]';
    private hobbyMusicCheckbox = 'label[for="hobbies-checkbox-3"]';
    private pictureUpload = '#uploadPicture';
    private currentAddressTextarea = '#currentAddress';
    private stateDropdown = '#state';
    private cityDropdown = '#city';
    private submitButton = '#submit';

    // Modal confirmation locators
    private confirmationModal = '.modal-dialog';
    private modalTitle = '.modal-title';
    private modalBody = '.modal-body';
    private modalCloseButton = '#closeLargeModal';

    async navigateToForm() {
        await this.page.goto("/automation-practice-form");
        await expect(this.page).toHaveTitle(/DEMOQA/);

        await this.page.evaluate(() => {
            const ads = document.querySelectorAll("#ad_position_box, #fixedban, .Advertisement-Section, .ad-container, .Google-Ad");
            ads.forEach((ad) => ad.remove());
        }); 

        // Verify form is present and visible
        await expect(this.page.locator("#userForm")).toBeVisible();

        // Handle ads and overlays
        await this.handleAdsAndOverlays();

        // Verify required elements are present
        await this.validateRequiredElementsPresence();
    }

    async handleAdsAndOverlays() {
        // Wait a moment for ads to potentially load
        await this.page.waitForTimeout(2000);
        
        // Close any modal dialogs that might appear
        const possibleModals = [
          '.modal-dialog .close',
          '.popup-close',
          '.advertisement-close',
          '[aria-label="Close"]',
          '.close-button'
        ];
        
        for (const modalSelector of possibleModals) {
          try {
            const modal = this.page.locator(modalSelector);
            if (await modal.isVisible({ timeout: 1000 })) {
              await modal.click({ force: true });
              console.log(`✅ Closed modal/popup: ${modalSelector}`);
            }
          } catch (error) {
            // Ignore if modal doesn't exist
          }
        }
    
        // Hide fixed positioned ads that might interfere
        await this.page.evaluate(() => {
          // Hide common ad containers
          const adSelectors = [
            'iframe[src*="googlesyndication"]',
            'iframe[src*="doubleclick"]',
            '[id*="google_ads"]',
            '[class*="advertisement"]',
            '#fixedban'
          ];
          
          adSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.display = 'none';
                console.log('Hidden ad element:', selector);
              }
            });
          });
        });
        
        console.log('✅ Ads and overlays handled');
    }

    async fillFirstName(firstName: string) {
        await this.page.fill(this.firstNameInput, firstName);
        // Vérifier que la valeur a été correctement saisie
        const value = await this.page.locator(this.firstNameInput).inputValue();
        if (value !== firstName) {
            console.log(`⚠️ Retry fill firstName: expected "${firstName}", got "${value}"`);
            await this.page.fill(this.firstNameInput, firstName);
        }
    }

    async fillLastName(lastName: string) {
        await this.page.fill(this.lastNameInput, lastName);
        // Vérifier que la valeur a été correctement saisie
        const value = await this.page.locator(this.lastNameInput).inputValue();
        if (value !== lastName) {
            console.log(`⚠️ Retry fill lastName: expected "${lastName}", got "${value}"`);
            await this.page.fill(this.lastNameInput, lastName);
        }
    }

    async fillEmail(email: string) {
        await this.page.fill(this.emailInput, email);
        // Vérifier que la valeur a été correctement saisie
        const value = await this.page.locator(this.emailInput).inputValue();
        if (value !== email) {
            console.log(`⚠️ Retry fill email: expected "${email}", got "${value}"`);
            await this.page.fill(this.emailInput, email);
        }
    }

    async selectGender(gender: string) {
        switch(gender.toLowerCase()) {
            case 'male':
                await this.page.click(this.genderMaleRadio, { force: true });
                break;
            case 'female':
                await this.page.click(this.genderFemaleRadio, { force: true });
                break;
            case 'other':
                await this.page.click(this.genderOtherRadio, { force: true });
                break;
            default:
                throw new Error(`Invalid gender: ${gender}`);
        }
    }

    async fillMobileNumber(mobileNumber: string) {
        await this.page.waitForSelector(this.mobileNumberInput, { state: 'visible' });
        await this.page.fill(this.mobileNumberInput, mobileNumber);
        // Vérifier que la valeur a été correctement saisie
        const value = await this.page.locator(this.mobileNumberInput).inputValue();
        if (value !== mobileNumber) {
            console.log(`⚠️ Retry fill mobile: expected "${mobileNumber}", got "${value}"`);
            await this.page.fill(this.mobileNumberInput, mobileNumber);
        }
    }

    async fillDateOfBirth(date: string) {
        // Click on the date input to open the date picker
        await this.page.click(this.dateOfBirthInput);
        // Clear existing value first
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Delete');
        // Type the new date
        await this.page.type(this.dateOfBirthInput, date, { delay: 100 });
        // Press Tab or click outside to close the date picker
        await this.page.press(this.dateOfBirthInput, 'Tab');
    }

    async selectSubject(subject: string) {
        await this.page.click(this.subjectsInput);
        await this.page.type(this.subjectsInput, subject);
        await this.page.press(this.subjectsInput, 'Enter');
    }

    async selectHobby(hobby: string) {
        // S'assurer qu'aucun modal n'interfère
        await this.ensureNoModalOpen();
        
        switch(hobby.toLowerCase()) {
            case 'sports':
                await this.page.click(this.hobbySportsCheckbox, { force: true });
                break;
            case 'reading':
                await this.page.click(this.hobbyReadingCheckbox, { force: true });
                break;
            case 'music':
                await this.page.click(this.hobbyMusicCheckbox, { force: true });
                break;
            default:
                throw new Error(`Invalid hobby: ${hobby}`);
        }
    }

    async uploadPicture(filePath: string) {
        await this.page.setInputFiles(this.pictureUpload, filePath);
    }

    async fillCurrentAddress(address: string) {
        await this.page.fill(this.currentAddressTextarea, address);
    }


    async selectState(state: string) {
        await this.page.click(this.stateDropdown);
        await this.page.locator(`div[id^="react-select-3-option-"]`, { hasText: state }).click();
    }

    async selectCity(city: string) {
        await this.page.click(this.cityDropdown);
        await this.page.locator(`div[id^="react-select-4-option-"]`, { hasText: city }).click();
    }

    async submitForm() {
        await this.page.click(this.submitButton);
    }

    // =============================================
    // VALIDATION DE LA PRÉSENCE DES ÉLÉMENTS
    // =============================================

    async validateRequiredElementsPresence() {
        console.log('🔍 Validation de la présence des éléments obligatoires...');
        
        // Vérifier firstName
        await expect(this.page.locator(this.firstNameInput)).toBeVisible();
        await expect(this.page.locator(this.firstNameInput)).toBeEditable();
        console.log('✅ First Name field est présent et éditable');

        // Vérifier lastName
        await expect(this.page.locator(this.lastNameInput)).toBeVisible();
        await expect(this.page.locator(this.lastNameInput)).toBeEditable();
        console.log('✅ Last Name field est présent et éditable');

        // Vérifier email
        await expect(this.page.locator(this.emailInput)).toBeVisible();
        await expect(this.page.locator(this.emailInput)).toBeEditable();
        console.log('✅ Email field est présent et éditable');

        // Vérifier mobile (10 digits)
        await expect(this.page.locator(this.mobileNumberInput)).toBeVisible();
        await expect(this.page.locator(this.mobileNumberInput)).toBeEditable();
        console.log('✅ Mobile field est présent et éditable');

        // Vérifier address
        await expect(this.page.locator(this.currentAddressTextarea)).toBeVisible();
        await expect(this.page.locator(this.currentAddressTextarea)).toBeEditable();
        console.log('✅ Address field est présent et éditable');

        console.log('🎯 Tous les éléments obligatoires sont présents et accessibles !');
    }

    async validateMobileFormat(mobile: string): Promise<boolean> {
        // Vérifier que le mobile contient exactement 10 chiffres
        const mobileRegex = /^\d{10}$/;
        const isValid = mobileRegex.test(mobile);
        
        if (isValid) {
            console.log(`✅ Format mobile valide: ${mobile} (10 chiffres)`);
        } else {
            console.log(`❌ Format mobile invalide: ${mobile} (doit contenir exactement 10 chiffres)`);
        }
        
        return isValid;
    }

    async validateRequiredFieldsData(data: {
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        address: string;
    }) {
        console.log('📋 Validation des données des champs obligatoires...');
        
        // Validation firstName
        if (!data.firstName || data.firstName.trim().length === 0) {
            throw new Error('firstName est obligatoire et ne peut pas être vide');
        }
        console.log(`✅ firstName valide: "${data.firstName}"`);

        // Validation lastName
        if (!data.lastName || data.lastName.trim().length === 0) {
            throw new Error('lastName est obligatoire et ne peut pas être vide');
        }
        console.log(`✅ lastName valide: "${data.lastName}"`);

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            throw new Error('email doit avoir un format valide');
        }
        console.log(`✅ email valide: "${data.email}"`);

        // Validation mobile (10 chiffres)
        if (!await this.validateMobileFormat(data.mobile)) {
            throw new Error('mobile doit contenir exactement 10 chiffres');
        }

        // Validation address
        if (!data.address || data.address.trim().length === 0) {
            throw new Error('address est obligatoire et ne peut pas être vide');
        }
        console.log(`✅ address valide: "${data.address}"`);

        console.log('🎯 Toutes les données des champs obligatoires sont valides !');
    }

    // =============================================
    // VALIDATION DES DONNÉES SOUMISES
    // =============================================

    async getFormValues() {
        console.log('📋 Extraction des valeurs du formulaire...');
        
        const formData = {
            firstName: await this.page.locator(this.firstNameInput).inputValue(),
            lastName: await this.page.locator(this.lastNameInput).inputValue(),
            email: await this.page.locator(this.emailInput).inputValue(),
            mobile: await this.page.locator(this.mobileNumberInput).inputValue(),
            address: await this.page.locator(this.currentAddressTextarea).inputValue()
        };

        console.log('✅ Valeurs extraites du formulaire:', formData);
        return formData;
    }

    async getModalValues() {
        console.log('📋 Extraction des valeurs du modal...');
        
        await expect(this.page.locator(this.confirmationModal)).toBeVisible();
        const modalContent = this.page.locator(this.modalBody);
        
        // Extraire les valeurs du tableau dans le modal
        const rows = modalContent.locator('tr');
        const rowCount = await rows.count();
        const modalData: {[key: string]: string} = {};
        
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const cells = row.locator('td');
            const cellCount = await cells.count();
            
            if (cellCount >= 2) {
                const label = await cells.nth(0).textContent();
                const value = await cells.nth(1).textContent();
                
                if (label && value) {
                    modalData[label.trim()] = value.trim();
                }
            }
        }
        
        console.log('✅ Valeurs extraites du modal:', modalData);
        return modalData;
    }

    async validateFormDataMatchesModal() {
        console.log('🔍 Comparaison des données formulaire vs modal...');
        
        // Extraire les données du formulaire et du modal
        const formData = await this.getFormValues();
        const modalData = await this.getModalValues();
        
        // Comparer firstName + lastName avec Student Name
        const expectedFullName = `${formData.firstName} ${formData.lastName}`;
        const actualFullName = modalData['Student Name'] || '';
        if (expectedFullName !== actualFullName) {
            throw new Error(`❌ Nom complet différent - Formulaire: "${expectedFullName}" vs Modal: "${actualFullName}"`);
        }
        console.log(`✅ Nom complet correspond: "${expectedFullName}"`);

        // Comparer email
        const expectedEmail = formData.email;
        const actualEmail = modalData['Student Email'] || '';
        if (expectedEmail !== actualEmail) {
            throw new Error(`❌ Email différent - Formulaire: "${expectedEmail}" vs Modal: "${actualEmail}"`);
        }
        console.log(`✅ Email correspond: "${expectedEmail}"`);

        // Comparer mobile
        const expectedMobile = formData.mobile;
        const actualMobile = modalData['Mobile'] || '';
        if (expectedMobile !== actualMobile) {
            throw new Error(`❌ Mobile différent - Formulaire: "${expectedMobile}" vs Modal: "${actualMobile}"`);
        }
        console.log(`✅ Mobile correspond: "${expectedMobile}"`);

        // Comparer address
        const expectedAddress = formData.address;
        const actualAddress = modalData['Address'] || '';
        if (expectedAddress !== actualAddress) {
            throw new Error(`❌ Adresse différente - Formulaire: "${expectedAddress}" vs Modal: "${actualAddress}"`);
        }
        console.log(`✅ Adresse correspond: "${expectedAddress}"`);

        console.log('🎯 Toutes les données du formulaire correspondent au modal !');
        
        return {
            formData,
            modalData,
            isValid: true
        };
    }

    async validateSubmission(expectedData: any) {
        // Attendre le modal de confirmation
        await expect(this.page.locator(this.confirmationModal)).toBeVisible();
        await expect(this.page.locator(this.modalTitle)).toContainText('Thanks for submitting the form');
        
        const modalContent = this.page.locator(this.modalBody);
        
        // Valider les données une par une
        for (const [key, value] of Object.entries(expectedData)) {
            if (value) {
                await expect(modalContent.locator('td', { hasText: value as string })).toBeVisible();
            }
        }
    }

    async closeModal() {
        await this.page.click(this.modalCloseButton);
        await expect(this.page.locator(this.confirmationModal)).not.toBeVisible();
    }

    async ensureNoModalOpen() {
        // Vérifier si un modal est ouvert et le fermer si nécessaire
        try {
            const isModalVisible = await this.page.locator(this.confirmationModal).isVisible().catch(() => false);
            if (isModalVisible) {
                console.log('⚠️ Modal détecté ouvert, fermeture...');
                await this.page.click(this.modalCloseButton, { timeout: 2000 });
                await this.page.waitForTimeout(1000);
                
                // Vérifier à nouveau et forcer la fermeture si nécessaire
                const stillVisible = await this.page.locator(this.confirmationModal).isVisible().catch(() => false);
                if (stillVisible) {
                    console.log('⚠️ Modal encore ouvert, fermeture forcée...');
                    await this.page.keyboard.press('Escape');
                    await this.page.waitForTimeout(500);
                }
            }
        } catch (error) {
            console.log('⚠️ Erreur lors de la fermeture du modal, tentative de page refresh...');
            await this.page.reload();
            await this.page.waitForTimeout(2000);
        }
    }
}