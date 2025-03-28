export const INDOOR_NOT_WATERPROOF = 'Indoor';
export const GLOSS_FINISH = 'Gloss';
export const CLEAR_COLOR = 'Clear';
export const FROSTED_CLEAR_COLOR = 'Frosted Clear';
export const STUD_WITH_SPACER = 'Stud with spacer';
export const STUD_MOUNT = 'Stud Mount';
export const EXCHANGE_RATE = NovaQuote.exchange_rate;
export const ASSEMBLY_FEES = 1.1;
export const M4_STUD_WITH_SPACER = 'M4 Stud with Spacer';
export const LIGHTING_INDOOR = 'Low Voltage LED Driver, 6ft open wires, 1:1 blueprint';

export const shippingRates = (total, currency) => {
  let standard, expedite;
  let flatRate =
    currency === 'USD'
      ? NovaQuote.shipping_flat_rate
      : NovaQuote.shipping_flat_rate * EXCHANGE_RATE;
  let expeditedRate =
    currency === 'USD'
      ? NovaQuote.shipping_expedited_rate
      : NovaQuote.shipping_expedited_rate * EXCHANGE_RATE;
  let minPrice =
    currency === 'USD'
      ? NovaQuote.shipping_min_price
      : NovaQuote.shipping_min_price * EXCHANGE_RATE;
  let belowMin = 0;
  let aboveMin = 0;
  let belowMinEx = 0;
  let aboveMinEx = 0;
  if (total < minPrice) {
    standard =
      total * NovaQuote.shipping_standard_percentage > flatRate
        ? total * NovaQuote.shipping_standard_percentage
        : flatRate;
    expedite =
      total * NovaQuote.shipping_expedited_percentage > expeditedRate
        ? total * NovaQuote.shipping_expedited_percentage
        : expeditedRate;
  } else {
    belowMin = minPrice * NovaQuote.shipping_standard_percentage;
    belowMinEx = minPrice * NovaQuote.shipping_expedited_percentage;

    let difference = total - minPrice;

    aboveMin = difference * NovaQuote.shipping_standard_above_min_percentage;
    aboveMinEx = difference * NovaQuote.shipping_expedited_above_min_percentage;

    standard = belowMin + aboveMin;
    expedite = belowMinEx + aboveMinEx;
  }
  return {
    standard,
    expedite,
  };
};
