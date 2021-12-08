import type { StartCliResult } from '@tramvai/test-integration';
import { startCli } from '@tramvai/test-integration';

describe('e-commerce-demo-front', () => {
  let app: StartCliResult;

  beforeAll(async () => {
    app = await startCli('e-commerce-demo-front');
  }, 80000);

  afterAll(() => {
    return app.close();
  });

  it('request to main page return status 200', async () => {
    return app.request('/').expect(200);
  });
});
