import {test, expect} from '../test-utils/component';

const SECOND = 1000;
const DAY = SECOND * 60 * 60 * 24;
test.beforeEach(async ({page}) => {
    await page.clock.install({time: new Date('2026-01-01T00:00:00Z')});
    await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'));
});
test('Timer', async ({mount, page}) => {
    await mount('timer/Scenario1');
    await expect(page.getByRole('timer')).toHaveCount(1);
    await expect(page.getByText('0 horas, 1 minuto y 0 segundos')).toHaveCount(1);
    await page.clock.runFor(SECOND);
    await expect(page.getByText('0 horas, 0 minutos y 59 segundos')).toHaveCount(1);
    await page.clock.runFor(SECOND * 29);
    await expect(page.getByText('0 horas, 0 minutos y 30 segundos')).toHaveCount(1);
    await page.clock.fastForward(DAY);
    await expect(page.getByText('0 horas, 0 minutos y 0 segundos')).toHaveCount(1);
});
test('Timer - timestamp from the past', async ({mount, page}) => {
    await mount('timer/Scenario2');
    await expect(page.getByText('0 horas, 0 minutos y 0 segundos')).toHaveCount(1);
    await page.clock.fastForward(DAY);
    await expect(page.getByText('0 horas, 0 minutos y 0 segundos')).toHaveCount(1);
});
test('Timer - from minutes to days', async ({mount, page}) => {
    await mount('timer/Scenario3');
    await expect(page.getByText('0 días, 0 horas y 1 minuto')).toHaveCount(1);
    await page.clock.runFor(SECOND);
    await expect(page.getByText('0 días, 0 horas y 1 minuto')).toHaveCount(1);
    await page.clock.runFor(SECOND);
    await expect(page.getByText('0 días, 0 horas y 0 minutos')).toHaveCount(1);
    await page.clock.fastForward(DAY);
    await expect(page.getByText('0 días, 0 horas y 0 minutos')).toHaveCount(1);
});
test('Timer - renders only minimum unit if minTimeUnit is bigger than maxTimeUnit', async ({mount, page}) => {
    await mount('timer/Scenario4');
    await expect(page.getByText('24 horas')).toHaveCount(1);
    await page.clock.fastForward(DAY);
    await expect(page.getByText('0 horas')).toHaveCount(1);
});
test('Timer - render days', async ({mount, page}) => {
    await mount('timer/Scenario5');
    await expect(page.getByText('1 día, 0 horas, 0 minutos y 0 segundos')).toHaveCount(1);
    await page.clock.runFor(SECOND);
    await expect(page.getByText('0 días, 23 horas, 59 minutos y 59 segundos')).toHaveCount(1);
    await page.clock.fastForward(DAY);
    await expect(page.getByText('0 días, 0 horas, 0 minutos y 0 segundos')).toHaveCount(1);
});
test('Timer - render only seconds', async ({mount, page}) => {
    await mount('timer/Scenario6');
    await expect(page.getByText('86400 segundos')).toHaveCount(1);
    await page.clock.fastForward(DAY);
    await expect(page.getByText('0 segundos')).toHaveCount(1);
});
test('Timer - component is accessible', async ({mount, page}) => {
    await mount('timer/Scenario7');
    await expect(page.getByLabel('A label. 0 horas, 0 minutos y 1 segundo')).toHaveCount(1);
});
test("TextTimer - doesn't render days", async ({mount, page}) => {
    await mount('timer/Scenario8');
    await expect(page.getByText('24 horas, 0 minutos y 0 segundos')).toHaveCount(1);
    await page.clock.runFor(SECOND);
    await expect(page.getByText('23 horas, 59 minutos y 59 segundos')).toHaveCount(1);
    await page.clock.fastForward(DAY);
    await expect(page.getByText('0 horas, 0 minutos y 0 segundos')).toHaveCount(1);
});
test('TextTimer - component is accessible', async ({mount, page}) => {
    await mount('timer/Scenario9');
    await expect(page.getByLabel('A label. 0 horas, 0 minutos y 1 segundo')).toHaveCount(1);
});
