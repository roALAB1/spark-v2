/**
 * Test createAudience with OFFICIAL Mintlify format
 * Date: December 13, 2025
 * Source: https://audiencelab.mintlify.app/api-reference/audience/create-audience
 */

import { describe, it, expect } from 'vitest';
import { createAudienceLabClient } from '../shared/audiencelab-client';

describe('Create Audience - Official Mintlify Format', () => {
  const apiKey = process.env.AUDIENCELAB_API_KEY;

  if (!apiKey) {
    throw new Error('AUDIENCELAB_API_KEY not configured');
  }

  const client = createAudienceLabClient(apiKey);

  it('should create audience with official Mintlify format', async () => {
    const audienceName = `Test Official Format ${Date.now()}`;

    console.log('\n🎯 Testing createAudience with OFFICIAL Mintlify format');
    console.log('Name:', audienceName);

    try {
      const result = await client.createAudience({
        name: audienceName,
        filters: {
          age: {
            minAge: 25,
            maxAge: 45
          },
          city: ['New York', 'San Francisco'],
          businessProfile: {
            industry: ['Software Development']
          }
        },
        days_back: 30
      });
      
      console.log('✅ Success!');
      console.log('Result:', JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      expect(result.audienceId).toBeDefined();
      expect(typeof result.audienceId).toBe('string');

      // Clean up - delete the test audience
      if (result.audienceId) {
        await client.deleteAudience(result.audienceId);
        console.log(`🗑️  Cleaned up: ${result.audienceId}`);
      }
    } catch (error: any) {
      console.log('❌ Failed:', error.message);
      console.log('Status:', error.statusCode);
      console.log('Code:', error.code);
      
      // Fail the test
      throw error;
    }
  }, 30000);

  it('should create audience with minimal filters', async () => {
    const audienceName = `Test Minimal ${Date.now()}`;

    console.log('\n🧪 Testing with minimal filters');

    try {
      const result = await client.createAudience({
        name: audienceName,
        filters: {
          city: ['Los Angeles']
        }
      });
      
      console.log('✅ Success with minimal filters');
      expect(result.audienceId).toBeDefined();

      // Clean up
      await client.deleteAudience(result.audienceId);
      console.log(`🗑️  Cleaned up: ${result.audienceId}`);
    } catch (error: any) {
      console.log('❌ Failed:', error.message);
      throw error;
    }
  }, 30000);

  it('should validate required fields', async () => {
    console.log('\n🧪 Testing validation');

    // Test missing name
    try {
      // @ts-expect-error Testing invalid input
      await client.createAudience({
        filters: { city: ['NYC'] }
      });
      expect.fail('Should have thrown error for missing name');
    } catch (error: any) {
      console.log('✅ Correctly rejected missing name');
      expect(error).toBeDefined();
    }

    // Test missing filters
    try {
      // @ts-expect-error Testing invalid input
      await client.createAudience({
        name: 'Test'
      });
      expect.fail('Should have thrown error for missing filters');
    } catch (error: any) {
      console.log('✅ Correctly rejected missing filters');
      expect(error).toBeDefined();
    }
  }, 30000);
});
