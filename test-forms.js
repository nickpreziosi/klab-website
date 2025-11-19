/**
 * Test script for contact form API routes
 *
 * Usage:
 * 1. Start the dev server: npm run dev
 * 2. Run this script: node test-forms.js
 *
 * Make sure your .env.local has all required environment variables set
 */

const BASE_URL = 'http://localhost:3000';

// Mock reCAPTCHA token (replace with a valid test token if needed)
const MOCK_RECAPTCHA_TOKEN = 'test-token';

// Test data for each form
const testData = {
  sales: {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Example Corp',
      position: 'CEO',
      companyWebsite: 'example.com', // Test domain without protocol
      companyType: 'technology-electronics',
      product: 'keo-rails',
      country: 'US',
      message: 'I am interested in your products',
      recaptcha: MOCK_RECAPTCHA_TOKEN,
    },
    invalid: {
      firstName: 'J', // Too short
      lastName: 'Doe',
      email: 'invalid-email', // Invalid format
      phone: '',
      company: '',
      companyWebsite: 'not-a-valid-url', // Invalid domain/URL
      message: 'X', // Too short
    },
  },
  careers: {
    valid: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      department: 'engineering',
      message: 'I am interested in joining your engineering team and would love to contribute to your innovative projects.',
      recaptcha: MOCK_RECAPTCHA_TOKEN,
    },
    invalid: {
      firstName: 'J',
      lastName: '',
      email: 'not-an-email',
      department: '',
      message: 'Short', // Less than 10 characters
    },
  },
  support: {
    valid: {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1 (555) 555-5555',
      issueType: 'technical-issue',
      product: 'kena',
      message: 'I am experiencing a technical issue with the product and need assistance.',
      recaptcha: MOCK_RECAPTCHA_TOKEN,
    },
    invalid: {
      firstName: '',
      lastName: 'J',
      email: 'bad-email',
      issueType: '',
      product: '',
      message: 'Help', // Less than 10 characters
    },
  },
};

// Helper function to create FormData
function createFormData(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
}

// Test function
async function testForm(formType, testCase) {
  const url = `${BASE_URL}/api/contact/${formType}`;
  const data = testData[formType][testCase];
  const formData = createFormData(data);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    return {
      formType,
      testCase,
      status: response.status,
      success: response.ok,
      result,
    };
  } catch (error) {
    return {
      formType,
      testCase,
      status: 'ERROR',
      success: false,
      error: error.message,
    };
  }
}

// Run all tests
async function runTests() {
  console.log('🧪 Starting Form API Tests...\n');
  console.log('=' .repeat(60));

  const tests = [
    { formType: 'sales', testCase: 'invalid' },
    { formType: 'careers', testCase: 'invalid' },
    { formType: 'support', testCase: 'invalid' },
    // Note: Valid tests will fail reCAPTCHA unless using test tokens
    // Uncomment these if you have test reCAPTCHA tokens configured
    // { formType: 'sales', testCase: 'valid' },
    // { formType: 'careers', testCase: 'valid' },
    // { formType: 'support', testCase: 'valid' },
  ];

  const results = [];

  for (const test of tests) {
    console.log(`\n📋 Testing ${test.formType} form - ${test.testCase} data...`);
    const result = await testForm(test.formType, test.testCase);
    results.push(result);

    if (result.success) {
      console.log(`✅ PASS: Status ${result.status}`);
    } else {
      console.log(`❌ FAIL: Status ${result.status}`);
      if (result.result) {
        console.log(`   Error: ${result.result.error || 'Unknown error'}`);
        if (result.result.details) {
          console.log(`   Details: ${JSON.stringify(result.result.details, null, 2)}`);
        }
      }
      if (result.error) {
        console.log(`   Exception: ${result.error}`);
      }
    }

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Summary:');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📝 Total: ${results.length}`);

  // Expected failures for invalid data
  if (failed === tests.filter(t => t.testCase === 'invalid').length) {
    console.log('\n✅ All validation tests passed as expected!');
    console.log('   (Invalid data correctly rejected)');
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n⚠️  Note: Valid form tests require valid reCAPTCHA tokens.');
  console.log('   To test valid submissions, uncomment valid test cases');
  console.log('   and ensure RECAPTCHA_SECRET_KEY is configured.');
}

// Run tests
runTests().catch(console.error);
