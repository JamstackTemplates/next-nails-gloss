import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, openingStatus, validateHours } from '../lib/hours.ts';

const zone = business.timeZone; // America/Chicago
const at = (isoUtc: string, tz = zone) => openingLabel(business.hours, tz, new Date(isoUtc));

test('Tuesday boundaries: inclusive open at 10:00, exclusive close at 19:00 (America/Chicago CST UTC-6)', () => {
  // 2026-11-17 is Tuesday in CST (UTC-6)
  assert.equal(at('2026-11-17T15:59:00Z'), 'Opens today at 10:00 am');
  assert.equal(at('2026-11-17T16:00:00Z'), 'Open now until 7:00 pm');
  assert.equal(at('2026-11-18T00:59:00Z'), 'Open now until 7:00 pm');
  assert.equal(at('2026-11-18T01:00:00Z'), 'Opens Wednesday at 10:00 am');
});

test('Thursday late close at 20:00 (America/Chicago)', () => {
  // 2026-11-19 is Thursday in CST (UTC-6): 19:59 -> 2026-11-20T01:59Z, 20:00 -> 02:00Z
  assert.equal(at('2026-11-20T01:59:00Z'), 'Open now until 8:00 pm');
  assert.equal(at('2026-11-20T02:00:00Z'), 'Opens Friday at 10:00 am');
});

test('Monday closed and Sunday 11:00–16:00 wrap cleanly to Tuesday 10:00 am', () => {
  // 2026-11-16 is Monday in CST (UTC-6)
  assert.equal(at('2026-11-16T18:00:00Z'), 'Opens Tuesday at 10:00 am');
  assert.equal(openingStatus(business.hours, zone, new Date('2026-11-16T18:00:00Z')).today, 'Monday');

  // 2026-11-15 is Sunday in CST (UTC-6): 11:00 = 17:00Z, 16:00 = 22:00Z
  assert.equal(at('2026-11-15T16:59:00Z'), 'Opens today at 11:00 am');
  assert.equal(at('2026-11-15T17:00:00Z'), 'Open now until 4:00 pm');
  assert.equal(at('2026-11-15T21:59:00Z'), 'Open now until 4:00 pm');
  assert.equal(at('2026-11-15T22:00:00Z'), 'Opens Tuesday at 10:00 am');
});

test('March spring-forward and November fall-back DST transitions in America/Chicago preserve local hours', () => {
  // Sunday 2026-03-08: DST springs forward at 02:00 CST -> 03:00 CDT (UTC-5)
  // Sunday opens 11:00 CDT = 16:00Z, closes 16:00 CDT = 21:00Z
  assert.equal(at('2026-03-08T15:59:00Z'), 'Opens today at 11:00 am');
  assert.equal(at('2026-03-08T16:00:00Z'), 'Open now until 4:00 pm');
  assert.equal(at('2026-03-08T20:59:00Z'), 'Open now until 4:00 pm');
  assert.equal(at('2026-03-08T21:00:00Z'), 'Opens Tuesday at 10:00 am');

  // Sunday 2026-11-01: DST falls back at 02:00 CDT -> 01:00 CST (UTC-6)
  // Sunday opens 11:00 CST = 17:00Z, closes 16:00 CST = 22:00Z
  assert.equal(at('2026-11-01T16:59:00Z'), 'Opens today at 11:00 am');
  assert.equal(at('2026-11-01T17:00:00Z'), 'Open now until 4:00 pm');
  assert.equal(at('2026-11-01T21:59:00Z'), 'Open now until 4:00 pm');
  assert.equal(at('2026-11-01T22:00:00Z'), 'Opens Tuesday at 10:00 am');
});

test('missing or invalid zones stay neutral and invalid intervals name the weekday to fix', () => {
  assert.equal(at('2026-11-17T16:00:00Z', ''), 'See our hours');
  assert.equal(at('2026-11-17T16:00:00Z', 'Mars/Base'), 'See our hours');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'See our hours');

  assert.doesNotThrow(() => validateHours(business.hours));
  for (const opens of ['24:00', '9:00', '20:00']) {
    assert.throws(
      () => validateHours(business.hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(business.hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(business.hours.map(x => (x.day === 'Thursday' ? { ...x, closes: undefined } : x))),
    /Thursday/,
  );
});
