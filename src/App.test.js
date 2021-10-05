import { getPriceEstimate, getTimeEstimate, getDeliveryTime } from './script';
import moment from "moment/moment.js"

describe('getPriceEstimate test', () => {
  test('return correct price', () => {
      expect(getPriceEstimate(50, 'rus')).toBe('50.00')
      expect(getPriceEstimate(1600, 'rus')).toBe('80.00')
      expect(getPriceEstimate(3000, 'rus')).toBe('150.00')
      expect(getPriceEstimate(50, 'ukr')).toBe('50.00')
      expect(getPriceEstimate(1600, 'ukr')).toBe('80.00')
      expect(getPriceEstimate(3000, 'ukr')).toBe('150.00')
      expect(getPriceEstimate(50, 'eng')).toBe('120.00')
      expect(getPriceEstimate(1600, 'eng')).toBe('192.00')
      expect(getPriceEstimate(3000, 'eng')).toBe('360.00')
  })
})

describe('getTimeEstimate test', () => {
  test('return correct delivery time', () => {
      expect(getTimeEstimate(50, 'rus')).toBe(3600000)
      expect(getTimeEstimate(1600, 'rus').toFixed(0)).toBe('6121080')
      expect(getTimeEstimate(3000, 'rus').toFixed(0)).toBe('9902026')
      expect(getTimeEstimate(50, 'ukr')).toBe(3600000)
      expect(getTimeEstimate(1600, 'ukr').toFixed(0)).toBe('6121080')
      expect(getTimeEstimate(3000, 'ukr').toFixed(0)).toBe('9902026')
      expect(getTimeEstimate(50, 'eng')).toBe(3600000)
      expect(getTimeEstimate(1600, 'eng').toFixed(0)).toBe('19097297')
      expect(getTimeEstimate(3000, 'eng').toFixed(0)).toBe('34232432')
  })
})

describe('getDeliveryTime test', ()=>{
  test('return correct deadline', ()=> {
  expect(getDeliveryTime(1*3600000, moment('Oct 4, 2021 7:00 AM'))).toBe(moment('Oct 4, 2021 11:00 AM').valueOf())
  expect(getDeliveryTime(3*3600000, moment('Oct 4, 2021 5:00 PM'))).toBe(moment('Oct 5, 2021 11:00 AM').valueOf())
  expect(getDeliveryTime(4*3600000, moment('Oct 4, 2021 8:00 PM'))).toBe(moment('Oct 5, 2021 2:00 PM').valueOf())
  expect(getDeliveryTime(9*3600000, moment('Oct 3, 2021 8:00 PM'))).toBe(moment('Oct 4, 2021 7:00 PM').valueOf())
  expect(getDeliveryTime(15*3600000, moment('Oct 2, 2021 2:00 PM'))).toBe(moment('Oct 5, 2021 4:00 PM').valueOf())
  expect(getDeliveryTime(12*3600000, moment('Oct 7, 2021 6:00 PM'))).toBe(moment('Oct 11, 2021 12:00 PM').valueOf())
})
})


